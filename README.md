# Sprints

A multi-workspace project and program management application built with React, TypeScript and Supabase.

## What the repository demonstrates

The application includes multiple dashboard modes and authenticated workspace flows. The current routing exposes Scrum, startup and NGO-oriented dashboards alongside organization, project, region, impact, team, partner and stakeholder views.

Key implementation areas visible in the repository include:

- Authentication and protected application routes
- Organization and workspace context
- Workspace creation, invitation and join flows
- NGO project creation and project detail views
- Scrum, startup and NGO dashboard experiences
- React Query for client-side server-state management
- Supabase integration
- Recharts-based data visualization capability
- Responsive component architecture using Tailwind CSS and Radix/shadcn UI primitives

## Tech stack

`React 18` · `TypeScript` · `Vite` · `Supabase` · `TanStack Query` · `React Router` · `Tailwind CSS` · `shadcn/ui` · `Recharts`

## Application structure

```text
src/
├── pages/
│   ├── auth/          # sign-in, sign-up and account flows
│   ├── ngo/           # projects, regions, impact, teams and stakeholders
│   └── workspace/     # workspace creation, invitations and membership
├── components/
├── hooks/
└── App.tsx            # application routing and providers

supabase/
└── ...                # backend configuration and related project resources
```

## Run locally

```bash
git clone https://github.com/karisajoshua/sprints.git
cd sprints
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run lint
npm run preview
```

Supabase-backed functionality requires a correctly configured development project and environment variables. Do not commit private keys or service-role credentials.

## Engineering status

This README describes functionality that can be identified from the repository structure and application routes. It does not imply that every workflow is production-ready or that every external integration has been independently verified. Security-sensitive deployment should include verification of database policies, authorization boundaries, server-side validation and secret handling.
