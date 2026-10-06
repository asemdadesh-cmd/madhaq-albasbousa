# DECISIONS.md — مذاق البسبوسة

_Last updated: 2026-10-06_

### 2026-10-06 — Make choosing a size the memorable moment, with zero animation libraries
**Decision:** The signature interaction is "شوف حجمه على الطاولة", a live SVG table where the tray grows and
place settings appear per person served, plus a card-to-sheet photo morph, fly-to-basket, light haptics and
a sealed finale. Built with CSS, SVG, the Web Animations API, View Transitions and CSS scroll timelines; no
motion library.
**Why:** The shop sells whole trays, and the customer's real question is "is this enough for my people?". The
table answers it visually and makes the moment memorable and specific to this business, not generic
decoration. Native platform features keep the bundle small (no ~40 KB motion library) and degrade gracefully:
browsers without View Transitions or scroll timelines just skip those touches; reduced-motion users get
static, instant states.

### 2026-10-06 — Premium redesign: restraint, serif display, hairlines, one photo grade
**Decision:** Rebuild the visual layer around green/ivory/brass with the logo's cocoa as accent, Amiri for
display and IBM Plex Sans Arabic for UI, hairline-bordered cards instead of shadowed "template" cards, an
editorial hero with a seal stamp, and a single CDN colour grade over the stock photos.
**Why:** The owner found the first design generic. Research on premium web design points to the same levers:
generous whitespace, a classic serif voice, fewer and quieter elements, consistent photography, and avoiding
the tells of generated sites (one generic font everywhere, everything in rounded shadow cards, gradients,
template section stacks). The owner's reference site's strongest asset is its matched photo set; until a
matched set can be generated or shot, one grade makes the stock photos read as a family.
**Trade-off:** ~190 KB of Arabic font files (Amiri 700 + Plex 400/600), acceptable for the brand voice;
stock photos are still the weakest part.

### 2026-10-06 — Own repo + own Vercel project, Git-linked
**Decision:** The shop lives in its own repository (app at the root) with its own Vercel project linked to it.
**Why:** Keeps it fully separate from the owner's tray ledger (`dessert-shop-ledger`) and from the Claude tooling
repo; pushes to `main` deploy with zero settings to remember (no Root Directory, no branch juggling).

### 2026-10-06 — Whole-unit product model, WhatsApp checkout, one config file
**Decision:** Products are trays/boxes/cakes with size variants; cart quantity = number of trays; checkout opens
`wa.me` with a formatted Arabic order. Menu data only in `src/config/menu.ts`.
**Why:** Matches how the shop actually sells and takes orders in Libya; zero backend; the real menu is a 5-minute edit.
