// Wrapper para MCP servers locais — evita problema de path com espaços no Windows
// Usage: node mcp-wrapper.js <server-name>
// Deve ser chamado com command="node" e args=["<caminho>\mcp-wrapper.js", "server-name"]

const { spawn } = require('child_process');
const path = require('path');

const serverName = process.argv[2];
if (!serverName) {
  console.error('Usage: node mcp-wrapper.js <server-name>');
  process.exit(1);
}

// Path absoluto para mcp-servers.js no mesmo diretório
const scriptPath = path.join(__dirname, 'mcp-servers.js');

// Passa todos os args do wrapper para o script real
const child = spawn(process.execPath, [scriptPath, serverName, ...process.argv.slice(3)], {
  stdio: 'inherit',
  env: { ...process.env },
});

child.on('close', (code) => process.exit(code ?? 0));
child.on('error', (err) => {
  console.error('Erro ao iniciar MCP:', err.message);
  process.exit(1);
});

// Encerra a child se o wrapper recebe SIGHUP/SIGTERM
process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));
