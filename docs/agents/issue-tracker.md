# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`
- **Read an issue**: `gh issue view <number> --comments`
- **List issues**: `gh issue list --state open`
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Authentication and workflow

- Verify access with `gh auth status` before remote issue operations.
- Use the `gh` CLI for creating, reading, triaging, commenting on, and closing issues; do not use the GitHub web UI as an alternate workflow.
- Apply the canonical triage labels from `triage-labels.md`: use `needs-triage` for new work and `ready-for-agent` only when the scope and acceptance criteria are implementation-ready.

## Pull requests as a triage surface

**PRs as a request surface: no.**

When a skill says to publish to the issue tracker, create a GitHub issue. When it says to fetch a relevant ticket, run `gh issue view <number> --comments`.
