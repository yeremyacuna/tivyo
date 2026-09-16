# System Overview

## Purpose

Tivyo converts structured schedule, assessment, performance, and knowledge context into an actionable daily plan.

## High-level architecture

```text
PWA client
   |
   +-- Local layer
   |     +-- IndexedDB
   |     +-- PDF text/index
   |     +-- offline cache
   |
   +-- Cloudflare Workers API
         +-- authentication and integrations
         +-- scheduled jobs
         +-- Web Push
         +-- AI provider adapter
         |
         +-- Neon PostgreSQL
```

## Architectural boundaries

### `apps/web`
Owns presentation, interaction, PWA capabilities, local PDF processing, and local persistence.

### `apps/api`
Owns HTTP interfaces, authentication boundaries, scheduled jobs, external provider adapters, and server-side orchestration.

### `packages/core`
Owns pure business rules: domain entities, priority scoring, risk evaluation, study-time estimation, and scheduling logic. It must not depend on React, Cloudflare, Neon, or any AI provider.

### `packages/db`
Owns PostgreSQL schema, migrations, and persistence repositories.

### `packages/shared`
Owns contracts and types intentionally shared across application boundaries.

## Key design rules

1. AI must never be the source of truth for deadlines, grades, weights, or calendar availability.
2. Calify is an optional data source, not a runtime dependency.
3. Provider-specific code stays behind adapters.
4. PDF originals should remain local or in user-owned storage when possible.
5. Core planning logic must be deterministic and independently testable.
