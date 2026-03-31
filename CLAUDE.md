> Revised from claude-config/CLAUDE.md

# CLAUDE.md

@rules/design-system.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

## Workflow

### 1. Plan Before Acting
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan — don't keep pushing
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- One task per subagent for focused execution

### 3. Verify Before Done
- Never claim complete without proving it works
- Ask: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 4. Elegance Check (Non-Trivial Changes Only)
- Pause and ask: "Is there a more elegant way?"
- If a fix feels hacky: re-implement the elegant solution
- Skip for simple, obvious fixes

### 5. Autonomous Bug Fixing
- When given a bug report: just fix it. No hand-holding required.
- Point at logs, errors, failing tests — then resolve them

### 6. Self-Improvement
- After any correction from the user: update `~/.claude/memory/MEMORY.md` with the pattern
- Write rules that prevent the same mistake
- Review MEMORY.md at session start for patterns relevant to current project

## Task Tracking

When a `tasks/` directory exists:
1. Write plan to `tasks/todo.md` with checkable items
2. Check in with user before starting implementation
3. Mark items complete as you go
4. Add a review section when done
5. Capture lessons in `tasks/lessons.md` after corrections

When no `tasks/` directory exists, track progress via MEMORY.md or in-conversation todos.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Production build
npm run preview   # Preview production build
```

No test runner or linter is configured.

## Architecture

**Stack:** Vue 3 (Composition API, `<script setup>`) + Vite. No router, no state management library — single-page prototype.

**Design System:** The `design-system-next` package (Sprout Design System) is registered globally in `src/main.js` via `app.use(SproutDesignSystem)`. All components are available as `Spr*` globals (e.g. `SprCard`, `SprButton`, `SprLozenge`) — no local imports needed.

> **Rule: always use Sprout DS components.** When a DS component exists for a UI pattern (card, button, badge, stepper, progress bar, modal, etc.), you MUST use it. Do not build custom HTML/CSS equivalents. The only exceptions are structural layout elements with no DS equivalent (e.g. the iOS status bar, page header chrome, scrollable content wrapper).

**Before using any DS component, always call `mcp__design-system-next__get_component` to look up the exact prop names, valid values, and slot names.** Common mistakes to avoid:
- Card body content goes in `#content` slot, not `#default`
- `SprStepper` takes a `:steps` array with `{ number, label, status }` objects; status values are `'pending' | 'active' | 'completed'`
- `SprModal` uses `v-model` (bound to a `ref<boolean>`) and `#default` / `#footer` slots
- `SprLozenge` uses the `label` prop for text; `tone` for color; `:fill="true"` for solid background
- `SprButton` tones are limited to `neutral | success | danger`

**Figma-driven workflow:** Components are implemented directly from Figma designs. Figma MCP asset URLs are used for icons and images (note: these expire after 7 days). When implementing from a Figma URL, use `mcp__figma__get_design_context` to get reference code and screenshots, then adapt to this project's stack.

**Icon rendering pattern:** Icons use a three-layer absolute positioning approach throughout:
```html
<div class="icon-wrap" style="width:24px;height:24px">
  <div class="abs-fill" style="inset:...%">
    <img :src="img.iconName" class="fill-img" alt="" />
  </div>
</div>
```
The CSS utilities `.icon-wrap` (relative container), `.abs-fill` (absolute child), and `.fill-img` (fills parent absolutely) are defined in each component's scoped styles.

**Mobile screen shell:** The UI renders as a fixed 430×932px mobile screen (`src/components/FinancesDashboard.vue`). `App.vue` centers it on a gray background. All new screens/views should follow the same shell pattern.

**Brand colors:** Deep green `#00291b` (primary text/brand), `#14532b` (dark accent), `#158039` (active state), `#dcfce6` (light green active background), `#5d6c6b` (secondary text). Font: `Rubik` for UI, `SF Pro Text` for the iOS status bar.
