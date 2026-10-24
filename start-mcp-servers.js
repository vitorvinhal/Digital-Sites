#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const servers = [
  { name: 'tavily', port: 3001 },
  { name: 'firecrawl', port: 3002 },
  { name: 'strix', port: 3003 },
  { name: 'higgsfield', port: 3004 },
  { name: '21st', port: 3005 },
  { name: 'context7', port: 3006 }
];

console.log('🚀 Iniciando todos os servidores MCP...');

servers.forEach(server => {
  const child = spawn(
    'node',
    [path.join(__dirname, 'mcp-servers.js'), server.name],
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: server.port.toString()
      }
    }
  );

  child.on('error', (err) => {
    console.error(`❌ Falha ao iniciar ${server.name}:`, err);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${server.name} saiu com código ${code}`);
    }
  });

  console.log(`✅ ${server.name} iniciado na porta ${server.port}`);
});

console.log('\nTodos os servidores MCP estão rodando em segundo plano.');
console.log('Use CTRL+C para parar todos os servidores.');
