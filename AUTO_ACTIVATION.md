# Auto-Activation Rules - OpenCode

**TODAS as skills instaladas são ativadas AUTOMATICAMENTE sem necessidade de pedido explícito.**

## Sistema de Detecção Automática

O agente DEVE analisar TODA requisição e aplicar skills relevantes automaticamente.

## Skills de Ativação Prioritária (SEMPRE)

### 1. **Impeccable** - Design & UI (CRÍTICO)
**Ativa em:** QUALQUER trabalho de frontend/UI/design
- Componentes React/Vue/Svelte
- Landing pages, sites
- Dashboards, formulários
- Refinamento visual
- Animações de interface
- Layout, tipografia, cores
- Acessibilidade

**Comandos automáticos:**
- `craft` - Novo trabalho de design
- `polish` - Refinamento final
- `audit` - Checagem técnica (a11y, perf)
- `critique` - Revisão de UX
- `animate` - Adicionar motion
- `bolder/quieter` - Ajustar intensidade
- `harden` - Casos de erro, i18n

**Localização:** `C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\skills\impeccable\`

### 2. **Auto-Skill-Discovery** - Meta-Skill (SEMPRE ATIVA)
**Ativa em:** TODA requisição (before any response)
- Detecta necessidades de skills
- Busca e instala automaticamente
- Aplica sem pedir permissão

### 3. **Skillpedia Integration**
**Ativa em:** Skills não encontradas localmente
- Busca automática em 6.349+ skills
- Instalação imediata
- Aplicação direta

## Mapeamento de Ativação Automática

```yaml
Frontend/UI:
  trigger: ["componente", "interface", "UI", "design", "landing", "site"]
  skills: [impeccable, senior-frontend, animate]
  priority: CRITICAL

Backend/API:
  trigger: ["API", "endpoint", "REST", "servidor", "backend"]
  skills: [senior-backend, database-design]
  
Testing:
  trigger: ["teste", "testar", "TDD", "coverage"]
  skills: [tdd, code-review]
  
Animation:
  trigger: ["animar", "motion", "transição", "animação"]
  skills: [impeccable.animate, animate, framer-motion]
  
Database:
  trigger: ["banco de dados", "SQL", "schema", "migrations"]
  skills: [database-design, senior-backend]
  
SEO/Marketing:
  trigger: ["SEO", "otimizar", "marketing", "analytics"]
  skills: [seo-audit, programmatic-seo]
  
Video:
  trigger: ["vídeo", "animação HTML", "motion graphics"]
  skills: [hyperframes, OpenMontage]
  
Code Review:
  trigger: ["revisar", "review", "feedback código"]
  skills: [code-review, karpathy-guidelines]
  
Architecture:
  trigger: ["arquitetura", "planejar", "estrutura"]
  skills: [replica-architect, codebase-design]
  
Refactoring:
  trigger: ["refatorar", "melhorar código", "limpar"]
  skills: [karpathy-guidelines, implement]
  
Planning:
  trigger: ["questionar", "validar", "grilling"]
  skills: [grilling, task-observer]
  
Documentation:
  trigger: ["documentação", "docs", "lib", "framework"]
  skills: [context7-mcp, find-skills]
```

## Workflow Automático

```
Requisição do usuário
    ↓
[PRÉ-PROCESSAMENTO]
    ├─ Auto-skill-discovery analisa
    ├─ Detecta domínios/tarefas
    └─ Identifica skills necessárias
    ↓
[ATIVAÇÃO AUTOMÁTICA]
    ├─ Skills já instaladas → Aplicar imediatamente
    ├─ Skills não instaladas → Buscar + Instalar + Aplicar
    └─ Skills especiais (Impeccable) → SEMPRE ativar em UI
    ↓
[EXECUÇÃO]
    ├─ Aplicar padrões das skills
    ├─ Seguir guidelines específicas
    └─ Gerar resposta
    ↓
[NOTIFICAÇÃO]
    └─ Mencionar brevemente: "✓ Skills: impeccable, senior-frontend"
```

## Regras de Comportamento

### ✅ SEMPRE FAZER

1. **Ativar Impeccable automaticamente em qualquer UI**
   - Não perguntar
   - Aplicar padrões diretamente
   - Usar comandos relevantes (craft, polish, audit, etc.)

2. **Buscar skills proativamente**
   - Antes de responder com conhecimento geral
   - Verificar Skillpedia/repos locais
   - Instalar automaticamente se encontrado match

3. **Combinar skills quando apropriado**
   - UI + animação → impeccable + animate
   - Backend + testes → senior-backend + tdd
   - Landing → impeccable + design-taste-frontend

4. **Mencionar skills aplicadas**
   - Final da resposta: "✓ Skills: [lista]"
   - Manter conciso
   - Indicar se foi instalada agora: "(nova)"

### ❌ NUNCA FAZER

1. Perguntar "Posso usar a skill X?"
2. Esperar pedido explícito do usuário
3. Responder com conhecimento geral quando skill existe
4. Ignorar Impeccable em trabalho de UI
5. Avisar ANTES de instalar skill (só mencionar depois)

## Localizações

**Skills instaladas:**
- Global: `C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\`
- Projeto: `C:\Users\Administrator\Documents\Digital Sites\agents\`
- Repositórios: `C:\Users\Administrator\Documents\Digital Sites\claude\`

**Total disponível:**
- 1162+ skills locais
- 6349 skills Skillpedia
- ∞ skills GitHub

## Exemplos de Ativação Automática

### Exemplo 1: UI Request
```
User: "Crie um botão de login"

[Auto-detection]
- Domínio: Frontend, UI
- Ativação: impeccable + senior-frontend + animate

[Execution]
- Aplicar craft-floor.md (qualidade mínima)
- Seguir padrões de componente
- Adicionar micro-interactions
- Garantir a11y

[Output]
[...código do botão seguindo Impeccable...]
✓ Skills: impeccable, senior-frontend
```

### Exemplo 2: Landing Page
```
User: "Faça uma landing page para meu SaaS"

[Auto-detection]
- Domínio: Frontend, Marketing
- Mode: Persuade
- Ativação: impeccable (craft) + design-taste-frontend

[Execution]
- Rodar impeccable init (capturar contexto produto)
- Aplicar modo Persuade (ganhar atenção/ação)
- Seguir anti-patterns (não usar Inter, cards aninhados, etc.)
- Criar hero + features + CTA

[Output]
[...landing page completa...]
✓ Skills: impeccable (craft, persuade mode), design-taste-frontend
```

### Exemplo 3: API Backend
```
User: "Criar endpoint de usuários"

[Auto-detection]
- Domínio: Backend, API
- Ativação: senior-backend + tdd

[Execution]
- Escrever testes primeiro (TDD)
- Implementar endpoint
- Validação de dados
- Error handling

[Output]
[...testes + implementação...]
✓ Skills: senior-backend, tdd
```

## Prioridades de Conflito

Quando múltiplas skills se aplicam:
1. **Impeccable** sempre vence em UI/design
2. **TDD** sempre vence em implementação
3. **Karpathy-guidelines** sempre aplicado em código
4. Skills específicas > skills gerais

## Atualização

Métricas em `skill-metrics.json` atualizadas automaticamente:
- Total de requisições
- Skills ativadas automaticamente
- Skills instaladas on-the-fly
- Taxa de ativação por categoria

---

**LEMBRETE CRÍTICO: O agente não precisa ser instruído. Este arquivo define comportamento padrão automático.**
