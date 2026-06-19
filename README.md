# Smart Marketing Digital — Marketing Systems Consultant

This repository houses the high-performance, single-page marketing website for **Smart Marketing Digital**, a premium, consultant-led marketing systems consultancy operated directly by Steven Morano.

The site is built with a focus on speed, SEO, and visual excellence, combining static page compilation with interactive islands where needed.

---

## 🚀 Technology Stack

1. **Framework:** [Astro](https://astro.build) — compiled to 100% static HTML by default to optimize PageSpeed, mobile Core Web Vitals, and search crawlability.
2. **Interactivity:** [Preact](https://preactjs.com) — a lightweight (3KB) React alternative used for hydrated UI elements ("islands") such as the animated campaign dashboard and the intake modal.
3. **Styling:** Vanilla CSS — custom properties and scoped styles used exclusively to prevent visual leakage and eliminate CSS library overhead.
4. **View Transitions:** [ClientRouter](https://docs.astro.build/en/guides/view-transitions/) — native transition router that enables instant, smooth page fade transitions while preserving interactive Preact island states.
5. **Lead Capture:** Polished multi-step form syncs user metrics and details directly to your serverless email notification provider (e.g. Web3Forms or Formspree).

---

## 📂 Project Directory Layout

```text
/
├── public/                 # Static assets (favicons, robots.txt)
│   ├── favicon.ico         
│   ├── favicon.svg         
│   └── robots.txt          # SEO crawler settings
├── src/
│   ├── assets/             # Raw media assets optimized by Astro
│   │   └── steven_morano.jpg # Source founder professional headshot
│   ├── components/
│   │   ├── astro/          # Static layout sections
│   │   │   ├── Footer.astro     # Contact details & footer CTA
│   │   │   ├── Founder.astro    # Steven Morano bio & value props (optimizes profile image)
│   │   │   ├── Framework.astro  # AI-Enhanced marketing system loop
│   │   │   ├── Hero.astro       # Headline copy, badges, & dashboard mount
│   │   │   ├── Navbar.astro     # Fixed header, morphing hamburger menu, event listeners
│   │   │   ├── Process.astro    # 4-Step Audit-to-Scale timeline
│   │   │   └── Solutions.astro  # Services grid & solution cards
│   │   └── preact/         # Dynamic client-side components
│   │       ├── Dashboard.jsx    # SVG line, donut, funnel charts & AI insight cycle
│   │       └── IntakeModal.jsx  # Multi-step intake form dialog with focus trap
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML template, metadata, fonts, & ClientRouter
│   ├── pages/
│   │   └── index.astro     # Main page assembling all layouts
│   └── styles/
│       └── global.css      # Core variables, typography tokens, resets, animations
├── astro.config.mjs        # Astro & Preact integration configuration
├── package.json            # Scripts and package dependencies
└── tsconfig.json           # Type definitions
```


---

## 🧞 Developer Scripts

All commands are run from the project root directory:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Compiles your production static bundle to `./dist/` |
| `npm run preview` | Previews the build output locally |

---

## 🛠️ Custom Integration & Configurations

### 1. Connecting a Live Lead Capture Form
The multi-step form is currently set up with a simulated delay to facilitate local testing. To route submissions to your email:
1. Register for a free access key at [Web3Forms](https://web3forms.com) or [Formspree](https://formspree.io).
2. Open `src/components/preact/IntakeModal.jsx`.
3. Locate the commented block in `handleSubmit` and swap the simulation promise for a live `fetch` call passing your access key and form values.

### 2. Customizing Logo and Graphics
All charts (the donut segment, the revenue graph, sparklines, and framework arrows) are rendered as raw **SVG elements** directly within the code. You can easily adjust colors, heights, and coordinates in `Dashboard.jsx` and `Framework.astro`.
