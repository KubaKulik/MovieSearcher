import logging
from logging.handlers import RotatingFileHandler
import models.schemas as schemas
import models.tables as tables
from models.tables import User, TokenTable
import jwt
from datetime import datetime
from core.database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from security.auth_bearer import JWTBearer
from functools import wraps
from security.utils import create_access_token, create_refresh_token, verify_password, get_hashed_password
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv('.env')

LOGS_DIR = "logs"
if not os.path.exists(LOGS_DIR):
    os.makedirs(LOGS_DIR)

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add file handler to logger
file_handler = RotatingFileHandler(os.path.join(LOGS_DIR, "logs_backend.log"), maxBytes=1000000, backupCount=5)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)

ALGORITHM = os.getenv('ALGORITHM')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_REFRESH_SECRET_KEY = os.getenv('JWT_REFRESH_SECRET_KEY')

if not ALGORITHM or not JWT_SECRET_KEY or not JWT_REFRESH_SECRET_KEY:
    logger.error("Please set all environment variables.")
    raise ValueError("Please set all environment variables.")

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "PUT", "OPTIONS"],
    allow_headers=["*"],
)

# Custom exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc.detail}")
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})

@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    logger.exception("Internal server error occurred")
    return JSONResponse(status_code=500, content={"message": "Internal server error"})

@app.post("/register")
def register_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(tables.User).filter_by(username=user.username).first()
    if existing_user:
        logger.warning(f"Username '{user.username}' already registered.")
        raise HTTPException(status_code=400, detail="Username already registered")

    encrypted_password = get_hashed_password(user.password)

    new_user = tables.User(username=user.username, email=user.email, password=encrypted_password)
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    logger.info(f"User '{user.username}' created successfully.")
    return {"message": "user created successfully"}

@app.post('/login', response_model=schemas.TokenSchema)
def login(request: schemas.requestdetails, db: Session = Depends(get_session)):
    user = db.query(User).filter(User.username == request.username).first()
    if user is None:
        logger.error(f"Failed login attempt: Incorrect username '{request.username}'.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username")
    
    hashed_pass = user.password
    if not verify_password(request.password, hashed_pass):
        logger.error(f"Failed login attempt: Incorrect password for username '{request.username}'.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    
    access = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    token_db = tables.TokenTable(user_id=user.id, access_token=access, refresh_token=refresh, status=True)
    db.add(token_db)
    db.commit()
    db.refresh(token_db)

    logger.info(f"User '{request.username}' logged in successfully.")
    return {
        "access_token": access,
        "refresh_token": refresh,
    }

@app.put('/forgot-password')
def change_password(request: schemas.changepassword, db: Session = Depends(get_session)):
    user = db.query(tables.User).filter(tables.User.username == request.username).first()
    if user is None:
        logger.error(f"User '{request.username}' not found for password change.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    
    if request.new_password != request.repeat_new_password:
        logger.error("Password change request failed: Passwords do not match.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
    
    encrypted_password = get_hashed_password(request.new_password)
    user.password = encrypted_password
    db.commit()
    
    logger.info(f"Password changed successfully for user '{request.username}'.")
    return {"message": "Password changed successfully"}

@app.post('/logout')
def logout(dependencies=Depends(JWTBearer()), db: Session = Depends(get_session)):
    token=dependencies
    payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
    user_id = payload['sub']
    token_record = db.query(tables.TokenTable).all()
    info=[]
    for record in token_record :
        if (datetime.utcnow() - record.created_date).days >1:
            info.append(record.user_id)
    if info:
        existing_token = db.query(tables.TokenTable).where(TokenTable.user_id.in_(info)).delete()
        db.commit()
        
    existing_token = db.query(tables.TokenTable).filter(tables.TokenTable.user_id == user_id, tables.TokenTable.access_token==token).first()
    if existing_token:
        existing_token.status=False
        db.add(existing_token)
        db.commit()
        db.refresh(existing_token)
    
    logger.info("User logged out successfully.")
    return {"message":"Logout Successfully"} 

def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
    
        payload = jwt.decode(kwargs['dependencies'], JWT_SECRET_KEY, ALGORITHM)
        user_id = payload['sub']
        data= kwargs['session'].query(tables.TokenTable).filter_by(user_id=user_id,access_token=kwargs['dependencies'],status=True).first()
        if data:
            return func(kwargs['dependencies'],kwargs['session'])
        
        else:
            logger.error("Token blocked.")
            return {'msg': "Token blocked"}
        
    return wrapper
