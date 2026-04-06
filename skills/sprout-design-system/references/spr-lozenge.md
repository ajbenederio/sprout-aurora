# `spr-lozenge` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-06**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-lozenge label="Active" tone="success" />
</template>
```

No props are required — all have defaults.

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `label` | `string` | `''` | No | Display text |
| `tone` | `string` | `'plain'` | No | Valid: `plain`, `pending`, `information`, `success`, `danger`, `neutral`, `caution` |
| `fill` | `boolean` | `false` | No | `true` renders solid filled background; `false` renders outlined style |
| `removable` | `boolean` | `false` | No | Intended to show an X button — see ⚠️ Verified Behaviors |
| `url` | `string` | `''` | No | Renders lozenge as a link — shows a broken icon prefix, use with caution |
| `visible` | `boolean` | `true` | No | `false` hides the component (v-show equivalent) |
| `loading` | `boolean` | `false` | No | Renders a full-width skeleton bar in place of the lozenge |
| `icon` | `string` | `''` | No | Prefix icon — icon name format unverified, `"star"` renders nothing. See ⚠️ |
| `postfixIcon` | `string` | `''` | No | Postfix icon — same format caveat as `icon` |
| `interactive` | `boolean` | `false` | No | Adds interactive styling (hover/cursor effect) |
| `dropdown` | `boolean` | `false` | No | Adds a visible chevron — visual indicator only, does not open a menu |
| `maxWidth` | `string` | `'none'` | No | CSS max-width — truncates label with ellipsis when exceeded |

### Valid `tone` values
`plain`, `pending`, `information`, `success`, `danger`, `neutral`, `caution`

---

## Slots

| Slot | Description | Status |
|---|---|---|
| `#avatar` | Renders a circular avatar before the label | ✅ Browser-verified |
| `#icon` | Prefix icon slot — alternative to `icon` prop | ⚠️ MCP-only, unverified |
| `#postfixIcon` | Postfix icon slot — alternative to `postfixIcon` prop | ⚠️ MCP-only, unverified |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `onRemove` | `MouseEvent` | Fires when X remove button is clicked. MCP lists emit as `onRemove` — use `@remove` in template (standard Vue convention). See ⚠️ Verified Behaviors |

---

## Common Patterns

### Status lozenge
```vue
<spr-lozenge label="Active" tone="success" />
<spr-lozenge label="Pending" tone="pending" />
<spr-lozenge label="Inactive" tone="neutral" />
```

### Filled style
```vue
<spr-lozenge label="Danger" tone="danger" :fill="true" />
```

### With avatar
```vue
<spr-lozenge label="Jane Doe" tone="plain">
  <template #avatar>
    <spr-avatar size="tiny" :src="avatarUrl" />
  </template>
</spr-lozenge>
```

### Truncated with maxWidth
```vue
<spr-lozenge
  label="This is a very long label"
  tone="neutral"
  maxWidth="120px"
/>
```

### Loading skeleton
```vue
<spr-lozenge label="Loading..." tone="neutral" :loading="true" />
```

### Dropdown indicator
```vue
<spr-lozenge label="Filter" tone="plain" :dropdown="true" :interactive="true" />
```

---

## Verified Behaviors

- ✅ All 7 tones render correctly across both `fill=false` (outlined) and `fill=true` (solid background)
- ✅ `visible=false` hides the component
- ✅ `loading=true` renders a full-width skeleton bar — not a spinner
- ✅ `dropdown=true` adds a visible chevron — this is a visual indicator only, clicking does not open a menu
- ✅ `#avatar` slot renders a circular element before the label
- ✅ `maxWidth` truncates the label with ellipsis
- ⚠️ **`removable=true` did not show an X button in testing** — MCP lists the emit as `onRemove` but the correct Vue listener may be `@remove`. Needs a targeted follow-up harness run before relying on this prop
- ⚠️ **`url` prop renders as a link but shows a broken image icon** — the component likely expects a design system icon to accompany it. Use with caution until icon format is confirmed
- ⚠️ **`icon` and `postfixIcon` props render nothing with value `"star"`** — icon name format is unknown. Do not use these props until the correct icon name format is confirmed from the design system
- ⚠️ `#icon` and `#postfixIcon` slots are MCP-only/unverified — not tested in this harness run
- ⚠️ `interactive=true` adds interactive styling — hover/cursor effect not confirmable from static screenshot

---

## Global Patterns

- **Kebab-case tag** — `<spr-lozenge>`, never `<SprLozenge>`
- **No component imports** — never `import { SprLozenge }`. No types to import for this component.
- **Props are camelCase in template** — `:postfixIcon`, `:maxWidth`, `:interactive`, `:removable`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
