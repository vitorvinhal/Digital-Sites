# CLAUDE.md — Regras de Contexto para Agentes (Digital Sites)

> Este arquivo define regras operacionais obrigatórias para todos os agentes que atuam neste workspace. Carregue no início de **toda** tarefa.

---

## 1. Diretriz de Desenvolvimento — Skillpedia (Reutilização Antecipada)

**Regra inegociável:** Antes de escrever qualquer código, siga esta ordem de prioridade:

| Prioridade | Ação | Ferramentas |
|------------|------|-------------|
| 1️⃣ **Buscar Prontos** | Pesquise libs, pacotes, componentes, snippets prontos na web/npm/registries/stdlib | `websearch`, `context7`, `firecrawl`, `graphify`, `grep` |
| 2️⃣ **Adaptar/Combinar** | Ajuste a solução encontrada ao projeto (tokens, types, lint, convenções) | Edição direta |
| 3️⃣ **Escrever do Zero** | **Somente se busca genuína (2-3 min) nada encontrar** | Implementação limpa |

**Exemplos:**
- Validação CPF/CNPJ → `cpf-cnpj-validator`, `brazilian-values`, `zod` + regex testado
- Email/phone → `zod.email()`, `validator.js`, `phone-number`
- Datas → `date-fns`, `dayjs`, `Temporal` (stdlib)
- APIs (Stripe, Supabase, Vercel, GitHub) → SDKs oficiais
- Modais, dropdowns, tooltips → `@radix-ui/*`, shadcn/ui, Headless UI
- CSV/Excel → `papaparse`, `xlsx`, `csv-parse`
- Auth → `next-auth`, `clerk`, `lucia`, `better-auth`
- Rate limit → `@upstash/ratelimit`, `express-rate-limit`

**Anti-padrões proibidos:**
- ❌ "Vou escrever rapidinho, é simples"
- ❌ Não pesquisou porque "já sei fazer"
- ❌ Reimplementar utilitários triviais (`left-pad`, `debounce`, `classnames`)
- ❌ Wrapper de API sem checar SDK oficial
- ❌ Ignorar design system / componentes do projeto

**Métrica:** % de código que reutiliza soluções existentes > 70%.

---

## 2. Ativação Automática de Skills

Duas skills de projeto estão **sempre ativas** e devem ser carregadas no início de cada tarefa relevante:
- `auto-activation` — Detecta o domínio da tarefa e aplica as skills já instaladas que casam com ela (sem perguntar), fechando com `✓ Skills: <ids>`.
- `mcp-auto-request` — Escolhe o MCP certo pelo gatilho e evita repetir chamadas que falharam por autenticação.

**Skillpedia (`skillpedia`)** é carregada automaticamente via `auto-activation` em toda tarefa de desenvolvimento.

---

## 3. Segurança & Compliance (Não Negociáveis)

- **Credenciais/Keys 100% server-side** — Nunca no client, logs, commits, nem neste arquivo.
- **Gateway LLM:** AIsa — chave lida do servidor (`AISA_API_KEY` ou via MCP `aisa-tools`).
- **Prepared statements** para qualquer query SQL/NoSQL.
- **Rate limits + backoff** em todas as chamadas de API externas.
- **LGPD compliance** — Dados pessoais apenas com base legal, retenção mínima, direito ao esquecimento.
- **Segredos** em `~/.config/opencode/secrets/*.key`, lidos via `{file:...}` no `opencode.json`.

---

## 4. Diretrizes Anti-AI-Slop (UI/UX)

- Estética sóbria e refinada estilo Apple (HIG).
- **Proibidos:** gradientes roxos/artificiais, botões pílula genéricos, métricas/reviews/contadores falsos, emojis em UI, fotos de IA irrealistas, selo "Feito com IA".
- Acessibilidade WCAG 2.1 AA mínimo (contraste, foco, teclado, ARIA, leitores de tela).
- Imagens em `.webp` (< 50KB), vídeos em `.webm`.

---

## 5. MCPs Integrados

| MCP | Uso |
|-----|-----|
| `playwright` | Automação browser, testes E2E, screenshots |
| `firecrawl` | Web search, scrape, research, monitoring |
| `context7` | Docs atualizadas de libs/frameworks (React, Next.js, Prisma, etc.) |
| `graphify` | Análise de codebase indexado (symbols, calls, deps, tests) |
| `figma` | Design tokens, componentes, specs visuais |
| `strix` | Pentest autônomo, auditoria segurança, auto-fix |
| `21st` | Componentes shadcn/ui, bookmarks, media upload |

---

## 6. Padrões de Código

- **TypeScript strict** em todos os projetos novos.
- **ESLint + Prettier** configurados (respeite `.eslintrc`, `.prettierrc`).
- **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- **Testes:** Unit (Vitest/Jest), Integration (Playwright/MSW), E2E (Playwright).
- **Path aliases** configurados (`@/*`, `@components/*`, `@lib/*`, etc.).

---

## 7. Workflow de Release (via `release-readiness`)

1. Diagnóstico inicial do repo
2. Limpeza segura (sem apagar backups/dados sem confirmação)
3. Backup validado
4. Checklist de pré-deploy (build, testes, lint, typecheck, security audit)
5. Relatório final honesto de prontidão

---

## 8. Observabilidade (via `observability-setup`)

- Logging estruturado (JSON, níveis: debug/info/warn/error)
- Captura de erros não tratados (Sentry/equivalent)
- Alertas básicos para produção (health checks, error rate, latency p99)
- **Não basta escrever "monitorar" no relatório — configure o mecanismo real.**

---

## 9. Schema & Migrations (via `schema-migrations`)

- Toda mudança de schema/formato de dados = migration versionada + retrocompatível
- Crítico quando dados vivem em JSON/JSONB (blob único) — mudar sem migration quebra registros antigos silenciosamente
- Use SEMPRE que: "adicionar campo", "mudar estrutura", "renomear no banco", "alterar formato salvo"

---

## 10. Feature Flags (via `feature-flags`)

- Implemente rollout gradual para features arriscadas
- Use quando: "lançar aos poucos", "testar com subconjunto", "esconder até pronta", "reverter rápido se der problema"
- Nunca deploy tudo-ou-nada para funcionalidades de risco.

---

## 11. QA & Testing (via `qa-testing-playbook`)

Playbook geral para QUALQUER sistema:
- Segurança (IDOR, XSS, CSRF, auth bypass)
- Concorrência (race conditions, deadlocks)
- Resiliência (offline, rede instável, timeouts)
- Performance (memory leaks, bundle size, Core Web Vitals)
- Responsividade + Acessibilidade (WCAG)
- Gera scripts automatizados executáveis, adaptados à arquitetura real do repo.

---

## 12. Design System (via `design-system`)

Se `DESIGN.md` existir (padrão Google Design Tokens):
- **Token-only sourcing:** cores, tipografia, espaçamento, border-radius **apenas** via tokens do DESIGN.md
- Fluxo: `DESIGN.md` → `audit` (lint+fix) → propagar para código
- CLI: `audit`, `diff`, `export` (Tailwind/DTCG), `spec`, `migrate`, `init`, `audit-extensions`

---

## 13. Agentes & Personalidade

Atuam como **Engenheiros Sêniores com opinião própria**:
- **Challenger & Architect:** Viabilidade, falhas, arquitetura limpa/segura antes de implementar
- **Frontend & Apple UX/UI:** Simplicidade, elegância, rejeita AI slop
- **Security & Compliance:** Bloqueia credenciais client-side, SQL injection, LGPD
- **Growth & SEO/GEO:** Indexação tradicional + GEO (IAs) + performance mídias

---

## 14. Referências de Arquivos-Chave

| Arquivo | Propósito |
|---------|-----------|
| `agents.md` | Configuração de agents, skills, personalidade (fonte primária) |
| `DESIGN.md` | Design tokens (se projeto tiver UI) |
| `opencode.json` | Config OpenCode (models, permissions, MCPs, secrets refs) |
| `package.json` / `pyproject.toml` | Dependências e scripts |
| `tsconfig.json` | Config TypeScript |
| `.env.example` | Variáveis de ambiente necessárias (sem valores reais) |

---

> **Lembrete:** Este arquivo é lido no início de cada tarefa. Regras aqui são **obrigatórias**, não sugestões. Violação = retrabalho.