@echo off
setlocal
set "APP_DIR=%~dp0"

if not exist "%APP_DIR%dist\index.html" (
  echo The production build is missing. Building it now...
  call npm.cmd run build
  if errorlevel 1 (
    echo.
    echo Build failed. Run npm.cmd install, then try again.
    pause
    exit /b 1
  )
)

start "Portfolio Desktop" "%APP_DIR%dist\index.html"
