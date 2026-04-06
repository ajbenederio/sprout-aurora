# `spr-textarea` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-06**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <spr-textarea
    id="my-textarea"
    v-model="text"
    label="Description"
    placeholder="Enter text..."
  />
</template>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `id` | `string` | `''` | No | Recommended for form usage |
| `modelValue` | `string` | `''` | No | Use `v-model`, not `:modelValue` directly |
| `label` | `string` | `''` | No | Renders above the textarea |
| `supportingLabel` | `string` | `''` | No | Renders inline next to the label |
| `placeholder` | `string` | `''` | No | |
| `rows` | `number` | `4` | No | Controls textarea height |
| `active` | `boolean` | `false` | No | Internal — do not set in templates |
| `disabled` | `boolean` | `false` | No | Grayed out, not editable |
| `readonly` | `boolean` | `false` | No | Grayed out background, not editable |
| `error` | `boolean` | `false` | No | Renders red border |
| `minLength` | `number` | — | No | No default; optional |
| `maxLength` | `number` | — | No | Required for `hasCounter` to display |
| `displayHelper` | `boolean` | `false` | No | Enables helper area below textarea |
| `helperText` | `string` | `''` | No | Text rendered in helper area; requires `displayHelper: true` |
| `helperIcon` | `string` | `null` | No | Icon rendered in helper area; exact name format unconfirmed — test before use |
| `hasCounter` | `boolean` | `false` | No | Shows character counter in `X/max` format; requires `maxLength` to display |

---

## Slots

| Slot | Description |
|---|---|
| `helperMessage` | Renders below the textarea. Works independently — does not require `displayHelper: true` |
| `counter` | Custom counter content rendered below the textarea. Visible on focus. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `string` | Fired on input; use `v-model` |

---

## Common Patterns

**With error and helper message:**
```vue
<spr-textarea
  id="notes"
  v-model="notes"
  label="Notes"
  :error="hasError"
>
  <template #helperMessage>
    <span v-if="hasError">This field is required.</span>
  </template>
</spr-textarea>
```

**With character counter:**
```vue
<spr-textarea
  id="bio"
  v-model="bio"
  label="Bio"
  :has-counter="true"
  :max-length="200"
/>
```

**With custom counter slot:**
```vue
<spr-textarea
  id="bio"
  v-model="bio"
  label="Bio"
>
  <template #counter>
    <span>{{ bio.length }}/200</span>
  </template>
</spr-textarea>
```

**Tall textarea with supporting label:**
```vue
<spr-textarea
  id="description"
  v-model="description"
  label="Description"
  supporting-label="Optional"
  :rows="8"
  placeholder="Enter a detailed description..."
/>
```

---

## Verified Behaviors

- ✅ `v-model` binds correctly — value updates on input
- ✅ Field border turns green when focused (`:active` state handled internally)
- ✅ `supportingLabel` renders inline next to the label, same as `spr-input`
- ✅ `:error="true"` renders a red border
- ✅ `:disabled="true"` grays out the field and prevents editing
- ✅ `:readonly="true"` grays out the field and prevents editing (visually identical to disabled)
- ✅ `:rows="8"` visibly increases textarea height above the 4-row default
- ✅ `displayHelper: true` + `helperText` renders helper text below the textarea
- ⚠️ `helperIcon` accepts a string but icon did not render with `"info"` — exact icon name format unconfirmed, test before use
- ✅ `#helperMessage` slot renders below textarea and works without `displayHelper: true`
- ⚠️ `hasCounter` without `maxLength` shows nothing — `maxLength` is required for counter to display
- ✅ `hasCounter: true` + `maxLength: 100` renders `X/100` counter below the textarea
- ✅ `#counter` slot renders custom counter content; visible on focus

---

## Global Patterns

- **Kebab-case tag** — `<spr-textarea>`, never `<SprTextarea>`
- **No component imports** — never `import { SprTextarea }`. No types to import for this component.
- **Props are camelCase in template** — `supportingLabel`, `displayHelper`, `helperText`, `helperIcon`, `hasCounter`, `maxLength`, `minLength`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
