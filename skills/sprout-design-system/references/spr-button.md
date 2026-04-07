# `spr-button` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-button variant="primary" tone="neutral" @click="handleClick">
    Label
  </spr-button>
</template>

<script setup lang="ts">
const handleClick = (e: MouseEvent) => {
  console.log('clicked', e)
}
</script>
```

---

## Props

| Prop | Type | Default | Valid Values | Notes |
|---|---|---|---|---|
| `variant` | `string` | `"primary"` | `"primary"` `"secondary"` `"tertiary"` | Controls fill/outline/text style |
| `tone` | `string` | `"neutral"` | `"neutral"` `"success"` `"danger"` | Controls color theme |
| `size` | `string` | `"medium"` | `"small"` `"medium"` `"large"` | Controls button size |
| `type` | `string` | `"button"` | `"button"` `"submit"` `"reset"` | Native button type |
| `disabled` | `boolean` | `false` | — | Renders greyed out, non-interactive |
| `fullwidth` | `boolean` | `false` | — | Stretches to full container width |
| `hasIcon` | `boolean` | `false` | — | Layout modifier; expects an icon element in the default slot |
| `state` | `string` | `"base"` | `"base"` `"hover"` `"pressed"` `"focus"` | Internal composable use — do not set in templates |

---

## Slots

| Slot | Description |
|---|---|
| `default` | Button label. Accepts plain text or elements. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `click` | `MouseEvent` | Fires on user click. Not emitted when `disabled`. |

---

## Variant Reference

| Variant | Appearance |
|---|---|
| `primary` | Filled background with border |
| `secondary` | Outline only, no fill |
| `tertiary` | Text only, no border or fill — may need UI reinforcement in product context |

---

## Tone Reference

| Tone | Appearance |
|---|---|
| `neutral` | Default gray/blue |
| `success` | Green |
| `danger` | Red |

---

## Common Patterns

```vue
<!-- Primary action -->
<spr-button variant="primary" tone="neutral" @click="onSave">Save</spr-button>

<!-- Destructive action -->
<spr-button variant="primary" tone="danger" @click="onDelete">Delete</spr-button>

<!-- Disabled -->
<spr-button :disabled="true">Unavailable</spr-button>

<!-- Full width -->
<spr-button :fullwidth="true">Submit</spr-button>

<!-- Form submit -->
<spr-button type="submit" variant="primary">Submit Form</spr-button>

<!-- With icon (hasIcon flags layout intent) -->
<spr-button :hasIcon="true">
  <some-icon />
  Label
</spr-button>
```

---

## Subcomponents

`button-dropdown` exists as a subcomponent (`<spr-button-dropdown>`). Props not yet documented — verify in harness separately.

---

## Verified Behaviors

- ✅ Default slot accepts plain text
- ✅ All variants, tones, and sizes render with visible distinction
- ✅ `disabled` renders correctly — greyed out, non-interactive
- ✅ `fullwidth` stretches to container width
- ✅ `@click` emits `MouseEvent` — confirmed in console
- ✅ `state` prop has no visible template-level effect — internal use only
- ✅ `hasIcon` has no visible effect without an icon element in the slot
- ✅ No wrapper div required

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-button>`, never `<SprButton>`
- **No component imports** — never `import { SprButton }`. No types to import for this component.
- **Props are camelCase in template** — `:hasIcon`, `:fullwidth`, not kebab-case

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import). Always verify in the test harness.
