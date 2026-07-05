@echo off
cd /d D:\fashion-store
echo Installing packages...
call npm install
if errorlevel 1 (
  echo.
  echo ERROR: Make sure Node.js is installed from https://nodejs.org
  pause
  exit /b 1
)
echo.
echo Starting website...
call npm run dev
pause
