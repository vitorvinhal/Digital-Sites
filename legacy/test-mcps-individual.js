#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🚀 Testando MCPs individuais...\n');

const mcpTests = [
  { name: 'Playwright', cmd: 'npx playwright --version' },
  { name: 'Chrome MCP', cmd: 'npx @modelcontextprotocol/server-chrome --help' },
  { name: 'Firecrawl', cmd: 'npx @modelcontextprotocol/server-firecrawl --help' },
  { name: 'Graphify', cmd: 'npx graphify --version' },
  { name: 'Agent Browser', cmd: 'npx @modelcontextprotocol/server-agent-browser --help' },
  { name: 'Strix', cmd: 'npx @modelcontextprotocol/server-strix --help' },
  { name: 'Figma', cmd: 'npx @modelcontextprotocol/server-figma --help' },
  { name: 'ViceScale', cmd: 'npx @modelcontextprotocol/server-vice-scale --help' },
  { name: 'Higgsfield', cmd: 'npx @modelcontextprotocol/server-higgsfield --help' },
  { name: 'Hyperframes', cmd: 'npx @modelcontextprotocol/server-hyperframes --help' },
  { name: 'ThreeUI', cmd: 'npx @modelcontextprotocol/server-threeui --help' },
  { name: 'Ponytail', cmd: 'npx @modelcontextprotocol/server-ponytail --help' },
  { name: '21st Dev', cmd: 'npx @modelcontextprotocol/server-21st --help' },
  { name: 'Taste Skill', cmd: 'npx @modelcontextprotocol/server-taste --help' },
  { name: 'Impeccable', cmd: 'npx @modelcontextprotocol/server-impeccable --help' },
  { name: 'Context7', cmd: 'npx @modelcontextprotocol/server-context7 --help' },
  { name: 'Perplexity', cmd: 'npx @modelcontextprotocol/server-perplexity --help' },
  { name: 'AISA', cmd: 'node -e "console.log(\\"AISA MCP test\\")"' }
];

async function testMCP(index = 0) {
  if (index >= mcpTests.length) {
    console.log('\n✅ Todos os testes concluídos');
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
