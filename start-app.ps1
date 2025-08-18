# Simple script to start the Circles app correctly
# Run this from anywhere - it will always work

Write-Host "🚀 Starting Circles App..." -ForegroundColor Green

# Kill any existing node processes
Write-Host "Stopping any running processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null

# Navigate to the correct directory
$clientPath = Join-Path $PSScriptRoot "apps\client"
Set-Location $clientPath

Write-Host "📂 Working directory: $clientPath" -ForegroundColor Cyan

# Start the app
Write-Host "▶️  Starting Expo..." -ForegroundColor Green
npx expo start --web --clear

Write-Host "✅ App should be running at http://localhost:8081" -ForegroundColor Green
