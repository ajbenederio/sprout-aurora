# `spr-filter` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-07**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FilterPropsInterface } from 'design-system-next'

type FilterOption = FilterPropsInterface['optionDetails']

const selected = ref<FilterOption[]>([])

const options = ref<FilterOption[]>([
  { isSelected: false, text: 'Engineering', value: 'engineering' },
  { isSelected: false, text: 'Finance', value: 'finance' },
  { isSelected: false, text: 'HR', value: 'hr' },
])
</script>

<template>
  <spr-filter
    id="dept-filter"
    v-model="selected"
    :options="options"
    label="Department"
  />
</template>
```

---

## Critical Rules

### 1. Never share a v-model ref across multiple `spr-filter` instances
Each instance must have its own dedicated ref. Sharing a ref causes an infinite reactive loop:
```
Uncaught (in promise) Maximum recursive updates exceeded
```

```ts
// ✅ Correct — separate ref per instance
const sel1 = ref<FilterOption[]>([])
const sel2 = ref<FilterOption[]>([])

// ❌ Wrong — shared ref causes infinite loop
const sel = ref<FilterOption[]>([])
// <spr-filter v-model="sel" ... />
// <spr-filter v-model="sel" ... />  ← causes crash
```

### 2. `spr-filter` is an always-open inline panel — not a dropdown trigger
It renders a search input + checkbox list directly on the page. It does not collapse or close. Use it as a persistent sidebar or filter panel, not as a compact dropdown selector.

### 3. The panel does not close on outside click
Clicking outside or anywhere on the page does not dismiss the filter panel. This is expected behavior.

### 4. v-model returns full option objects
Selecting a checkbox returns the complete option object with `isSelected: true`:
```ts
// After selecting "Engineering":
// [{ isSelected: true, text: 'Engineering', value: 'engineering' }]

// Extract just the values if needed:
const selectedValues = computed(() => selected.value.map(o => o.value))
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `options` | `FilterOption[]` | `[]` | **Yes** | Array of `{ isSelected, text, value, column?, subtext?, avatar? }` |
| `modelValue` | `FilterOption[] \| string` | `[]` | No | Use `v-model` — returns full option objects |
| `id` | `string` | `'spr-filter'` | No | Recommended to set explicitly per instance |
| `label` | `string` | `''` | No | Renders above the search input |
| `placeholder` | `string` | `''` | No | Placeholder in the search input |
| `filterable` | `boolean` | `false` | No | Filters checkbox list as user types in search |
| `filling` | `boolean` | `false` | No | Pre-fills search input with selected option text |
| `disabled` | `boolean` | `false` | No | Grays out search input, non-interactive |
| `error` | `boolean` | `false` | No | Renders red border on search input |
| `helperText` | `string` | `''` | No | Renders below the component |
| `loading` | `boolean` | `false` | No | Renders "Loading..." text in the options area |
| `width` | `string` | `'100%'` | No | CSS width of the component |
| `filterMenu` | `FilterMenuItem[]` | `[]` | No | Second-tier filter menu — ⚠️ unverified |
| `filterData` | `FilterOption[]` | `[]` | No | Secondary options data — ⚠️ unverified |
| `search` | `string` | `''` | No | Controlled search input value — ⚠️ unverified |
| `searchFilter` | `string` | `''` | No | Secondary search value — ⚠️ unverified |
| `deselected` | `string` | `''` | No | Unknown behavior — ⚠️ unverified |
| `hasSearchApi` | `boolean` | `false` | No | External search API mode — ⚠️ unverified |
| `hasAvatar` | `boolean` | `false` | No | Enables avatar display in options |
| `hasAdvancedFilterApi` | `boolean` | `false` | No | Advanced filter mode — ⚠️ unverified |

---

## Slots

| Slot | Description |
|---|---|
| `empty-state` | ✅ Renders custom content when `options` is empty |
| `loading-state` | Custom loading content — ⚠️ unverified |
| `default` | Unknown purpose — ⚠️ unverified |
| `loading` | ⚠️ Listed in MCP but behavior unverified |
| `empty` | ⚠️ Listed in MCP but does NOT render — use `#empty-state` instead |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `FilterOption[]` | Fires on checkbox select — use `v-model` |
| `selectedFilter` | `FilterOption[]` | Fires on checkbox select — same payload as v-model |
| `update:search` | `string` | Fires as user types in search input |
| `update:searchFilter` | `string` | Secondary search emit — ⚠️ unverified |
| `getFilterData` | `string` | Fires with filter menu — ⚠️ unverified |
| `infiniteScrollTrigger` | — | For infinite scroll pagination — ⚠️ unverified |
| `infiniteScrollFilterTrigger` | `string` | For infinite scroll with filter — ⚠️ unverified |

---

## Common Patterns

**Basic department filter with value extraction:**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FilterPropsInterface } from 'design-system-next'

type FilterOption = FilterPropsInterface['optionDetails']

const selected = ref<FilterOption[]>([])
const options = ref<FilterOption[]>([
  { isSelected: false, text: 'Engineering', value: 'engineering' },
  { isSelected: false, text: 'Finance', value: 'finance' },
  { isSelected: false, text: 'HR', value: 'hr' },
])

// v-model returns full objects — extract values manually
const selectedValues = computed(() => selected.value.map(o => o.value))
</script>

<template>
  <spr-filter
    id="dept-filter"
    v-model="selected"
    :options="options"
    label="Department"
    :filterable="true"
  />
</template>
```

**Multiple filters — each with its own ref:**
```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FilterPropsInterface } from 'design-system-next'

type FilterOption = FilterPropsInterface['optionDetails']

// ✅ Each filter instance gets its own ref
const deptSelected = ref<FilterOption[]>([])
const statusSelected = ref<FilterOption[]>([])

const deptOptions = ref<FilterOption[]>([
  { isSelected: false, text: 'Engineering', value: 'engineering' },
  { isSelected: false, text: 'HR', value: 'hr' },
])

const statusOptions = ref<FilterOption[]>([
  { isSelected: false, text: 'Active', value: 'active' },
  { isSelected: false, text: 'Inactive', value: 'inactive' },
])
</script>

<template>
  <spr-filter id="dept-filter" v-model="deptSelected" :options="deptOptions" label="Department" />
  <spr-filter id="status-filter" v-model="statusSelected" :options="statusOptions" label="Status" />
</template>
```

**With loading and empty states:**
```vue
<spr-filter
  id="type-filter"
  v-model="selected"
  :options="options"
  label="Contribution Type"
  :loading="isLoading"
>
  <template #empty-state>
    <p style="padding: 12px; text-align: center;">No options available</p>
  </template>
</spr-filter>
```

---

## Verified Behaviors

- ✅ `options` requires `{ isSelected, text, value }` shape — renders search input + checkbox list
- ✅ `spr-filter` is an **always-open inline panel** — not a dropdown trigger
- ⚠️ Panel does **not close on outside click** — expected behavior
- ✅ `label` renders above the search input
- ✅ `placeholder` renders inside the search input
- ✅ `error: true` renders red border on search input
- ✅ `helperText` renders below the component
- ✅ `disabled: true` grays out the search input, non-interactive
- ✅ `filterable: true` filters checkbox list as user types
- ✅ `filling: true` pre-fills search input with selected option text
- ✅ `loading: true` renders "Loading..." text in options area
- ✅ v-model returns **full option objects** with `isSelected: true` — not just values
- ✅ `#empty-state` slot renders custom content when `options` is empty
- ⚠️ `#empty` slot does **NOT render** — MCP lists it but it is a no-op. Use `#empty-state`
- ⚠️ **Never share a v-model ref across multiple instances** — causes `Maximum recursive updates exceeded`
- ⚠️ `filterMenu`, `filterData`, `hasSearchApi`, `hasAdvancedFilterApi`, `deselected` — accepted without error but behavior unverified

---

## Global Patterns

- **Kebab-case tag** — `<spr-filter>`, never `<SprFilter>`
- **No component imports** — never `import { SprFilter }`. Only import types: `import type { FilterPropsInterface } from 'design-system-next'`
- **Props are camelCase in template** — `filterable`, `helperText`, `filterMenu`, `filterData`, `hasSearchApi`, `hasAvatar`, `hasAdvancedFilterApi`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
