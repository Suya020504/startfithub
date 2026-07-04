@echo off
setlocal
cd /d "%~dp0"
echo.
echo StartFit QR Evidence Hub local preview
echo URL: http://localhost:4173
echo.
npx --yes serve . -l 4173
