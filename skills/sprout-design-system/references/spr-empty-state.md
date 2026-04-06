# `spr-empty-state` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-06**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-empty-state />
</template>
```

No props are required — all have defaults. The component renders out of the box.

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `description` | `string` | `'No results found'` | No | Primary heading text |
| `subDescription` | `string` | `'Try a different search term.'` | No | Secondary text below description |
| `size` | `string` | `'small'` | No | Valid: `small`, `large`. `large` renders a visually larger image |
| `image` | `string` | `'list'` | No | See valid values below — invalid value silently falls back to default |
| `hasButton` | `boolean` | `false` | No | Purpose unclear — does **not** gate `#button` slot visibility. Do not rely on it to show/hide slot content |
| `emptyStateCustomClasses` | `string` | `''` | No | CSS class string passed through to the component container |

### Valid `image` values
`bug`, `clock`, `dashboard`, `employees`, `government-id`, `integration`, `list`, `social-media-handles`, `work-in-progress`, `work-location`

---

## Slots

| Slot | Description |
|---|---|
| `#default` | Renders **above** the image and description |
| `#button` | Renders below the description — use for CTA buttons. Renders regardless of `hasButton` value |

---

## Common Patterns

### Default — no props
```vue
<spr-empty-state />
```

### Custom text and image
```vue
<spr-empty-state
  description="No employees found"
  subDescription="Try adjusting your filters."
  image="employees"
  size="large"
/>
```

### With CTA button
```vue
<spr-empty-state
  description="No integrations connected"
  subDescription="Connect an integration to get started."
  image="integration"
>
  <template #button>
    <spr-button label="Add Integration" />
  </template>
</spr-empty-state>
```

### With custom content above (default slot)
```vue
<spr-empty-state
  description="Work in progress"
  subDescription="Check back soon."
  image="work-in-progress"
>
  <template #default>
    <p>Additional context here</p>
  </template>
</spr-empty-state>
```

---

## Verified Behaviors

- ✅ All props have working defaults — component renders with no props set
- ✅ `size="large"` renders a visually larger illustration than `size="small"`
- ✅ All tested `image` values render correctly (`list`, `dashboard`, `bug`, `work-in-progress`)
- ✅ `#button` slot renders below the description regardless of `hasButton` value
- ✅ `#default` slot renders **above** the image and description
- ✅ `emptyStateCustomClasses` passes a class string to the container (inspect in DevTools to verify application)
- ⚠️ `hasButton` does **not** gate `#button` slot visibility — both `true` and `false` render the slot. Its purpose is unclear; do not use it to conditionally show/hide the button
- ⚠️ Invalid `image` values silently fall back to default with no console error

---

## Global Patterns

- **Kebab-case tag** — `<spr-empty-state>`, never `<SprEmptyState>`
- **No component imports** — never `import { SprEmptyState }`. No types to import for this component.
- **Props are camelCase in template** — `:subDescription`, `:hasButton`, `:emptyStateCustomClasses`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
