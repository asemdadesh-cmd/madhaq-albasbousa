# PROJECT.md — مذاق البسبوسة

_Last updated: 2026-10-07_

## Overview
V1 demo storefront for **مذاق البسبوسة** (Tripoli, est. 2020, 0914153311). Sells whole trays (طاجين/صينية),
boxes (بوكس) and cakes (قالب) in small/medium/large. Customers order in ~30–60 s and the order opens in WhatsApp
as a formatted message (`MB-####`). No backend, no accounts, no env vars.

## Design system (premium redesign, 2026-10-06)
Deep pistachio green `#1f3b2f` + warm ivory `#f6f1e7` + brass hairlines `#9f7a42`, with the logo's cocoa
`#7a3a1c` for accent words. **Amiri** (classic Naskh serif) for display, **IBM Plex Sans Arabic** for the
interface, both self-hosted via @fontsource. Hairlines instead of heavy shadows, generous whitespace, one
primary CTA per section, a slow "seal" stamp, restrained fade-up reveals (off for reduced motion). Sections:
announcement bar → header (search + basket) → editorial hero with featured product card → value props →
menu (tabs + Arabic-aware search + 2-col phone / 3-col desktop cards) → occasions band with the
"كم شخص عندك؟" planner → 4 steps → sign-off + footer. Stock photos get one shared CDN colour grade
(`src/lib/images.ts`) so they read as a set.

## Motion & the choosing moment
- **Scroll:** hero load choreography (copy rises, photo unveils, seal stamps in), fade-up reveals, section
  titles rising out of a mask, value icons drawing themselves, a ribbon of product names that drifts with
  scroll, parallax on the hero/occasions photos, card photos settling as they enter, header firming up on
  scroll. Scroll-linked parts use CSS scroll timelines (Chrome/Edge/Android; other browsers simply skip them).
  Everything is off for "reduce motion".
- **Choosing (`src/components/TrayPreview.tsx`):** "شوف حجمه على الطاولة": a top-down table with the tray /
  box / cake at the chosen size and one place setting per person it serves. Bigger sizes reveal more cut
  pieces, plates slide in around the table, quantity adds plates and a ×N badge. Each size has a mood line
  (`SIZE_MOODS` / `mood` in `menu.ts`) and each product a tray colour (`tint`).
- **Delight:** the card photo morphs into the product sheet (View Transitions), the price rolls, Android phones
  get a light haptic tick, the photo flies into the basket (`src/lib/motion.ts`), and sending the order ends
  with a stamped seal, a small confetti burst and "صحتين مقدماً!".

## Architecture
Vite 8 + React 19 + TypeScript, plain CSS tokens, self-hosted Amiri + IBM Plex Sans Arabic, build-time pre-render
(`src/entry-server.tsx` + `scripts/prerender.mjs`) and schema.org menu JSON-LD. Cart + contact details in
`localStorage`. Photos hotlinked from Unsplash's CDN (credited in the footer) until the shop's own photos arrive.

## Where things live
- `src/config/menu.ts` — products, unit type, tasting `notes`, sizes (price, serves, dimensions, image) ← edit for the real menu
- `src/config/store.ts` — phone/WhatsApp, hours, notes, delivery areas, `demoMode`
- `src/lib/` — cart reducer, catalog helpers, WhatsApp message builder (+ tests)
- `src/components/` — UI; `brand/` — logo sources

## Deployment
Vercel project `madhaq-albasbousa` (team `asemdadesh-5431s-projects`), Git-linked to this repo: push to `main`
→ production at **https://madhaq-albasbousa.vercel.app**; every other branch/PR gets a preview URL. No env vars,
no build settings (Vite preset). `vercel.json` holds CSP, security headers and asset caching. The build fails if
`scripts/predeploy.mjs` finds broken references.

## Known issues
Demo prices/sizes/photos; delivery fee confirmed on WhatsApp (not computed); hours and pickup location are
placeholders; كنافة نوتيلا shows a plain kunafa tray photo; orders live only in WhatsApp. Stock photos come
from different photographers; a matched, art-directed set (generated in Figma/Canva or shot by the shop) is
the biggest remaining upgrade. This environment's network blocks downloading generated images (figma.com /
canva.com) until those hosts are allowed.

## Changelog
- **2026-10-07** — Redesign + motion merged to `main` (PR #1) and deployed to production by Vercel
  (deployment status: success).
- **2026-10-06** — Motion + choosing experience: "see it on the table" tray drawing with plates per person,
  size moods, rolling price, card-to-sheet photo morph, fly-to-basket, haptics, sealed "صحتين مقدماً!"
  finale, scroll choreography (reveals, ribbon, parallax). Tests 18/18, e2e clean.
- **2026-10-06** — Premium redesign: new design system (green/ivory/brass, Amiri + Plex), editorial hero
  with seal stamp and featured card, value props, menu search, tasting notes, refined cards/sheets/cart bar,
  feminine unit labels (صينية كاملة), odd last card spans the row on phones. Fixed a phone layout bug where
  the tabs row widened the page. Tests 17/17, e2e clean, no horizontal overflow.
- **2026-10-06** — V1: tray-based menu, size picker, cart, WhatsApp checkout, tray planner, curated photos.
