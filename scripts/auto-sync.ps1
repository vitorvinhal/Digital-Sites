# auto-sync.ps1 - Commita e envia ao GitHub automaticamente.
# Acionado pela Tarefa Agendada "DigitalSites-AutoSync" (a cada 5 min)
# e pelo hook .git/hooks/post-commit (push imediato em commits manuais).
#
# Regras de seguranca (ver AGENTS.md):
#   - Jamais envia credenciais: .env* esta no .gitignore
#   - Falha com backoff em vez de estourar a API / re-envio

param(
    [int]$MaxRetries = 3,
    [string]$Remote = 'origin'
)

# 'Continue': no PS 5.1, 'Stop' faria o redirect de stderr do git
# (ex: warning de LF/CRLF) virar excecao. O resultado real e checado
# sempre via $LASTEXITCODE abaixo.
$ErrorActionPreference = 'Continue'
$repo = Split-Path -Parent $PSScriptRoot   # pai de scripts/ = raiz do repo
Set-Location -LiteralPath $repo

# 1. Outra operacao git em andamento? Sai e espera o proximo ciclo.
if (Test-Path -LiteralPath (Join-Path $repo '.git\index.lock')) { exit 0 }

# 2. Provisiona credencial nao-interativa: nunca pendurar uma tarefa agendada.
$env:GIT_TERMINAL_PROMPT = '0'
$env:GCM_INTERACTIVE = 'never'

# 3. Stage de tudo que mudou (respeita o .gitignore)
& git add -A 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { exit 1 }

# 4. Alguma alteracao realmente staged?
& git diff --cached --quiet
if ($LASTEXITCODE -eq 0) { exit 0 }   # 0 = nada pendente -> sem commit

# 5. Commit
$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
& git commit -q -m "auto-sync: $stamp"
if ($LASTEXITCODE -ne 0) { exit 1 }

# 6. Push com backoff exponencial simples
for ($i = 1; $i -le $MaxRetries; $i++) {
    & git push $Remote HEAD 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { exit 0 }
    Start-Sleep -Seconds ([math]::Pow(5, $i))   # 5s, 25s, 125s
}
exit 1   # o proximo ciclo da tarefa tenta de novo
