# BPL Website — Next.js Build Brief
## Instructions for Claude CLI

Read this entire document before writing a single file. Every decision — architecture, naming, styling, interaction — is specified here. Follow it exactly.

---

## 0. CONTEXT

You are building the new corporate website for **Best Practices Limited (BPL)**, Nigeria's leading fleet management support services company. The reference design is already complete as an HTML prototype: `bpl_homepage_v2.html`. Your job is to faithfully convert and extend that design into a production-grade **Next.js App Router** project.

The reference competitor site is **mixtelematics.com/us** — the BPL site should match or exceed that quality level. The HTML prototype is the source of truth for all visual decisions.

---

## 1. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14** (App Router) | `npx create-next-app@latest` |
| Language | **TypeScript** | strict mode |
| Styling | **Tailwind CSS** + custom CSS variables | Tailwind for layout/spacing, CSS vars for brand tokens |
| Animations | **Framer Motion** | scroll reveals, page transitions, 3D tilts |
| Icons | **Lucide React** | consistent icon set throughout |
| Fonts | **Next/font** (Google) | Syne + Inter — loaded via `next/font/google` |
| Map | Inline SVG component | Nigeria SVG with all 37 state paths (provided below) |
| State | React `useState` / `useRef` only | no external state library needed |
| Deployment | DigitalOcean VPS (PM2 + Nginx) | `next build` → `next start` |

**Install these packages after scaffolding:**
```bash
npm install framer-motion lucide-react
```

---

## 2. PROJECT STRUCTURE

```
bpl-website/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, Nav, Footer
│   ├── page.tsx                # Home page — assembles all sections
│   ├── about/page.tsx          # Who We Are
│   ├── solutions/page.tsx      # What We Do (services)
│   ├── products/page.tsx       # Product catalogue
│   ├── industries/page.tsx     # Industries served
│   ├── clients/page.tsx        # Client list + testimonials
│   ├── careers/page.tsx        # Careers
│   ├── contact/page.tsx        # Contact form + map
│   └── globals.css             # CSS variables + base styles
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # Sticky nav with scroll shadow
│   │   └── Footer.tsx          # 4-column footer
│   │
│   ├── home/
│   │   ├── HeroSection.tsx     # Hero split: copy left, Nigeria map right
│   │   ├── Ticker.tsx          # Infinite scroll news ticker
│   │   ├── StatsBand.tsx       # 4-stat dark band with counters
│   │   ├── ServicesGrid.tsx    # 6-card services grid with 3D tilt
│   │   ├── AboutSplit.tsx      # 2001 story left, vision/mission right
│   │   ├── ProductsGrid.tsx    # 6-card product grid with image slots
│   │   ├── ClientsCarousel.tsx # Dual-track infinite carousel
│   │   ├── Testimonial.tsx     # Dark navy quote section
│   │   └── CtaBand.tsx         # Blue CTA strip
│   │
│   ├── map/
│   │   └── NigeriaMap.tsx      # SVG map component — all 37 states
│   │
│   └── ui/
│       ├── Button.tsx          # Primary / outline / white variants
│       ├── SectionLabel.tsx    # Blue label with left bar
│       ├── RevealWrapper.tsx   # Framer Motion scroll reveal HOC
│       └── TiltCard.tsx        # 3D mouse-tilt wrapper
│
├── hooks/
│   ├── useCountUp.ts           # Animated number counter
│   ├── useScrollReveal.ts      # Intersection observer hook
│   └── useMapTilt.ts           # 3D tilt mouse tracking
│
├── lib/
│   ├── content.ts              # All site copy — single source of truth
│   └── types.ts                # Shared TypeScript interfaces
│
├── public/
│   ├── images/
│   │   └── products/           # Drop 4K product images here
│   │       ├── mix-vision.jpg
│   │       ├── mix-rovi.jpg
│   │       ├── fuel-monitor.jpg
│   │       ├── mix4000.jpg
│   │       ├── speed-limiter.jpg
│   │       └── axle-sensor.jpg
│   └── nigeria.svg             # Copy from source file
│
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 3. DESIGN TOKENS

### 3.1 CSS Variables — put in `globals.css`

```css
:root {
  /* Brand */
  --blue:        #0078D4;
  --blue-light:  #3399E0;
  --blue-pale:   #E8F4FD;
  --navy:        #0D1B2A;
  --navy-mid:    #1A2E42;
  --red:         #CC0000;
  --tan:         #D4A882;

  /* Surfaces */
  --white:       #FFFFFF;
  --off-white:   #F7F9FC;
  --light-gray:  #EEF2F7;
  --mid-gray:    #9BAAB8;

  /* Text */
  --dark-text:   #0D1B2A;
  --body-text:   #3D5166;

  /* Layout */
  --max-w:       1200px;
  --section-v:   96px;
  --nav-h:       68px;
}
```

### 3.2 Tailwind Config Extension — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bpl-blue':       '#0078D4',
        'bpl-blue-light': '#3399E0',
        'bpl-blue-pale':  '#E8F4FD',
        'bpl-navy':       '#0D1B2A',
        'bpl-navy-mid':   '#1A2E42',
        'bpl-red':        '#CC0000',
        'bpl-tan':        '#D4A882',
        'bpl-off-white':  '#F7F9FC',
        'bpl-light-gray': '#EEF2F7',
        'bpl-mid-gray':   '#9BAAB8',
        'bpl-body':       '#3D5166',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.3 Fonts — `app/layout.tsx`

```tsx
import { Syne, Inter } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
```

---

## 4. PAGE STRUCTURE — HOME (`app/page.tsx`)

The homepage assembles all section components in this exact order:

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <StatsBand />
      <ServicesGrid />
      <AboutSplit />
      <ProductsGrid />
      <ClientsCarousel />
      <Testimonial />
      <CtaBand />
    </>
  )
}
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 `Nav.tsx`

**Behaviour:**
- Fixed, `z-50`, height `68px`
- Background: `white/97` with `backdrop-blur-md`
- On scroll past 20px: add `shadow-sm` (use `useEffect` + `window.scroll`)
- Logo: BPL SVG mark (navy square, blue S-curve, "BPL" text) + "Best Practices **Limited**" wordmark
- Logo mark: `hover:rotate-[-6deg] scale-105 transition-transform`
- Nav links: About, Solutions, Products, Industries, Clients
- CTA: "Get a Quote" → `bg-bpl-blue text-white hover:bg-bpl-blue-light`
- Mobile: hamburger menu (implement later — desktop first)

```tsx
'use client'
// useEffect for scroll shadow
// nav className toggles 'shadow-sm' based on scroll state
```

---

### 5.2 `HeroSection.tsx`

**Layout:** CSS Grid, 2 equal columns, `min-h-[calc(100vh-68px)]`

**Left column** (`bg-white`):
- Subtle radial gradient bg: `rgba(0,120,212,0.04)` at bottom-left
- Eyebrow: pulsing blue dot + "Nigeria's Fleet Intelligence Leader · Est. 2001"
  - Pulse animation: `animate-pulse` (scale 0.6 at 50%)
- H1: `font-display text-[54px] font-extrabold leading-[1.05] tracking-[-0.035em]`
  - "Nigeria's Fleet." / "Tracked in **Real‑Time.**" (em = blue) / "Built for Safety."
- Sub: 16px Inter 400, `text-bpl-body`, max-width 440px
- Two buttons: Primary "Explore Solutions →" + Outline "Our Track Record"
- **Entrance animations** (Framer Motion, staggered):
  - eyebrow: `y: 12 → 0, opacity: 0 → 1, delay: 0.1s`
  - h1: `y: 18 → 0, opacity: 0 → 1, delay: 0.25s`
  - sub: `y: 16 → 0, opacity: 0 → 1, delay: 0.4s`
  - buttons: `y: 14 → 0, opacity: 0 → 1, delay: 0.55s`

**Right column** (`bg-bpl-navy`):
- Dot pattern: `background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)` at `28px 28px`
- Left edge fade: `after` pseudo → `linear-gradient(90deg, white, transparent)`
- Contains `<NigeriaMap />` component
- **3D tilt**: `onMouseMove` → update `rotateX` / `rotateY` on the map wrapper
  - Max tilt: `±6deg X`, `±8deg Y`
  - `perspective(900px)` on wrapper
  - On `mouseLeave`: spring back to `0,0` with `transition: 0.6s ease`

---

### 5.3 `NigeriaMap.tsx`

This is the most important component. Build it carefully.

**SVG viewBox:** `0 0 744.24182 599.92847`

**City coordinates** (pre-calculated from real lat/long using the SVG's geoViewBox `2.667421 13.892750 14.680752 4.269658`):

| City | cx | cy | Color | Size |
|---|---|---|---|---|
| Lagos | 44 | 459 | `#3399E0` | r=5 |
| Abuja | 299 | 301 | `#3399E0` | r=5 |
| Kano | 362 | 118 | `#3399E0` | r=4 |
| Port Harcourt | 269 | 566 | `#CC0000` | r=4 |
| Ibadan | 79 | 406 | `rgba(51,153,224,0.65)` | r=3.5 |
| Kaduna | 296 | 211 | `rgba(51,153,224,0.55)` | r=3 |

**Route paths** (SVG cubic bezier paths between cities):
```
Lagos → Abuja:       "M 44,459 C 80,420 145,378 195,342 C 245,306 278,308 299,301"
Abuja → Kano:        "M 299,301 C 312,268 332,222 347,174 C 357,143 360,130 362,118"
PH → Abuja:          "M 269,566 C 273,522 280,472 283,432 C 287,392 293,344 299,301"
Lagos → Ibadan:      "M 44,459 C 52,441 63,424 79,406"
```

**Route styling:**
- Lagos→Abuja: `stroke="#3399E0"` `strokeWidth=2` — solid, draw-on animation
- Abuja→Kano: `stroke="rgba(51,153,224,0.5)"` `strokeWidth=1.4` — dashed `6 4`, draw-on
- PH→Abuja: `stroke="rgba(204,0,0,0.55)"` `strokeWidth=1.4` — solid, draw-on
- Lagos→Ibadan: `stroke="rgba(51,153,224,0.35)"` `strokeWidth=1` — dashed `4 4`, draw-on

**Draw-on animation** (CSS `stroke-dashoffset`):
```css
/* Use a CSS animation that fires on mount */
@keyframes draw { to { stroke-dashoffset: 0; } }
```
Each route: `strokeDasharray={length}` `strokeDashoffset={length}` → animated to 0.
- Lagos→Abuja: dasharray 900, delay 0.8s, duration 2.4s
- Abuja→Kano: dasharray 700, delay 1.2s, duration 2s
- PH→Abuja: dasharray 700, delay 1.5s, duration 2s

**Moving truck dots** (SVG `<animateMotion>`):
- Truck 1 (blue, r=4): Lagos→Abuja route, `dur="7s"` `begin="3s"` `repeatCount="indefinite"`
- Truck 2 (blue, r=3.5): Abuja→Kano route, `dur="6s"` `begin="5s"`
- Truck 3 (red, r=3.5): PH→Abuja route, `dur="8s"` `begin="4s"`

**City pulse rings** (expand and fade out):
```css
@keyframes ring-out {
  0%   { r: 6; opacity: 0.65; }
  100% { r: 18; opacity: 0; }
}
```
Each city has an outer `<circle>` with this animation, staggered delays.

**State tooltips:**
- Each `<path>` in `#nigeria-states`: `onMouseEnter` → show tooltip with state name
- Use a React `useState` for `{ visible, name, x, y }`
- Tooltip: fixed position, `bg-bpl-navy/95 text-white text-xs px-3 py-1.5 rounded-md border border-bpl-blue-light/30`

**State hover styling:**
```css
/* Default state fill */
path { fill: rgba(255,255,255,0.055); stroke: rgba(255,255,255,0.14); stroke-width: 0.8; }
/* Hover */
path:hover { fill: rgba(0,120,212,0.3); stroke: rgba(51,153,224,0.7); stroke-width: 1.2; }
```

**Live tracking chip** (SVG overlay, bottom-right area at `cx=594, cy=546`):
- Dark rounded rect: `fill="rgba(13,27,42,0.92)"` `stroke="rgba(51,153,224,0.3)"`
- Green pulsing dot: `fill="#4ADE80"` with `<animate>` opacity 1→0.2→1 dur=1.4s
- Text: "LIVE TRACKING" in Inter 11px

**The 37 state paths** are in `public/nigeria.svg`. Load them in the component:
```tsx
// Option A: import the SVG as a module and inline the paths
// Option B: fetch /nigeria.svg and parse — NOT recommended (flicker)
// Option C: copy all path data directly into the component as a const array
// → USE OPTION C for reliability and performance
```

Create a file `lib/nigeria-paths.ts` with this structure:
```ts
export const NIGERIA_STATES: { id: string; title: string; d: string }[] = [
  { id: 'NG-AB', title: 'Abia', d: '...' },
  { id: 'NG-AD', title: 'Adamawa', d: '...' },
  // ... all 37 states
]
```

Copy the path `d` values from `public/nigeria.svg` (or from the source file at the path the user provides).

---

### 5.4 `Ticker.tsx`

**Layout:** Full-width dark navy band (`bg-bpl-navy`), `py-[11px]`, `overflow-hidden`

**Behaviour:** Infinite horizontal scroll, `animation: scroll-left 38s linear infinite`

**Pause on hover:** `hover:[animation-play-state:paused]`

**Content** (duplicate twice for seamless loop):
```ts
const TICKER_ITEMS = [
  { text: 'Fleet Management Solutions',              color: 'blue' },
  { text: '6,000+ IVMS Devices Deployed Nationwide', color: 'green' },
  { text: 'MiX by Powerfleet Strategic Partner — Nigeria', color: 'blue' },
  { text: '5,032+ Drivers & Transport Managers Trained',   color: 'blue' },
  { text: 'Speed Limiting · Safety · Real-Time Tracking',  color: 'red' },
  { text: 'Shell · DHL · TotalEnergies · Lafarge · Baker Hughes', color: 'green' },
  { text: 'Established 2001 · Lagos, Nigeria',       color: 'blue' },
  { text: 'Cost Reduction · Efficiency · Safety',    color: 'blue' },
]
```

**Each item:** `inline-flex items-center gap-2 px-11 text-[11.5px] font-medium tracking-[0.07em] uppercase text-white/45`

**Pip dot:** `w-1 h-1 rounded-full flex-shrink-0` — blue: `bg-bpl-blue-light`, green: `bg-green-400`, red: `bg-bpl-red`

---

### 5.5 `StatsBand.tsx`

**Layout:** `grid grid-cols-4` on `bg-bpl-navy-mid`

**Each stat cell:**
- `px-11 py-[52px]` with `border-r border-white/[0.06]`
- Blue top-bar: `::before` pseudo — `h-[3px] bg-gradient-to-r from-bpl-blue to-bpl-blue-light scaleX(0) → scaleX(1) on hover`
- Number: `font-display text-[44px] font-extrabold text-white tracking-[-0.03em]`
- Superscript accent: `text-bpl-blue-light text-[24px]`
- Label: `text-[12px] font-medium tracking-[0.07em] uppercase text-white/40`

**Animated counters** (`useCountUp` hook):
- Fires when element enters viewport (`IntersectionObserver`, threshold 0.3)
- Easing: `1 - Math.pow(1 - progress, 3)` (ease-out cubic)
- Duration: 1400ms
- Numbers: `5032` (+), `6000` (+), `1000` (+), `150` (+)

**Stats data:**
```ts
const STATS = [
  { number: 5032, suffix: '+', label: 'Drivers & Managers Trained' },
  { number: 6000, suffix: '+', label: 'IVMS Devices Installed' },
  { number: 1000, suffix: '+', label: 'Speed Limiters Deployed' },
  { number: 150,  suffix: '+', label: 'Enterprise Clients' },
]
```

---

### 5.6 `ServicesGrid.tsx`

**Layout:** `grid grid-cols-3 gap-[1px] bg-bpl-light-gray rounded-xl overflow-hidden border border-bpl-light-gray`

**Each service card:**
- `bg-white p-9 cursor-pointer relative overflow-hidden`
- Bottom blue bar: `::after` — `h-[2px] bg-gradient-to-r from-bpl-blue to-bpl-blue-light scaleX(0) → scaleX(1) on hover`
- Icon wrap: `w-[46px] h-[46px] bg-bpl-blue-pale rounded-[10px] flex items-center justify-center mb-[18px]`
  - On hover: `bg-bpl-blue` → icon stroke changes to `white`, slight rotation `-4deg`
- Title: `font-display text-[16px] font-semibold text-bpl-navy`
- Description: `text-[13.5px] text-bpl-body leading-[1.65]`
- "Learn more →": hidden, slides in from left on hover

**3D Tilt** (`TiltCard` wrapper or direct `onMouseMove`):
- `perspective(600px) rotateY(x*7deg) rotateX(-y*5deg) translateZ(4px)`
- `transition: 0.1s ease-out` on move, `0.5s ease` on leave

**Services data:**
```ts
export const SERVICES = [
  {
    icon: 'MapPin',        // Lucide icon name
    title: 'Vehicle Tracking & Fleet Management',
    description: 'Real-time GPS tracking and fleet management SaaS that removes operational waste and drives measurable productivity gains across your fleet.',
    href: '/solutions#tracking',
  },
  {
    icon: 'Wrench',
    title: 'Fleet Maintenance Application',
    description: 'Fully integrated maintenance management to keep every vehicle roadworthy, compliant, and on schedule.',
    href: '/solutions#maintenance',
  },
  {
    icon: 'Users',
    title: 'Driver & Manager Training',
    description: 'Skills improvement seminars, workshops, and ongoing progress monitoring for drivers and managers across Nigeria.',
    href: '/solutions#training',
  },
  {
    icon: 'Gauge',
    title: 'Speed Limiting Devices',
    description: 'Sales, installation, and maintenance of tamper-resistant speed limiters for safety and regulatory compliance.',
    href: '/solutions#speed',
  },
  {
    icon: 'BarChart3',
    title: 'Fleet Consulting & Outsourcing',
    description: 'A center of excellence across the entire fleet management value chain — from audits to outsourced fleet operations.',
    href: '/solutions#consulting',
  },
  {
    icon: 'Package',
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain planning, procurement services, and supplier evaluation to optimize your logistics network.',
    href: '/solutions#supply-chain',
  },
]
```

---

### 5.7 `AboutSplit.tsx`

**Layout:** `grid grid-cols-2` (no gap — flush)

**Left panel** (`bg-bpl-off-white px-20 py-24`):
- Subtle circle decoration: bottom-right, `w-72 h-72 rounded-full bg-bpl-blue/[0.04]`
- Section label: "Our Story"
- Giant year: `font-display text-[90px] font-extrabold text-bpl-blue/10 leading-none tracking-[-0.04em]` — "2001"
  - Hover: `text-bpl-blue/16` (transition)
- H2: "Two decades shaping Nigerian fleet safety"
- Divider: `h-px bg-bpl-light-gray my-7`
- Body text (2 paragraphs)
- Partner tags: MiX by Powerfleet (blue dot) + Elson Truck Technology (tan dot)

**Right panel** (`bg-bpl-navy px-20 py-24 text-white`):
- Vision block: blue-light uppercase label "Our Vision" + 17px/300 text
- Divider: `h-px bg-white/[0.07]`
- Mission block: muted red label "Our Mission" + text
- Divider
- 2×2 mini stat grid: 150+ clients, 24yr experience, 6000+ devices, 2001 founded

---

### 5.8 `ProductsGrid.tsx`

**Layout:** `grid grid-cols-3 gap-5`

**Each product card:**
- `bg-white border border-bpl-light-gray rounded-xl overflow-hidden`
- Hover: `border-bpl-blue -translate-y-[5px] shadow-[0_12px_36px_rgba(0,120,212,0.10)]`
- **3D tilt**: `perspective(700px) rotateY(x*6deg) rotateX(-y*4deg)`

**Image area** (`h-[180px] relative overflow-hidden bg-bpl-navy-mid`):
- `<Image>` from `next/image`, `fill`, `object-cover`, `className="brightness-90"`
- Hover: `scale-105 transition-transform duration-500`
- Image src: `/images/products/{slug}.jpg`
- Fallback: placeholder SVG icon (truck/tanker outline in white, 30% opacity) on dark gradient background
- Tag overlay: `absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] uppercase text-white bg-bpl-blue/85 px-2.5 py-1 rounded backdrop-blur-sm`

**Body** (`p-[22px]`):
- Product name: `font-display text-[15px] font-semibold text-bpl-navy`
- Description: `text-[13px] text-bpl-body leading-[1.6]`
- "Enquire now →": hidden, reveal on hover

**Products data:**
```ts
export const PRODUCTS = [
  {
    slug: 'mix-vision',
    tag: 'Video Telematics',
    name: 'MiX Vision',
    description: '72-hour rolling video capture — in-cab and forward-facing — for incident context and accountability.',
  },
  {
    slug: 'mix-rovi',
    tag: 'In-Cab Display',
    name: 'MiX Rovi II',
    description: 'Android-powered 7" programmable display with navigation, job dispatching, and real-time alerts.',
  },
  {
    slug: 'fuel-monitor',
    tag: 'Fuel Management',
    name: 'Fuel Monitoring System',
    description: 'Detect anomalies, prevent theft, and identify inefficient driving practices before they become costly.',
  },
  {
    slug: 'mix4000',
    tag: 'Fleet Hardware',
    name: 'MiX4000 Onboard Computer',
    description: 'GPS + GSM onboard computer enabling the full MiX Fleet Manager Premium platform on any vehicle.',
  },
  {
    slug: 'speed-limiter',
    tag: 'Safety Hardware',
    name: 'Tamper-Resistant Speed Limiter',
    description: 'Electronic speed control with data logging, tamper-proof design, and automatic activation.',
  },
  {
    slug: 'axle-sensor',
    tag: 'Telematics',
    name: 'Wireless Axle Load Sensor',
    description: 'GNOM DDE S7 pressure sensor for axle load monitoring and overload prevention on air suspension vehicles.',
  },
]
```

**Image drop-in instructions** (comment in code):
```tsx
// DROP YOUR 4K PRODUCT IMAGES HERE:
// public/images/products/mix-vision.jpg     → MiX Vision dashcam/truck
// public/images/products/mix-rovi.jpg       → in-cab display tablet
// public/images/products/fuel-monitor.jpg   → tanker / fuel system
// public/images/products/mix4000.jpg        → GPS hardware device
// public/images/products/speed-limiter.jpg  → speed limiter device / truck cab
// public/images/products/axle-sensor.jpg    → truck axle / wheels
// Recommended: 1200×630px minimum, 16:9, compressed JPG
```

---

### 5.9 `ClientsCarousel.tsx`

**Layout:** Full-width, `bg-white py-[72px] overflow-hidden`

**Structure:**
```
"Trusted by Nigeria's most demanding enterprise fleets"  ← center label
[ Track 1 scrolling LEFT  → → → → → ]
[ Track 2 scrolling RIGHT ← ← ← ← ← ]
```

**Edge fade mask:**
```css
mask-image: linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%);
```

**Each track:** `flex gap-5 w-max` + duplicate content for seamless loop
- Track 1: `animation: slide-left 28s linear infinite`
- Track 2: `animation: slide-right 32s linear infinite` (slightly slower, counter)
- Both: `hover:[animation-play-state:paused]`

**Each client card:** `flex items-center gap-3 px-7 py-[14px] bg-bpl-off-white border-[1.5px] border-bpl-light-gray rounded-[10px] whitespace-nowrap`
- Hover: `border-bpl-blue bg-bpl-blue-pale text-bpl-blue -translate-y-[3px] shadow-[0_6px_18px_rgba(0,120,212,0.10)]`
- Icon circle: `w-8 h-8 rounded-[6px] flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0`

**Client data (Track 1):**
```ts
const CLIENTS_TRACK_1 = [
  { initials: 'SH', name: 'Shell Nigeria',   color: '#CC0000' },
  { initials: 'TE', name: 'TotalEnergies',   color: '#E4002B' },
  { initials: 'DH', name: 'DHL Logistics',   color: '#FFCC00', textColor: '#333' },
  { initials: 'LA', name: 'Lafarge Africa',  color: '#005CA9' },
  { initials: 'BH', name: 'Baker Hughes',    color: '#007AC9' },
  { initials: 'WF', name: 'Weatherford',     color: '#0054A0' },
  { initials: 'NV', name: 'NOV',             color: '#003087' },
  { initials: 'OV', name: 'OVH Energy',      color: '#F47920' },
  { initials: 'BG', name: 'BG Nigeria',      color: '#00A550' },
]
```

**Client data (Track 2):**
```ts
const CLIENTS_TRACK_2 = [
  { initials: 'TB', name: 'TravelBeta',      color: '#6B21A8' },
  { initials: 'CH', name: 'Chevron Nigeria', color: '#1D4ED8' },
  { initials: 'JM', name: 'JMG Limited',     color: '#059669' },
  { initials: 'EL', name: 'Elson Tech',      color: '#B45309' },
  { initials: 'MX', name: 'MiX Powerfleet',  color: '#0078D4' },
  { initials: 'SB', name: 'Schlumberger',    color: '#7C3AED' },
  { initials: 'HL', name: 'Halliburton',     color: '#DC2626' },
  { initials: 'AG', name: 'Agip Energy',     color: '#16A34A' },
]
```

---

### 5.10 `Testimonial.tsx`

**Layout:** `bg-bpl-navy` full-width, `grid grid-cols-[1fr_2fr] gap-20 items-center px-20 py-24 max-w-site mx-auto`

- Left: giant `"` mark — `font-display text-[130px] font-extrabold text-bpl-blue/18 leading-none`
  - Hover on section: brightens to `/30`
- Right: quote text `text-[22px] font-light italic text-white/88 leading-[1.68]`
- Attribution: `text-[12px] font-semibold tracking-[0.08em] uppercase text-bpl-blue-light`
  - Name + role in muted white

**Testimonial data:**
```ts
{
  quote: "The number of incidents and reckless driving has reduced to the barest minimum. BG Nigeria Management is really impressed with the performance of the BPL team.",
  name:  "Mike Akeh",
  role:  "Security & Transport Coordinator, BG Nigeria",
}
```

---

### 5.11 `CtaBand.tsx`

**Layout:** `bg-bpl-blue px-20 py-20 flex items-center justify-between gap-10 relative overflow-hidden`

**Decorative circles** (absolute, right side, white/5 and white/4):
- Large: `w-[400px] h-[400px] rounded-full bg-white/[0.05] absolute right-[-80px] top-1/2 -translate-y-1/2`
- Small: `w-[200px] h-[200px] rounded-full bg-white/[0.04] absolute right-[80px] top-1/2 -translate-y-1/2`

**Content:**
- H: `font-display text-[32px] font-bold text-white tracking-[-0.02em]`
- Sub: `text-[15px] text-white/70`
- Text: "Ready to transform your fleet operations?" + "Talk to Nigeria's leading fleet management specialists today."

**Buttons:** White btn + Outline white btn

---

### 5.12 `Footer.tsx`

**Layout:** `bg-bpl-navy px-20 pt-[68px] pb-8 border-t border-white/[0.05]`

**Grid:** `grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 max-w-site mx-auto mb-14`

**Column 1 (Brand):**
- Logo wordmark: "Best Practices **Limited**" (Limited in blue-light)
- Tagline
- Contact info (address, email, phones)

**Columns 2-4 (Links):**
- Solutions: Vehicle Tracking, Fleet Maintenance, Driver Training, Speed Limiting, Fleet Consulting
- Products: MiX Vision, MiX Rovi II, Fuel Monitoring, Speed Limiters, MiX4000
- Company: Who We Are, Clients, Careers, Blog, Contact

**Bottom bar:** `border-t border-white/[0.06] pt-6 flex justify-between items-center`
- Copyright text
- Badges: "MiX Partner" + "Est. 2001" (`bg-bpl-blue/14 text-bpl-blue-light text-[11px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded`)

---

## 6. SHARED HOOKS

### `useCountUp.ts`
```ts
import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}
```

### `useScrollReveal.ts`
```ts
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}
```

### `useMapTilt.ts`
```ts
import { useRef, useCallback } from 'react'

export function useMapTilt() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
    const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
    wrapperRef.current.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 8}deg) scale(1.02)`
    wrapperRef.current.style.transition = 'transform 0.1s ease-out'
  }, [])
  const onMouseLeave = useCallback(() => {
    if (!wrapperRef.current) return
    wrapperRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    wrapperRef.current.style.transition = 'transform 0.6s ease'
  }, [])
  return { wrapperRef, onMouseMove, onMouseLeave }
}
```

---

## 7. SHARED UI COMPONENTS

### `RevealWrapper.tsx`
Framer Motion wrapper for scroll-triggered entrance:
```tsx
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left'
}

export function RevealWrapper({ children, delay = 0, className, direction = 'up' }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 28 : 0, x: direction === 'left' ? -20 : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  )
}
```

### `TiltCard.tsx`
3D tilt wrapper for service and product cards:
```tsx
'use client'
import { useRef, MouseEvent, ReactNode } from 'react'

interface Props { children: ReactNode; className?: string; maxTilt?: number }

export function TiltCard({ children, className, maxTilt = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    ref.current.style.transform = `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * (maxTilt * 0.7)}deg) translateZ(4px)`
    ref.current.style.transition = 'transform 0.1s ease-out'
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    ref.current.style.transition = 'transform 0.5s ease'
  }
  return <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}
```

### `Button.tsx`
```tsx
import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'white' | 'outline-white'

interface Props {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary:       'bg-bpl-blue text-white hover:bg-bpl-blue-light hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,120,212,0.3)]',
  outline:       'bg-transparent text-bpl-navy border-[1.5px] border-[#CBD5E1] hover:border-bpl-blue hover:text-bpl-blue hover:bg-bpl-blue-pale hover:-translate-y-px',
  white:         'bg-white text-bpl-blue font-bold hover:bg-bpl-off-white hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]',
  'outline-white':'bg-transparent text-white border-2 border-white/35 hover:border-white hover:bg-white/[0.08] hover:-translate-y-px',
}

export function Button({ children, href, variant = 'primary', className, onClick }: Props) {
  const cls = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-[180ms] cursor-pointer',
    variants[variant], className
  )
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button className={cls} onClick={onClick}>{children}</button>
}
```

---

## 8. CONTENT FILE (`lib/content.ts`)

All copy lives here — no hardcoded strings in components:

```ts
export const SITE = {
  name:     'Best Practices Limited',
  tagline:  "Nigeria's Fleet Intelligence Leader",
  founded:  2001,
  phone1:   '08030762820',
  phone2:   '09054129056',
  email:    'marketing@bestpracticesltd.ng',
  address:  '15th Floor Eleganza House, 15B Joseph Wesley Street, Off Broad Street, Lagos',
  facebook: 'https://web.facebook.com/FleetMgtLimited/',
}

export const HERO = {
  eyebrow:  "Nigeria's Fleet Intelligence Leader · Est. 2001",
  h1:       ['Nigeria\'s Fleet.', 'Tracked in Real‑Time.', 'Built for Safety.'],
  h1Accent: 'Real‑Time.',   // word to colour blue
  sub:      'Best Practices Limited delivers fleet management, real-time vehicle tracking, and driver safety solutions for enterprise fleets across Nigeria — powered by MiX by Powerfleet technology.',
  cta1:     'Explore Solutions',
  cta2:     'Our Track Record',
}

export const ABOUT = {
  year: '2001',
  storyP1: 'Founded in 2001, Best Practices Limited became Nigeria\'s strategic partner for MiX Telematics South Africa and Elson Truck Technology — deploying GPS tracking, road speed limiters, and fleet management SaaS across the country\'s most demanding enterprise fleets.',
  storyP2: 'Today we serve oil & gas, FMCG, construction, and transport — with Shell, TotalEnergies, DHL, and Lafarge among our valued clients.',
  vision:  'To be the Fleet Solutions & Value Added Services provider of choice — with good returns on investment for fleet owners and operators.',
  mission: 'To provide innovative fleet solutions and services with focus on Cost Reduction, Efficiency and Safety — the CES principle.',
}

export const TESTIMONIALS = [
  {
    quote: 'The number of incidents and reckless driving has reduced to the barest minimum. BG Nigeria Management is really impressed with the performance of the BPL team.',
    name:  'Mike Akeh',
    role:  'Security & Transport Coordinator, BG Nigeria',
  },
]
```

---

## 9. NEXT.JS CONFIG

### `next.config.ts`
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 1080, 1920],
  },
  compress: true,
}

export default nextConfig
```

### `app/layout.tsx` — Root metadata
```ts
export const metadata = {
  title:       'Best Practices Limited — Fleet Management Nigeria',
  description: "Nigeria's leading fleet management support services company. Vehicle tracking, speed limiters, driver training and fleet consulting since 2001.",
  keywords:    'fleet management Nigeria, vehicle tracking, GPS tracking Nigeria, speed limiter, driver training, Best Practices Limited, MiX Telematics Nigeria',
  openGraph: {
    title:       'Best Practices Limited',
    description: "Nigeria's Fleet Intelligence Leader since 2001",
    url:         'https://bestpracticesltd.ng',
    siteName:    'Best Practices Limited',
    locale:      'en_NG',
    type:        'website',
  },
}
```

---

## 10. BUILD ORDER

Execute in this exact sequence. Complete each step fully before moving to the next.

```
STEP 1 — Scaffold
  npx create-next-app@latest bpl-website --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
  cd bpl-website
  npm install framer-motion lucide-react

STEP 2 — Config
  [ ] Write tailwind.config.ts  (Section 3.2)
  [ ] Write app/globals.css     (Section 3.1 tokens + base resets + animation keyframes)
  [ ] Write next.config.ts      (Section 9)
  [ ] Write lib/content.ts      (Section 8)
  [ ] Write lib/types.ts        (interfaces for Service, Product, Client, Stat)
  [ ] Write lib/utils.ts        (cn() helper using clsx/tailwind-merge)
  npm install clsx tailwind-merge

STEP 3 — Nigeria map data
  [ ] Copy public/nigeria.svg from source
  [ ] Write lib/nigeria-paths.ts  (all 37 state path data as typed array)

STEP 4 — Shared UI components
  [ ] components/ui/Button.tsx
  [ ] components/ui/RevealWrapper.tsx
  [ ] components/ui/TiltCard.tsx
  [ ] components/ui/SectionLabel.tsx

STEP 5 — Hooks
  [ ] hooks/useCountUp.ts
  [ ] hooks/useScrollReveal.ts
  [ ] hooks/useMapTilt.ts

STEP 6 — Layout
  [ ] components/layout/Nav.tsx
  [ ] components/layout/Footer.tsx
  [ ] app/layout.tsx  (fonts + metadata + Nav + Footer wrapper)

STEP 7 — Map component
  [ ] components/map/NigeriaMap.tsx  (most complex — do this carefully)
  Test: render NigeriaMap alone on a dark bg, verify all states show, routes draw, trucks animate

STEP 8 — Home sections (in order)
  [ ] components/home/HeroSection.tsx   (includes NigeriaMap)
  [ ] components/home/Ticker.tsx
  [ ] components/home/StatsBand.tsx     (with useCountUp)
  [ ] components/home/ServicesGrid.tsx  (with TiltCard)
  [ ] components/home/AboutSplit.tsx
  [ ] components/home/ProductsGrid.tsx  (with image slots + TiltCard)
  [ ] components/home/ClientsCarousel.tsx
  [ ] components/home/Testimonial.tsx
  [ ] components/home/CtaBand.tsx

STEP 9 — Home page
  [ ] app/page.tsx  (assemble all sections)
  [ ] Run: npm run dev — verify full homepage renders

STEP 10 — Inner pages (shells only, content later)
  [ ] app/about/page.tsx
  [ ] app/solutions/page.tsx
  [ ] app/products/page.tsx
  [ ] app/contact/page.tsx
  [ ] app/careers/page.tsx

STEP 11 — Polish
  [ ] Verify all Framer Motion reveals work on scroll
  [ ] Verify 3D tilt on map, service cards, product cards
  [ ] Verify stat counters fire on scroll
  [ ] Verify client carousel loops seamlessly
  [ ] Verify nav scroll shadow
  [ ] Verify state tooltip on map hover
  [ ] Check mobile layout (basic responsiveness)
  [ ] Run: npm run build — fix any TypeScript errors
```

---

## 11. ANIMATION KEYFRAMES (`globals.css`)

```css
/* Ticker scroll */
@keyframes slide-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes slide-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* Map route draw-on */
@keyframes draw-route {
  to { stroke-dashoffset: 0; }
}

/* City pulse ring */
@keyframes ring-out {
  0%   { r: 6;  opacity: 0.65; }
  100% { r: 18; opacity: 0;    }
}

/* Dot pulse (eyebrow, live indicator) */
@keyframes dot-pulse {
  0%, 100% { opacity: 1;   transform: scale(1);    }
  50%      { opacity: 0.3; transform: scale(0.6);  }
}

/* Stat bar hover */
@keyframes bar-expand {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

---

## 12. REFERENCE FILES

| File | Location | Purpose |
|---|---|---|
| HTML prototype | `bpl_homepage_v2.html` | Visual reference — pixel-perfect source of truth |
| Content doc | `BPL_content_master.md` | All copy, stats, clients, product descriptions |
| Nigeria SVG | `nigeria.svg` | 37-state SVG map source — copy to `public/` |

---

## 13. QUALITY CHECKLIST

Before considering the build complete, verify every item:

**Visual**
- [ ] Light/dark section rhythm matches prototype (white → navy → white → off-white → white → navy → blue → navy)
- [ ] Hero: white left, navy right, flush with no gap
- [ ] All BPL brand colors used correctly (Blue `#0078D4`, Navy `#0D1B2A`, Red `#CC0000`)
- [ ] Syne used for all headings, Inter for all body text
- [ ] Ticker is seamlessly looping, no jump

**Interactions**
- [ ] Map tilts in 3D on mouse move, springs back on leave
- [ ] All 37 state names show on hover tooltip
- [ ] Route lines animate drawing on page load
- [ ] Three truck dots animate along routes
- [ ] Service card icons flip/rotate on hover
- [ ] Service card blue bar slides in from left on hover
- [ ] Product card images zoom on hover
- [ ] Product cards tilt in 3D
- [ ] Client carousel pauses on hover
- [ ] Stat numbers count up from 0 on scroll
- [ ] Nav gains shadow on scroll past 20px

**Performance**
- [ ] `next/image` used for all product images (no raw `<img>`)
- [ ] Fonts loaded via `next/font` (no Google CDN link)
- [ ] `'use client'` only where needed (Framer Motion, event handlers, hooks)
- [ ] Server components where possible (static content sections)
- [ ] `npm run build` passes with no errors

---

*End of brief. Build the project in the order specified. Do not deviate from the design tokens, component structure, or interaction behaviour defined above.*
