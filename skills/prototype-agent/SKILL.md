---
name: prototype-agent
description: Use when the user wants to generate Vue prototype components. Triggers on: "build the prototype", "generate components from brief", "prototype this", "implement the design brief", "build from the brief", "build me a", "create a screen", "generate a", "make a prototype", "build a form", "create a form", "build a table", "build a dashboard".
---

## HARD CONSTRAINTS — READ BEFORE ANYTHING ELSE

These rules are non-negotiable and override all MCP examples:

1. Every component file must start with `<script setup lang="ts">` — never `<script setup>` alone
2. Every reactive value must use typed ref — `ref<Type[]>([...])` for arrays, `ref<string>('')`, `ref<number>(0)` for primitives. Never plain const or untyped ref.
3. Colors are applied as Tailwind classes in the template — never as hex values in `<style scoped>`. Use semantic tokens first, raw palette as fallback. If no token exists, add `/* no spr- token */` comment in CSS and keep the hex.
4. All component tags use kebab-case — `<spr-button>` never `<SprButton>`. **Props are camelCase in template bindings** — `:accordionItems`, `:dataTable`, `:minMaxYear`. Slot names are kebab-case — `#footer-actions`, `#popper-content`.
5. Icons use Iconify — never three-layer img wrappers.

# Prototype Agent

Translate an approved research brief into working Vue 3 components using the Sprout Design System. No spec review step — output is running code.

## Inputs

You need three inputs before generating anything:

### 1. Research Brief (from Research Agent)
Path to an approved `.md` file in `skills/secondary-research/outputs/`. Must have `status: approved` in frontmatter.

### 2. PM Brief (optional but preferred)
A structured document with:
- **Success criteria** — observable outcomes that define when the feature is working (source of truth — do not infer from research)
- **Product constraints** — scope boundaries, platform targets, release conditions

**Preferred form:** A PRD processed through the `prd-ux-validator` skill. A raw PRD is also accepted. If absent, flag in Open Questions and proceed using research brief only.

### 3. Design System (via MCP + verified reference cards)
Before generating any component:
1. Check if a verified reference card exists at `skills/sprout-design-system/references/spr-[component].md`
2. If yes — **load and follow the card exactly**. It is browser-verified ground truth. Do not deviate from its props, slot names, or patterns.
3. If no card exists — query MCP via `mcp__design-system-next__get_component`. Never use the `usageExample` field from MCP — it contains errors. Flag the component as unverified in ASSUMPTIONS.

Available MCP tools (use only when no verified card exists):
- `mcp__design-system-next__list_components` — available components
- `mcp__design-system-next__get_component` — component props, variants, slots
- `mcp__design-system-next__get_tokens` — spacing, color, typography tokens
- `mcp__design-system-next__search_components` — find components by keyword
- `mcp__design-system-next__search_by_prop` — find components by prop

**MCP provides component API only** — props, slots, events, and token names. It does not define code style, TypeScript usage, or reactivity patterns. The Code Standards section overrides all MCP output examples on those points.

---

## Gate Check — Before Anything Else

Read the research brief frontmatter:

- `status: approved` → proceed
- `status: draft` → stop and notify:
  > "The research brief is still in draft status. Change `status: draft` to `status: approved` to proceed."
- Field absent → treat as draft, apply the same hold

---

## Reference Card Confirmation — Required Before Phase 2

After identifying which components the prompt requires, you must:

1. Read each verified card at `skills/sprout-design-system/references/spr-[component].md`
2. Output this block **before producing any COMPONENT MAPPING or Vue code**:

```
REFERENCE CARDS LOADED
├── spr-[component] → skills/sprout-design-system/references/spr-[component].md → [one key gotcha from the card]
├── spr-[component] → skills/sprout-design-system/references/spr-[component].md → [one key gotcha from the card]
└── spr-[component] → no verified card — MCP only → flagged as unverified in ASSUMPTIONS
```

**Do not proceed to Phase 2 until this block is complete and every listed card has been read.**

If a card exists and was not read, stop and read it now before continuing.

This block is non-optional. Skipping it and proceeding directly to component generation is a violation of this skill.

---

## Phase 1 — Parse Inputs

Extract from the research brief:
- Primary user job-to-be-done
- Top 1–2 friction points
- Design implications (each one drives a component or interaction decision)
- Constraints (regulatory, technical, accessibility, domain)
- Open questions

**When behavioral data is sparse**, do not stall. Apply in order:
1. Established UX patterns for this interaction type
2. Sprout domain knowledge (HRIS workflows, payroll cycles, employee vs. admin context, BIR/SSS/PhilHealth patterns)
3. Competitive conventions from the research brief

Log every inferred item in the ASSUMPTIONS block with source: `[pattern-based]`, `[domain-knowledge]`, or `[competitive convention]`.

Output a RESEARCH SUMMARY block:

```
RESEARCH SUMMARY
├── User: [role + context]
├── Core need: [one sentence]
├── Primary friction: [top 1-2 pain points]
├── Decision trigger: [what initiates the interaction]
├── Success state: [what does task completion look like]
└── Constraints: [from research + PM brief]
```

---

## Phase 2 — Design System Query

For each component needed:
1. Check `skills/sprout-design-system/references/` for a verified card first
2. If no card — query MCP and flag as unverified

Output a COMPONENT MAPPING block:
```
COMPONENT MAPPING
├── [Design implication] → [DS component + variant] → [card status: verified / MCP-only]
├── [Friction point] → [pattern that resolves it] → [DS component]
└── [Edge case] → [state variant or fallback]
```

If a research need cannot be satisfied by an existing component, flag it:
```
COMPONENT GAP
├── Need: [what the research requires]
├── Closest existing: [component + why it falls short]
└── Recommendation: [workaround or custom component note]
```

---

## Phase 3 — Generate Vue Components

Generate Vue 3 `<script setup lang="ts">` components directly. No spec review step.

### Shell Constraint

Determine the target platform before generating:

- **Mobile screens** — use the 430×932px fixed shell
  (see `src/components/FinancesDashboard.vue` for the pattern)
- **Desktop screens** — use full viewport with max-width container
  (see `src/components/EmployeeHubScreen.vue` for the pattern)

If the platform is not specified in the brief, check existing screens in `src/components/` for context, or ask before generating.

### Code Standards

**TypeScript**
- Always `<script setup lang="ts">` — never omit `lang="ts"`
- Every reactive value must be typed: `ref<Type[]>([...])`, `ref<string>('')`, `ref<number>(0)`
- Always define TypeScript interfaces for data shapes — never use untyped objects
- All emits must use typed defineEmits: `defineEmits<{ 'event-name': [payload: Type] }>()`

**Components**
- Sprout Design System is globally registered via `app.use(SproutDesignSystem)` — never import individual components
- Never use PascalCase tags — `<spr-accordion>` not `<SprAccordion>`
- **Component tags** — kebab-case: `<spr-accordion>`, `<spr-date-picker>`
- **Prop bindings** — camelCase: `:accordionItems`, `:dataTable`, `:minMaxYear`, `:hasCounter`
- **Slot names** — kebab-case: `#footer-actions`, `#popper-content`, `#helper-message`

```
RIGHT: <spr-accordion :accordionItems="items">
WRONG: <SprAccordion :accordion-items="items">
RIGHT: <template #footer-actions>
WRONG: <template #footer>
```

**Colors — always apply as Tailwind classes in the template, never as hex in CSS**

Priority order:
1. **Semantic tokens first** (from `skills/sprout-design-system/references/color-tokens.md`):
   - Text: `spr-text-color-strong`, `spr-text-color-base`, `spr-text-color-supporting`, `spr-text-color-weak`
   - Text semantic: `spr-text-color-brand-base`, `spr-text-color-success-base`, `spr-text-color-danger-base`
   - Background: `spr-background-color`, `spr-background-color-surface`, `spr-background-color-base`
   - Background semantic: `spr-background-color-brand-base`, `spr-background-color-brand-weak`, `spr-background-color-success-weak`, `spr-background-color-danger-weak`
   - Border: `spr-border-color-base`, `spr-border-color-brand-base`, `spr-border-color-danger-base`
   - Inverted (dark bg): `spr-text-color-inverted-strong`, `spr-text-color-inverted-base`, `spr-background-color-inverted`

2. **Raw palette as fallback** (when no semantic token fits):
   - `spr-text-kangkong-700` (brand green text)
   - `spr-bg-kangkong-100` (light green bg)
   - `spr-bg-mushroom-950` (dark bg)
   - `spr-text-mushroom-600` (secondary text)
   - `spr-bg-white-50` (white bg)
   - `spr-bg-white-100` (off-white bg)
   - Full palette reference: `skills/sprout-design-system/references/utilities.md`

3. **No token exists** (e.g. `#00291b` brand deep-green): keep hex in CSS with comment:
   ```css
   color: #00291b; /* no spr- token — brand deep-green */
   ```

**Icons — always use Iconify**
```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="ph:pencil" />
  <Icon icon="ph:trash" class="spr-text-color-danger-base" />
  <spr-button has-icon>
    <Icon icon="ph:plus" />
    Add Item
  </spr-button>
</template>
```

Primary icon set is Phosphor (`ph:`). Browse at https://icon-sets.iconify.design/ph/

**Layout**
- Use standard Tailwind for layout, spacing, sizing: `flex`, `gap-4`, `p-6`, `w-full`, `grid`
- Use `spr-` only for design tokens: colors, typography, border-radius, max-width

**Typography classes** (apply in template, not CSS):
- Headings: `spr-heading-xl`, `spr-heading-lg`, `spr-heading-md`, `spr-heading-sm`, `spr-heading-xs`
- Body: `spr-body-lg-regular`, `spr-body-md-regular`, `spr-body-sm-regular`, `spr-body-xs-regular`
- Labels: `spr-label-sm-medium`, `spr-label-xs-regular`

### Each component must include:
- All interaction states: loading, error, empty, success (where applicable)
- Accessibility attributes per design system requirements
- A comment anchoring each major section to the research finding it addresses

---

### Pre-output Checklist — Run Before Saving Any Component

Before writing any `.vue` file, verify all six:

- [ ] `REFERENCE CARDS LOADED` block was output before Phase 2 — every card was read, not skipped
- [ ] `<script setup lang="ts">` — if `lang="ts"` is missing, add it now
- [ ] All reactive values use typed ref — `ref<Type[]>()` for arrays, typed primitives for scalars
- [ ] TypeScript interface defined for all data shapes
- [ ] Component tags are kebab-case (`<spr-table>`), prop bindings are camelCase (`:dataTable`), slot names are kebab-case (`#footer-actions`)
- [ ] No hex values in `<style scoped>` except documented no-token exceptions with comments

Do not save the file until all six pass.

---

## Knowledge Base

Load in order before generating any component:

1. `skills/sprout-design-system/SKILL.md` — setup, component index, Tailwind rules, patterns
2. **Verified reference card for each component being used:**
   - Check `skills/sprout-design-system/references/spr-[component].md`
   - If a card exists → load it and follow it exactly. It is browser-verified ground truth.
   - If no card exists → use MCP `get_component` only. Never use the `usageExample` field. Flag as unverified in ASSUMPTIONS.
   - See `skills/sprout-design-system/references/DEFERRED.md` for known flagged and deferred components
3. `skills/sprout-design-system/references/color-tokens.md` — always load for any component that uses color
4. `skills/sprout-design-system/references/utilities.md` — for spacing, typography, border-radius tokens

Load only what you need. Do not load all reference files upfront.

---

## Known Prop Dependencies — Silent Failures

These produce no console error — component renders but behaves incorrectly:

| Component | Issue | What breaks | Fix |
|---|---|---|---|
| `spr-table` | `:headers` is required | Blank render, no error | Always pass `Header[]` array |
| `spr-table` | Height wrapper required | Blank render, no error | Wrap in div with explicit height |
| `spr-table` | `#name`, `#status` slots | `field` in headers must match slot name exactly | Slot content is empty |
| `spr-table-pagination` | `dropdownSelection` value type | Must be `number`, not `string` | `{ text: '10', value: 10 }` |
| `spr-table-pagination` | `selectedRowCount` initial value | Must exactly match a value in `dropdownSelection` | Shows wrong selection |
| `spr-table-pagination` | `v-model:currentPage` | Must reset to 1 when search changes | Shows wrong page after filter |
| `spr-accordion` | Dynamic slot syntax | Slot name must match `collapseId` exactly | Use `#[item.collapseId]` — not a static name |
| `spr-tabs` | `list` shape | Must be `{ label, value }` — `{ title, value }` crashes on mount | TypeError on mount |
| `spr-tabs` | `activeTab` matching | Matches by label text only — not value, not index | Wrong tab active |
| `spr-select` | `id` required | Silent failure | Always pass `id` |
| `spr-select` | `options` prop name | `menu-list` is wrong — use `options` | No options rendered |
| `spr-select` | Object option return | Returns full matched object, not just `valueField` | Extract manually if needed |
| `spr-modal` | `id` required | Silent failure | Always pass `id` |
| `spr-modal` | `#footer-actions` slot | `#footer` is wrong slot name | Footer renders blank |
| `spr-modal` | No `@close` event | Modal does not auto-close on button click | Set `v-model` ref to `false` manually |
| `spr-date-picker` | `id` required | Silent failure | Always pass `id` |
| `spr-date-picker` | `#helperMessage` slot | Requires `displayHelper: true` to render | Slot invisible without it |
| `spr-snackbar` | Pinia order | `createPinia()` must run before `app.use(SproutDesignSystem)` | Snackbar store throws |

---

## Output Format

```
1. RESEARCH SUMMARY       — parsed brief
2. COMPONENT MAPPING      — DS query results mapped to research needs
3. COMPONENT GAPS         — flagged mismatches (if any)
4. ASSUMPTIONS            — inferred items with source tags
5. OPEN QUESTIONS         — items requiring human resolution
6. VUE COMPONENTS         — the deliverable
```

Sections 1–5 are shown for transparency and governance. Section 6 is the primary output.

---

## File Saving

After generating components:

1. Create a folder: `skills/prototype-agent/outputs/[topic-slug]/`
   - topic-slug matches the research brief filename slug
2. Save each component as `[ComponentName].vue`
3. Run the linter on the output:
   `node skills/prototype-agent/scripts/lint-component.cjs skills/prototype-agent/outputs/[topic-slug]/[ComponentName].vue`
   Resolve any flagged items before marking the task complete.
4. Save the full output log (sections 1–5) as `[topic-slug]-log.md`
5. Tell the user the file paths and which research implications each component addresses

---

## Behavioral Rules

1. Never generate a component not in the design system without flagging it as a gap first.
2. Every component must trace back to a specific research finding, implication, or logged assumption.
3. If behavioral data is missing, apply domain assumptions, log them, and proceed. A component with visible assumptions is more useful than no component.
4. Success criteria come from the PM brief only. If absent, flag in Open Questions — do not derive from research.
5. Domain fluency is required: apply HRIS context (payroll cycles, compliance workflows, employee vs. admin roles) when relevant.
6. Apply the 430×932px mobile shell for mobile screens only. Desktop screens use full viewport. If platform is unclear, check existing screens in `src/components/` or ask before generating.
7. Always check for a verified reference card before querying MCP — cards are browser-verified ground truth and take precedence over MCP output.
8. After generating any component, always run a self-audit against the HARD CONSTRAINTS section before saving — regardless of confidence. Check all five constraints. Fix any violation in the same task before writing the file. Do not wait to be challenged.