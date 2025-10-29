# Claude Code Concise Prompt Pack — “Rearranging Narratives” (2D Black & White)

> Paste into Claude Code **phase by phase**. Keep prompts short. **Have Claude generate** the To‑Do list, the single verifiable Checkpoint, and the Subagent/MCP plan for each phase (we do **not** pre‑fill them).

---

## GLOBAL 
**App**: React + Vite + TypeScript. State (Zustand or Context/Reducer) persisted to `localStorage`. Clean, testable file structure.

**Concept**: Drag images to reorder/deconstruct a narrative. Each image = fragment/character/scene. User’s arrangement becomes the story. Include a small “AI & Authorship” surface for reflection.

**Interaction**: Pluggable drag driver (**React DnD** or **native HTML5**). Two switchable layouts:
- **A Timeline (horizontal)**: in‑between drop slots; optional snap.
- **B Free Grid**: dense grid, index‑based reorder; optional snap‑to‑grid.

**Visual System — “Monochrome 2D / Print‑Lab Noir”**
- **Palette**: pure black `#0B0B0B`, paper white `#F9F9F7`, neutral grays; **no color, no gradients**.
- **Line/Shape**: 2px outlines; 12px corner radius; use outline shadows (ink stroke) instead of colored shadows.
- **Textures**: SVG halftone dots, cross‑hatch, diagonal lines as backgrounds/states (selection/emphasis) **instead of color**.
- **Type**: `Inter` for text; `IBM Plex Mono` for meta/labels. 8px spacing grid; subtle 120–180ms micro‑motions.
- **A11y**: Text contrast ≥ 7:1; strong focus ring; full keyboard operability (tab, arrows, shortcuts).

**Global Outputs / Definition of Done**
- Both layouts functional; drag + keyboard reorder work and persist.
- Save/restore named versions; JSON import/export.
- Strict B/W look from shared tokens; consistent components.

> At the end of **every phase**, ask Claude to output: (1) To‑Do; (2) one verifiable Checkpoint; (3) which Subagents & MCP you’ll call and why.

---

## P1 — Scaffold & Shell
Create project scaffold, design tokens (`tokens.css`), base shell (Header/Toolbar/Content/Footer), empty Timeline/Grid views, and a handful of B/W sample images. Ensure tokens drive all components.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

## P2 — Drag Driver & Reorder
Abstract a drag driver interface; implement **React DnD** and **native HTML5**. Enable reorder in **Timeline** (slot‑based) and **Grid** (index‑based) with optional snapping. Add keyboard reorder (arrows, jump to start/end). Persist order.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

## P3 — Versions, Diff, Metadata
Treat current order as a **cut**: save/list/restore/delete named versions. Provide a **Diff view** (side‑by‑side or annotated changes) using textures to indicate moved/inserted/removed. Card inline metadata (title/role/tags/text). JSON import/export.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

## P4 — Authorship Panel (Mock AI by default)
Define an `AIProvider` interface with a **Mock** implementation (deterministic one‑liner suggestions; zero keys). Per card: “Suggest 1‑line narration”; edits mark source (`ai` vs `user`). **Authorship Panel** shows simple textured charts comparing AI‑generated vs user‑edited lines.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

## P5 — A11y, Tests, Perf, Deploy
Complete ARIA/keyboard accessibility; unit/component/E2E tests (e.g., Playwright for DnD); virtualization for long timelines; finalize README/DECISIONS; add Vercel/Netlify deploy config.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

## Optional — Demo Seed Pack
Auto‑generate 18–24 B/W placeholders (2px outline + halftone), `nodes.json`, and two orders for Diff demo; include a short open‑narrative script.

**End with**: have Claude output To‑Do / Checkpoint / Subagents+MCP.

---

### Reusable tail line
> After completing this phase, **output only**: (1) To‑Do; (2) one verifiable Checkpoint; (3) the Subagents & MCP you’ll call and why (e.g., Architect/UI‑Engineer/DragOps/QA; Filesystem/GitHub/Vercel/Notion).
