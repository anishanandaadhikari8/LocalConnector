@echo off
echo 🚀 Starting Circles App...

REM Kill any existing node processes
echo Stopping any running processes...
taskkill /f /im node.exe >nul 2>&1

REM Navigate to the correct directory
cd /d "%~dp0apps\client"

echo 📂 Working directory: %CD%

REM Start the app
echo ▶️  Starting Expo...
npx expo start --web --clear

echo ✅ App should be running at http://localhost:8081
pause
