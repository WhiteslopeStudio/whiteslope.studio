# Copilot Instructions for WhiteSlope Studio

## Project Overview
This is a Next.js-based website for WhiteSlope Studio, featuring an AI-powered chatbot with integrated services showcase and portfolio sections. The project uses TypeScript and follows a component-based architecture.

## Key Architecture Components

### 1. Application Structure
- `/src/app/` - Next.js app router pages and API routes
- `/src/components/` - Reusable React components
  - `/sections/` - Major page sections
  - `/ui/` - UI components like the chatbot
- `/src/lib/` - Core utilities and constants
- `/public/_resources/` - JSON data files for services

### 2. Core Features
- AI Chatbot with multi-tier fallback system
- Portfolio showcase with video integration
- Dynamic pricing pages with service-specific routes
- Blog system with filters
- Contact form with meeting scheduling

## Development Patterns

### Chatbot System (`/src/components/ui/Chatbot.tsx`)
- Uses a hybrid approach with local fallbacks and API integration
- Rate limiting, caching, and intelligent routing
- Smart button generation based on context
- Example usage of hooks and refs:
```typescript
const {
  scrollContainerRef,
  isDragging,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleMouseMove
} = useDragScroll();
```

### Component Architecture
- Use 'use client' directive for interactive components
- Implement proper TypeScript interfaces for props
- Follow the established file structure:
  - Complex UI logic in /components/ui/
  - Page sections in /components/sections/
  - Shared types in /lib/types.ts

### State Management
- Use React hooks for local state
- Implement proper cleanup in useEffect
- Handle loading and error states explicitly
- Example pattern:
```typescript
const [state, setState] = useState<Type>({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);
```

### API Integration
- All API routes are in /src/app/api/
- Use appropriate error handling and rate limiting
- Implement caching where appropriate
- Follow the established response format:
```typescript
return Response.json({ 
  response: string,
  buttons?: ChatButton[],
  fallback?: boolean,
  apiUsed?: boolean,
  responseTime?: number
});
```

### Styling Conventions
- Use Tailwind CSS with custom utility classes
- Follow the established color scheme and animations
- Implement responsive design with mobile-first approach
- Example class pattern:
```tsx
className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
```

## Performance Considerations
1. Use appropriate caching strategies in API routes
2. Implement proper cleanup in useEffect hooks
3. Optimize images and videos for performance
4. Use proper lazy loading for components

## Common Gotchas
1. Always include 'use client' for interactive components
2. Clean up intervals and timeouts in useEffect
3. Handle all API error cases explicitly
4. Test mobile interactions thoroughly