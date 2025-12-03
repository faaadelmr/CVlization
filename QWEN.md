# Firebase Studio NextJS Project - QWEN Context

## Project Overview

This is a NextJS starter project created in Firebase Studio, specifically a resume builder application called "CV-lization". The application allows users to create, edit, and download professional resumes with various templates and styling options. It features AI-powered resume analysis capabilities using Google's Genkit and Gemini AI.

Key features include:
- Multiple resume templates (modern, classic, creative, professional, and many others)
- Real-time resume preview with responsive design
- AI-powered resume analysis and parsing from images/PDFs
- Style customization (colors, fonts, backgrounds)
- PDF export functionality
- Form-based content editing

## Architecture

The application follows a modern NextJS 15 architecture with:
- React Server Components and Client Components
- TypeScript for type safety
- Tailwind CSS for styling with shadcn/ui components
- Zod for schema validation
- Genkit for AI integration with Google Gemini
- Context API for state management
- Firebase integration through apphosting.yaml

## Key Technologies

- **Framework**: NextJS 15 with TypeScript
- **UI Components**: shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables
- **AI Integration**: Genkit with Google AI (Gemini)
- **PDF Generation**: Direct browser print functionality (window.print) or jsPDF
- **Icons**: Lucide React
- **Form Handling**: react-hook-form with Zod validation
- **Data Validation**: Zod schemas
- **Firebase**: App Hosting configuration

## Project Structure

```
src/
├── ai/                    # AI flows and configuration
│   ├── flows/            # AI flow definitions (e.g., analyze-resume-flow.ts)
│   ├── dev.ts            # Development configuration
│   └── genkit.ts         # Genkit configuration
├── app/                  # NextJS 15 App Router pages
├── components/          # React components
│   ├── editor/          # Editor panel components
│   ├── templates/       # Resume template components
│   ├── pdf-templates/   # PDF-specific templates
│   ├── ui/              # shadcn/ui components
│   ├── editor-panel.tsx
│   └── resume-preview-panel.tsx
├── context/             # React Context providers (e.g., resume-context)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── pages/               # NextJS Pages Router (if any legacy pages)
```

## Building and Running

### Development
```bash
# Start the NextJS development server with Turbopack
npm run dev

# This runs on port 9002
```

### AI Development
```bash
# Start the Genkit development server for AI flows
npm run genkit:dev

# Or with file watching
npm run genkit:watch
```

### Production Build
```bash
# Build the NextJS application
npm run build

# Start the production server
npm run start
```

### Other Commands
```bash
# Lint the codebase
npm run lint

# Type-check TypeScript files
npm run typecheck
```

## Development Conventions

- **File Naming**: Use PascalCase for React components and camelCase for utilities
- **Component Structure**: Components follow a clear separation between UI presentation and business logic
- **Type Safety**: Strict TypeScript usage with Zod schema validation for all data inputs
- **UI Components**: Leverage shadcn/ui components with consistent styling
- **AI Flows**: Define AI interactions using Genkit flow patterns with proper schema validation
- **State Management**: Use React Context for global state and hooks for local state
- **Accessibility**: Implement proper accessibility attributes using Radix UI primitives

## Key Components

1. **Resume Editor Panel** - Provides tabs for content editing, styling, and AI assistance
2. **Resume Preview Panel** - Real-time preview with PDF export functionality
3. **Template System** - Multiple resume templates with consistent data structure
4. **AI Analysis Flow** - Server-side function to parse resume images/PDFs using Gemini AI
5. **Context Provider** - Manages resume data, template selection, and styling options

## Environment Configuration

The application uses dotenv for environment variables. Make sure to set up the appropriate environment variables for Google AI integration, including API keys.

## PDF Generation Approaches

The application provides multiple approaches for PDF generation:

### Approach 1: Direct Browser Print (Current Implementation)
- Uses `window.print()` to trigger browser's native print dialog
- Maintains exact styling and layout from the preview
- Leverages browser's native PDF generation capabilities
- Preserves original quality without additional processing
- Default print settings include no margins, enabled background graphics, and optimized A4 sizing

### Approach 2: Client-Side PDF Generation (Alternative)
- Uses jsPDF library to generate PDFs directly in the browser
- Can work without canvas by using text and vector-based rendering
- Preserves styling by applying CSS attributes programmatically
- More predictable output across different browsers

### Approach 3: Server-Side PDF Generation (Alternative)
- Generate PDFs on the server using libraries like Puppeteer
- Ensures consistent output regardless of client browser
- Better for complex layouts or when client-side generation fails
- Requires additional server resources but offers more control

## Firebase Integration

The project is configured for Firebase App Hosting with settings in `apphosting.yaml` controlling instance scaling.