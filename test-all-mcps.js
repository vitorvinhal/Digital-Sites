#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🧪 Testando todos os MCPs...\n');

const mcpTests = [
  { name: 'Playwright', cmd: 'npx playwright --version' },
  { name: 'Graphify CLI', cmd: 'graphify --version' },
  { name: 'Node.js', cmd: 'node --version' },
  { name: 'npm', cmd: 'npm --version' }
];

async function testMCP(index = 0) {
  if (index >= mcpTests.length) {
    console.log('\n✅ Todos os MCPs testados!');
    return;
  }
  
  const mcp = mcpTests[index];
  
  console.log(`\n📦 Testando ${mcp.name}...`);
  
  exec(mcp.cmd, { timeout: 30000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ ${mcp.name} falhou: ${error.message}`);
    } else {
      console.log(`✅ ${mcp.name} funcionando`);
      if (stdout.trim()) console.log(`   Output: ${stdout.split('\n')[0]}`);
    }
    
    testMCP(index + 1);
  });
}

testMCP();
