# `spr-badge` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <!-- Standalone badge -->
  <spr-badge text="5" variant="brand" />

  <!-- Badge positioned over a target element -->
  <spr-badge text="5" variant="brand" position="top">
    <div style="width: 40px; height: 40px;" />
  </spr-badge>
</template>
```

No imports needed — no types to import for this component.

---

## Props

| Prop | Type | Default | Valid Values | Notes |
|---|---|---|---|---|
| `text` | `string` | `"0"` | Any string | Renders as the badge label |
| `variant` | `string` | `"brand"` | `"brand"` `"neutral"` `"danger"` `"disabled"` `"information"` | Controls color |
| `size` | `string` | `"small"` | `"tiny"` `"small"` `"big"` | See size notes below |
| `position` | `string` | `"default"` | `"top"` `"bottom"` `"default"` | Controls placement relative to slotted element |

---

## Size Reference

| Size | Behavior |
|---|---|
| `tiny` | Renders as a dot — no text visible. Use as a pure indicator. |
| `small` | Standard badge with text label |
| `big` | Larger badge with text label |

---

## Variant Reference

| Variant | Color |
|---|---|
| `brand` | Green |
| `neutral` | Gray |
| `danger` | Red |
| `disabled` | Light gray |
| `information` | Blue |

---

## Position Reference

| Position | Behavior |
|---|---|
| `top` | Badge overlaps top-right corner of slotted element |
| `bottom` | Badge overlaps bottom-right corner of slotted element |
| `default` | Badge renders inline next to slotted element — no overlap |

---

## Slots

| Slot | Description |
|---|---|
| `default` | Target element the badge is anchored to. Required when using `position="top"` or `position="bottom"`. Optional for standalone use. |

---

## Common Patterns

```vue
<!-- Standalone notification count -->
<spr-badge text="3" variant="danger" />

<!-- Badge over an icon -->
<spr-badge text="5" variant="brand" position="top">
  <spr-button variant="tertiary">Inbox</spr-button>
</spr-badge>

<!-- Dot indicator (no label) -->
<spr-badge size="tiny" variant="danger" />

<!-- Informational badge -->
<spr-badge text="New" variant="information" size="big" />
```

---

## Verified Behaviors

- ✅ `text` renders as badge label
- ✅ All 5 variants render with distinct colors
- ✅ `tiny` renders as a dot with no visible text — purely an indicator
- ✅ `position="top"` overlaps top-right corner of slotted element
- ✅ `position="bottom"` overlaps bottom-right corner of slotted element
- ✅ `position="default"` renders inline next to slotted element
- ✅ Default slot accepts any element as badge target
- ✅ No wrapper div required

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-badge>`, never `<SprBadge>`
- **No component imports** — never `import { SprBadge }`. No types to import for this component.
- **Props are camelCase in template** — all badge props happen to be single-word, no casing issue

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import). Always verify in the test harness.
