#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const tests = [
  {
    name: 'AISA',
    check: () => spawn('node', ['-e', 'console.log("AISA test")'])
  },
  {
    name: 'Playwright',
    check: () => spawn('npx', ['playwright', '--version'])
  },
  {
    name: 'Chrome MCP',
    check: () => spawn('npx', ['@modelcontextprotocol/server-chrome', '--help'])
  }
];

let passed = 0;
let failed = 0;

async function runTest(test) {
  return new Promise((resolve) => {
    console.log(`\n📦 Testando ${test.name}...`);
    
    const child = test.check();
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${test.name} funcionando`);
        passed++;
        resolve(true);
      } else {
        console.log(`❌ ${test.name} falhou`);
        if (stderr) console.log(`   Erro: ${stderr}`);
        failed++;
        resolve(false);
      }
    });
  });
}

async function runAllTests() {
  console.log('🚀 Iniciando testes de MCPs...\n');
  
  for (const test of tests) {
    await runTest(test);
  }
  
  console.log(`\n📊 Resultado: ${passed}✅ / ${failed}❌`);
  process.exit(failed > 0 ? 1 : 0);
}

runAllTests();
