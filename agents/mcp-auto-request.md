---
name: mcp-auto-request
description: SEMPRE ATIVA. Detecta automaticamente quando um MCP (Model Context Protocol) é necessário, requisita o recurso e aplica automaticamente. Não pede permissão, age proativamente. Ativo para: busca de documentação, pesquisa web, renderização de HTML, automação de browser, análise de código.
priority: critical
auto-activate: true
---

# MCP Auto-Request - Requisição Automática de MCPs

**REGRA: Esta skill ativa automaticamente quando qualquer MCP pode ser útil.**

## MCPs Disponíveis (do config.json)

| MCP | Uso Principal | Trigger |
|-----|--------------|---------|
| **playwright** | Automação de browser | qualquer interação web, testes, capturas |
| **chrome** | Browser automation | visualização de páginas, interação DOM |
| **tavily** | Web search + extract | pesquisa web, extração de conteúdo |
| **figma** | Figma integration | design files, components, tokens |
| **firecrawl** | Web scraping | scraping de sites, extração |
| **strix** | Pentest autônomo | testes de segurança, vulnerabilidades |
| **context7** | Documentação de libs | APIs, frameworks, bibliotecas |
| **21st** | Code search/analysis | Análise de código, busca em repo |
| **graphify** | Code graph analysis | Análise de grafos de código |

## Detecção Automática

### Playwright (Browser Automation)
**Ativa quando:**
- "browser", "automation", "capturar página"
- "testar website", "ver página", "interagir com site"
- "screenshot", "captura", "automatizar"
- "playwright", "headless"

**Exemplo:**
```
User: "Captura o conteúdo desta página"
→ MCP auto: playwright
→ Ação: navegar, capturar, extrair
```

### Tavily (Web Search)
**Ativa quando:**
- "pesquisar", "google", "busca", "find"
- "documentação", "docs", "API"
- "informação sobre", "pesquise para mim"
- "tavily", "search"

**Exemplo:**
```
User: "Pesquise sobre React 19 features"
→ MCP auto: tavily
→ Ação: buscar na web, extrair conteúdo
```

### Context7 (Documentação)
**Ativa quando:**
- "React", "Next.js", "Vue", "Svelte", "Prisma"
- "API", "documentação", "examples"
- "como usar [lib]", "doc de [framework]"
- "context7"

**Exemplo:**
```
User: "Como usar Prisma migrations?"
→ MCP auto: context7
→ Ação: buscar docs Prisma, retornar examples
```

### Firecrawl (Web Scraping)
**Ativa quando:**
- "scraping", "extrair dados", "pegar conteúdo"
- "site completo", "páginas inteiras"
- "coletar", "raspar"

**Exemplo:**
```
User: "Extrai todos os produtos desta loja"
→ MCP auto: firecrawl
→ Ação: scraper com XPath/CSS selectors
```

### Figma (Design)
**Ativa quando:**
- "Figma", "design file", "components"
- "exportar", "tokens", "design system"
- "figma", "figma design"

**Exemplo:**
```
User: "Traga os tokens de design do Figma"
→ MCP auto: figma
→ Ação: acessar arquivo, extrair tokens
```

### Strix (Image Generation)
**Ativa quando:**
- "gerar imagem", "AI image", "visual"
- "criar imagem", "photo", "ilustração"

**Exemplo:**
```
User: "Gere uma imagem para o hero"
→ MCP auto: strix
→ Ação: gerar imagem com prompt
```

### 21st (Code Search)
**Ativa quando:**
- "analisar código", "code analysis"
- "busca em repo", "code search"
- "review", "inspector", "análise técnica"

**Exemplo:**
```
User: "Analisa a performance deste código"
→ MCP auto: 21st
→ Ação: análise estática, metrics
```

### Graphify (Code Graph)
**Ativa quando:**
- "dependências", "relationship", "graph"
- "análise de grafo", "code structure"
- "dependency graph", "call graph"

**Exemplo:**
```
User: "Cria gráfico de dependências"
→ MCP auto: graphify
→ Ação: construir grafo de código
```

## Workflow Automático

```
Requisição do usuário
    ↓
[DETEÇÃO] Verifica se MCP pode ajudar
    ├─ Web page/automation? → playwright
    ├─ Web search/info? → tavily
    ├─ Docs/API? → context7
    ├─ Scraping? → firecrawl
    ├─ Design/Figma? → figma
    ├─ Image? → strix
    ├─ Code analysis? → 21st
    ├─ Code graph? → graphify
    └─ Nenhum MCP necessário? → skills existentes
    ↓
[REQUISIÇÃO] MCP é automaticamente requisitado
    ↓
[APLICAÇÃO] Resultado MCP é integrado na resposta
    ↓
[OUTPUT] Resposta completa com MCP data
```

## Prioridade de Requisição

**Quando múltiplos MCPs aplicáveis:**
1. **Playwright** (interação web direta)
2. **Tavily** (pesquisa web geral)
3. **Context7** (docs específicas de lib)
4. **Firecrawl** (scraping estruturado)
5. **Outros MCPs** (específicos)

## Sempre Ativo

Esta skill **nunca precisa de ativação manual**. O agente:
- ✅ Detecta quando MCP pode ajudar
- ✅ Requisita o MCP automaticamente
- ✅ Usa o resultado na resposta
- ✅ Não pede permissão
- ✅ Não avisa previamente (só menciona no final)

## Exemplos Completos

### Exemplo 1: Web Scraping
```
User: "Extrai todos os preços desta loja"

[MCP AUTO] firecrawl detectado
→ scrape do site
→ extração de preços com XPath/CSS
→ limpeza e formatação

Output:
[lista de preços formatada]
✓ MCP: firecrawl
```

### Exemplo 2: Documentation Lookup
```
User: "Como fazer API request com Supabase?"

[MCP AUTO] context7 detectado
→ query docs Supabase
→ examples de API
→ snippet de código

Output:
[documentation + example code]
✓ MCP: context7
```

### Exemplo 3: Browser Automation
```
User: "Abre o site e clica no botão de login"

[MCP AUTO] playwright detectado
→ launch browser
→ navigate to URL
→ find element by selector
→ click action
→ screenshot result

Output:
[screenshot do resultado + log]
✓ MCP: playwright
```

### Exemplo 4: Code Analysis
```
User: "Analisa se este código tem SQL injection"

[MCP AUTO] 21st detectado
→ static analysis
→ check SQL patterns
→ security audit

Output:
[security report + fixes]
✓ MCP: 21st
```

## Integrar com Skills

**Exemplo completo:**
```
User: "Cria landing page e testa no browser"

[TASTE-SKILL] Art direction
→ Inventário
→ Draw directions
→ Build HTML/CSS

[PONYTAIL] Código mínimo
→ structure limpa

[PLAYWRIGHT] Auto-requisitado
→ preview da landing
→ testes de interação
→ screenshot de validação

Output:
[landing page + screenshot test]
✓ Skills: taste-skill, ponytail
✓ MCP: playwright
```

## Checklist de Implementação

Antes de resposta, verificar se MCP pode ajudar:

- [ ] **Web page?** → Playwright/Chrome
- [ ] **Search/info?** → Tavily
- [ ] **Docs/API?** → Context7
- [ ] **Scraping?** → Firecrawl
- [ ] **Design?** → Figma
- [ ] **Image?** → Strix
- [ ] **Code analysis?** → 21st
- [ ] **Graph?** → Graphify

## Notificação

Sempre mencionar no final:
```
✓ Skills: [skills]
✓ MCPs: [mcp usado]
```

---

**LEMBRETE CRÍTICO: MCPs são automaticamente requisitados QUANDO ÚTEIS. Não pedir permissão. Usar dados MCP diretamente na resposta.**
