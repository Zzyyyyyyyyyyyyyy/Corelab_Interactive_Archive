# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Corelab_Interactive_Archive** - "Rearranging Narratives" (2D Black & White)

This is an interactive web application for a 2025 Fall CoreLab course that allows users to drag images to reorder and deconstruct narratives.

## Global Project Requirements

### Technology Stack
**App**: React + Vite + TypeScript. State (Zustand or Context/Reducer) persisted to `localStorage`. Clean, testable file structure.

### Core Concept
**Concept**: Drag images to reorder/deconstruct a narrative. Each image = fragment/character/scene. User's arrangement becomes the story. Include a small "AI & Authorship" surface for reflection.

### Interaction Design
**Interaction**: Pluggable drag driver (**React DnD** or **native HTML5**). Two switchable layouts:
- **A Timeline (horizontal)**: in-between drop slots; optional snap.
- **B Free Grid**: dense grid, index-based reorder; optional snap-to-grid.

### Visual System — "Monochrome 2D / Print-Lab Noir"
- **Palette**: pure black `#0B0B0B`, paper white `#F9F9F7`, neutral grays; **no color, no gradients**.
- **Line/Shape**: 2px outlines; 12px corner radius; use outline shadows (ink stroke) instead of colored shadows.
- **Textures**: SVG halftone dots, cross-hatch, diagonal lines as backgrounds/states (selection/emphasis) **instead of color**.
- **Type**: `Inter` for text; `IBM Plex Mono` for meta/labels. 8px spacing grid; subtle 120–180ms micro-motions.
- **A11y**: Text contrast ≥ 7:1; strong focus ring; full keyboard operability (tab, arrows, shortcuts).

### Global Outputs / Definition of Done
- Both layouts functional; drag + keyboard reorder work and persist.
- Save/restore named versions; JSON import/export.
- Strict B/W look from shared tokens; consistent components.

## Development Commands

All commands should be run from the `rearranging-narratives` directory:

```bash
# Development
npm run dev          # Start development server (http://localhost:5173)

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## Project Structure

```
rearranging-narratives/
├── src/
│   ├── components/
│   │   ├── Shell/           # App shell components
│   │   │   ├── Header.tsx   # App header with title
│   │   │   ├── Toolbar.tsx  # Layout switcher toolbar
│   │   │   ├── Content.tsx  # Main content container
│   │   │   └── Footer.tsx   # App footer
│   │   ├── Views/           # Main view components
│   │   │   ├── TimelineView.tsx  # Horizontal timeline layout
│   │   │   └── GridView.tsx      # Dense grid layout
│   │   └── Common/          # Shared/reusable components
│   ├── assets/
│   │   └── images/          # Sample B/W SVG images
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── tokens.css           # Design tokens (colors, spacing, etc.)
│   ├── index.css            # Global styles
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
└── package.json
```

## Architecture

### Design Tokens (`tokens.css`)
All styling must use CSS custom properties defined in `src/tokens.css`:
- **Colors**: Pure B/W palette (`--color-black`, `--color-white`, gray scale)
- **Typography**: Inter (body) and IBM Plex Mono (meta/labels)
- **Spacing**: 8px grid system (`--spacing-1` through `--spacing-12`)
- **Borders**: 2px outlines, 12px border radius
- **Textures**: Halftone, crosshatch, diagonal, dots patterns (CSS classes)
- **Motion**: 120-180ms transitions
- **Focus**: High-contrast focus rings for accessibility

### Component Organization
1. **Shell Components**: Layout structure (Header, Toolbar, Content, Footer)
2. **View Components**: Main content areas (Timeline, Grid)
3. **Common Components**: Reusable UI elements (to be added in future phases)

### State Management
- Phase 1 uses React `useState` for layout mode switching
- Future phases will add Zustand or Context/Reducer for:
  - Image ordering/arrangement
  - Named versions (cuts)
  - User metadata/annotations
  - localStorage persistence

### Layout Modes
- **Timeline**: Horizontal layout with drop slots for sequential ordering
- **Grid**: Dense grid layout with index-based reordering
- Both modes currently show placeholder UI; drag functionality comes in P2

## Development Guidelines

### Styling Rules
1. **Always use tokens**: Reference CSS custom properties from `tokens.css`
2. **No inline styles**: Keep all styles in separate `.css` files
3. **B/W only**: No colors, gradients, or colored shadows
4. **Textures over color**: Use SVG patterns for emphasis/state
5. **2px borders**: All outlines must be 2px solid black
6. **12px corners**: Standard border radius (use tokens)
7. **Accessibility**: Maintain 7:1 contrast ratio, add focus rings

### Code Organization
- Colocate component CSS files with their TypeScript files
- Keep components small and focused
- Use TypeScript interfaces for all props
- Export components as named exports

### File Naming
- Components: PascalCase (e.g., `TimelineView.tsx`)
- Styles: Match component name (e.g., `TimelineView.css`)
- Types: descriptive names (e.g., `LayoutMode`)

## Version Control
- Main branch: `main`
- Located in OneDrive synced folder (be mindful of sync operations)
- Commit regularly with clear, descriptive messages