# `spr-table-pagination` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-06**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rowCount = ref(10)
const currentPage = ref(1)

const dropdownOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
  { text: 100, value: 100 },
]
</script>

<template>
  <spr-table-pagination
    v-model:selectedRowCount="rowCount"
    v-model:currentPage="currentPage"
    :totalItems="87"
    :dropdownSelection="dropdownOptions"
  />
</template>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `selectedRowCount` | `number` | `10` | ✅ Yes | Must match a `value` in `dropdownSelection` exactly — mismatch causes unexpected initial selection |
| `totalItems` | `number` | `1` | ✅ Yes | Total record count — drives page count calculation |
| `currentPage` | `number` | `1` | ✅ Yes | Current active page — use with `v-model:currentPage` |
| `dropdownSelection` | `{ text: number\|string; value: number\|string }[]` | `[10,20,50,100]` array | ✅ Yes | MCP types say `string` but defaults use numbers — use numbers throughout to avoid mismatch |
| `bordered` | `boolean` | `true` | No | Toggles visible border around component |
| `editableCurrentPage` | `boolean` | `false` | No | When `true`, renders page number as a typeable input ("Page [3] of 10") |
| `showNumberOfRowsDropdown` | `boolean` | `true` | No | When `false`, hides row count dropdown — pagination text still visible |

---

## Slots

| Slot | Description |
|---|---|
| `#actions` | Renders content on the right side of the pagination bar (e.g. export button) |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:selectedRowCount` | `number` | Use `v-model:selectedRowCount` — fires when row count dropdown changes |
| `update:currentPage` | `number` | Use `v-model:currentPage` — fires when page changes |
| `previous` | — | Fires when prev button clicked |
| `next` | — | Fires when next button clicked |

---

## Common Patterns

### Standard pagination with row count selector
```vue
<spr-table-pagination
  v-model:selectedRowCount="rowCount"
  v-model:currentPage="currentPage"
  :totalItems="totalItems"
  :dropdownSelection="[
    { text: 10, value: 10 },
    { text: 20, value: 20 },
    { text: 50, value: 50 },
    { text: 100, value: 100 },
  ]"
/>
```

### Editable page input (large datasets)
```vue
<spr-table-pagination
  v-model:selectedRowCount="rowCount"
  v-model:currentPage="currentPage"
  :totalItems="5000"
  :dropdownSelection="dropdownOptions"
  :editableCurrentPage="true"
/>
```

### No row dropdown with actions slot
```vue
<spr-table-pagination
  v-model:selectedRowCount="rowCount"
  v-model:currentPage="currentPage"
  :totalItems="50"
  :dropdownSelection="dropdownOptions"
  :showNumberOfRowsDropdown="false"
>
  <template #actions>
    <spr-button label="Export" size="small" />
  </template>
</spr-table-pagination>
```

### Reacting to page/row changes
```vue
<script setup lang="ts">
const rowCount = ref(10)
const currentPage = ref(1)

watch([rowCount, currentPage], () => {
  fetchData({ page: currentPage.value, perPage: rowCount.value })
})
</script>
```

---

## Verified Behaviors

- ✅ `v-model:selectedRowCount` and `v-model:currentPage` both reactive — values update on interaction
- ✅ `editableCurrentPage=true` renders a typeable page input: "Page [3] of 10"
- ✅ `showNumberOfRowsDropdown=false` hides the row count dropdown; pagination info text still shows
- ✅ `#actions` slot renders on the right side of the bar
- ✅ `@previous` and `@next` emit correctly on button click
- ✅ `bordered=false` visually removes border styling
- ⚠️ **`selectedRowCount` must exactly match a `value` in `dropdownSelection`** — type mismatch (e.g. number ref vs string value) causes unexpected initial dropdown selection with no console error
- ⚠️ Use numbers (not strings) for `dropdownSelection` `value` fields — MCP type definition says `string` but the component default uses numbers and string values cause matching failure
- ⚠️ `Blocked aria-hidden` console warnings are internal to the row count dropdown popper — non-blocking, same class as `spr-select` popper warnings

---

## Global Patterns

- **Kebab-case tag** — `<spr-table-pagination>`, never `<SprTablePagination>`
- **No component imports** — never `import { SprTablePagination }`. No types to import for this component.
- **Props are camelCase in template** — `:selectedRowCount`, `:totalItems`, `:currentPage`, `:dropdownSelection`, `:editableCurrentPage`, `:showNumberOfRowsDropdown`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.

> **Note:** `table-pagination` is not a top-level component. It must be fetched via `get_component("table")` and lives in the `subComponents` array of `spr-table`.
