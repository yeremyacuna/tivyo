<div align="center">

# Tivyo

**Turn schedules, priorities, and personal knowledge into an actionable daily plan.**

A cross-platform, AI-assisted planning PWA designed to help people understand what matters next — without making AI the source of truth.

<br/>

![Status](https://img.shields.io/badge/status-in_development-F59E0B?style=for-the-badge)
![Version](https://img.shields.io/badge/version-v0.1.0--dev-111827?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Product Principles](#product-principles)
- [Core Capabilities](#core-capabilities)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Four-Day Build Plan](#four-day-build-plan)
- [Getting Started](#getting-started)
- [Security and Privacy](#security-and-privacy)
- [Calify Integration](#calify-integration)
- [Roadmap](#roadmap)

---

## Overview

**Tivyo** is a cross-platform planning application that combines schedules, deadlines, priorities, study materials, availability, and AI-assisted recommendations into a single daily briefing.

Its first milestone focuses on one core question:

> **What deserves my attention today, and when should I work on it?**

Tivyo is being designed as a Progressive Web App so one codebase can serve iOS, Android, and desktop users while keeping the architecture open to future native clients.

The platform is intentionally broader than an academic grade tracker. Academic workflows are the first use case, but the core planning engine is designed to remain independent from any single university, LMS, data provider, or AI model.

---

## Product Principles

- **Cross-platform by default** — one installable PWA for iOS, Android, and desktop.
- **Deterministic planning first** — deadlines, weights, availability, and rules determine priorities before AI explains them.
- **AI as an assistant, not a source of truth** — the application must remain useful when AI is unavailable.
- **Local-first where it matters** — PDF knowledge can be processed and indexed on-device when practical.
- **Provider-agnostic architecture** — AI providers and academic data sources are accessed through replaceable adapters.
- **Privacy-aware integrations** — only the minimum required information should leave the user's device or connected service.
- **Independent products** — Tivyo can integrate with Calify, but never requires Calify to operate.
- **Scalable foundations** — the MVP is intentionally small, while domain boundaries are designed for future clients and features.

---

## Core Capabilities

The `v0.1.0` milestone is planned around these capabilities:

| Capability | Purpose | Example |
|---|---|---|
| Installable PWA | Run from mobile and desktop home screens | Install Tivyo on iPhone, Android, or PC |
| Course & task management | Represent structured responsibilities | `Physics II · TEC08 · Sep 23` |
| Google Calendar integration | Understand occupied and available time | Detect `18:00–20:00` as free |
| Priority engine | Rank work using deterministic rules | `Physics II · Priority 91/100` |
| Risk detection | Surface urgent or high-impact work | `Exam tomorrow · High risk` |
| Study-block planning | Fit work into real availability | `18:00–19:20 · Physics review` |
| Morning Brief | Summarize the day in one view | `3 priorities · 2h 35m planned` |
| AI recommendations | Explain and refine the generated plan | Suggest concepts first, exercises second |
| Web Push | Deliver the daily brief at a configured time | `05:00 · Good morning · 3 priorities` |
| PDF knowledge | Extract and index course material | Search `Kirchhoff` across imported PDFs |
| Material recommendations | Connect tasks to relevant source material | `Week 4 Preclass · pp. 8–17` |
| Brief history | Preserve previous daily plans | Browse Sep 16, Sep 17, Sep 18 |
| PDF export | Create a printable/shareable daily brief | `tivyo-brief-2026-09-16.pdf` |
| Optional Calify adapter | Reuse existing structured grade data | Import courses, assessments, and performance |
| Manual mode | Keep Tivyo independent from external trackers | Add a course and assessment directly |

---

## Architecture

```text
                         Client Devices
                  iOS · Android · Desktop
                            │
                            ▼
                         Tivyo PWA
                 React · TypeScript · Vite
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
           Local Knowledge       Cloudflare Worker
              IndexedDB                 │
              PDF index                 ├── AI Provider
              offline cache             ├── Google Calendar
                                        ├── Web Push
                                        ├── Scheduled Jobs
                                        └── Data Source Adapters
                                                │
                                                ▼
                                         Neon PostgreSQL
```

The most important architectural boundary is the **core planning package**. It must not depend on React, Cloudflare, Neon, Google Calendar, or any AI provider.

```text
packages/core
├── domain
├── planner
├── scoring
└── scheduling
```

That separation allows future web, mobile, desktop, CLI, or service clients to reuse the same decision-making logic.

Full architecture documentation lives in [`docs/architecture/`](docs/architecture/).

---

## Tech Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Web client | React + TypeScript | Cross-platform application UI |
| Build tooling | Vite | Development server and production builds |
| PWA | Web App Manifest + Service Worker | Installation, caching, and offline shell |
| Styling | Tailwind CSS | Responsive interface system |
| Local storage | IndexedDB | Local PDF knowledge and cached application data |
| PDF processing | PDF.js | Text and page extraction from PDF materials |
| Backend | Cloudflare Workers | API, orchestration, integrations, scheduled jobs |
| Database | PostgreSQL on Neon | Primary relational data store |
| Database access | Drizzle ORM | Type-safe schema, migrations, and queries |
| AI | Workers AI through `AIProvider` | Natural-language briefing and recommendations |
| Calendar | Google Calendar API | Events and availability |
| Notifications | Web Push | Scheduled cross-platform notifications |
| Testing | Vitest + Playwright | Unit, integration, and end-to-end coverage |
| CI | GitHub Actions | Automated validation before integration |

---

## Project Structure

```text
tivyo/
├── apps/
│   ├── web/                 # React PWA client
│   └── api/                 # Cloudflare Workers API and jobs
│
├── packages/
│   ├── core/                # Domain models and planning logic
│   ├── db/                  # PostgreSQL schema, migrations, repositories
│   └── shared/              # Shared contracts, validation, and types
│
├── tests/
│   └── e2e/                 # Cross-application end-to-end tests
│
├── docs/
│   ├── architecture/        # System architecture documentation
│   ├── adr/                 # Architecture Decision Records
│   ├── api/                 # API contracts and integration documentation
│   └── product/             # Product scope and roadmap
│
├── .github/
│   └── workflows/           # Continuous integration
│
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

Folders are introduced when they have a real responsibility; the repository does not use empty directories only for visual structure.

---

## Development Workflow

Tivyo uses a small Git workflow with two long-lived branches and four milestone-oriented feature branches.

```text
feature/foundation-and-core
            │
            ▼
         develop

feature/data-and-knowledge
            │
            ▼
         develop

feature/intelligence-and-briefing
            │
            ▼
         develop

feature/testing-and-release
            │
            ▼
         develop
            │
            ▼
           main
            │
            ▼
         v0.1.0
```

- `main` — production-ready releases only.
- `develop` — integration branch for completed and reviewed work.
- `feature/foundation-and-core` — Day 1: product foundation and planning core.
- `feature/data-and-knowledge` — Day 2: data integrations and PDF knowledge.
- `feature/intelligence-and-briefing` — Day 3: AI, briefing, and notifications.
- `feature/testing-and-release` — Day 4: hardening, testing, documentation, and release.

Commits follow the Conventional Commits style, for example:

```text
feat(planner): implement priority scoring
feat(pdf): add local document indexing
fix(push): respect user timezone
test(planner): cover overdue assessments
docs(architecture): document data-source adapters
```

---

## Four-Day Build Plan

| Day | Branch | Main Goal |
|---|---|---|
| 1 | `feature/foundation-and-core` | Monorepo, PWA foundation, domain model, planner core |
| 2 | `feature/data-and-knowledge` | Google Calendar, academic sources, PDF knowledge |
| 3 | `feature/intelligence-and-briefing` | AI layer, Morning Brief, Web Push |
| 4 | `feature/testing-and-release` | Security review, testing, documentation, `v0.1.0` |

The four-day schedule defines the MVP implementation window, not the lifetime of the product.

---

## Getting Started

Tivyo is currently in **Day 1 — Foundation & Core**. The executable web and API workspaces are being scaffolded before the project publishes installation commands.

Once the PWA foundation is committed, this section will contain verified commands for:

```text
clone → install → configure → develop → test → build
```

No setup command is documented here until it has been executed and verified against the repository.

---

## Security and Privacy

Tivyo follows several baseline rules from the first release:

- Secrets and provider credentials never belong in version-controlled source files.
- Environment-specific credentials are supplied through secret/environment management.
- Connected services receive only the permissions required for their feature.
- Google Calendar begins with read-oriented access before any calendar-writing capability is considered.
- PDF content should remain local when server-side storage is unnecessary.
- AI receives structured, minimal context rather than unrestricted personal data whenever possible.
- The planning engine must remain functional when the AI provider is unavailable.

A dedicated security review is part of Day 4 before `v0.1.0` is promoted to `main`.

---

## Calify Integration

Tivyo and **Calify are independent products**.

Calify can become one optional implementation of Tivyo's academic data-source contract:

```text
Manual Data ──────┐
Google Calendar ──┼──> Tivyo Planning Core
Calify ───────────┘
        optional
```

Tivyo must operate normally without Calify. The integration exists only to avoid duplicating structured academic information when a user already maintains it elsewhere.

---

## Roadmap

### `v0.1.0` — Daily Intelligence MVP

- [ ] Installable cross-platform PWA
- [ ] Course and assessment management
- [ ] Google Calendar availability
- [ ] Deterministic priority and risk engines
- [ ] Study-block planner
- [ ] Morning Brief
- [ ] AI recommendation provider + deterministic fallback
- [ ] Scheduled Web Push notifications
- [ ] PDF import, extraction, and local search
- [ ] Relevant material recommendations
- [ ] Brief history
- [ ] PDF export
- [ ] Optional Calify adapter
- [ ] Automated tests and CI

### Future

- AI course tutor
- Exam Preparation Mode
- Automatic calendar writing
- Adaptive study planning
- Grade simulations and forecasting
- Weekly and semester analytics
- Flashcards and generated quizzes
- OCR for scanned documents
- Google Drive material synchronization
- LMS integrations such as Canvas and Moodle
- Collaboration and shared deadlines
- Native mobile clients
- Semantic retrieval with PostgreSQL + `pgvector`

The complete roadmap is maintained in [`docs/product/roadmap.md`](docs/product/roadmap.md).

---

<div align="center">

**Tivyo · Know what matters next.**

Built by [@yeremyacuna](https://github.com/yeremyacuna)

</div>
