# Domain Docs

How the engineering skills should consume this repository's domain documentation.

## Current architecture and domain terms

- The site is an Astro static-first marketing site with scoped vanilla CSS and two hydrated Preact islands: the illustrative Marketing Control Room and the intake modal.
- The intake modal submits directly to Formspree using `PUBLIC_FORMSPREE_FORM_ID`; there is no project-owned backend or database.
- The consulting model is **Diagnose → Prioritize → Improve**. The engagement Process adds **Review & Refine**, and the Framework treats marketing as a connected system rather than a rigid funnel.
- The Marketing Control Room is an illustrative diagnostic visual, not live client reporting or an automated audit.

`ARCHITECTURE.md` remains the detailed source of truth for implementation structure and data flow; avoid duplicating that detail in domain notes.

## Before exploring, read these

- `ARCHITECTURE.md` at the repository root
- `DECISION_LOG.md` at the repository root
- `CONTEXT.md` at the repository root, if present
- `CONTEXT-MAP.md` at the repository root, if present
- `docs/adr/` for architecture decisions relevant to the work

If `CONTEXT.md`, `CONTEXT-MAP.md`, or `docs/adr/` do not exist, proceed without flagging their absence. Create them only when domain terms or decisions are actually resolved.

## File structure

This is a single-context repository:

```text
/
├── AGENTS.md
├── ARCHITECTURE.md
├── DECISION_LOG.md
├── CONTEXT.md
├── docs/adr/
└── src/
```

`CONTEXT.md` and `docs/adr/` are optional and should be added only when genuinely necessary.

## Vocabulary

When naming a domain concept in an issue, proposal, hypothesis, or test, use the vocabulary defined in `CONTEXT.md` when available.

## ADR conflicts

If proposed work contradicts an existing ADR, surface the conflict explicitly rather than silently overriding it.
