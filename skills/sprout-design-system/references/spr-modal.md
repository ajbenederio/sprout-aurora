# `spr-modal` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-button @click="open = true">Open Modal</spr-button>

  <spr-modal
    v-model="open"
    title="Modal Title"
    size="md"
  >
    <template #default>
      <p>Modal body content.</p>
    </template>

    <template #footer>
      <spr-button variant="secondary" @click="open = false">Cancel</spr-button>
      <spr-button variant="primary" @click="open = false">Confirm</spr-button>
    </template>
  </spr-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
```

---

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Use `v-model` — controls open/close state |
| `title` | `string` | `""` | Renders in the modal header |
| `size` | `string` | `"md"` | Valid: `"sm"` `"md"` `"lg"` `"xl"` `"xxl"` |
| `closeButtonX` | `boolean` | `true` | Shows/hides the X button in the header |
| `hasFooter` | `boolean` | `true` | Shows/hides the footer slot area |
| `contentPadding` | `boolean` | `true` | Adds/removes padding from the default slot area |
| `staticBackdrop` | `boolean` | `false` | When `true`, clicking the backdrop does not close the modal |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `boolean` | Fired when modal closes — wired automatically via `v-model` |

---

## Slots

| Slot | Description |
|---|---|
| `default` | Modal body content |
| `header` | Replaces the default header (overrides `title` prop) |
| `footer` | Modal footer — typically action buttons |

---

## Common Patterns

```vue
<!-- Confirmation dialog -->
<spr-modal v-model="open" title="Delete Record?" size="sm">
  <template #default>
    <p>This action cannot be undone.</p>
  </template>
  <template #footer>
    <spr-button variant="secondary" @click="open = false">Cancel</spr-button>
    <spr-button variant="primary" tone="danger" @click="onConfirm">Delete</spr-button>
  </template>
</spr-modal>

<!-- Static backdrop — user must use buttons to close -->
<spr-modal v-model="open" title="Required Action" :staticBackdrop="true">
  <template #default>
    <p>Please complete this form before continuing.</p>
  </template>
  <template #footer>
    <spr-button variant="primary" @click="onSubmit">Submit</spr-button>
  </template>
</spr-modal>

<!-- No footer -->
<spr-modal v-model="open" title="Info" :hasFooter="false">
  <template #default>
    <p>Informational content only.</p>
  </template>
</spr-modal>

<!-- No X button -->
<spr-modal v-model="open" title="Forced Flow" :closeButtonX="false" :staticBackdrop="true">
  <template #default>
    <p>User must complete action to dismiss.</p>
  </template>
  <template #footer>
    <spr-button variant="primary" @click="open = false">Done</spr-button>
  </template>
</spr-modal>
```

---

## Verified Behaviors

- ✅ `v-model` controls open/close state correctly
- ✅ `title` renders in the modal header
- ✅ X button renders top-right by default; hidden when `:closeButtonX="false"`
- ✅ Clicking backdrop closes modal by default
- ✅ `:staticBackdrop="true"` prevents backdrop click from closing modal
- ✅ Footer slot renders with action buttons
- ✅ Cancel/Confirm buttons close modal when `open = false` is bound to `@click`
- ✅ Body content renders with padding by default
- ✅ No wrapper div required

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-modal>`, never `<SprModal>`
- **No component imports** — never `import { SprModal }`. No types to import for basic usage.
- **Props are camelCase in template** — `:closeButtonX`, `:hasFooter`, `:contentPadding`, `:staticBackdrop`
- **Use `v-model`** — do not bind `:modelValue` and `@update:modelValue` manually

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing `modelValue`). Always verify in the test harness.
