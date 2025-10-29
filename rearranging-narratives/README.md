# Rearranging Narratives

> **Interactive archive for deconstructing and rearranging visual narratives**
> CoreLab 2025 Fall · Monochrome 2D / Print-Lab Noir

## Overview

An interactive web application that allows users to drag and rearrange images to create their own narratives. Each image represents a fragment, character, or scene, and the user's arrangement becomes the story itself.

## Features

- **Two Layout Modes**:
  - Timeline: Horizontal layout with sequential ordering
  - Grid: Dense grid layout with flexible positioning
- **Monochrome Visual System**: Pure black & white aesthetic with texture-based emphasis
- **Accessible Design**: High-contrast focus rings, keyboard navigation
- **Responsive Layout**: Works across different screen sizes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

## Project Status

**Phase 1 Complete** ✓
- Project scaffold with React + Vite + TypeScript
- Design tokens system (tokens.css)
- Base shell components (Header, Toolbar, Content, Footer)
- Empty Timeline and Grid views
- Sample B/W SVG images

**Coming Next (Phase 2)**:
- Drag-and-drop functionality (React DnD or native HTML5)
- Image reordering in both layouts
- Keyboard navigation for reordering
- State persistence to localStorage

## Design System

### Visual Principles

- **Palette**: Pure black (#0B0B0B), paper white (#F9F9F7), neutral grays
- **No color, no gradients**: Strict monochrome aesthetic
- **Textures**: Halftone dots, crosshatch, diagonal lines for emphasis
- **Typography**: Inter (body text), IBM Plex Mono (meta/labels)
- **Spacing**: 8px grid system
- **Borders**: 2px outlines, 12px corner radius

### Accessibility

- Text contrast ≥ 7:1
- Strong focus rings for keyboard navigation
- Full keyboard operability (tab, arrows, shortcuts)
- Semantic HTML structure

## Project Structure

```
src/
├── components/
│   ├── Shell/              # App layout components
│   ├── Views/              # Main content views
│   └── Common/             # Reusable components
├── assets/images/          # Sample B/W images
├── tokens.css              # Design system tokens
├── index.css               # Global styles
└── App.tsx                 # Root component
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Custom Properties** - Design tokens

## License

Academic project - CoreLab 2025 Fall