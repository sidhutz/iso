@echo off
setlocal
set "APP_DIR=%~dp0smm-main"

if not exist "%APP_DIR%\dist\index.html" (
  echo The production build is missing. Building it now...
  call npm.cmd --prefix "%APP_DIR%" run build
  if errorlevel 1 (
    echo Build failed. Run npm.cmd install in %APP_DIR% and try again.
    pause
    exit /b 1
  )
)

REM Browsers block some JavaScript modules when opened with file:///.
REM Serve the built app locally, then open it in the default browser.
start "Portfolio server" /b cmd.exe /d /c "cd /d %APP_DIR% && npm.cmd run preview -- --host 127.0.0.1 --port 4173"
timeout /t 2 /nobreak >nul
start "Portfolio Desktop" "http://127.0.0.1:4173"
