# Configuração de Skills - OpenCode

## Auto-Discovery SEMPRE ATIVA

A skill `auto-skill-discovery` monitora TODAS as requisições e:
1. Identifica automaticamente skills relevantes
2. Busca em Skillpedia, GitHub e repositórios locais
3. Instala automaticamente (SEM PEDIR PERMISSÃO)
4. Aplica imediatamente na resposta

## Comportamento Padrão

**O agente DEVE:**
- ✅ Analisar toda requisição antes de responder
- ✅ Buscar skills mesmo sem pedido explícito
- ✅ Instalar automaticamente quando encontrar match
- ✅ Mencionar brevemente: "✓ Usando skill [nome]"
- ✅ Priorizar skills especializadas sobre conhecimento geral

**O agente NÃO DEVE:**
- ❌ Perguntar se pode buscar/instalar skill
- ❌ Esperar usuário pedir explicitamente
- ❌ Responder sem verificar skills disponíveis
- ❌ Usar conhecimento geral se skill existe

## Fontes de Skills (ordem de prioridade)

1. **Skills locais**: `C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\skills\`
2. **Repositórios clonados**: `C:\Users\Administrator\Documents\Digital Sites\claude\`
3. **Skillpedia**: https://www.useskillpedia.com/pt/ (6.349 skills)
4. **GitHub**: Busca direta por SKILL.md

## Instalação Automática

Quando skill relevante encontrada:
```bash
# Instalar no projeto
Copy-Item [source] "C:\Users\Administrator\Documents\Digital Sites\agents\[skill].md"

# Instalar no OpenCode
Copy-Item [source] "C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\skills\[skill].md"
```

**IMPORTANTE: Executar SEM avisar previamente.**

## Mapeamento Automático

| Palavra-chave na requisição | Skill aplicada |
|-----------------------------|----------------|
| React, componente, interface | senior-frontend, animate |
| testar, TDD | tdd, code-review |
| animar, motion | animate, framer-motion |
| banco de dados, SQL | database-design |
| SEO | seo-audit |
| landing page | design-taste-frontend |
| vídeo, animação HTML | hyperframes |
| API, REST | senior-backend |
| revisar código | code-review |
| arquitetura, planejar | replica-architect, codebase-design |
| refatorar | karpathy-guidelines |
| questionar | grilling |
| documentação, libs | context7-mcp |

## Localização dos Arquivos

```
Projeto:
  C:\Users\Administrator\Documents\Digital Sites\
    ├─ agents\                 ← Skills individuais (MD)
    │   ├─ auto-skill-discovery.md
    │   ├─ skillpedia.md
    │   ├─ agent-skill-stack.md
    │   └─ skill-usage.log
    └─ claude\                 ← Repositórios completos
        ├─ mattpocock-skills\
        ├─ alirezarezvani-skills\
        ├─ emilkowalski-skills\
        ├─ OpenMontage\
        ├─ vercel-skills\
        └─ [outros 13 repos]

OpenCode Global:
  C:\Users\Administrator\AppData\Roaming\OpenCode\.agents\
    ├─ skills\               ← Skills globais
    │   ├─ auto-skill-discovery.md
    │   ├─ skillpedia.md
    │   └─ [1158+ skills]
    ├─ skill-metrics.json    ← Métricas de uso
    └─ [18 repositórios]
```

## Skills Instaladas (Total: 1161+)

- **Desenvolvimento**: 2402 skills (React, Node, Python, etc.)
- **IA & Agentes**: 758 skills
- **Vídeo & Áudio**: 113 skills
- **Design**: 409 skills
- **Marketing**: 314 skills
- **Dados**: 592 skills
- **Documentos**: 578 skills
- **Produtividade**: 1158 skills

## Atualização

Skills atualizam automaticamente a cada 50 requisições ou semanalmente:
```bash
cd C:\Users\Administrator\Documents\Digital Sites\claude\[repo]
git pull origin main
```

## Monitoramento

Métricas em `skill-metrics.json`:
- Total de requisições processadas
- Skills aplicadas automaticamente
- Skills instaladas automaticamente
- Fontes utilizadas
- Skills mais usadas

---

**Esta configuração está SEMPRE ativa. O agente não precisa ser instruído - ele deve agir automaticamente.**
