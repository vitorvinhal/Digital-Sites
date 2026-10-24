# Como Conectar MCPs no OpenCode

## Problema
MCPs configurados no `config.json` não aparecem automaticamente conectados.

## Solução

### MCPs precisam ser servidores ativos, não apenas URLs

1. **MCPs nativos do OpenCode** (já funcionam):
   - shadcn ✅ (conectado)
   - playwright (precisa ser iniciado)
   - chrome (precisa de extensão)
   - graphify (precisa ser iniciado como servidor)

2. **MCPs externos** (precisam de servidor rodando):
   - AISA, Tavily, Firecrawl, Strix, Context7, 21st.dev
   - Estes são **APIs REST**, não servidores MCP nativos do OpenCode

## Como Usar os MCPs Configurados

### Opção 1: Via Código (Fetch direto)
```javascript
// Exemplo: Tavily
const response = await fetch('https://mcp.tavily.com/mcp/?tavilyApiKey=...');
```

### Opção 2: Criar MCP Server Local
Transformar as APIs em servidores MCP que o OpenCode reconhece.

### Opção 3: Usar Skills
As skills já instaladas (Hyperframes, Impeccable, etc.) funcionam diretamente no OpenCode.

## Próximos Passos

Você quer:
1. Criar servidores MCP locais para as APIs?
2. Usar as APIs diretamente via fetch?
3. Focar apenas nas skills instaladas?
