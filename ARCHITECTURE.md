# System Architecture: Smart Marketing Digital

This document outlines the technical design, data flows, components organization, and optimization strategies utilized in the Smart Marketing Digital website.

---

## 🏗️ Architectural Core Principles

To guarantee sub-second load times and high conversions, the project implements three core principles:
1. **Static-First Compilation:** All non-interactive elements are built to raw HTML. No framework runtime is shipped for static sections, resulting in perfect Lighthouse scores.
2. **Selective Hydration (Islands):** Interactive states (the dynamic dashboard and intake form) are isolated in separate Preact containers and hydrated selectively.
3. **Vanilla CSS Optimization:** We declare CSS variables globally. Layout files load fonts in parallel. Scoped classes keep files modular, eliminating unused CSS selectors.

---

## 📊 Interaction & Data Flow

This diagram illustrates how static elements trigger the dynamic modal flow and how data reaches the serverless API.

```mermaid
graph TD
    A[Visitor loads page] --> B[CDN serves static HTML]
    B --> C[Hero & Navbar render immediately]
    C --> D[Hero Dashboard island hydrates client:load]
    D --> E[Dashboard SVG line/donut animations draw]
    
    C --> F[Navbar/CTA click]
    F -->|Dispatches Custom Event 'open-intake'| G[Window Event Bus]
    G -->|Hydrates & Listens| H[IntakeModal Island]
    H --> I[IntakeModal opens multi-step form]
    
    I --> J[Step validation checks inputs]
    J -->|Submit| K[Async POST to Web3Forms/Formspree API]
    K -->|200 Success| L[Render Thank-You receipt]
    K -->|Error| M[Show inline error feedback]
```

---

## 🧩 Components Catalog

### Static Components (Astro Templates)
* **Navbar.astro:** Renders navigation headers and hamburger menus. Hooks onto standard buttons using `data-trigger-intake` and fires a vanilla `CustomEvent` to keep navigation clean and detached from Preact states.
* **Hero.astro:** Sets the visual dark grid background and titles. Integrates the Preact `<Dashboard client:load />` island.
* **Solutions.astro:** Grid list of services. Styled with light background properties and flex-wrapping.
* **Framework.astro:** Visual marketing pipeline representation using connector nodes and an animated SVG feedback loop.
* **Proof.astro:** High-impact metrics segment displaying safe consulting statistics.
* **Process.astro:** Identifies the 4-step Audit, Build, Launch, and Scale workflow.
* **Founder.astro:** Layout containing Steven Morano's details, signature, and value props.
* **Footer.astro:** Links directories, copyright, and repeats the CTA trigger buttons.

### Interactive Islands (Preact Components)
* **Dashboard.jsx:** Contains state hooks for cycling the AI insights cards and renders responsive inline SVG paths representing marketing metrics.
* **IntakeModal.jsx:** Handles a 3-step stateful lead intake form, validating client name, email, website URL, budget, and services checklists before enabling submitting.

---

## 🎨 Design Tokens & Custom CSS Properties

Central variables are declared in `/src/styles/global.css`:

```css
:root {
  /* Dark backgrounds */
  --color-bg-dark-deep: #050811;
  --color-bg-dark-card: #0d1222;
  --color-border-dark: rgba(255, 255, 255, 0.07);
  
  /* Light backgrounds */
  --color-bg-light-deep: #ffffff;
  --color-bg-light-card: #f8fafc;
  
  /* Accent colors */
  --color-primary: #3b82f6;
  --color-secondary: #06b6d4;
  --color-accent-teal: #10b981;
}
```
* **Font Loading:** Heading styles reference `Outfit` to look bold and premium. Body content references `Inter` for legibility. Fonts are preconnected to Google Servers inside `Layout.astro` to bypass rendering blocks.
