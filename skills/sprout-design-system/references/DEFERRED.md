# Aurora Initiative · Reference Card Build — Deferred & Flagged Components

Last updated: 2026-04-07
Branch: `refactor/2-improve-design-system-inaccuracies`

This file is the source of truth for all deferred harness runs and flagged items discovered during reference card builds. Update this file whenever a new flag is added.

## Legend

- 🔴 Blocked — cannot write card without harness run
- 🟡 Flagged — card written from MCP data but browser-unverified; flag if used in prototype generation
- 🟢 Queued — no props in MCP; needs standalone harness run before card can be written

---

## Deferred Components

### `spr-input-dropdown`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-input-email`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-input-password`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-input-search`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-input-url`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-input-username`
- Status: 🟢 Queued
- Parent: `spr-input` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-lozenge` — `removable` prop / `@remove` emit
- Status: 🔴 Blocked
- Parent: `spr-lozenge` (top-level)
- Issue: `removable=true` did not show an X button in harness. MCP lists emit as `onRemove` but correct Vue listener may be `@remove`. Behavior unconfirmed.
- Action: Targeted harness run needed — test `@remove` listener syntax and confirm X button renders

### `spr-date-picker-calendar-tab`
- Status: 🟢 Queued
- Parent: `spr-date-picker` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-date-picker-month-tab`
- Status: 🟢 Queued
- Parent: `spr-date-picker` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

### `spr-date-picker-year-tab`
- Status: 🟢 Queued
- Parent: `spr-date-picker` (subcomponent)
- Issue: No documented props in MCP
- Action: Harness run needed before card can be written

---

## Flagged — MCP Data Only, Browser-Unverified

### `spr-input-contact-number`
- Status: 🟡 Flagged
- Parent: `spr-input` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-input-currency`
- Status: 🟡 Flagged
- Parent: `spr-input` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-select-multiple`
- Status: 🟡 Flagged
- Parent: `spr-select` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-select-ladderized`
- Status: 🟡 Flagged
- Parent: `spr-select` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-lozenge` — `icon` / `postfixIcon` props
- Status: 🟡 Flagged
- Parent: `spr-lozenge` (top-level)
- Issue: Icon name format unknown — passing `"star"` renders nothing. Valid icon name format for this design system is unconfirmed.
- Action: Confirm icon name format before using these props in prototype generation

### `spr-lozenge` — `#icon` / `#postfixIcon` slots
- Status: 🟡 Flagged
- Parent: `spr-lozenge` (top-level)
- Issue: MCP-only — slots exist per JSON but were not tested in harness
- Action: Verify in harness if used in prototype generation

### `spr-date-calendar-picker`
- Status: 🟡 Flagged
- Parent: `spr-date-picker` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-date-range-picker`
- Status: 🟡 Flagged
- Parent: `spr-date-picker` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-month-year-picker`
- Status: 🟡 Flagged
- Parent: `spr-date-picker` (subcomponent)
- Issue: Full props available in MCP but never run in test harness
- Action: Verify in harness if used in prototype generation

### `spr-filter` — `filterMenu` prop
- Status: 🟡 Flagged
- Parent: `spr-filter` (top-level)
- Issue: Accepted without error but second-tier filter behavior unverified in harness
- Action: Verify in harness if used in prototype generation

### `spr-filter` — `hasSearchApi`, `hasAdvancedFilterApi`, `deselected` props
- Status: 🟡 Flagged
- Parent: `spr-filter` (top-level)
- Issue: Accepted without error but behavior unverified
- Action: Verify in harness if used in prototype generation

### `spr-filter` — `filterData`, `search`, `searchFilter` props
- Status: 🟡 Flagged
- Parent: `spr-filter` (top-level)
- Issue: Accepted without error but behavior unverified
- Action: Verify in harness if used in prototype generation

---

## Resolved

### `spr-filter`
- Status: ✅ Resolved — card written (partial flags remain, see Flagged above)
- Verified: 2026-04-07 · Design System Next v2.27.9
- Notes: Always-open inline panel — not a dropdown trigger. Does not close on outside click. Each instance requires its own v-model ref — sharing refs causes infinite reactive loop. `options` requires `{ isSelected, text, value }` shape. v-model returns full option objects with `isSelected: true`. `filterable: true` filters list as user types. `filling: true` pre-fills search with selected text. `loading: true` shows "Loading..." text. `#empty` slot is a no-op — use `#empty-state` instead. `filterMenu`, `hasSearchApi`, `hasAdvancedFilterApi`, `filterData`, `deselected` accepted without error but unverified.

### `spr-date-picker`
- Status: ✅ Resolved — card written
- Verified: 2026-04-06 · Design System Next v2.27.9
- Notes: `id` and `v-model` both required. `format` controls v-model output string. `getInputValue` returns display string, not v-model value. `getMonthList` and `getYearList` fire on mount. `#helperMessage` slot requires `displayHelper: true`. Default scoped slot exposes `handle-click` for custom triggers. Partial `DisabledDatesType` accepted without error. Three internal tab subcomponents deferred (no props in MCP). Three subcomponents flagged (MCP-only).

### `spr-lozenge`
- Status: ✅ Resolved — card written (partial flags remain, see Flagged above)
- Verified: 2026-04-06 · Design System Next v2.27.9
- Notes: All tones and `fill` verified. `loading=true` renders full-width skeleton bar. `dropdown=true` adds chevron only — not functional. `visible=false` hides component. `maxWidth` truncates with ellipsis. `#avatar` slot verified. `removable`, `icon`/`postfixIcon` props, and `#icon`/`#postfixIcon` slots remain flagged.

### `spr-empty-state`
- Status: ✅ Resolved — card written
- Verified: 2026-04-06 · Design System Next v2.27.9
- Notes: No required props. `#default` slot renders above image. `#button` slot renders regardless of `hasButton` value — `hasButton` purpose unclear, do not rely on it to gate slot visibility.

### `spr-table-pagination`
- Status: ✅ Resolved — card written
- Verified: 2026-04-06 · Design System Next v2.27.9
- Notes: Subcomponent of `spr-table` — fetch via `get_component("table")`. Use numbers (not strings) for `dropdownSelection` value fields. `selectedRowCount` must exactly match a value in `dropdownSelection` or initial selection is wrong. `aria-hidden` popper warnings are non-blocking.

### `spr-button-dropdown`
- Status: ✅ Resolved — card written
- Parent: `spr-button` (subcomponent)
- Verified: 2026-04-01 · Design System Next v2.27.9
- Notes: Subcomponent only — do not use standalone. Do not use `v-model` directly; use `:model-value` + `@update:model-value` with manual array accumulation. `menuList` items must be `{ label, value }` shape.

### `spr-table`
- Status: ✅ Resolved — card written
- Notes: Wrapper div with explicit height required.

### `spr-accordion`
- Status: ✅ Resolved — card written
- Notes: Dynamic slot `#[item.collapseId]`; no height wrapper needed.

### `spr-button`
- Status: ✅ Resolved — card written
- Notes: `state` prop is internal-use only.

### `spr-input`
- Status: ✅ Resolved — card written
- Notes: `supportingLabel` renders inline next to label, not below.

### `spr-badge`
- Status: ✅ Resolved — card written
- Notes: `tiny` size renders as dot with no text.

### `spr-modal`
- Status: ✅ Resolved — card written
- Notes: `v-model` controls open/close.

### `spr-select`
- Status: ✅ Resolved — card written
- Notes: Object options return full object, not just `valueField`. `popper-state` console warning is internal — ignore.

### `spr-tabs`
- Status: ✅ Resolved — card written
- Notes: `list` requires `{ label, value }` shape only. `activeTab` matches by label text, not value/index. Always derive `activeTab` from `tabs[0].label`. No slots — content managed externally via `tabIndex` emit.

### `spr-tooltip`
- Status: ✅ Resolved — card written
- Notes: `text` prop for plain text; `#popper-content` slot for rich content.