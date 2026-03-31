---
name: prototype-agent
description: Use when the user has an approved research brief and wants to generate Vue prototype components. Triggers on: "build the prototype", "generate components from brief", "prototype this", "implement the design brief", "build from the brief".
---

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

### 3. Design System (via MCP)
Query before generating any component:
- `mcp__design-system-next__list_components` — available components
- `mcp__design-system-next__get_component` — component props, variants, slots
- `mcp__design-system-next__get_tokens` — spacing, color, typography tokens
- `mcp__design-system-next__search_components` — find components by keyword
- `mcp__design-system-next__search_by_prop` — find components by prop

**Always query the design system before generating UI.** Never assume component names, props, or tokens.

---

## Gate Check — Before Anything Else

Read the research brief frontmatter:

- `status: approved` → proceed
- `status: draft` → stop and notify:
  > "The research brief is still in draft status. Change `status: draft` to `status: approved` to proceed."
- Field absent → treat as draft, apply the same hold

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

> **Format authority:** This block defines the canonical field names for the Prototype Agent Input Block. The `secondary-research` skill (§15) and `prd-ux-validator` skill (§15) both produce output in this exact format. If field names change here, update both upstream skills to match.

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

Query the MCP design system for components relevant to each design implication and friction point.

Output a COMPONENT MAPPING block:
```
COMPONENT MAPPING
├── [Design implication] → [DS component + variant]
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

Generate Vue 3 `<script setup>` components directly. No spec review step.

### Mobile Shell Constraint
All screens render inside a **430×932px fixed shell** (see `src/components/FinancesDashboard.vue` for the pattern). Every new screen must follow this shell — never design for full viewport.

### Code Standards
- Vue 3 `<script setup>` + Composition API
- Sprout Design System components (globally registered via `app.use(SproutDesignSystem)`)
- Brand colors: `#00291b` (primary text), `#158039` (active), `#dcfce6` (light green active bg), `#5d6c6b` (secondary text)
- Font: `Rubik` for UI elements
- Icons use three-layer absolute positioning:
```html
<div class="icon-wrap" style="width:24px;height:24px">
  <div class="abs-fill" style="inset:...%">
    <img :src="iconSrc" class="fill-img" alt="" />
  </div>
</div>
```
With scoped styles:
```css
.icon-wrap { position: relative; }
.abs-fill { position: absolute; }
.fill-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
```

### Each component must include:
- All interaction states: loading, error, empty, success (where applicable)
- Accessibility attributes per design system requirements
- A comment anchoring each major section to the research finding it addresses

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
3. Save the full output log (sections 1–5) as `[topic-slug]-log.md`
4. Tell the user the file paths and which research implications each component addresses

---

## Behavioral Rules

1. Never generate a component not in the design system without flagging it as a gap first.
2. Every component must trace back to a specific research finding, implication, or logged assumption.
3. If behavioral data is missing, apply domain assumptions, log them, and proceed. A component with visible assumptions is more useful than no component.
4. Success criteria come from the PM brief only. If absent, flag in Open Questions — do not derive from research.
5. Domain fluency is required: apply HRIS context (payroll cycles, compliance workflows, employee vs. admin roles) when relevant.
6. The mobile shell is non-negotiable. Every screen is 430×932px.
7. Query the design system MCP before generating any component — never assume props or token names.
