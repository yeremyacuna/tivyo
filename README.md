# Tivyo

A cross-platform, AI-assisted planning PWA that turns schedules, priorities, and personal knowledge into actionable daily plans.

## Status

Tivyo is in early development. The first public milestone is `v0.1.0`, built as a four-day MVP with production-oriented foundations.

## Core principles

- Cross-platform by default: iOS, Android, and desktop through a PWA.
- Deterministic planning first; AI augments decisions instead of inventing source data.
- Local-first knowledge processing for PDF materials when practical.
- Provider-agnostic integrations for AI and academic data sources.
- Calify is optional and remains an independent project.
- PostgreSQL is the primary relational data store.

## Repository layout

```text
apps/
  web/      PWA client
  api/      Cloudflare Workers API and scheduled jobs
packages/
  core/     Domain models and planning logic
  db/       PostgreSQL schema, migrations, and repositories
  shared/   Shared contracts, validation, and types
docs/
  architecture/
  product/
tests/
  e2e/
```

## Development branches

- `main` — production-ready releases only.
- `develop` — integration branch.
- `feature/foundation-and-core` — Day 1.
- `feature/data-and-knowledge` — Day 2.
- `feature/intelligence-and-briefing` — Day 3.
- `feature/testing-and-release` — Day 4.

## License

No license has been selected yet. This will be decided before the first public release.
