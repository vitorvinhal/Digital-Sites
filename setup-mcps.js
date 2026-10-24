#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando MCPs restantes...\n');

const mcpSetup = [
  {
    name: 'AISA',
    check: () => fs.existsSync(path.join(__dirname, '.opencode', 'mcp.json')),
    setup: () => console.log('✅ AISA já configurado em .opencode/mcp.json')
  },
  {
    name: 'Graphify',
    check: () => true,
    setup: () => {
      console.log('📦 Instalando Graphify MCP server...');
      return new Promise((resolve) => {
        exec('npm install -g @sentropic/engram', { timeout: 60000 }, (error) => {
          if (error) {
            console.log(`⚠️  Graphify MCP: ${error.message}`);
          } else {
            console.log('✅ Graphify MCP instalado');
          }
          resolve();
        });
      });
    }
  },
  {
    name: 'Firecrawl',
    check: () => true,
    setup: () => {
      console.log('📦 Instalando Firecrawl MCP...');
      return new Promise((resolve) => {
        exec('npm install -g @mcp-firecrawl/server', { timeout: 60000 }, (error) => {
          if (error) {
            console.log('⚠️  Firecrawl MCP não encontrado no npm, usando API direta');
          } else {
            console.log('✅ Firecrawl MCP instalado');
          }
          resolve();
        });
      });
    }
  },
  {
    name: 'Perplexity',
    check: () => true,
    setup: () => {
      console.log('📦 Instalando Perplexity MCP...');
      return new Promise((resolve) => {
        exec('npm install -g @mcp-perplexity/server', { timeout: 60000 }, (error) => {
          if (error) {
            console.log('⚠️  Perplexity MCP não encontrado no npm');
          } else {
            console.log('✅ Perplexity MCP instalado');
          }
          resolve();
        });
      });
    }
  },
  {
    name: 'Figma',
    check: () => true,
    setup: () => {
      console.log('📦 Instalando Figma MCP...');
      return new Promise((resolve) => {
        exec('npm install -g @figma/mcp-server', { timeout: 60000 }, (error) => {
          if (error) {
            console.log('⚠️  Figma MCP não encontrado no npm');
          } else {
            console.log('✅ Figma MCP instalado');
          }
          resolve();
        });
      });
    }
  },
  {
    name: 'Impeccable',
    check: () => true,
    setup: () => {
      console.log('📦 Instalando Impeccable MCP...');
      return new Promise((resolve) => {
        exec('npm install -g @impeccable/mcp-server', { timeout: 60000 }, (error) => {
          if (error) {
            console.log('⚠️  Impeccable MCP não encontrado no npm');
          } else {
            console.log('✅ Impeccable MCP instalado');
          }
          resolve();
        });
      });
    }
  }
];

async function runSetup(index = 0) {
  if (index >= mcpSetup.length) {
    console.log('\n✅ Setup completo. Preencha as chaves em .env.mcp para ativar todos os serviços.');
    return;
  }
  
  const mcp = mcpSetup[index];
  
  console.log(`\n🔧 Configurando ${mcp.name}...`);
  
  try {
    await mcp.setup();
  } catch (err) {
    console.log(`❌ ${mcp.name} falhou: ${err.message}`);
  }
  
  runSetup(index + 1);
}

runSetup();
