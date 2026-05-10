# Fix Brief: /about and /solutions Pages
## Instructions for Claude CLI

Read this fully before touching any file. These are surgical fixes to two existing pages. Do not touch anything else — Nav, Footer, homepage, other pages remain untouched.

---

## CONTEXT

The live site is at `https://bpl-websites.vercel.app`. The codebase is a Next.js 14 App Router project with Tailwind CSS and Framer Motion. The design tokens are already defined in `globals.css` and `tailwind.config.ts`. The shared components (`RevealWrapper`, `Button`, `TiltCard`, `SectionLabel`) already exist in `components/ui/`. Use them.

The homepage already demonstrates the correct design language — match it exactly on these two pages.

---

## TASK 1 — Rebuild `app/about/page.tsx`

Replace the entire file. The page has the right content but zero design. Build it with these exact sections in order:

### Section 1: Page Hero Banner
Full-width dark navy hero. Not a split — full width, centered content.

```
Background: bg-bpl-navy
Padding: pt-32 pb-24 (accounts for fixed nav)
Max-width container: max-w-site mx-auto px-20

Layout:
  - Section label (top): "Who We Are" — use SectionLabel component
  - H1: "Nigeria's Fleet Intelligence Pioneer Since 2001"
      font-display text-[52px] font-extrabold text-white tracking-[-0.03em] leading-[1.06]
      max-w-3xl, margin-bottom 20px
  - Subtext: "From a single office in Lagos, we have grown into Nigeria's most trusted fleet
      management partner — serving the country's most demanding enterprise fleets
      across oil & gas, FMCG, construction and transport."
      text-[17px] font-light text-white/60 max-w-2xl leading-[1.75]
  - Two pills at bottom:
      "Est. 2001" — bg-bpl-blue/20 text-bpl-blue-light border border-bpl-blue/30 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full
      "MiX Authorized Partner" — same styling
```

Framer Motion entrance: `initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}` on the text block, delay 0.1s.

---

### Section 2: Story + Images (2-column split)
```
Background: bg-bpl-off-white
Padding: py-24
Grid: grid grid-cols-2 gap-20 max-w-site mx-auto px-20 items-center
```

**Left column (copy):**
```
- Section label: "Our Story"
- Giant year: "2001"
    font-display text-[100px] font-extrabold leading-none tracking-[-0.04em]
    color: text-bpl-blue/[0.12]   ← very faint, decorative
    margin-bottom: -16px  ← pulls it up so H2 overlaps slightly
- H2: "Two decades shaping Nigerian fleet safety"
    font-display text-[36px] font-bold text-bpl-navy tracking-[-0.025em] leading-[1.12]
    margin-bottom: 24px
- Divider: h-px bg-bpl-light-gray my-6
- Paragraph 1:
    "Founded in 2001, Best Practices Limited became Nigeria's strategic partner for
    MiX Telematics South Africa and Elson Truck Technology — deploying GPS tracking,
    road speed limiters, and fleet management SaaS across the country's most demanding
    enterprise fleets."
    text-[15px] text-bpl-body leading-[1.8] mb-4
- Paragraph 2:
    "Today we serve oil & gas, FMCG, construction, and transport industries. Our clients
    include Shell, TotalEnergies, DHL, Lafarge, Baker Hughes, Weatherford, and Chevron Nigeria."
    text-[15px] text-bpl-body leading-[1.8] mb-8
- Partner tags row (flex gap-3):
    Tag 1: blue dot (w-2 h-2 rounded-full bg-bpl-blue) + "MiX by Powerfleet"
    Tag 2: tan dot (bg-[#D4A882]) + "Elson Truck Technology"
    Each tag: inline-flex items-center gap-2 px-4 py-2 bg-white border border-bpl-light-gray
              rounded-md text-[13px] font-medium text-bpl-body
              hover:border-bpl-blue hover:text-bpl-blue transition-colors
```

**Right column (images):**
```
Two stacked images with a slight offset for depth:
  - Use next/image with fill or fixed height
  - Image 1 (top, full width): /images/gallery/gallery-01.jpg
      h-[260px] rounded-xl overflow-hidden relative
      Image: object-cover, brightness-95
  - Image 2 (bottom, offset right): /images/gallery/gallery-09.jpg
      h-[200px] rounded-xl overflow-hidden relative mt-4 ml-8
      Image: object-cover, brightness-95
  - Both images: hover scale-105 transition-transform duration-500
```

RevealWrapper on both columns, left delay 0.1s, right delay 0.25s.

---

### Section 3: Vision / Mission Split
Exactly like the homepage `AboutSplit` component right panel — but here it's full width, split 50/50.

```
No max-width container — full bleed grid
grid grid-cols-2  (no gap, flush)
```

**Left half — Vision** (`bg-bpl-off-white px-20 py-20`):
```
- Small tag: "Our Vision"
    text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue mb-3
    with a 20px blue left bar (flex items-center gap-3, ::before w-5 h-0.5 bg-bpl-blue)
- Quote mark decoration: font-display text-[80px] text-bpl-blue/10 leading-none mb-[-24px]
    the character "
- Body: "To be the Fleet Solutions & Value Added Services provider of choice —
    with good returns on investment for fleet owners and operators."
    text-[20px] font-light text-bpl-navy leading-[1.65]
```

**Right half — Mission** (`bg-bpl-navy px-20 py-20`):
```
- Small tag: "Our Mission"
    text-[11px] font-semibold tracking-[0.12em] uppercase text-bpl-blue-light mb-3
    with a 20px blue-light left bar
- Quote mark decoration: font-display text-[80px] text-bpl-blue/20 leading-none mb-[-24px]
    the character "
- Body: "To provide innovative fleet solutions and services with focus on
    Cost Reduction, Efficiency and Safety — the CES principle."
    text-[20px] font-light text-white/85 leading-[1.65]
```

RevealWrapper on each half, delays 0.1s and 0.2s.

---

### Section 4: Stats Grid
```
Background: bg-bpl-navy-mid  (the slightly lighter navy: #1A2E42)
Grid: grid grid-cols-4
No container padding — full bleed grid
```

Each stat cell:
```
px-10 py-14
border-right: border-r border-white/[0.06]  (last cell: no border)
position: relative overflow-hidden

Top accent bar:
  absolute top-0 left-0 right-0 h-[3px]
  bg-gradient-to-r from-bpl-blue to-bpl-blue-light
  transform scaleX-0 → scaleX-1 on hover (origin-left, transition 0.4s ease)

Number:
  font-display text-[44px] font-extrabold text-white leading-none tracking-[-0.03em] mb-2
  The + suffix: text-bpl-blue-light text-[26px] align-super

Label:
  text-[12px] font-medium tracking-[0.07em] uppercase text-white/40
```

Stats data (hardcoded — no counter animation needed here, keep it simple):
```tsx
const stats = [
  { number: '5,032', suffix: '+', label: 'Drivers & Managers Trained' },
  { number: '6,000', suffix: '+', label: 'IVMS Devices Installed' },
  { number: '1,000', suffix: '+', label: 'Speed Limiters Deployed' },
  { number: '150',   suffix: '+', label: 'Enterprise Clients' },
]
```

RevealWrapper on each cell, stagger delays 0, 0.1, 0.2, 0.3s.

---

### Section 5: Testimonial (reuse existing `Testimonial` component)
If the component already exists at `components/home/Testimonial.tsx`, import and render it directly. Done.

---

### Section 6: CTA Band (reuse existing `CtaBand` component)
Same — import and render `CtaBand` directly.

---

### Final `app/about/page.tsx` structure:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who We Are — Best Practices Limited',
  description: "Nigeria's fleet management pioneer since 2001. Learn about our story, vision, and mission.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <VisionMissionSplit />
      <AboutStats />
      <Testimonial />
      <CtaBand />
    </>
  )
}
```

Build each section as a local component inside `app/about/page.tsx` (not separate files) unless a component already exists. Mark the file `'use client'` at the top since it uses Framer Motion.

---

## TASK 2 — Rebuild `app/solutions/page.tsx`

Replace the entire file. Currently just a list of h2 headings. Needs proper design.

### Section 1: Page Hero Banner
Same pattern as the About hero but different content.

```
Background: bg-bpl-navy
Padding: pt-32 pb-24
Max-width container: max-w-site mx-auto px-20

- Section label: "What We Do"
- H1: "Complete fleet solutions for Nigeria's enterprise fleets"
    font-display text-[52px] font-extrabold text-white tracking-[-0.03em] max-w-3xl
- Sub: "From real-time GPS tracking to driver training and fleet consulting —
    every service built around our CES principle: Cost Reduction, Efficiency, Safety."
    text-[17px] font-light text-white/60 max-w-2xl leading-[1.75]
- CES pills row (flex gap-3 mt-8):
    "Cost Reduction" — bg-bpl-blue/20 text-bpl-blue-light border border-bpl-blue/30
    "Efficiency"     — same
    "Safety"         — bg-bpl-red/20 text-red-400 border border-bpl-red/30
    Each: text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full
```

---

### Section 2: Services Grid
```
Background: bg-white
Padding: py-24
Container: max-w-site mx-auto px-20
```

**Layout:** `grid grid-cols-3 gap-[1px] bg-bpl-light-gray rounded-2xl overflow-hidden border border-bpl-light-gray`

**Each service card** (6 total):
```
Background: bg-white
Padding: p-10
Position: relative overflow-hidden
Cursor: pointer

On hover:
  - background → bg-bpl-off-white
  - bottom blue bar slides in (::after scaleX 0→1, h-[2px], blue gradient, origin-left, 0.35s)

Number badge (top-left):
  font-display text-[13px] font-bold text-bpl-blue/40
  e.g. "01", "02" ... "06"
  margin-bottom: 20px

Icon wrap:
  w-[48px] h-[48px] bg-bpl-blue-pale rounded-[10px]
  flex items-center justify-center mb-5
  On hover: bg-bpl-blue, icon stroke → white, rotate -4deg
  transition: all 0.25s ease

  Icon: Lucide icon, w-5 h-5, stroke-width 1.8
    Vehicle Tracking → MapPin
    Fleet Maintenance → Wrench
    Driver Training   → Users
    Speed Limiting    → Gauge
    Fleet Consulting  → BarChart3
    Supply Chain      → Package

Title:
  font-display text-[17px] font-semibold text-bpl-navy mb-3

Description:
  text-[14px] text-bpl-body leading-[1.68] mb-5

CTA link:
  "Enquire about this service →"
  inline-flex items-center gap-1.5 text-[13px] font-semibold text-bpl-blue
  opacity-0 on default, opacity-100 on card hover
  translateX(-6px) → translateX(0) on hover, transition 0.25s

3D tilt: wrap each card in TiltCard component (maxTilt=6)
```

**Services data** (use this exactly):
```tsx
const SERVICES = [
  {
    number: '01',
    icon: MapPin,
    title: 'Vehicle Tracking & Fleet Management',
    description: 'Real-time GPS tracking and fleet management SaaS that removes operational waste and drives measurable productivity gains. Monitor every vehicle, driver event, and route in real time.',
    href: '/contact',
    id: 'tracking',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Fleet Maintenance Application',
    description: 'Fully integrated maintenance management with state-of-the-art technology. Schedule preventive maintenance, track service history, and keep every vehicle roadworthy and compliant.',
    href: '/contact',
    id: 'maintenance',
  },
  {
    number: '03',
    icon: Users,
    title: 'Driver & Manager Training',
    description: 'Skills improvement seminars, workshops, and ongoing progress monitoring for drivers and fleet managers. Over 5,032 professionals trained across Nigeria since 2001.',
    href: '/contact',
    id: 'training',
  },
  {
    number: '04',
    icon: Gauge,
    title: 'Speed Limiting Devices',
    description: 'Sales, installation, and maintenance of tamper-resistant speed limiters and Elson truck devices. Ensures safety compliance, reduces fuel consumption, and protects your fleet.',
    href: '/contact',
    id: 'speed',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Fleet Consulting & Outsourcing',
    description: 'A focused center of excellence in fleet management value chain activities. From fleet audits and best practice reviews to fully outsourced fleet operations management.',
    href: '/contact',
    id: 'consulting',
  },
  {
    number: '06',
    icon: Package,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain planning and execution. Procurement services, supplier evaluation and development, and interim management support for complex logistics operations.',
    href: '/contact',
    id: 'supply-chain',
  },
]
```

RevealWrapper on each card row: first row (cards 1–3) delay 0.1s, second row (cards 4–6) delay 0.2s. Or stagger individually 0, 0.1, 0.2.

---

### Section 3: CES Principle Banner
Full-width band between the grid and the stats.

```
Background: bg-bpl-navy
Padding: py-20
Container: max-w-site mx-auto px-20
Layout: grid grid-cols-3 gap-12

Left column (col-span-1):
  Section label: "The CES Principle"
  H3: "Everything we do is built on three foundations."
      font-display text-[28px] font-bold text-white leading-[1.2]

Right two columns (col-span-2):
  Three principle items side by side (flex or grid-cols-3):

  Each item:
    - Letter: "C" / "E" / "S"
        font-display text-[64px] font-extrabold leading-none
        C = text-bpl-blue-light
        E = text-bpl-blue-light/70
        S = text-bpl-blue-light/40
    - Word: "Cost Reduction" / "Efficiency" / "Safety"
        font-display text-[18px] font-bold text-white mt-1
    - Description: 13px text-white/50 leading-relaxed mt-2
        C: "Remove waste, lower fuel and operational costs across every vehicle in your fleet."
        E: "Increase productivity through better routing, utilisation, and real-time visibility."
        S: "Protect drivers, vehicles, and cargo with monitoring, training, and speed compliance."
```

---

### Section 4: Why Choose BPL (3-column stat strip)
```
Background: bg-bpl-off-white
Padding: py-20
Container: max-w-site mx-auto px-20
Grid: grid grid-cols-3 gap-12
```

Three proof points:
```
Item 1:
  Number: "24+"
    font-display text-[52px] font-extrabold text-bpl-blue tracking-[-0.03em]
  Label: "Years in Nigeria"
  Body: "The longest-serving fleet management partner in the country. We know the roads, the regulations, and the challenges."

Item 2:
  Number: "6,000+"
    font-display text-[52px] font-extrabold text-bpl-blue
  Label: "Devices Deployed"
  Body: "More IVMS devices installed across Nigerian fleets than any other provider. Proven at scale."

Item 3:
  Number: "150+"
    font-display text-[52px] font-extrabold text-bpl-blue
  Label: "Enterprise Clients"
  Body: "Shell, TotalEnergies, DHL, Lafarge, Chevron — Nigeria's most demanding fleets trust BPL."
```

Each number: `text-bpl-blue`
Label: `text-[13px] font-semibold tracking-[0.08em] uppercase text-bpl-body mt-1 mb-3`
Body: `text-[14px] text-bpl-body leading-[1.7]`

---

### Section 5: CTA Band
Reuse the existing `CtaBand` component.

---

### Final `app/solutions/page.tsx` structure:

```tsx
'use client'
import { MapPin, Wrench, Users, Gauge, BarChart3, Package } from 'lucide-react'

// local section components defined in this file

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <ServicesGrid />
      <CESBanner />
      <WhyBPL />
      <CtaBand />
    </>
  )
}
```

---

## IMPLEMENTATION NOTES

**Imports to use in both files:**
```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
// Import existing shared components:
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { TiltCard } from '@/components/ui/TiltCard'
import { Button } from '@/components/ui/Button'
import CtaBand from '@/components/home/CtaBand'
import Testimonial from '@/components/home/Testimonial'  // about page only
```

**Do not recreate** `RevealWrapper`, `TiltCard`, `Button`, `CtaBand`, or `Testimonial` — they exist. Just import them.

**CSS classes** use the existing Tailwind tokens from `tailwind.config.ts`:
- `bg-bpl-navy` = `#0D1B2A`
- `bg-bpl-navy-mid` = `#1A2E42`
- `bg-bpl-off-white` = `#F7F9FC`
- `bg-bpl-blue` = `#0078D4`
- `text-bpl-blue-light` = `#3399E0`
- `bg-bpl-light-gray` = `#EEF2F7`
- `text-bpl-body` = `#3D5166`
- `font-display` = Syne

**Framer Motion pattern** (consistent with the rest of the site):
```tsx
<motion.div
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
>
```

**Image paths** that definitely exist on the server (confirmed from the live site):
- `/images/gallery/gallery-01.jpg` ✓
- `/images/gallery/gallery-09.jpg` ✓

**anchor IDs** — each service card's wrapping div needs `id={service.id}` so the footer nav links (`/solutions#tracking`, etc.) scroll correctly.

---

## CHECKLIST — verify before committing

**About page:**
- [ ] Hero renders on navy background with white text
- [ ] "2001" year is large, faint blue, overlaps H2 slightly
- [ ] Two-column story section: copy left, two stacked images right
- [ ] Vision (off-white) / Mission (navy) split is exactly 50/50, flush, no gap
- [ ] Stats grid shows all 4 numbers across one full-width row
- [ ] Testimonial and CtaBand appear at the bottom

**Solutions page:**
- [ ] Hero renders on navy background
- [ ] CES pills (Cost Reduction, Efficiency, Safety) show in hero
- [ ] Service cards grid is 3-column with correct number badges "01"–"06"
- [ ] Each card has icon, number, title, description, CTA
- [ ] Icon wrap turns blue on card hover, icon turns white
- [ ] CTA link hidden by default, slides in on hover
- [ ] Each card has `id` attribute for anchor navigation
- [ ] CES Principle banner (navy, 3 big letters C/E/S) renders between grid and stats
- [ ] Why Choose BPL section has 3 large blue numbers
- [ ] CtaBand appears at bottom

**Both pages:**
- [ ] Framer Motion reveals fire on scroll
- [ ] No TypeScript errors (`npm run build` clean)
- [ ] Matches the visual quality of the homepage
