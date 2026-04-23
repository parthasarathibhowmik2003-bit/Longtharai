# Longtharai — Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
- **Button** — CTAs (Buy, Add, Send Message)
- **Input** — Form fields (Name, Email)
- **Textarea** — Contact message field
- **Card** — Product card structure (will heavily customize styling)

### Custom Components
- **ProductCard** — Premium product card with breadcrumb, title, spec, hero image, thumbnails, price row
- **SceneSection** — Full-viewport pinned section wrapper (background + content layers)
- **TypographicBlock** — Large Anton display text with split-word animation support
- **Navigation** — Fixed header with wordmark + nav links
- **GrainOverlay** — Static noise overlay (global)
- **ScrollHint** — Animated chevron (Section 1 only)
- **ProductThumbnail** — Small selectable variant image

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Section 1 wordmark load reveal | GSAP timeline | Auto-play on mount: opacity + scale + y | Low |
| Section 1 tagline stagger | GSAP timeline | Delayed fade/translate in same timeline | Low |
| Section 1 scroll hint pulse | CSS @keyframes | Infinite translateY loop, no library needed | Low |
| Pinned section entrance/exit | GSAP ScrollTrigger | fromTo() with scrub per element, three-phase structure | High |
| Typography word/line stagger | GSAP + SplitText (or custom splitter) | Split by lines, stagger 0.06-0.08 in fromTo | Medium |
| Product card slide-in/out | GSAP ScrollTrigger | fromTo() x: ±55vw → 0, opacity + scale | Medium |
| Background parallax | GSAP ScrollTrigger | Subtle y: -2vh → +2vh across pinned range | Low |
| Product hero float | CSS @keyframes | Infinite y: -6px → +6px, 4s duration | Low |
| Flowing section reveals | GSAP ScrollTrigger | scrub-based opacity + translateY on viewport entry | Low |
| Grid card hover | CSS transitions | transform: translateY(-6px) + image scale(1.03) | Low |
| Contact column slide-in | GSAP ScrollTrigger | fromTo() x: ±6vw → 0 with scrub | Low |
| Global scroll snap | GSAP ScrollTrigger | snap derived from pinned trigger start/end | High |

## Animation Library Choices

**GSAP + ScrollTrigger** — Primary animation engine
- Handles all pinned sections with pin + scrub
- ScrollTrigger snap for landing in settle states
- fromTo() for bidirectional animations

**CSS @keyframes** — Used for:
- Scroll hint pulse (Section 1)
- Product hero float loop (all pinned product cards)
- Hover transitions (grid cards, buttons)

No additional animation libraries needed.

## Project File Structure

```
/mnt/agents/output/app
├── public/
│   └── images/
│       ├── backgrounds/       # 6 scene backgrounds
│       ├── products/          # 5 product hero PNGs + thumbnails
│       └── grain.png          # Noise overlay
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ProductCard.tsx
│   │   ├── GrainOverlay.tsx
│   │   ├── ScrollHint.tsx
│   │   └── ui/               # shadcn components (button, input, etc.)
│   ├── sections/
│   │   ├── Section01Launch.tsx
│   │   ├── Section02Spices.tsx
│   │   ├── Section03Oil.tsx
│   │   ├── Section04Drinks.tsx
│   │   ├── Section05Soybean.tsx
│   │   ├── Section06Rice.tsx
│   │   ├── Section07Purity.tsx
│   │   ├── Section08Catalog.tsx
│   │   └── Section09Contact.tsx
│   ├── hooks/
│   │   └── useScrollSnap.ts   # Global snap configuration
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Dependencies to Install

```bash
# Core
npm install gsap @gsap/react

# Fonts (loaded via Google Fonts in index.html)
# Anton, Inter, IBM Plex Mono
```

## Key Implementation Notes

1. **Pinned Section Pattern**: Each pinned section uses the same structure:
   - Full-viewport container with `position: relative; overflow: hidden`
   - Background image layer with parallax
   - Content layer with typography + product card
   - GSAP ScrollTrigger with `pin: true`, `scrub: 0.6`, `end: "+=130%"`

2. **Z-Index Stacking**: Section 2 = 10, Section 3 = 11, ... Section 7 = 15. This enables visual scene replacement.

3. **Scroll Snap**: Global snap using `ScrollTrigger.create()` with snap function derived from actual pinned section ranges. Only snaps within pinned ranges; flowing sections remain free-scroll.

4. **Product Card**: Shared component across Sections 2-6, accepting props for product data. Positioned absolutely within each pinned section.

5. **Image Preloading**: Background images should be preloaded to avoid flash during pinned section transitions. Use `<img>` with `loading="eager"` or GSAP's preload pattern.

6. **Reduced Motion**: Check `prefers-reduced-motion: reduce` — disable scrubbed transforms, show settle states immediately, disable floating loops.