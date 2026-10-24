@echo off
rem Wrapper para a Tarefa Agendada do Windows (evita problemas de aspas
rem com caminhos que contem espaco, ex: "C:\Users\...\Digital Sites\...")
powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0auto-sync.ps1"
exit /b %ERRORLEVEL%
