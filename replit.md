# replit.md

## Overview

This is a personal portfolio website for a mobile app and game developer. The application is a full-stack TypeScript project with a React frontend and Express backend. It displays portfolio content (hero tagline, about section, work description), skills, and includes a contact form for visitors to submit messages. Content is stored in a PostgreSQL database and served via REST API endpoints.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Animations**: Framer Motion for smooth entry animations and transitions
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Design**: REST endpoints defined in shared routes file with Zod schemas for type safety
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL
- **Schema Location**: `shared/schema.ts` - defines three tables:
  - `content` - stores section-based text content (hero_tagline, about, work)
  - `skills` - stores developer skills with ordering
  - `contactMessages` - stores contact form submissions
- **Migrations**: Drizzle Kit for schema management (`db:push` command)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database schema and Zod validation schemas
- `routes.ts` - API endpoint definitions with input/output types

### Build System
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: `dist/` folder with `index.cjs` (server) and `public/` (static assets)

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **pg**: Node.js PostgreSQL client

### UI Framework
- **Radix UI**: Accessible component primitives (dialog, dropdown, toast, etc.)
- **Shadcn/ui**: Pre-styled component library using Radix primitives
- **Tailwind CSS**: Utility-first CSS framework

### Frontend Libraries
- **TanStack React Query**: Server state management and caching
- **Framer Motion**: Animation library
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared between client and server)
- **Wouter**: Client-side routing
- **Lucide React**: Icon library

### Backend Libraries
- **Express 5**: Web server framework
- **connect-pg-simple**: PostgreSQL session store (available if sessions needed)

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the codebase
- **Drizzle Kit**: Database migration tool