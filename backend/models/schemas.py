from pydantic import BaseModel
import datetime

class UserCreate(BaseModel):
    username: str
    email : str
    password: str

class requestdetails(BaseModel):
    username:str
    password:str
        
class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

class changepassword(BaseModel):
    username:str
    new_password:str
    repeat_new_password:str

class TokenCreate(BaseModel):
    user_id:str
    access_token:str
    refresh_token:str
    status:bool
    created_date:datetime.datetime