# Carlson Vineyards — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.carlsonvineyards.com/ (Palisade, CO).
Preview: https://cv.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

All purchases stay on the winery's existing WineDirect store: every "Shop", "Cart", "Log in" and "Join" button links to the matching page on carlsonvineyards.com (product pages, category pages, cart, member login and the four club sign-up pages).

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `carlson-vineyards` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `cv.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, 2026-11-24). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## Design

- Their own logo: the black "CV" crescent roundel, hotlinked from carlsonvineyards.com and set on a cream plate (its letters are transparent).
- Colors from the original site and logo: logo black, the site's brick red #a63737 and a deeper wine, with Palisade-peach, Book Cliffs sand and a vine-leaf sage added.
- Fraunces (soft, slightly playful serif, matching labels like Tyrannosaurus Red and the Laughing Cat) with Instrument Sans.
- Motifs: the Mount Garfield / Book Cliffs mesa silhouette over vineyard rows as section edges, the open "C" crescent from the logo, a "flight board" of six bottles, and Polaroid snapshots for the family story.
- Hero uses the founders' own line, "Why make drinking wine complicated?", over their Mount Garfield vineyard photo.
- Both tasting rooms with hours sit directly under the hero; the wine club chart (previously a 1000px image) is rebuilt as real, readable cards.

## What changed from the current site

- Replaces the boxed, Times-style WineDirect (Vin65) template with a full-width, mobile-first page.
- The wine club comparison is text instead of an image (the club page also references a second copy of that image that returns 404).
- The empty Events calendar and the homepage "Be the first to review this item" are replaced with real customer reviews already on their product pages.
- Award ("Best Winery", Daily Sentinel 2016–2020) and press moved from a buried "In the News" page to the hero and a press strip.

## Owner should confirm

- Featured wines, vintages and prices are from the online store on 2026-10-20; confirm the lineup to feature.
- Reviews are verbatim from product pages on carlsonvineyards.com (Mike, Jean H, Tina Clarke, Alex Lowe); confirm they are happy to feature them. No Google rating is shown (not confirmed).
- "Best of the West" / Best Winery 2016–2020 is the latest award listed; add any newer awards.
- "Since 1988" (winery founded in the packing shed; vines planted 1981).
- Club tiers, shipping prices and shipping states are from the current club page; confirm for 2027.
- Product URLs contain "-Copy" slugs on the current store (e.g. Tyrannosaurus-Red--23-Copy); they work today but may change.
- Photos, bottle shots and logo are hotlinked from carlsonvineyards.com and must be replaced with licensed originals before launch.
