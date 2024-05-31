Write-Output "Starting the backend..."

cd .\backend\
$backendProcess = Start-Process uvicorn main:app -PassThru

Write-Output "Starting tests"
$testResult = Start-Process pytest test.py -NoNewWindow -PassThru -Wait

if ($testResult.ExitCode -eq 0) {
    Write-Output "All tests passed. Starting the frontend..."

    cd ..

    cd .\frontend\
    npm install
    Start-Process npm start
    cd ..
} else {
    Write-Output "Tests failed. Stopping the backend and frontend will not be started."
    Stop-Process -Id $backendProcess.Id
}
