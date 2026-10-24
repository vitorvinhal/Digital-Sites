---
name: threeui
description: SEMPRE ATIVA para componentes 3D/WebGL. Biblioteca de 50+ componentes React com Three.js, shaders e WebGL. Ativa automaticamente quando usuário menciona 3D, Three.js, WebGL, shaders, componentes 3D ou animações 3D. Guia implementação correta com biblioteca ThreeUI.
priority: high
auto-activate: true
---

# ThreeUI - 3D/WebGL Components for React

**REGRA: Esta skill ativa automaticamente para QUALQUER trabalho 3D/WebGL/Three.js.**

## O que é ThreeUI?

Biblioteca de componentes React com Three.js/WebGL para criar interfaces 3D interativas:
- **50+ componentes Community** (164 variantes)
- Shaders prontos
- Controles interativos
- Temas e responsive behavior
- Live renderers

**Site:** https://threeui.com
**Package:** `@designcodeio/threeui`

## Detecção Automática

Ativa quando usuário menciona:
- "3D", "three.js", "Three.js"
- "WebGL", "shaders"
- "componente 3D", "UI 3D"
- "animação 3D", "gráficos 3D"
- "mesh", "geometry", "material"
- "cena 3D", "render 3D"

## Instalação

```bash
npm install @designcodeio/threeui
```

## Componentes Disponíveis (50+)

### Heróis e Backgrounds
- `AtTheHorizon` - Hero com horizonte 3D
- `CrossBeam` - Background com feixes cruzados
- `DustParticles` - Partículas flutuantes
- `EnergyField` - Campo de energia animado
- `FloatingIslands` - Ilhas flutuantes
- `GlassShapes` - Formas de vidro

### Cards e Containers
- `GlassCard` - Card com efeito vidro
- `HolographicCard` - Card holográfico
- `MetallicCard` - Card metálico
- `NeonCard` - Card neon

### Efeitos e Overlays
- `Bloom` - Efeito bloom/glow
- `ChromaticAberration` - Aberração cromática
- `DepthOfField` - Profundidade de campo
- `Glitch` - Efeito glitch
- `ParallaxScroll` - Scroll parallax 3D
- `WaveDistortion` - Distorção de onda

### Navegação 3D
- `OrbitControls` - Controles de órbita
- `FirstPersonControls` - Controles primeira pessoa
- `CameraRig` - Rig de câmera

### Formas e Geometrias
- `AnimatedSphere` - Esfera animada
- `MorphingCube` - Cubo morphing
- `ParticleField` - Campo de partículas
- `RibbonTrail` - Trilha ribbon
- `TubularPath` - Caminho tubular

## Uso Básico

### Importação Simples

```javascript
import { AtTheHorizon } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Hero() {
  return <AtTheHorizon />;
}
```

### Importação Otimizada (Ponytail-style)

```javascript
// Menor grafo de imports
import { AtTheHorizon } from "@designcodeio/threeui/components/AtTheHorizon";
```

### Com Props

```javascript
<AtTheHorizon
  intensity={0.8}
  color="#4f46e5"
  speed={1.5}
  className="w-full h-screen"
/>
```

## Padrões de Implementação

### Pattern 1: Hero Section

```javascript
import { AtTheHorizon } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Hero() {
  return (
    <div className="relative h-screen">
      <AtTheHorizon />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">
          Welcome to the Future
        </h1>
      </div>
    </div>
  );
}
```

### Pattern 2: Background Effect

```javascript
import { DustParticles } from "@designcodeio/threeui";

export function Page() {
  return (
    <div className="relative min-h-screen">
      <DustParticles
        count={100}
        speed={0.5}
        className="fixed inset-0 -z-10"
      />
      <main>{/* Conteúdo aqui */}</main>
    </div>
  );
}
```

### Pattern 3: Interactive Card

```javascript
import { HolographicCard } from "@designcodeio/threeui";

export function ProductCard({ product }) {
  return (
    <HolographicCard
      intensity={0.6}
      className="p-6 cursor-pointer hover:scale-105 transition"
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </HolographicCard>
  );
}
```

### Pattern 4: Scroll Effect

```javascript
import { ParallaxScroll } from "@designcodeio/threeui";

export function ScrollSection() {
  return (
    <ParallaxScroll speed={0.5} layers={3}>
      <section className="h-screen">
        {/* Conteúdo com parallax */}
      </section>
    </ParallaxScroll>
  );
}
```

## Assets e Arquivos Públicos

Componentes que renderizam documentos HTML completos precisam de arquivos em URLs root-relative:

```bash
# Copiar assets necessários
cp -r node_modules/@designcodeio/threeui/lib-dist/assets/* public/
```

Ou override props:
```javascript
<Component 
  sourceUrl="/custom/path"
  assetBaseUrl="/custom/assets"
/>
```

## Integração com Outras Skills

### ThreeUI + Ponytail
Implementação mínima:
```javascript
// Ponytail detecta biblioteca instalada
// Usa componente direto, sem wrapper extra
import { AtTheHorizon } from "@designcodeio/threeui";

export const Hero = () => <AtTheHorizon />;
```

### ThreeUI + Impeccable
Design + 3D:
```javascript
// Impeccable define design/layout
// ThreeUI fornece componentes 3D
<div className="relative h-screen">
  <AtTheHorizon /> {/* ThreeUI */}
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Impeccable polish do conteúdo */}
  </div>
</div>
```

### ThreeUI + HyperFrames
Vídeo com 3D:
```javascript
// HyperFrames pode capturar ThreeUI components
// Para vídeos com elementos 3D
<div data-composition-id="scene" data-duration="10">
  <AtTheHorizon className="clip" data-start="0" data-duration="10" />
</div>
```

## Props Comuns

Maioria dos componentes suporta:

```typescript
interface CommonProps {
  className?: string;
  style?: CSSProperties;
  intensity?: number;      // 0-1, força do efeito
  speed?: number;          // Velocidade animação
  color?: string;          // Cor primária
  secondaryColor?: string; // Cor secundária
  scale?: number;          // Escala do componente
}
```

## Performance

### Otimizações Ponytail-style

```javascript
// ✅ BOM: Import específico
import { AtTheHorizon } from "@designcodeio/threeui/components/AtTheHorizon";

// ❌ EVITAR: Import barrel (maior bundle)
import { AtTheHorizon, CrossBeam, DustParticles } from "@designcodeio/threeui";

// ✅ BOM: Lazy loading para componentes pesados
const HolographicCard = lazy(() => 
  import("@designcodeio/threeui/components/HolographicCard")
);

// ✅ BOM: Conditional rendering
{is3DSupported && <AtTheHorizon />}
```

## Troubleshooting

### Assets não carregam
```javascript
// Copiar assets ou usar prop
<Component assetBaseUrl="/assets" />
```

### Performance ruim
```javascript
// Reduzir complexidade
<DustParticles count={50} /> // vs count={200}

// Lazy load
const Component = lazy(() => import("@designcodeio/threeui/..."));
```

### WebGL não suportado
```javascript
// Fallback
const supportsWebGL = !!document.createElement('canvas').getContext('webgl');

{supportsWebGL ? (
  <AtTheHorizon />
) : (
  <div className="bg-gradient-to-r from-blue-500 to-purple-500" />
)}
```

## Componentes por Categoria

### 🎨 Backgrounds (10+)
AtTheHorizon, CrossBeam, DustParticles, EnergyField, FloatingIslands, GlassShapes, GradientMesh, LiquidWave, NebulaCloud, SpaceStars

### 🃏 Cards (8+)
GlassCard, HolographicCard, MetallicCard, NeonCard, ParticleCard, PrismaticCard, ReflectiveCard, WaveCard

### ✨ Effects (12+)
Bloom, ChromaticAberration, DepthOfField, FilmGrain, Glitch, LensFlare, MotionBlur, ParallaxScroll, Pixelate, RGBShift, Vignette, WaveDistortion

### 🎮 Controls (5+)
OrbitControls, FirstPersonControls, CameraRig, DragControls, TouchControls

### 📐 Shapes (15+)
AnimatedSphere, MorphingCube, ParticleField, RibbonTrail, TubularPath, Torus, Icosahedron, Octahedron, Dodecahedron, TetraHedron, BoxGeometry, PlaneGeometry, SphereGeometry, CylinderGeometry, ConeGeometry

## Checklist de Implementação

Antes de apresentar código ThreeUI:

- [ ] **Biblioteca instalada?** `npm install @designcodeio/threeui`
- [ ] **CSS importado?** `import "@designcodeio/threeui/style.css"`
- [ ] **Import otimizado?** Usar subpath quando possível
- [ ] **Props necessários?** Definir intensity, color, speed
- [ ] **Assets copiados?** Se componente precisa de arquivos públicos
- [ ] **Fallback WebGL?** Para browsers sem suporte
- [ ] **Performance OK?** Lazy loading, conditional render
- [ ] **Ponytail aplicado?** Código mínimo, sem wrappers desnecessários

## Exemplos Completos

### Exemplo 1: Landing Page 3D

```javascript
import { AtTheHorizon } from "@designcodeio/threeui/components/AtTheHorizon";
import "@designcodeio/threeui/style.css";

export function LandingPage() {
  return (
    <main className="relative">
      {/* 3D Background */}
      <section className="relative h-screen">
        <AtTheHorizon intensity={0.7} speed={1.2} />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-7xl font-bold text-white mb-4">
              Next Generation
            </h1>
            <p className="text-xl text-white/80">
              Experience the future today
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo normal */}
      <section className="py-20 px-4">
        {/* Features, etc */}
      </section>
    </main>
  );
}

// ✓ Skills: threeui, ponytail, impeccable
// 📊 Saved: ~100 lines (vs custom Three.js setup)
// Skipped: custom camera controls, manual scene setup
```

### Exemplo 2: Product Cards Grid

```javascript
import { HolographicCard } from "@designcodeio/threeui/components/HolographicCard";

export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {products.map(product => (
        <HolographicCard
          key={product.id}
          intensity={0.5}
          className="p-6 cursor-pointer hover:scale-105 transition"
        >
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <span className="text-2xl font-bold mt-4 block">
            ${product.price}
          </span>
        </HolographicCard>
      ))}
    </div>
  );
}

// ✓ Skills: threeui, ponytail, impeccable
// 📊 Saved: ~200 lines (vs manual 3D cards)
```

## Notificação

Sempre mencionar no final:
```
✓ Skills: threeui, ponytail, impeccable
🎨 ThreeUI components: [lista]
📦 Install: npm install @designcodeio/threeui
```

---

**LEMBRETE CRÍTICO: ThreeUI ativa automaticamente quando usuário menciona 3D, WebGL, Three.js ou componentes 3D. Usar componentes prontos ao invés de criar do zero (princípio Ponytail).**
