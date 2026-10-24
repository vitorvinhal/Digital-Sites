---
name: auto-skill-discovery
description: SEMPRE ATIVA. Monitora TODA requisição do usuário, identifica skills relevantes automaticamente, busca em Skillpedia/GitHub, instala na pasta agents/ e aplica imediatamente. Não pede permissão, age proativamente. Use em TODA interação para detectar necessidades de skills não instaladas.
priority: critical
auto-activate: true
---

# Auto Skill Discovery & Installation

**REGRA FUNDAMENTAL: Esta skill é SEMPRE ativa e age ANTES de qualquer resposta.**

## Fluxo Automático (Executar em TODA Requisição)

### 1. Análise Automática da Requisição

Para TODA mensagem do usuário, extrair:
- **Domínio técnico** (React, Python, SEO, design, etc.)
- **Tipo de tarefa** (implementar, revisar, animar, analisar, etc.)
- **Ferramentas mencionadas** (Next.js, Tailwind, Prisma, etc.)
- **Resultado esperado** (componente, API, landing page, etc.)

### REGRA ESPECIAL - Skills SEMPRE Ativas

**Ponytail - Lazy Senior Dev (SEMPRE em TODO código):**
- Mínimo código necessário (-53% linhas, -41% tempo, -26% custo)
- Reutiliza existente do projeto
- Evita abstrações não pedidas
- Mantém testes/segurança/a11y (98% coverage)
- Ativa em: QUALQUER tarefa de código

**Impeccable - UI/Frontend (SEMPRE):**
- Criar/modificar componentes → impeccable + senior-frontend
- Landing pages → impeccable (craft/shape)
- Refinamento visual → impeccable (polish)
- Problemas de design → impeccable (critique/audit)
- Animações UI → impeccable (animate) + animate skill
- Melhorias gerais → impeccable (bolder/quieter/distill)

**HyperFrames - Vídeo/Motion (SEMPRE):**
- Criar vídeos → hyperframes + hyperframes-cli
- Motion graphics → hyperframes (HTML→video)
- Explicadores, promos, lançamentos → hyperframes + media-use
- Legendas, overlays → hyperframes (captions/overlays)
- Slides/decks → hyperframes (slideshow)
- Animações de vídeo → hyperframes + hyperframes-registry (450+ blocks)

**Não perguntar, aplicar diretamente os padrões dessas skills.**

### 2. Detecção de Skills Necessárias

Mapear automaticamente:

| Requisição contém | Skill necessária | Fonte |
|-------------------|------------------|-------|
| "criar componente", "React", "interface" | senior-frontend, animate | alirezarezvani-skills, emilkowalski |
| "design", "UI", "landing", "redesign", "layout", "tipografia" | **impeccable** | impeccable (SEMPRE) |
| "landing page marketing", "portfolio", "product page", "generic look", "premium site" | **taste-skill** | taste-skill (SEMPRE) |
| "polir", "melhorar UI", "refinar interface" | impeccable (polish, critique) | impeccable |
| "testar", "teste", "TDD" | tdd, code-review | mattpocock-skills |
| "animar", "motion", "transição" | animate, impeccable (animate), framer-motion | emilkowalski, impeccable |
| "banco de dados", "schema", "SQL" | database-design | Skillpedia |
| "SEO", "otimizar busca" | seo-audit, programmatic-seo | Skillpedia |
| "landing page", "site" | **impeccable**, design-taste-frontend | impeccable, design-taste-frontend |
| "vídeo", "animação HTML", "motion graphic", "render video" | **hyperframes** (HeyGen) | hyperframes-heygen (SEMPRE) |
| "3D", "WebGL", "Three.js", "shaders", "componente 3D" | **threeui** | threeui (SEMPRE) |
| "scraping", "extração", "capturar site", "automatizar navegador" | **playwright** | MCP playwright (SEMPRE) |
| "pesquisar", "web search", "documentação", "docs" | **tavily** | MCP tavily (SEMPRE) |
| "pesquisar", "web search", "documentação", "docs" | **context7** | MCP context7 (SEMPRE) |
| "fotos", "imagens", "gerar visual" | **strix** | MCP strix (SEMPRE) |
| "análise código", "performance", "security" | **21st** | MCP 21st (SEMPRE) |
| "dependências", "grafo", "relacionamento" | **graphify** | MCP graphify (SEMPRE) |
| "design", "figma", "tokens" | **figma** | MCP figma (SEMPRE) |
| "API", "endpoint", "REST" | senior-backend | alirezarezvani-skills |
| "revisar código" | code-review | mattpocock-skills |
| "planejar", "arquitetura" | replica-architect, codebase-design | replica-skill, mattpocock |
| "melhorar", "refatorar" | karpathy-guidelines, implement | agents |
| "questionar", "validar ideia" | grilling | mattpocock-skills |
| "documentação", "libs", "framework" | context7-mcp | context7 |
| "skill", "encontrar skill" | find-skills, skillpedia | vercel-skills, agents |
| "acessibilidade", "a11y", "responsivo" | impeccable (audit) | impeccable |
| "cor", "palette", "tipografia", "fonte" | impeccable (colorize, typeset) | impeccable |
| "onboarding", "empty state", "primeiro uso" | impeccable (onboard) | impeccable |
| "erro", "edge case", "i18n" | impeccable (harden) | impeccable |

### 3. Buscar Skills Automaticamente

**Prioridade de busca (executar em ordem):**

1. **Skills locais instaladas** (`C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\`)
   - Verificar se já existe
   - Se sim, usar imediatamente
   - Se não, continuar busca

2. **Repositórios clonados** (`claude/`)
   ```bash
   # Buscar em paralelo
   - claude/mattpocock-skills/skills/
   - claude/alirezarezvani-skills/
   - claude/emilkowalski-skills/skills/
   - claude/OpenMontage/.agents/skills/
   - claude/vercel-skills/skills/
   - claude/context7/skills/
   ```

3. **Skillpedia** (https://www.useskillpedia.com/pt/)
   - Buscar por keyword da requisição
   - Pegar top 3 resultados mais relevantes
   - Extrair SKILL.md ou instruções

4. **GitHub raw search**
   ```
   site:github.com "SKILL.md" [keyword da requisição]
   ```

### 4. Instalação Automática (SEM PERGUNTAR)

Quando skill relevante encontrada:

```bash
# 1. Copiar para projeto
Copy-Item -Path [skill-source] -Destination "agents\[skill-name].md" -Force

# 2. Copiar para OpenCode
Copy-Item -Path [skill-source] -Destination "C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\skills\[skill-name].md" -Force

# 3. Se for repositório completo, clonar
git clone [repo-url] "claude\[repo-name]"
```

**IMPORTANTE: Não avisar, não pedir permissão. Instalar e usar.**

### 5. Aplicação Imediata

Após instalação:
1. Ler conteúdo da skill
2. Aplicar diretrizes da skill na resposta
3. Mencionar brevemente no final: "✓ Usando skill [nome]"

## Regras de Comportamento

### ✅ SEMPRE FAZER

- Analisar TODA requisição do usuário
- Buscar skills mesmo que não seja explicitamente pedido
- Instalar automaticamente quando encontrar match
- Aplicar a skill imediatamente na resposta
- Manter skills em ambas pastas (agents/ e OpenCode/)
- Priorizar skills especializadas sobre respostas genéricas

### ❌ NUNCA FAZER

- Perguntar se pode buscar/instalar skill
- Esperar usuário pedir explicitamente por skill
- Responder sem verificar se existe skill relevante
- Avisar antes de instalar (só mencionar depois, brevemente)
- Ignorar skills já instaladas nos repositórios clonados
- Usar conhecimento geral se skill especializada existe

## Workflow Completo (Toda Requisição)

```
Requisição do usuário
    ↓
[1] Extrair: domínio + tarefa + ferramentas
    ↓
[2] Mapear skills necessárias (tabela acima)
    ↓
[3] Skill já instalada?
    ├─ SIM → [5] Usar imediatamente
    └─ NÃO → [4] Buscar + Instalar automaticamente
              ├─ Repos clonados
              ├─ Skillpedia
              └─ GitHub
                  ↓
              Copy para agents/ e OpenCode/
                  ↓
              [5] Aplicar skill na resposta
                  ↓
              Responder ao usuário + "✓ Usando skill X"
```

## Manutenção Automática

### Atualização de Skills

A cada 50 requisições ou semanalmente:
```bash
# Atualizar repos clonados
cd claude/[repo-name]
git pull origin main

# Re-copiar skills atualizadas
Copy-Item -Path "claude\*/skills\**\SKILL.md" -Destination "agents\" -Force
```

### Limpeza

- Manter todas skills (não deletar)
- Log de skills usadas em `agents/skill-usage.log`
- Skills não usadas em 30 dias: mover para `agents/archived/`

## Exemplos de Detecção Automática

### Exemplo 1: Requisição de Interface
```
Usuário: "Crie um botão animado em React"

[Auto-detecção]
- Domínio: React, Frontend
- Tarefa: criar componente, animar
- Skills necessárias: senior-frontend, animate

[Ação automática]
1. Buscar "animate" em emilkowalski-skills ✓
2. Copiar para agents/animate.md
3. Copiar para OpenCode/.agents/skills/
4. Aplicar padrões da skill na resposta

[Resposta]
[...implementação do botão com padrões de animate...]
✓ Usando skills: animate, senior-frontend
```

### Exemplo 2: Requisição de API
```
Usuário: "Preciso de um endpoint REST para usuários"

[Auto-detecção]
- Domínio: Backend, API
- Tarefa: criar endpoint
- Skills: senior-backend, tdd

[Ação automática]
1. Buscar em alirezarezvani-skills/engineering-team/skills/senior-backend/
2. Instalar automaticamente
3. Aplicar TDD workflow

[Resposta]
[...implementação com testes primeiro...]
✓ Usando skills: senior-backend, tdd
```

### Exemplo 3: Sem Skill Específica
```
Usuário: "Como otimizar SEO do meu site?"

[Auto-detecção]
- Domínio: Marketing, SEO
- Skills locais: nenhuma
- Buscar Skillpedia: "SEO"

[Ação automática]
1. Acessar https://www.useskillpedia.com/pt/skills/?q=SEO
2. Extrair skill "seo-audit"
3. Criar agents/seo-audit.md com conteúdo
4. Instalar em OpenCode
5. Aplicar

[Resposta]
[...auditoria SEO estruturada...]
✓ Usando skill: seo-audit (nova, instalada do Skillpedia)
```

## Integração com Outras Skills

### Com task-observer
```
Quando task-observer detecta padrão repetitivo:
→ auto-skill-discovery busca skill existente
→ Se não existe, sugerir criação de nova skill
→ Instalar automaticamente
```

### Com find-skills
```
find-skills é backup manual
auto-skill-discovery é a camada automática padrão
```

### Com skillpedia
```
skillpedia fornece catálogo
auto-skill-discovery faz busca e instalação
```

## Configuração de Diretórios

```
Projeto:
  agents/              ← Skills markdown individuais
  claude/              ← Repositórios completos clonados
    ├─ mattpocock-skills/
    ├─ alirezarezvani-skills/
    ├─ emilkowalski-skills/
    └─ [outros]/

OpenCode Global:
  C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\
    ├─ skills/         ← Skills markdown
    ├─ [repos]/        ← Repositórios completos
    └─ skill-usage.log ← Log de uso
```

## Métricas

Manter em `agents/skill-metrics.json`:
```json
{
  "total_requests": 0,
  "skills_applied": 0,
  "auto_installed": 0,
  "sources": {
    "local": 0,
    "skillpedia": 0,
    "github": 0
  },
  "most_used": []
}
```

---

**LEMBRETE CRÍTICO: Esta skill NÃO requer ativação manual. Ela monitora TODA requisição e age proativamente. O usuário NÃO deve pedir por skills - o sistema detecta e instala automaticamente.**
