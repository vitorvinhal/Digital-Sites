#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredKeys = [
  'AISA_API_KEY',
  'VS_API_KEY',
  'HIGGSFIELD_API_KEY',
  'PERPLEXITY_API_KEY',
  'FIRECRAWL_API_KEY',
  'HYPERFRAMES_API_KEY',
  'GRAPHIFY_API_KEY',
  'PONYTAIL_API_KEY',
  'THREEUI_API_KEY',
  'ST_21ST_API_KEY',
  'TASTE_API_KEY',
  'FIGMA_TOKEN',
  'IMPECCABLE_API_KEY'
];

const envPath = path.join(__dirname, '.env.mcp');
let hasErrors = false;

console.log('Validando configuração MCP...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env.mcp não encontrado');
  console.log('   Copie .env.mcp.example para .env.mcp e preencha as chaves\n');
  hasErrors = true;
} else {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  requiredKeys.forEach(key => {
    const regex = new RegExp(`${key}=`);
    if (!regex.test(envContent)) {
      console.error(`❌ ${key} não definida`);
      hasErrors = true;
    }
  });
}

if (!hasErrors) {
  console.log('✅ Todas as chaves MCP estão configuradas');
} else {
  console.log('\nConsulte .env.mcp.example para preencher as variáveis');
  process.exit(1);
}
