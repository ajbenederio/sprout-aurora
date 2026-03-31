# Sprout Aurora

> A Claude Code workspace for research-informed product design prototyping — runs a three-agent pipeline from PRD to working Vue 3 components, powered by the Sprout Design System.

## Skills Inventory

| Skill | Primary Function | Common Activation Words |
|---|---|---|
| `prd-gap-analyzer` | Audit a PRD for completeness before design work begins — surfaces missing sections, assigns severity, generates clarifying questions | "analyze this PRD", "check the PRD for gaps", "is this PRD ready for design?", "review this brief before I start" |
| `secondary-research` | Run structured web research from scratch → produce an 18-section design brief with competitive landscape, friction points, and a prototype-ready input block | "research X", "competitive analysis of X", "landscape of X", "brief on X", "desk research" |
| `prd-ux-validator` | Parse an existing PRD, validate its UX assumptions against live web research, and produce an approved brief — flags `[⚠️ RESEARCH CONFLICT]` markers for PM sign-off | "validate the PRD", "research against the PRD", "PRD + research brief", "validate this spec" |
| `prototype-agent` | Translate an approved research brief into typed Vue 3 `<script setup lang="ts">` components using Sprout DS — queries the design system MCP before generating any component | "build the prototype", "generate components from brief", "prototype this", "implement the design brief" |
| `sprout-design-system` | Foundational reference for 65+ Sprout DS components, color tokens, Tailwind integration rules, and Iconify icon usage — loaded on demand by prototype-agent | (internal reference — loaded by prototype-agent automatically) |

## The Design Pipeline

```
PM writes PRD
     │
     ▼
[optional] prd-gap-analyzer ──► gap report → skills/prd-gap-analyzer/outputs/
     │
     ▼
prd-ux-validator  ──OR──  secondary-research
     │                           │
     └──────────────┬────────────┘
                    ▼
         research brief (status: approved)
         → skills/secondary-research/outputs/
                    │
                    ▼
            prototype-agent
                    │
                    ▼
         Vue 3 components
         → skills/prototype-agent/outputs/[topic-slug]/
```

### Pipeline Handoff Rules

- `prd-ux-validator` and `secondary-research` both produce the same 18-section brief format
- The brief **must** have `status: approved` in its frontmatter before `prototype-agent` will run
- `[⚠️ RESEARCH CONFLICT]` markers in a brief require PM sign-off before prototyping proceeds

### Design System Integration

| Package | Version | Detection |
|---|---|---|
| `design-system-next` | ^2.27.9 | `package.json` dependency |
| `mcp-design-system-next` | ^3.0.0 | MCP server in `.mcp.json` |
| Tailwind CSS | ^4.2.1 | `@tailwindcss/vite` dev dependency |

All Sprout DS components are registered globally via `app.use(SproutDesignSystem)` and available as `Spr*` globals — no per-component imports needed.

## System Requirements

- **Claude Code** CLI with an active Anthropic API key
- **Node.js** 18 or later
- **MCP servers** configured in `.mcp.json`:
  - `mcp-design-system-next` — component and token lookup (required by `prototype-agent`)
  - Figma MCP — for Figma-driven component implementation (optional)

## Installation

```bash
# Clone the repo
git clone git@github.com:ajbenederio/sprout-aurora.git
cd sprout-aurora

# Symlink skills into ~/.claude/skills/ so Claude Code can find them
./install.sh

# Install Node dependencies (only needed to run the Vite prototype preview)
npm install
```

```bash
# Start the Vite dev server to preview prototypes
npm run dev
```

> Open http://localhost:5173 to see the prototype shell. The app renders a fixed 430×932 px mobile screen centered on a gray background. Desktop screens (e.g. `EmployeeHubScreen.vue`) use a full-viewport layout with a max-width container.

## Updating

```bash
git pull
npm install
```

## Usage Examples

### Run a competitive research brief from scratch

```
research payroll self-service portals for SMBs in Southeast Asia
```

The `secondary-research` skill runs 3–10 web searches, compiles a source ledger, and saves an 18-section brief to `skills/secondary-research/outputs/`.

---

### Validate an existing PRD before designing

```
validate the PRD at tasks/payroll-review-prd.md
```

`prd-ux-validator` parses the PRD, runs targeted research, and flags any conflicts between the spec and real-world UX evidence.

---

### Audit a PRD for missing sections

```
analyze this PRD for gaps before we start design
```

`prd-gap-analyzer` rates each of 10 standard sections as Present / Partial / Missing, assigns severity (Critical / Moderate / Low), and saves a gap report.

---

### Generate Vue 3 components from an approved brief

```
build the prototype from skills/secondary-research/outputs/2026-03-31_competitive_payroll-self-service.md
```

`prototype-agent` gates on `status: approved`, queries the design system MCP for component APIs and tokens, then generates typed `<script setup lang="ts">` components in `skills/prototype-agent/outputs/[topic-slug]/`.

---

### Add a new screen to the app

Drop your generated component into `src/components/`, then wire it into `App.vue`:

```js
// App.vue — add to screenMap
import MyNewScreen from './components/MyNewScreen.vue'

const screenMap = {
  'my-new-screen': MyNewScreen,
  // ...existing screens
}
```

Navigate to it from any component:

```js
const { navigate } = useNav()
navigate('my-new-screen')
```

## Extending with Custom Skills

1. Create a directory under `skills/` — e.g. `skills/my-skill/`
2. Add a `SKILL.md` — define trigger phrases, steps, output format, and save paths
3. Reference the skill in Claude Code by name or trigger phrase in chat

Follow the conventions in existing skills: gate checks first, anti-hallucination protocol for any web research, MCP queries before any component generation.

## Additional Resources

- [Sprout Design System MCP](https://www.npmjs.com/package/mcp-design-system-next)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq)
- [Vite docs](https://vitejs.dev)
- [Iconify — Phosphor icons](https://icon-sets.iconify.design/ph/) (`ph:` prefix used throughout)
- [Claude Code docs](https://docs.anthropic.com/claude-code)
