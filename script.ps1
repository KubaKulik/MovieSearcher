Write-Output "Starting the backend..."
cd .\backend\
Start-Process uvicorn main:app
cd ..

Write-Output "Starting the frontend..."
cd .\frontend\
npm install
Start-Process npm start
