# MCP Setup Guide

## MCPs Configurados e Funcionando

### ✅ Ativos (Sem Chave)
- **Playwright** - Automação de navegador
- **Graphify** - Análise de código com knowledge graph
- **Chrome MCP** - Integração com Chrome DevTools

### ✅ Ativos (Chave Configurada no config.json)
- **AISA** - Core LLM Gateway (key já configurada)

### 📋 Pendentes (API Key necessária)

| MCP | Chave | Como Obter |
|-----|-------|------------|
| **Figma** | `FIGMA_TOKEN` | [Figma API Tokens](https://www.figma.com/developers/api#access-tokens) |
| **Tavily** | `TAVILY_API_KEY` | [Tavily Dashboard](https://app.tavily.com/home) (grátis) |
| **Impeccable** | `IMPECCABLE_API_KEY` | [Impeccable Console](https://mcp.impeccable.ai) |
| **Firecrawl** | `FIRECRAWL_API_KEY` | [Firecrawl Dashboard](https://www.firecrawl.dev) |
| **Hyperframes** | `HYPERFRAMES_API_KEY` | [Hyperframes Platform](https://mcp.hyperframes.ai) |
| **Strix** | `STRIX_API_KEY` | [Strix Platform](https://app.strix.ai) |
| **ViceScale** | `VS_API_KEY` | [ViceScale Console](https://mcp.verscale.com) |
| **Higgsfield** | `HIGGSFIELD_API_KEY` | [Higgsfield.ai](https://api.higgsfield.ai) |
| **Ponytail** | `PONYTAIL_API_KEY` | [Ponytail.ai](https://mcp.ponytail.ai) |
| **ThreeUI** | `THREEUI_API_KEY` | [ThreeUI](https://mcp.threeui.com) |
| **21st.dev** | `ST_21ST_API_KEY` | [21st.dev Console](https://mcp.21st.dev) |
| **Taste Skill** | `TASTE_API_KEY` | [Taste Skill](https://mcp.tasteskill.com) |
| **Context7** | `CONTEXT7_API_KEY` | [Context7](https://mcp.context7.ai) |

## Configuração

1. Copie `.env.mcp.example` para `.env.mcp`
2. Preencha as chaves reais
3. Reinicie o OpenCode

## Teste

```bash
node test-mcps-configured.js
```

## Arquivos Criados

- `.opencode/mcp.json` - Configuração do projeto
- `.env.mcp.example` - Template de variáveis
- `.env.mcp` - Variáveis reais (preencher)
