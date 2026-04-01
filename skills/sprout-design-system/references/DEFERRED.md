# Aurora Initiative · Reference Card Build — Deferred & Flagged Components

Last updated: 2026-04-01
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

---

## Resolved

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