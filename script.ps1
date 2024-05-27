Write-Output "Starting the backend..."

cd .\backend\
Start-Process uvicorn main:app

Write-Output "Starting tests"
Start-Process pytest test.py -NoNewWindow -Wait

cd ..

Write-Output "Starting the frontend..."

cd .\frontend\
npm install
Start-Process npm start

