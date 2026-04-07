# `spr-tooltip` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-tooltip text="Helpful info" placement="top">
    <spr-button>Hover me</spr-button>
  </spr-tooltip>
</template>
```

No imports needed — no types to import for this component.

---

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | `""` | Tooltip content — use for plain text tooltips |
| `placement` | `string` | `"top"` | See valid values below |
| `distance` | `number` | `6` | Gap in px between trigger and tooltip |
| `hasMaxWidth` | `boolean` | `true` | Constrains tooltip width |
| `fitContent` | `boolean` | `true` | Tooltip width fits its content |
| `showTriggers` | `string \| string[]` | `"hover"` | What triggers tooltip to show |
| `hideTriggers` | `string \| string[]` | `"hover"` | What triggers tooltip to hide |
| `autoHide` | `boolean` | `false` | Auto-hides tooltip on outside interaction |

---

## Placement Valid Values

```
"top" | "top-start" | "top-end"
"bottom" | "bottom-start" | "bottom-end"
"left" | "left-start" | "left-end"
"right" | "right-start" | "right-end"
```

---

## Slots

| Slot | Description |
|---|---|
| `default` | The trigger element the tooltip is anchored to |
| `popper-content` | Custom tooltip content — use for rich/HTML content instead of `text` prop |

---

## Common Patterns

```vue
<!-- Plain text tooltip -->
<spr-tooltip text="This is a tooltip" placement="top">
  <spr-button>Hover me</spr-button>
</spr-tooltip>

<!-- Rich content via popper-content slot -->
<spr-tooltip placement="top">
  <spr-button>Hover me</spr-button>
  <template #popper-content>
    <strong>Bold</strong> tooltip content
  </template>
</spr-tooltip>

<!-- Click trigger -->
<spr-tooltip text="Click tooltip" showTriggers="click" hideTriggers="click">
  <spr-button>Click me</spr-button>
</spr-tooltip>

<!-- Bottom placement -->
<spr-tooltip text="Below" placement="bottom">
  <spr-button>Hover me</spr-button>
</spr-tooltip>

<!-- Wrapping any element -->
<spr-tooltip text="Info about this field">
  <span>ℹ️</span>
</spr-tooltip>
```

---

## Verified Behaviors

- ✅ `text` prop renders as tooltip content on hover
- ✅ `popper-content` slot works for custom/rich tooltip content
- ✅ `default` slot wraps the trigger element
- ✅ `placement` positions tooltip correctly in all directions
- ✅ `showTriggers="click"` + `hideTriggers="click"` shows/hides on click
- ✅ No console errors
- ✅ No wrapper div required

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-tooltip>`, never `<SprTooltip>`
- **No component imports** — never `import { SprTooltip }`. No types to import.
- **Props are camelCase in template** — `:hasMaxWidth`, `:fitContent`, `:showTriggers`, `:hideTriggers`, `:autoHide`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import). Always verify in the test harness.
