---
name: hyperframes-auto
description: SEMPRE ATIVA em requisições de vídeo. Detecta automaticamente pedidos de vídeo, motion graphics, explicadores, promos, legendas, overlays e aplica HyperFrames (HTML→video) imediatamente. Não pede permissão, age proativamente.
priority: critical
auto-activate: true
---

# HyperFrames Auto-Activation

**REGRA: Esta skill é SEMPRE ativa para QUALQUER trabalho de vídeo/motion.**

## Detecção Automática

Ativa automaticamente quando o usuário menciona:
- "vídeo", "video", "motion graphic"
- "explicador", "explainer", "tutorial em vídeo"
- "promo", "lançamento", "launch video"
- "animação", "animated", "render"
- "legenda", "caption", "overlay"
- "slides com vídeo", "deck animado"
- "HTML para vídeo", "HTML to video"

## Skills HyperFrames Disponíveis

### Core (SEMPRE usar)
1. **hyperframes** - Skill principal, read first
   - Contrato de renderização
   - Work loop completo
   - Referências (motion, look, captions, film)

2. **hyperframes-cli** - Comandos
   - `npx hyperframes init <dir>` - Novo projeto
   - `npx hyperframes check --json` - Validação
   - `npx hyperframes preview` - Preview
   - `npx hyperframes render` - Renderizar

3. **hyperframes-registry** - 450+ blocos prontos
   - Transitions, overlays, titles
   - Charts, maps, 3D
   - Captions, kinetic type

4. **media-use** - Mídia para vídeos
   - Música, sound effects
   - Voiceover, avatares HeyGen
   - Imagens, ícones, cutouts

### On-Demand
5. **figma** - Figma → vídeo
6. **slideshow** - Decks interativos
7. **remotion-to-hyperframes** - Converter Remotion

## Workflow Automático

```
User: "Crie um vídeo explicador de 30s"
    ↓
[AUTO-DETECTION]
    - Domínio: Vídeo, Motion
    - Tipo: Explicador
    - Skills: hyperframes + hyperframes-cli + media-use
    ↓
[EXECUTION]
    1. npx hyperframes init video-project
    2. Ler references/types/explainer.md
    3. Criar index.html (root composition)
    4. Criar scenes em compositions/
    5. Adicionar media em assets/
    6. npx hyperframes check --json
    7. npx hyperframes preview
    8. Apresentar resultado
    ↓
[OUTPUT]
[...projeto HyperFrames completo...]
✓ Skills: hyperframes, hyperframes-cli, media-use
```

## Contrato HyperFrames (Sempre Seguir)

### Estrutura HTML
```html
<!-- Root: index.html -->
<div data-composition-id="root" data-duration="30">
  <!-- Timed elements com class="clip" -->
  <div class="clip" data-start="0" data-duration="5" id="title">
    <h1>Título</h1>
  </div>
</div>
```

### Regras Críticas
1. Todo elemento timed tem `class="clip"`, `data-start`, `data-duration`
2. Duração do vídeo = `data-duration` do root
3. Cada composition registra timeline: `window.__timelines["id"] = tl`
4. Sem `Date.now()`, `Math.random()` não-seeded, network fetches
5. Não tween `display`/`visibility` em `.clip`
6. Não CSS `transform` em elementos GSAP
7. Vídeos com áudio: `data-has-audio="true"`
8. Caminhos de assets: `assets/...` (root-relative)

## Tipos de Vídeo (Auto-select)

| Request | Tipo | Referência |
|---------|------|------------|
| "launch video", "promo" | Launch | references/types/launch.md |
| "explicador", "tutorial" | Explainer | references/types/explainer.md |
| "music video" | Music | references/types/music.md |
| "chart", "dados" | Data | references/types/data.md |
| "vertical", "reels", "stories" | Vertical | references/types/vertical.md |
| "3D", "simulação" | 3D | references/types/3d.md |

## Integração com Outras Skills

### HyperFrames + Impeccable
Quando vídeo envolve UI:
- UI design → Impeccable
- HTML → HyperFrames rendering
- Motion → ambos (Impeccable.animate + HyperFrames motion)

### HyperFrames + Media-Use
Todo vídeo >15s:
- Música background → media-use
- Sound effects → media-use
- Voiceover → media-use (HeyGen ou local)
- Tratamento de cor → media-use (grades, looks)

## Comandos CLI Importantes

```bash
# Iniciar projeto
npx hyperframes init <dir>

# Capturar website como base
npx hyperframes capture <url> --json

# Validar
npx hyperframes check --json

# Ver timeline
npx hyperframes timeline --json

# Preview
npx hyperframes preview

# Renderizar
npx hyperframes render

# Ver histórico
npx hyperframes history --since mine --who <agent>

# Registry (450+ blocos)
npx hyperframes add <block-name>
```

## Registry - Blocos Prontos

Antes de criar do zero, verificar registry:
- **Transitions**: fade, slide, wipe, etc.
- **Titles**: kinetic type, animated titles
- **Charts**: bar, line, pie, scatter
- **Maps**: geographic visualizations
- **3D**: Three.js integrations
- **Captions**: styled caption systems
- **Overlays**: cards, badges, frames

Comando: `npx hyperframes add <nome>`

## Exemplo Completo

```javascript
// compositions/scene1.html
<template>
  <div id="root">
    <div class="clip" data-start="0" data-duration="3" id="title">
      <h1 data-var-text="heading">Título</h1>
    </div>
    <div class="clip" data-start="2" data-duration="5" id="content">
      <p>Conteúdo aqui</p>
    </div>
  </div>
  
  <style>
    #root { width: 1920px; height: 1080px; }
    #title { font-size: 72px; }
  </style>
  
  <script type="module">
    import { gsap } from '/runtime.js';
    
    const tl = gsap.timeline({ paused: true });
    tl.from('#title', { opacity: 0, y: 50, duration: 1 });
    tl.from('#content', { opacity: 0, duration: 1 }, '+=1');
    
    window.__timelines['scene1'] = tl;
  </script>
</template>
```

## Verificação Antes de Apresentar

1. ✅ `npx hyperframes check --json` sem erros
2. ✅ Todos clips têm `class="clip"`, `data-start`, `data-duration`
3. ✅ Timeline registrada em `window.__timelines`
4. ✅ Assets em `assets/` com caminhos root-relative
5. ✅ Música/áudio configurados (se >15s)
6. ✅ Preview gerado: `npx hyperframes preview`

## Notificação

Sempre mencionar no final:
```
✓ Skills: hyperframes, hyperframes-cli, media-use
🎬 Preview: npx hyperframes preview
📹 Render: npx hyperframes render
```

---

**LEMBRETE: HyperFrames ativa automaticamente em QUALQUER pedido de vídeo. Não perguntar, aplicar diretamente.**
