param([switch]$Stop)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$localDir = Join-Path $projectRoot '.local'
$pidFile = Join-Path $localDir 'dev.pid'
$nextCli = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
if (Test-Path -LiteralPath $pidFile) {
    $serverId = [int](Get-Content -LiteralPath $pidFile)
    $server = Get-CimInstance Win32_Process -Filter "ProcessId = $serverId" -ErrorAction SilentlyContinue
    if ($server -and $server.CommandLine -like "*$nextCli*") {
        if ($Stop) {
            & taskkill /PID $serverId /T /F
            if ($LASTEXITCODE -ne 0) { throw 'Could not stop the project process tree.' }
            Remove-Item -LiteralPath $pidFile
            Write-Output 'URBANCUT local server stopped.'
        } else { Write-Output 'URBANCUT server is already running at http://127.0.0.1:3000' }
        exit 0
    }
}
if ($Stop) { Write-Output 'No matching managed URBANCUT server is running.'; exit 0 }
if (-not (Test-Path -LiteralPath $nextCli)) { throw 'Install dependencies first with npm ci.' }
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $nodePath = $nodeCommand.Source }
else {
    $nodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $nodePath)) { throw 'Install Node.js 20.9+ or add it to PATH.' }
}
if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) { throw 'Port 3000 is already occupied. Stop that server before starting URBANCUT.' }
New-Item -ItemType Directory -Path $localDir -Force | Out-Null
$env:NEXT_TELEMETRY_DISABLED = '1'
$process = Start-Process -FilePath $nodePath -ArgumentList @('"' + $nextCli + '"','dev','--hostname','127.0.0.1','--port','3000') -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $localDir 'dev.log') -RedirectStandardError (Join-Path $localDir 'dev-error.log')
$process.Id | Set-Content -LiteralPath $pidFile
Write-Output 'Started URBANCUT locally. Open http://127.0.0.1:3000 after the server is ready.'
Write-Output "Logs: $localDir"
