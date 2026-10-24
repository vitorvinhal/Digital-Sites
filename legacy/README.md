# legacy/ — scripts órfãos do projeto

Movidos da raiz em 24/10/26 por não serem referenciados por nenhum config do
OpenCode. **Nada aqui é executado pelo sistema.** Mantidos apenas por histórico.

| Arquivo | Motivo da aposentadoria |
|---|---|
| `start-mcp-servers.js` | Tenta subir MCPs nas portas 3001-3006, mas `mcp-servers.js` não tem `listen()` — é MCP **stdio**, então `PORT` é ignorado e nunca sobe nada. |
| `setup-mcps.js` | Instala pacotes npm que não existem (`@mcp-perplexity/server`, `@figma/mcp-server`, `@impeccable/mcp-server`...). |
| `validate-mcp.js`, `validate-mcps-full.js` | Validação antiga; o teste real hoje é o handshake `initialize` de cada servidor definido em `~/.config/opencode/opencode.json`. |
| `test-mcps.js`, `test-mcps-configured.js`, `test-mcps-individual.js`, `test-all-mcps.js` | Scripts de teste duplicados, nenhum chamado por script/config. |
| `opencode-mcp-formato-claude.json` (era `.opencode/mcp.json`) | Formato `mcpServers` do Claude Code; o OpenCode ignora esse arquivo. O `context7` já está configurado globalmente. |

**Servidores que continuam ATIVOS** (não mover): `mcp-servers.js` e
`mcp-wrapper.js` — são chamados pelo `opencode.json` global para os MCPs
`aisa`, `strix` e `higgsfield`.

Para reativar algo daqui, copie de volta para a raiz e registre no
`~/.config/opencode/opencode.json` sob `mcp`.
