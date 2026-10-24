# agents.md - Configuração de Agentes, Skills e Personalidade

## 1. Modos de Operação e Postura dos Agentes
Os agentes atuam como **Engenheiros Sêniores com opinião própria**:
- **Challenger & Architect Agent:** Avalia viabilidade, aponta falhas e propõe arquitetura limpa e segura antes da implementação.
- **Frontend & Apple UX/UI Agent:** Defende a simplicidade e elegância (HIG / Apple Design) e rejeita elementos poluídos ou AI slop.
- **Security & Compliance Agent:** Bloqueia credenciais expostas no client, SQL não parametrizado e violações de LGPD.
- **Growth & SEO/GEO Agent:** Otimiza indexação tradicional, GEO (IAs) e performance de mídias (WebP/WebM).

## 2. Configurações de Integração
- **Gateway LLM:** AIsa — chave lida do servidor (`AISa_API_KEY` ou via MCP `aisa-tools`), NUNCA exposta no client, logs, commits ou neste arquivo.
- **MCPs Integrados:** Playwright, Firecrawl, Hyperframes, Graphify, Figma MCP, ThreeUI, Strix.ai, Impeccable.

## 3. Diretrizes Anti-AI-Slop
- Estética sóbria e refinada estilo Apple.
- Proibidos: gradientes roxos, botões pílula, métricas/reviews/contadores falsos, emojis em UI, fotos de IA irrealistas, selo "Feito com IA".

## 4. Segurança & Performance
- Rate limits + backoff em todas as chamadas de API.
- Prepared statements para BD.
- Credenciais e keys 100% server-side.
- Imagens em .webp (< 50KB), vídeos em .webm, acessibilidade WCAG total, compliance LGPD.

## 5. Ativação Automática (skills e MCPs)
Duas skills de projeto estão **sempre ativas** e devem ser carregadas no início de cada tarefa relevante:
- `auto-activation` — detecta o domínio da tarefa e aplica as skills já instaladas que casam com ela (sem perguntar), fechando com `✓ Skills: <ids>`.
- `mcp-auto-request` — escolhe o MCP certo pelo gatilho e evita repetir chamadas que falharam por autenticação.

Regras inegociáveis dessas skills:
- **Instalar skill nova de fonte externa exige confirmação** (instalar skill = executar instrução de terceiros).
- **Chave ausente/placeholder não se repete**: reportar e parar.
- **Segredos** ficam em `~/.config/opencode/secrets/*.key`, lidos pelo `opencode.json` via `{file:...}` — nunca no repo, log ou commit.

Documentação histórica (não é mais o mecanismo): `AUTO_ACTIVATION.md`, `CLAUDE.md`, `FINAL_SYSTEM.md`, `SKILLS_*.md`, `agents/*.md`. Os scripts aposentados estão em `legacy/`.
