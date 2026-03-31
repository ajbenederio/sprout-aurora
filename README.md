# Sprout Design Prototyping Workspace

A Vue 3 prototype environment for the Sprout HR product, paired with a three-step AI-assisted design pipeline using Claude Code.

## Pipeline

```
PM writes PRD
    ↓
[Optional] prd-gap-analyzer   — checks PRD completeness before research
    ↓
prd-ux-validator               — validates PRD assumptions against web research
  or
secondary-research             — runs research from scratch (no PRD)
    ↓  (set status: approved in brief frontmatter)
prototype-agent                — generates Vue 3 + Sprout DS components
```

## Skills

| Skill | Purpose |
|---|---|
| `prd-gap-analyzer` | Audits a PRD for missing sections before design begins |
| `prd-ux-validator` | Validates PRD UX assumptions against web research → produces design brief |
| `secondary-research` | Runs research from scratch → produces design brief |
| `prototype-agent` | Translates approved brief into Vue 3 components |
| `sprout-design-system` | DS knowledge base used by prototype-agent |

## Outputs

- Research briefs → `skills/secondary-research/outputs/`
- Prototype components → `skills/prototype-agent/outputs/[topic-slug]/`
- PRD gap reports → `skills/prd-gap-analyzer/outputs/`

## Running the Prototype

```bash
npm install
npm run dev       # Start dev server (Vite) at localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

## Prerequisites

- [Claude Code](https://claude.ai/code)
- MCP servers: `design-system-next`, `figma` (configured in `.mcp.json`)

## Stack

- Vue 3 (Composition API, `<script setup lang="ts">`)
- Vite
- Sprout Design System (`design-system-next`) — globally registered via `app.use(SproutDesignSystem)`
- Iconify (`@iconify/vue`) for icons
- Tailwind CSS for layout
