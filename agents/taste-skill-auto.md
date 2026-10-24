---
name: taste-skill
description: SEMPRE ATIVA para landing pages/marketing. Anti-slop frontend skill com art direction baseada em 247 sites curados. Ativa automaticamente quando usuário pede landing page, portfolio, produto page, hero, ou menciona "looks generic", "AI-made", "premium", "award-level". Também para app screens (dashboards, admin views).
priority: high
auto-activate: true
---

# Taste-Skill v2 - Anti-Slop Frontend

**REGRA: Esta skill ativa automaticamente para landing pages, marketing sites e portfolios.**

## O que é Taste-Skill?

Skill anti-slop que substitui designs genéricos com **decisões reais**, baseada em estudo de **247 sites curados** (One Page Love, Awwwards Sites of the Day).

**Problema que resolve:**
> "Um site feito por modelo parece a média de todos os sites: headline centralizada, três cards com ícones, gradiente suave, nada foi decidido."

## Detecção Automática

Ativa quando usuário menciona:
- "landing page", "página de produto"
- "marketing site", "portfolio"
- "hero section"
- "looks generic", "templated", "AI-made"
- "make it premium", "award-level"
- "less like every other site"
- "dashboards", "admin views" (modo app)

## 4 Pilares Anti-Slop

### 1. **Direções Pesquisadas (não inventadas)**
Script `draw.mjs` sorteia 3 de 20 direções reais:
- Type system
- Palette
- Hero composition
- Section blueprints
- Baseadas em 247 sites reais

### 2. **Ideia vem do Subject**
Inventário do cliente (8-12 itens únicos):
- Nome e significado
- Endereço, rua, vizinhança
- Números (assentos, quartos, preço, ano)
- Materiais e cores
- Rituais e horários
- Mundo físico do negócio

### 3. **House Style Sem Ornamentos**
Medido em browser real por `inspect.mjs`:
- ❌ Sem labels decorativos
- ❌ Sem icon cards em squares
- ❌ Sem gradientes genéricos
- ❌ Sem regras finas
- ✅ Type maior
- ✅ Campos de cor inteiros
- ✅ Fotos reais do mundo do cliente

### 4. **Look-and-Fix Loop**
Screenshots em 3 widths → Rubrica de jurado → Fix → Repeat

## Workflow Automático

```
User: "Crie landing page para restaurante"
    ↓
[TASTE-SKILL] Detecta: landing page + marketing
[PONYTAIL] Código mínimo
[IMPECCABLE] Quality gates
    ↓
[EXECUÇÃO]
1. Inventário: nome, rua, pratos, história, materiais
2. Argumento: uma coisa única que página deve fazer
3. Draw directions: 3 opções de direção visual
4. Ideia: baseada no inventário (ex: tiles da rua)
5. Build com library directions
6. Screenshots 3 widths
7. Inspect.mjs (house rules check)
8. Fix loop até passar
    ↓
[OUTPUT]
Landing page com:
- Type system decisivo
- Palette do mundo do cliente
- Hero com composição forte
- Fotos reais do lugar
- Zero ornamentos genéricos

✓ Skills: taste-skill, ponytail, impeccable
🎨 Direction: [escolhida]
📸 Passed: inspect.mjs
```

## Comandos Disponíveis

### Draw Directions (Landing/Marketing)
```bash
node scripts/draw.mjs \
  --kind restaurant \
  --brief "Family Italian restaurant, brick oven, Naples-style" \
  --out .taste-skill/
```

Retorna 3 direções para escolher:
- Type system (font pairings)
- Palette (cores baseadas em pesquisa)
- Hero blueprint
- Section structures

### Draw Directions (App/Dashboard)
```bash
node scripts/draw.mjs --app \
  --kind analytics \
  --brief "SaaS analytics dashboard" \
  --out .taste-skill/app
```

### Inspect (House Rules Check)
```bash
node scripts/inspect.mjs .taste-skill/page.html
```

Verifica:
- Sem labels decorativos
- Sem icon tinted squares
- Sem gradientes genéricos
- Type size adequado
- Spacing correto

### Assets (Buscar Imagens)
```bash
node scripts/assets.mjs \
  --queries "Naples tiles, brick oven, Italian ingredients" \
  --out .taste-skill/images
```

Busca imagens reais do mundo do cliente em arquivos abertos.

## 2 Tipos de Trabalho

### 1. **Landing Page/Marketing** (skill principal)
Páginas lidas e scrolladas:
- Landing pages
- Marketing sites
- Portfolios
- Product pages
- One-pagers

**Segue:** The Run completo (steps 1-8)

### 2. **App Screens** (modo especial)
Interfaces trabalhadas:
- Dashboards
- Admin views
- Analytics
- Settings/Billing
- Inbox/Queue

**Segue:** `references/app-screens.md`
- Regras próprias (borders quiet OK, gradients NOT OK)
- Draw com `--app` flag
- Inspect com `--app` flag

## The Run (8 Steps)

### Step 1: Brief + Inventário
- Ler subject, audience, stack
- **Inventário crítico:** 8-12 coisas únicas do cliente
- Verificar imagens reais disponíveis

### Step 2: Argumento
Uma coisa que página deve fazer (não três)

### Step 3: Draw Directions
`draw.mjs` → 3 opções → Escolher 1

### Step 4: Ideia
Conceito do inventário (não do styling)

### Step 5: Build Structure
HTML/CSS/React com direction escolhida

### Step 6: Assets
`assets.mjs` busca fotos reais

### Step 7: Inspect
`inspect.mjs` verifica house rules

### Step 8: Screenshots + Fix Loop
3 widths → Review → Fix → Repeat

## Integração com Outras Skills

### Taste-Skill + Ponytail
```javascript
// Taste-Skill decide direção/design
// Ponytail implementa com mínimo código
// Reutiliza components existentes onde possível

// ✅ BOM
<section className="hero-blueprint-A"> {/* do draw.mjs */}
  <h1>{title}</h1> {/* type system da direction */}
</section>

// ❌ EVITAR (Ponytail não permitiria)
<Section>
  <Container>
    <Wrapper>
      <InnerWrapper>
        <h1>{title}</h1>
```

### Taste-Skill + Impeccable
```javascript
// Taste-Skill: art direction anti-slop
// Impeccable: technical quality (a11y, polish)

// Taste define: type, palette, composition
// Impeccable garante: contrast, responsive, a11y
```

### Taste-Skill vs Design-Taste-Frontend
**São a mesma skill!**
- `design-taste-frontend` é o nome oficial no SKILL.md
- `taste-skill` é o nome do repo
- Ambos referem à mesma skill v2

## House Rules (Auto-Checked)

### ❌ PROIBIDO (inspect.mjs detecta)
- Labels decorativos acima de headlines
- Icon cards em tinted squares
- Gradientes genéricos (purple-to-blue)
- Regras finas horizontais
- Gray text em colored backgrounds
- Bounce/elastic easing
- Cards aninhados
- Inter font (overused)

### ✅ REQUERIDO
- Type set grande (48px+ headlines)
- Campos de cor completos
- Fotos reais do mundo do cliente
- Composições decisivas (não centradas por padrão)
- Palette baseada no inventário
- Zero ornamentos sem função

## Exemplos de Direções Pesquisadas

### Type Systems (20 opções)
```css
/* Direction A: Editorial Bold */
--heading: 'Tiempos Headline', serif;
--body: 'Inter', sans-serif;
--heading-size: 72px;

/* Direction B: Swiss Modern */
--heading: 'Suisse Int\'l', sans-serif;
--body: 'Suisse Int\'l', sans-serif;
--heading-size: 64px;

/* Direction C: Brutalist */
--heading: 'ABC Monument Grotesk', sans-serif;
--body: 'ABC Favorit', sans-serif;
--heading-size: 96px;
```

### Palettes (20 opções)
```css
/* Direction A: Earth Tones */
--primary: #8B5E3C;
--secondary: #D4A574;
--accent: #2F4538;

/* Direction B: Deep Ocean */
--primary: #0A2540;
--secondary: #1E6091;
--accent: #F0AB3D;
```

### Hero Blueprints (20 opções)
- Full-bleed image + offset text
- Split screen (50/50)
- Text dominant + corner image
- Layered with parallax
- Full height video background
- etc.

## Checklist de Implementação

Antes de apresentar:

- [ ] **Inventário feito?** 8-12 itens únicos do cliente
- [ ] **Argumento definido?** Uma coisa clara
- [ ] **Direction escolhida?** Dos 3 options do draw.mjs
- [ ] **Ideia do inventário?** Não styling genérico
- [ ] **Fotos reais?** Do mundo do cliente, não stock generic
- [ ] **House rules OK?** Passou inspect.mjs
- [ ] **Screenshots 3 widths?** Desktop, tablet, mobile
- [ ] **Ponytail aplicado?** Código mínimo, sem abstrações
- [ ] **Zero slop?** Sem labels, icon cards, gradientes genéricos

## Exemplo Completo

```
User: "Landing page para pizzaria napolitana familiar"

[TASTE-SKILL + PONYTAIL + IMPECCABLE]

1. Inventário:
   - Nome: "Forno Antico" (significa forno antigo)
   - Rua: Via dei Tribunali, Nápoles
   - Forno a lenha de 1952
   - Massa fermentada 72h
   - Azulejos azuis da rua
   - Família desde 3 gerações

2. Argumento:
   "Fazer pessoa querer reservar mesa agora"

3. Draw directions → Escolhe: "Mediterranean Bold"
   - Type: Tiempos Headline + GT America
   - Palette: Azul dos azulejos + terracota do forno
   - Hero: Full-bleed photo + offset headline

4. Ideia: "Azulejos da Via dei Tribunali"
   (não "Italian vibes" genérico)

5. Build:
   - Hero: Foto do forno + headline offset
   - Section: Grid fotos processo massa
   - Section: História família (type grande)
   - CTA: Reservar mesa

6. Assets: Fotos reais forno + rua + pizzas

7. Inspect: ✓ Passou (zero ornamentos)

8. Screenshots: Desktop/tablet/mobile OK

Output HTML/React limpo:
- ~150 lines (Ponytail)
- Zero icon cards, zero gradientes
- Type 72px headline
- Palette dos azulejos reais
- Fotos do forno de verdade

✓ Skills: taste-skill, ponytail, impeccable
🎨 Direction: Mediterranean Bold
📸 Passed: inspect.mjs (0 violations)
🎯 Concept: Via dei Tribunali tiles
```

## Notificação

Sempre mencionar:
```
✓ Skills: taste-skill, ponytail, impeccable
🎨 Direction: [escolhida do draw.mjs]
📸 Inspect: passed (0 violations)
🎯 Concept: [baseado no inventário]
```

---

**LEMBRETE CRÍTICO: Taste-Skill ativa automaticamente para landing/marketing. Sempre fazer inventário → draw → ideia → build. Zero ornamentos genéricos. Fotos reais do mundo do cliente.**

**Taste-Skill = Design-Taste-Frontend (mesmo skill, nomes diferentes)**
