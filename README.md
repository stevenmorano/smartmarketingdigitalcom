# Smart Marketing Digital — Marketing Operations & Growth Consulting

This repository contains the static marketing website for **Smart Marketing Digital**, an independent Marketing Operations & Growth consulting practice operated by Steven Morano.

The site presents a practical consulting model—**Diagnose → Prioritize → Improve**—across marketing audits, action planning, websites and conversion paths, acquisition strategy, CRM and follow-up, customer journeys, analytics, reporting, and smarter workflows.

**Production URL:** [https://smart.stevenmorano.com/](https://smart.stevenmorano.com/)

---

## Technology Stack

1. **Framework:** [Astro](https://astro.build) generates a static production site.
2. **Interactivity:** [Preact](https://preactjs.com) powers the Marketing Control Room and multi-step intake modal as isolated client-side components.
3. **Styling:** Vanilla CSS with global design tokens and component-scoped styles.
4. **Navigation:** Astro's [ClientRouter](https://docs.astro.build/en/guides/view-transitions/) handles page transitions.
5. **Lead capture:** The intake form submits directly to Formspree over AJAX and displays success only after Formspree accepts the request.
6. **Sitemap:** `@astrojs/sitemap` generates the sitemap index and page sitemap from the canonical `site` value in `astro.config.mjs`.

---

## Project Structure

```text
/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt              # Crawler rules and production sitemap URL
│   └── steven_morano.jpg       # Public image used by structured data
├── src/
│   ├── assets/
│   │   └── steven_morano.jpg   # Founder portrait optimized by Astro
│   ├── components/
│   │   ├── astro/
│   │   │   ├── Footer.astro     # Footer CTA, navigation, contact, social, and privacy link
│   │   │   ├── Founder.astro    # Consultant biography and engagement highlights
│   │   │   ├── Framework.astro  # Connected marketing areas and review loop
│   │   │   ├── Hero.astro       # Positioning, CTAs, badges, and Control Room mount
│   │   │   ├── Navbar.astro     # Header navigation and intake triggers
│   │   │   ├── Process.astro    # Diagnose, Prioritize, Improve, Review & Refine
│   │   │   ├── Proof.astro      # Selected outcomes from Steven's broader career
│   │   │   └── Solutions.astro  # Consulting model and service cards
│   │   └── preact/
│   │       ├── Dashboard.jsx    # Illustrative Marketing Control Room
│   │       └── IntakeModal.jsx  # Validated Formspree intake flow
│   ├── layouts/
│   │   └── Layout.astro         # Shared metadata, canonical tags, schema, and transitions
│   ├── pages/
│   │   ├── index.astro          # Homepage composition
│   │   └── privacy.astro        # Privacy policy for inquiry submissions
│   └── styles/
│       └── global.css           # Design tokens, resets, shared components, and animations
├── astro.config.mjs             # Canonical site URL and Astro integrations
├── package.json                 # Scripts and dependencies
└── tsconfig.json                # Astro TypeScript configuration
```

---

## Developer Scripts

Run commands from the project root:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local development server at `localhost:4321` |
| `npm run build` | Build the static production site in `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Formspree Intake Setup

The multi-step intake form validates name, email, and website URL before the visitor can continue. The remaining selects have defaults, while consulting-area checkboxes and text areas are optional. Failed requests preserve the entered values so the visitor can retry.

1. Create a form at [Formspree](https://formspree.io) and set its target to a verified notification email address.
2. Copy the form ID from the endpoint Formspree provides: `https://formspree.io/f/{form-id}`.
3. For local development, create a `.env` file in the project root containing:

   ```text
   PUBLIC_FORMSPREE_FORM_ID=your_form_id
   ```

4. Restart `npm run dev` after adding or changing the variable.
5. In Vercel, add `PUBLIC_FORMSPREE_FORM_ID` under **Project Settings → Environment Variables** for Production and any Preview environments that should accept submissions, then redeploy.

`PUBLIC_FORMSPREE_FORM_ID` is browser-visible configuration, not a secret. Do not place Formspree account or submission-reading API keys in a `PUBLIC_` variable.

---

## Production URL and Search Metadata

The canonical production origin is configured once in `astro.config.mjs`:

```js
site: 'https://smart.stevenmorano.com'
```

Astro uses this value for canonical URLs, Open Graph URLs, and generated sitemap entries. `public/robots.txt` points crawlers to `https://smart.stevenmorano.com/sitemap-index.xml`. Business URLs in the JSON-LD block inside `Layout.astro` should remain aligned with the same production origin.

The Marketing Control Room is an illustrative diagnostic interface. Its six areas and rotating insights demonstrate how Steven evaluates connected marketing concerns; they are not live client data, an automated audit, or performance reporting.
