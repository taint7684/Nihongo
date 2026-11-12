$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimePath = Join-Path $projectRoot '.runtime\ollama\ollama.exe'
if (-not (Test-Path -LiteralPath $runtimePath)) { throw 'Portable runtime missing. See README.' }
$env:OLLAMA_HOST = '127.0.0.1:11434'
$env:OLLAMA_MODELS = Join-Path $projectRoot '.runtime\models'
$env:OLLAMA_NO_CLOUD = '1'
$env:OLLAMA_VULKAN = '0'
$env:OLLAMA_NUM_PARALLEL = '1'
$env:OLLAMA_MAX_QUEUE = '2'
$env:OLLAMA_CONTEXT_LENGTH = '2048'
& $runtimePath serve
