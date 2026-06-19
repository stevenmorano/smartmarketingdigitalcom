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

---

## ADR 6: Ethereal Glass Vantablack Theme & Premium Typography

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Elevating the visual aesthetics of the landing page to agency-level premium standard (Awwwards/Apple/Linear-tier).
* **Alternatives Considered:** Flat card designs, generic system font stacks (`Inter`, `system-ui`).
* **Decision:** Ethereal Glass (deep OLED black `#050505` background, Vantablack `#0c0c0e` card containers with `backdrop-filter: blur(24px)` and pure white/8% borders) and premium typography (`Plus Jakarta Sans` for body, `Outfit` for headings).
* **Rationale:** High-end design guidelines strictly forbid generic fonts like `Inter` or flat backgrounds for luxury visual appeal. Implementing the Double-Bezel nested card structure and customized spring physics (`cubic-bezier(0.32, 0.72, 0, 1)`) creates physical depth and kinetic responsiveness that wow visitors and build immediate brand credibility.

---

## ADR 7: SVG-First UI Architecture & Touch Target Accessibility Optimization

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Ensuring absolute compliance with high-end UI guidelines (no raw emojis as icons) and standard accessibility patterns (touch target size >= 44x44px).
* **Alternatives Considered:** Emoji icons, FontAwesome icons, standard 32px close buttons.
* **Decision:** Replaced all UI emojis with custom, inline, lightweight SVG paths, set mobile navigation toggles and close buttons to a minimum of 44x44px, and added focus-visible outline states for keyboard navigation.
* **Rationale:** Emojis degrade visual consistency and trust. Vector SVGs remain sharp at any resolution, load instantly, and allow hover properties. Expanding touch targets prevents fat-finger conflicts, optimizing mobile conversion rates and satisfying WCAG requirements.

---

## ADR 8: SPA View Transitions (ClientRouter) & Event Bindings

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Enhancing the page-to-page experience to feel like a high-performance single-page app (SPA) without full reloads, while maintaining clean static-site performance.
* **Alternatives Considered:** Turbolinks, manual fetch-and-swap routers.
* **Decision:** Astro's native `<ClientRouter />` from `astro:transitions`.
* **Rationale:** Enables instantaneous page transitions and persistent UI elements. All global script hooks (like scroll reveals and hamburger drawer listeners) were bound to Astro's custom `'astro:page-load'` event instead of standard `DOMContentLoaded` to ensure animations and click handlers continue working correctly across dynamic navigations.

---

## ADR 9: Native Astro Image Optimization (`astro:assets`)

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Ensuring fast image loading on mobile devices without manual compression pipelines.
* **Alternatives Considered:** External cloud CDN resizing (Cloudinary), raw `<img>` tags.
* **Decision:** Moved local portrait assets to `src/assets/` and rendered them via Astro's native `<Image />` component.
* **Rationale:** Compressed portrait files from `224kB` to `27kB` WebP (an `~88%` size footprint reduction), implemented native browser lazy-loading, and prevented layout shifts by enforcing responsive width/height ratios automatically.

---

## ADR 10: Viewport-Intersection Scroll Reveals & Animation Lifecycle

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Creating high-end visual feedback that guides the reader's eye down the single-page layout.
* **Alternatives Considered:** Heavy animation libraries like Framer Motion, GSAP, or ScrollMagic.
* **Decision:** Vanilla CSS transition classes (`.reveal-stagger`, `.reveal-item`) coupled with a lightweight vanilla `IntersectionObserver` script.
* **Rationale:** Zero runtime package footprint. Animates grid items, process stages, and biography components dynamically as they enter the screen, keeping performance lean.

---

## ADR 11: Accessible Focus Trapping & Interactive Form Spinner

* **Status:** Accepted
* **Date:** 2026-06-19
* **Context:** Satisfying usability requirements for screen-reader and keyboard navigation in the Intake Modal, and conveying progress during submissions.
* **Alternatives Considered:** Unconstrained tabbing, standard text submit buttons.
* **Decision:** Implemented a keyboard focus trap cycling focus between key interactive elements (first/last inputs) inside `IntakeModal.jsx`, set a 50ms auto-focus delay on the name input, and added a spinning SVG loading wheel inside the disabled CTA button during submissions.
* **Rationale:** Meets key accessibility criteria (WCAG A/AA) and provides visual feedback during API latency.

