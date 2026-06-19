# Architectural Decision Log: Smart Marketing Digital

This document logs the major engineering and architectural decisions made during the design phase of the Smart Marketing Digital website.

---

## ADR 1: Astro for Framework Core

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** The site is a marketing landing page for a solo consultant. Load speed, search engine indexing (SEO), and conversion are the primary goals.
* **Alternatives Considered:** Next.js, Vite + React SPA.
* **Decision:** Astro (Static-First build mode).
* **Rationale:** Next.js and React SPAs require shipping a JavaScript runtime to compile layout grids, which can slow down mobile LCP. Astro generates 100% pure static HTML at build time for the navigation, copy sections, and styling grids, while selectively enabling hydration for interactive components.

---

## ADR 2: Preact for Interactive Islands

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** The page requires some complex interactive state logic (the performance dashboard and multi-step qualification lead modal).
* **Alternatives Considered:** React, Svelte, Vanilla JavaScript.
* **Decision:** Preact.
* **Rationale:** Preact mirrors React's Virtual DOM API and hook structure but compiles to a minuscule ~3KB footprint (compared to React's 40KB+). This enables us to write clean, state-driven components without bloating the client-side bundle.

---

## ADR 3: Custom SVG Charts over Visualization Libraries

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** The Hero section requires animated visualization cards showing mock performance data (Leads, CPL, ROAS, Funnels, Channels, and Revenue).
* **Alternatives Considered:** Recharts, Chart.js, ApexCharts.
* **Decision:** Custom responsive SVGs styled and animated via CSS.
* **Rationale:** Traditional charting packages add 50KB to 100KB of external JS dependencies. Since the dashboard charts are mock indicators designed to look premium and animate on-load, we can render raw SVG tags (`<path>`, `<circle>`) and use CSS keyframe animations (like animating `stroke-dashoffset`) to achieve equivalent visual excellence at 0KB library overhead.

---

## ADR 4: Pre-qualifying Intake Form over Direct Calendar Booking

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** The website needs to capture leads through a "Book a Strategy Call" or similar CTA.
* **Alternatives Considered:** Direct Calendly Embed, Email Form.
* **Decision:** Multi-step modal intake form ("Request a Free Strategy Review").
* **Rationale:** Direct booking tools allow low-intent visitors to schedule calls without vetting. The 3-step intake form pre-screens leads by gathering name, email, website URL, business type, marketing challenge, current budget, and optimization goals. Qualified opportunities are subsequently sent scheduling links manually.

---

## ADR 5: Scoped Vanilla CSS over Tailwind CSS

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** We need to implement a modern, high-end theme with custom typography, gradients, animations, and transitions.
* **Alternatives Considered:** Tailwind CSS, Sass, CSS Modules.
* **Decision:** Scoped Vanilla CSS.
* **Rationale:** Astro supports scoped styling out of the box (styles inside `<style>` blocks in `.astro` files do not bleed into other parts of the site). Vanilla CSS offers direct control over custom path animations, gradients, and custom properties without introducing external dependencies or build integrations.
