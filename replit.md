# Advait Paliwal Portfolio - Replit Project Guide

## Overview

This is a modern portfolio website for Advait Paliwal, a 21-year-old founder and entrepreneur. The site showcases his projects, experience, interests, and thoughts through a clean, minimal design. It's built as a full-stack application with React frontend and Express backend, ready for deployment on Replit.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Database Layer
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Auto-generated in `./migrations` directory
- **Current Schema**: Basic user table with username/password fields

### Storage Interface
- **Interface**: `IStorage` in `server/storage.ts`
- **Implementation**: Currently using in-memory storage (`MemStorage`)
- **Methods**: User CRUD operations (getUser, getUserByUsername, createUser)
- **Future**: Will be replaced with Drizzle-based database storage

### UI Components
- **Design System**: Clean, minimal portfolio design
- **Color Scheme**: Charcoal, medium gray, and pure white
- **Typography**: SF Pro Display font family
- **Components**: Fully accessible Radix UI components styled with Tailwind

### Navigation Structure
- **About** (`/`) - Hero section and project showcase
- **Experience** (`/experience`) - Professional timeline
- **Interests** (`/interests`) - Technical and personal interests
- **Playbook** (`/playbook`) - Blog posts from Substack RSS feed

## Data Flow

### Development Flow
1. Vite dev server handles frontend assets and HMR
2. Express server serves API routes under `/api` prefix
3. Frontend uses TanStack Query for API communication
4. Database operations go through the storage interface

### Production Flow
1. Frontend builds to `dist/public` directory
2. Backend builds to `dist/index.js` using esbuild
3. Express serves static files and API routes
4. PostgreSQL handles persistent data storage

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-kit` for database operations
- **UI**: `@radix-ui/*` components with `tailwindcss` styling
- **Routing**: `wouter` for client-side routing
- **Forms**: `react-hook-form` with `@hookform/resolvers`

### Development Tools
- **Build**: `vite` for frontend, `esbuild` for backend
- **TypeScript**: Full type safety across the stack
- **Replit Integration**: Custom plugins for development experience

## Deployment Strategy

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Run Command**: `npm run dev` for development
- **Build Command**: `npm run build` for production
- **Start Command**: `npm run start` for production server

### Environment Setup
- **DATABASE_URL**: Required environment variable for PostgreSQL connection
- **Port Configuration**: Backend runs on port 5000, exposed as port 80
- **Auto-scaling**: Configured for Replit's autoscale deployment target

### Database Deployment
- Run `npm run db:push` to sync schema changes to database
- Database migrations are handled automatically by Drizzle
- Connection pooling managed by Neon Database

## Changelog

- June 24, 2025: Initial setup
- June 24, 2025: Added Founder's Playbook page with RSS feed integration
- June 24, 2025: Converted Playbook to clean blog listing page matching user design requirements
- June 24, 2025: Implemented infinite scroll functionality for blog posts with pagination support
- June 24, 2025: Removed Thoughts section and optimized responsive design for all form factors
- June 24, 2025: Updated font family to SF Pro Display across the entire site
- June 24, 2025: Added comprehensive code documentation and technical guides
- June 24, 2025: Refined codebase with detailed comments and structure documentation
- June 24, 2025: Made View buttons clickable with placeholder links and created comprehensive content update guide

## User Preferences

- **Communication Style**: Simple, everyday language
- **Code Quality**: Comprehensive documentation and comments preferred
- **Typography**: SF Pro Display font family for native Apple experience
- **Design Approach**: Clean, minimal, responsive-first design
- **Development**: TypeScript-first with proper error handling