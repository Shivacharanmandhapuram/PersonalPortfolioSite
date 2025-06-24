# Code Structure Documentation

## Directory Structure with Purpose


```
portfolio-website/
├── 📁 client/                      # Frontend React Application
│   ├── 📁 public/                  # Static assets served by Vite
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI Components
│   │   │   ├── 📁 ui/             # Shadcn/ui component library
│   │   │   │   ├── accordion.tsx  # Collapsible content sections
│   │   │   │   ├── button.tsx     # Button component with variants
│   │   │   │   ├── card.tsx       # Container component
│   │   │   │   ├── input.tsx      # Form input component
│   │   │   │   ├── toast.tsx      # Notification system
│   │   │   │   └── ...            # Other UI primitives
│   │   │   ├── Footer.tsx         # Site footer (if needed)
│   │   │   ├── Navigation.tsx     # Main navigation bar
│   │   │   └── PlaybookPostCard.tsx # Blog post display component
│   │   ├── 📁 hooks/              # Custom React Hooks
│   │   │   ├── use-mobile.tsx     # Mobile device detection
│   │   │   └── use-toast.ts       # Toast notification hook
│   │   ├── 📁 lib/                # Utility Libraries
│   │   │   ├── queryClient.ts     # TanStack Query configuration
│   │   │   └── utils.ts           # Common utility functions
│   │   ├── 📁 pages/              # Route Components
│   │   │   ├── About.tsx          # Homepage with hero & projects
│   │   │   ├── Experience.tsx     # Professional timeline
│   │   │   ├── Interests.tsx      # Personal interests (minimal)
│   │   │   ├── Playbook.tsx       # Blog posts from RSS
│   │   │   └── not-found.tsx      # 404 error page
│   │   ├── App.tsx                # Main app component & routing
│   │   ├── main.tsx               # React app entry point
│   │   └── index.css              # Global styles & Tailwind
│   └── index.html                 # HTML template
├── 📁 server/                      # Backend Express Server
│   ├── index.ts                   # Server entry point & middleware
│   ├── routes.ts                  # API route definitions
│   ├── storage.ts                 # Data storage interface
│   └── vite.ts                    # Vite dev server integration
├── 📁 shared/                      # Shared Code Between Frontend/Backend
│   └── schema.ts                  # Database schema & types
├── 📁 migrations/                  # Database Migration Files
├── package.json                   # Dependencies & scripts
├── tailwind.config.ts             # Tailwind CSS configuration
├── vite.config.ts                 # Vite build configuration
├── drizzle.config.ts              # Database ORM configuration
├── replit.md                      # Project documentation & preferences
├── TECHNICAL_DOCUMENTATION.md    # Comprehensive tech guide
└── CODE_STRUCTURE.md              # This file
```

## Component Architecture

### 1. Navigation Component (`Navigation.tsx`)
**Purpose**: Main site navigation with active state management
**Key Features**:
- Responsive design (mobile-friendly spacing)
- Active route highlighting
- Clean, minimal styling

```tsx
// Usage in other components
import Navigation from "@/components/Navigation";

// Navigation automatically handles:
// - Route detection with useLocation()
// - Active state styling
// - Responsive breakpoints
```

### 2. PlaybookPostCard Component (`PlaybookPostCard.tsx`)
**Purpose**: Display individual blog posts with consistent formatting
**Props Interface**:
```tsx
interface PlaybookPostCardProps {
  title: string;        // Post title
  contentSnippet: string; // Post excerpt
  link: string;         // Link to full post
  pubDate: string;      // Publication date
  index: number;        // For animation delays
}
```

**Styling Features**:
- Responsive layout (mobile stacks, desktop side-by-side)
- Visual separators between posts
- Hover states and animations
- Quote box with excerpt

## Page Architecture

### 1. About Page (`About.tsx`)
**Purpose**: Hero section and project showcase
**Structure**:
```tsx
// Main sections:
- Hero Section: Large title with personal introduction
- Projects Grid: 4 project cards with images and descriptions
- Responsive Design: Adapts to all screen sizes
```

**Key Components**:
- Framer Motion animations for scroll reveals
- Responsive typography with clamp() functions
- Project cards with hover effects

### 2. Experience Page (`Experience.tsx`)
**Purpose**: Professional timeline with visual elements
**Data Structure**:
```tsx
interface Experience {
  year: string;         // Time period
  title: string;        // Position/company
  description: string;  // Role description
  image: string;        // Associated image
}
```

### 3. Playbook Page (`Playbook.tsx`)
**Purpose**: Dynamic blog from Substack RSS with infinite scroll
**Key Features**:
- TanStack Query infinite queries
- Automatic pagination
- Manual refresh capability
- Responsive post grid

**Data Flow**:
```
Substack RSS → Backend Parser → API Response → Frontend Display
```

## API Architecture

### Route Structure (`server/routes.ts`)
```typescript
// RSS feed endpoints
GET /api/playbook-feed?page=1&limit=6
GET /api/substack-feed (legacy)

// Response format for playbook-feed:
{
  posts: PlaybookPost[],
  hasMore: boolean,
  currentPage: number,
  totalPosts: number
}
```

### Storage Interface (`server/storage.ts`)
**Purpose**: Abstraction layer for data operations
**Current Implementation**: In-memory storage with user CRUD operations
**Future**: Database integration with Drizzle ORM

## State Management

### TanStack Query Configuration (`lib/queryClient.ts`)
- **Cache Time**: 30 seconds for RSS feeds
- **Stale Time**: Optimized for content freshness
- **Error Handling**: Graceful fallbacks to static content
- **Retry Logic**: Automatic retry for failed requests

### Global State
- No complex state management needed
- Component-level state for UI interactions
- Server state managed by TanStack Query

## Styling Architecture

### Tailwind Configuration
```typescript
// Font family hierarchy
fontFamily: {
  sans: ['SF Pro Display', '-apple-system', 'system-ui', 'sans-serif']
}

// Responsive breakpoints
sm: '640px'   // Tablets
md: '768px'   // Small laptops  
lg: '1024px'  // Desktops
xl: '1280px'  // Large screens
```

### CSS Structure
1. **Global Styles** (`index.css`): Base styles and custom properties
2. **Component Styles**: Tailwind utilities in components
3. **Responsive Design**: Mobile-first approach with breakpoint modifiers

## Data Flow Patterns

### RSS Feed Integration
```
1. User visits /playbook
2. React Query fetches from /api/playbook-feed
3. Server parses Substack RSS
4. Response cached for 30 seconds
5. Infinite scroll triggers pagination
6. Manual refresh bypasses cache
```

### Error Handling
```
1. Network errors → Fallback to static content
2. RSS parse errors → Empty array response
3. Component errors → Error boundaries (planned)
4. 404 routes → Custom not-found page
```

## Development Patterns

### Component Creation Guidelines
1. **File Naming**: PascalCase matching component name
2. **Props Interface**: Always define TypeScript interface
3. **Default Export**: Use default exports for components
4. **Imports**: Use absolute imports with `@/` prefix

### API Development Guidelines
1. **Route Prefix**: All API routes use `/api` prefix
2. **Error Responses**: Consistent error format
3. **Type Safety**: Use shared types from `schema.ts`
4. **Caching**: Implement appropriate cache headers

### Testing Strategy (Future)
```
Unit Tests: Component behavior
Integration Tests: API endpoints  
E2E Tests: User workflows
Performance Tests: Bundle size & load times
```

## Performance Considerations

### Bundle Optimization
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP with fallbacks
- **CSS Purging**: Tailwind removes unused styles

### Runtime Performance
- **React Query**: Prevents unnecessary re-fetches
- **Framer Motion**: Optimized animations
- **Lazy Loading**: Images and components as needed
- **Memoization**: Strategic use of useMemo/useCallback

## Security Considerations

### Frontend Security
- **XSS Protection**: React's built-in escaping
- **External Links**: `rel="noopener noreferrer"`
- **Content Security**: Validate RSS content

### Backend Security
- **CORS**: Configured for frontend domain
- **Rate Limiting**: Prevent RSS endpoint abuse
- **Input Validation**: Sanitize query parameters

## Future Enhancements

### Planned Features
1. **Content Management**: Admin interface for content
2. **Analytics**: User engagement tracking
3. **SEO**: Meta tags and structured data
4. **PWA**: Offline functionality
5. **Testing**: Comprehensive test suite

### Scalability Considerations
1. **CDN Integration**: Static asset delivery
2. **Database Optimization**: Query performance
3. **Caching Strategy**: Redis for API responses
4. **Monitoring**: Error tracking and performance metrics

---

## Quick Reference

### Adding a New Page
1. Create component in `client/src/pages/`
2. Add route in `App.tsx`
3. Update navigation in `Navigation.tsx`
4. Test responsive design

### Adding an API Endpoint
1. Add route in `server/routes.ts`
2. Define types in `shared/schema.ts`
3. Implement error handling
4. Test with frontend integration

### Troubleshooting Checklist
- Check browser console for errors
- Verify API responses in Network tab
- Test responsive design on multiple devices
- Validate TypeScript compilation
- Review React Query dev tools for cache issues