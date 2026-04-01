# `spr-input` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-input
    id="basic"
    v-model="value"
    label="Label"
    placeholder="Type something..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

---

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Recommended for accessibility |
| `modelValue` | `string \| number` | `""` | Use `v-model` — do not bind directly |
| `label` | `string` | `""` | Renders above the field |
| `supportingLabel` | `string` | `""` | Renders inline next to the label (not below) |
| `placeholder` | `string` | `""` | Input placeholder text |
| `type` | `string` | `"text"` | See valid values below |
| `active` | `boolean` | `false` | Renders blue border — visually distinct from base |
| `disabled` | `boolean` | `false` | Greyed out background, non-interactive |
| `readonly` | `boolean` | `false` | No grey background — visually similar to base but non-editable |
| `error` | `boolean` | `false` | Renders red border |
| `showCharCount` | `boolean` | `false` | Renders `0/N` counter bottom-right; requires `maxLength` to be set |
| `minLength` | `number` | — | Native input minlength |
| `maxLength` | `number` | — | Native input maxlength; required for `showCharCount` to display |
| `offsetSize` | `string` | `"sm"` | Valid: `"xs"` `"sm"` `"md"` |
| `displayHelper` | `boolean` | `false` | Renders helper row below the field |
| `helperText` | `string` | `""` | Helper text content; requires `displayHelper: true` |
| `helperIcon` | `string` | `null` | Icon for helper row |

---

## Type Valid Values

```
"button" | "checkbox" | "color" | "date" | "datetime-local" | "email"
"file" | "hidden" | "image" | "month" | "contact-number" | "password"
"radio" | "range" | "reset" | "search" | "submit" | "tel" | "text"
"time" | "url" | "week"
```

Note: `"contact-number"` is a Sprout custom type — use `<spr-input-contact-number>` for the full phone input experience.

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `string \| number` | Fired on input — wired automatically via `v-model` |
| `blur` | `Event` | Fired when input loses focus |

---

## Slots

| Slot | Position | Notes |
|---|---|---|
| `prefix` | Inside field, left | Renders inline before input text |
| `trailing` | Inside field, right | Renders inline after input text |
| `icon` | Inside field | Verify position in harness if used |
| `helperMessage` | Below field | Custom helper content; use alongside `displayHelper` |

---

## Common Patterns

```vue
<!-- With v-model and label -->
<spr-input id="name" v-model="name" label="Full Name" placeholder="Enter name" />

<!-- With char count -->
<spr-input
  id="bio"
  v-model="bio"
  label="Bio"
  :showCharCount="true"
  :maxLength="200"
/>

<!-- Error state -->
<spr-input id="email" v-model="email" label="Email" :error="true" />

<!-- With helper text -->
<spr-input
  id="username"
  v-model="username"
  label="Username"
  :displayHelper="true"
  helperText="Must be unique"
/>

<!-- With prefix and trailing slots -->
<spr-input id="search" v-model="query" label="Search">
  <template #prefix>🔍</template>
  <template #trailing>⌘K</template>
</spr-input>

<!-- Disabled -->
<spr-input id="locked" v-model="value" label="Locked" :disabled="true" />
```

---

## Subcomponents

These render as kebab-case tags and are globally registered:

| Component | Tag | Props documented |
|---|---|---|
| InputContactNumber | `<spr-input-contact-number>` | ✅ Full props — see below |
| InputCurrency | `<spr-input-currency>` | ✅ Full props — see below |
| InputDropdown | `<spr-input-dropdown>` | ❌ No props in MCP — verify in harness |
| InputEmail | `<spr-input-email>` | ❌ No props in MCP — verify in harness |
| InputPassword | `<spr-input-password>` | ❌ No props in MCP — verify in harness |
| InputSearch | `<spr-input-search>` | ❌ No props in MCP — verify in harness |
| InputUrl | `<spr-input-url>` | ❌ No props in MCP — verify in harness |
| InputUsername | `<spr-input-username>` | ❌ No props in MCP — verify in harness |

---

### `spr-input-contact-number` Props

| Prop | Type | Default |
|---|---|---|
| `id` | `string` | `""` |
| `modelValue` | `string` | `""` |
| `placeholder` | `string` | `"Enter Phone Number"` |
| `preSelectedCountryCode` | `string` | `"PH"` |
| `disabled` | `boolean` | `false` |
| `disabledCountryCallingCode` | `boolean` | `false` |
| `displayHelper` | `boolean` | `false` |
| `helperText` | `string` | `""` |
| `helperIcon` | `string` | `null` |
| `error` | `boolean` | `false` |

Emits: `update:modelValue`, `getSelectedCountryCallingCode`, `getParsedInternationalNumber`, `getContactNumberErrors`

---

### `spr-input-currency` Props

| Prop | Type | Default |
|---|---|---|
| `id` | `string` | `""` |
| `modelValue` | `string` | `""` |
| `placeholder` | `string` | `"0.00"` |
| `currency` | `string` | `"PHP"` |
| `disabled` | `boolean` | `false` |
| `disabledCountryCurrency` | `boolean` | `false` |
| `autoFormat` | `boolean` | `false` |
| `maxDecimals` | `number` | `2` |
| `minDecimals` | `number` | `2` |
| `baseValue` | `number` | `undefined` |
| `displayAsCode` | `boolean` | `true` |
| `displayAsSymbol` | `boolean` | `false` |
| `disableRounding` | `boolean` | `false` |

Emits: `update:modelValue`, `getSelectedCurrencyMeta`, `getCurrencyValue`

---

## Verified Behaviors

- ✅ `v-model` works correctly
- ✅ `label` renders above field; `supportingLabel` renders inline next to label
- ✅ `showCharCount` + `maxLength` renders `0/N` counter bottom-right
- ✅ `error` renders red border
- ✅ `disabled` renders greyed background, non-interactive
- ✅ `readonly` renders without grey background — visually similar to base
- ✅ `active` renders blue border — visually distinct from base
- ✅ `displayHelper` + `helperText` renders below field
- ✅ `prefix` slot renders inside field left; `trailing` slot renders inside field right
- ✅ No wrapper div required

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-input>`, never `<SprInput>`
- **No component imports** — never `import { SprInput }`. No types to import for basic usage.
- **Props are camelCase in template** — `:modelValue`, `:showCharCount`, `:displayHelper`
- **Use `v-model`** — do not bind `:modelValue` and `@update:modelValue` manually

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import). Always verify in the test harness.
