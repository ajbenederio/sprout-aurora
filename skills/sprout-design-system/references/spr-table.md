# `spr-table` Reference Card
**Design System:** `design-system-next` v2.27.9
**Status:** ✅ Browser-verified in test harness
**Last updated:** March 2026

---

## Quick Facts

| | |
|---|---|
| **Component tag** | `<spr-table>` (kebab-case only — PascalCase fails) |
| **Registration** | Global via `app.use(SproutDesignSystem)` — do NOT import the component |
| **Type import** | `import type { Header } from 'design-system-next'` |
| **Pagination tag** | `<spr-table-pagination>` wired via `#footer` slot |
| **Known silent failure** | Blank render if `:headers` missing, wrapper has no height, or cell values are flat strings |

---

## Critical Rules (all browser-verified)

### 1. Always wrap in a div with explicit height
`spr-table` uses `fullHeight: true` by default. Without a parent with defined height, `tbody` collapses to `height: 0` — rows exist in the DOM but are invisible. No console error.

```vue
<div style="height: 600px; width: 100%;">
  <spr-table ... />
</div>
```

### 2. Never import the component
The design system uses global registration. Named imports like `import { SprTable } from 'design-system-next'` will throw:
```
SyntaxError: does not provide an export named 'SprTable'
```
Only import types:
```ts
import type { Header } from 'design-system-next'
```

### 3. Use kebab-case tags only
```vue
✅ <spr-table>
❌ <SprTable>
```
PascalCase throws `Failed to resolve component: SprTable`.

### 4. `:headers` is required
The manifest marks it `required: true`. The MCP-generated usage example omits it entirely — do not use that example. Missing `:headers` causes silent blank render.

### 5. Cell values must use `{ title }` shape
Flat strings do not render. Each cell value must be a `TableDataProps` object with a `title` field:
```ts
// ✅ Correct
{ name: { title: 'Maria Santos' }, department: { title: 'Engineering' } }

// ❌ Wrong — renders blank cells silently
{ name: 'Maria Santos', department: 'Engineering' }
```

### 6. `headers` must be a `ref`
```ts
// ✅ Correct
const headers = ref<Header[]>([...])

// ❌ Wrong — may not trigger proper reactivity
const headers: Header[] = [...]
```

### 7. Props are camelCase in template
```vue
✅ :dataTable="tableData"
❌ :data-table="tableData"
```

---

## Minimal Working Example (browser-verified)

```vue
<template>
  <div style="height: 600px; width: 100%;">
    <spr-table
      :headers="headers"
      :dataTable="tableData"
    />
  </div>
</template>

<script setup lang="ts">
import type { Header } from 'design-system-next'
import { ref } from 'vue'

const headers = ref<Header[]>([
  { field: 'name', name: 'Name', sort: true },
  { field: 'department', name: 'Department', sort: true },
  { field: 'position', name: 'Position', sort: true },
  { field: 'status', name: 'Status' },
])

const tableData = ref([
  {
    id: 1,
    name: { title: 'Maria Santos' },
    department: { title: 'Engineering' },
    position: { title: 'Frontend Developer' },
    status: { title: 'Active' },
  },
  {
    id: 2,
    name: { title: 'Jose Reyes' },
    department: { title: 'HR' },
    position: { title: 'HR Specialist' },
    status: { title: 'Active' },
  },
  {
    id: 3,
    name: { title: 'Ana Cruz' },
    department: { title: 'Finance' },
    position: { title: 'Accountant' },
    status: { title: 'On Leave' },
  },
])
</script>
```

---

## With Pagination (browser-verified)

Pagination mounts in the `#footer` slot. All four props are required.

```vue
<template>
  <div style="height: 600px; width: 100%;">
    <spr-table
      :headers="headers"
      :dataTable="tableData"
    >
      <template #footer>
        <spr-table-pagination
          v-model:selectedRowCount="rowCount"
          v-model:currentPage="currentPage"
          :totalItems="totalItems"
          :dropdownSelection="dropdownSelection"
        />
      </template>
    </spr-table>
  </div>
</template>

<script setup lang="ts">
import type { Header } from 'design-system-next'
import { ref } from 'vue'

const headers = ref<Header[]>([
  { field: 'name', name: 'Name', sort: true },
  { field: 'department', name: 'Department', sort: true },
  { field: 'position', name: 'Position', sort: true },
  { field: 'status', name: 'Status' },
])

const tableData = ref([
  {
    id: 1,
    name: { title: 'Maria Santos' },
    department: { title: 'Engineering' },
    position: { title: 'Frontend Developer' },
    status: { title: 'Active' },
  },
  {
    id: 2,
    name: { title: 'Jose Reyes' },
    department: { title: 'HR' },
    position: { title: 'HR Specialist' },
    status: { title: 'Active' },
  },
  {
    id: 3,
    name: { title: 'Ana Cruz' },
    department: { title: 'Finance' },
    position: { title: 'Accountant' },
    status: { title: 'On Leave' },
  },
])

const rowCount = ref(10)
const currentPage = ref(1)
const totalItems = ref(3)
const dropdownSelection = [
  { text: '10', value: '10' },
  { text: '20', value: '20' },
  { text: '50', value: '50' },
]
</script>
```

---

## With Search

```vue
<spr-table
  :headers="headers"
  :dataTable="tableData"
  :tableActions="{ search: true, filter: false, option: false }"
  v-model:searchModel="searchQuery"
/>

<!-- script -->
const searchQuery = ref('')
```

---

## With Loading State

```vue
<spr-table
  :headers="headers"
  :dataTable="tableData"
  :loading="isLoading"
/>
```

---

## With Row Click

```vue
<spr-table
  :headers="headers"
  :dataTable="tableData"
  :isRowClickable="true"
  @onRowClick="handleRowClick"
/>

<!-- script -->
function handleRowClick(row: any) {
  console.log(row)
}
```

---

## With Custom Cell Slot

Use `#[column.field]` to override a specific cell. Slot exposes `row` and `row-index`.

```vue
<spr-table :headers="headers" :dataTable="tableData">
  <template #status="{ row }">
    <spr-lozenge :label="(row.status as any).title" variant="success" />
  </template>
</spr-table>
```

---

## With Empty State

```vue
<spr-table
  :headers="headers"
  :dataTable="[]"
  :emptyState="{
    description: 'No employees found',
    subDescription: 'Try adjusting your filters',
    image: 'location',
    size: 'large',
  }"
/>
```

---

## With Server-Side Pagination

```vue
<spr-table
  :headers="headers"
  :dataTable="tableData"
  version="backend"
>
  <template #footer>
    <spr-table-pagination ... />
  </template>
</spr-table>
```

⚠️ `version="backend"` is test-harness verified — not present in the manifest.

---

## All Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `:headers` | `Header[]` | `[]` | ✅ | Must be `ref`. Silent blank render if missing. |
| `:dataTable` | `TableData[]` | — | ✅ | camelCase. Cell values must use `{ title }` shape. |
| `:loading` | `boolean` | `false` | — | |
| `:tableActions` | `TableActions` | `{ search: false, filter: false, option: false }` | — | |
| `v-model:searchModel` | `string` | `''` | — | Required if `tableActions.search: true` |
| `:sortOrder` | `'asc' \| 'desc'` | `'asc'` | — | |
| `:variant` | `'surface' \| 'white'` | `'surface'` | — | |
| `:isRowClickable` | `boolean` | `false` | — | |
| `:fullHeight` | `boolean` | `true` | — | Requires parent with defined height or tbody collapses |
| `:isMultiSelect` | `boolean` | `false` | — | |
| `:selectedKeyId` | `string` | `''` | — | Required when using multi-select |
| `:returnCompleteSelectedProperties` | `boolean` | `false` | — | |
| `:isDraggable` | `boolean` | `false` | — | |
| `:allowSelfDrag` | `boolean` | `false` | — | |
| `:retainSelectionOnDataChange` | `boolean` | `false` | — | |
| `:showHeaderFilter` | `boolean` | `false` | — | |
| `:removeHeaderOnEmpty` | `boolean` | `false` | — | |
| `:emptyState` | `EmptyState` | see manifest | — | |
| `version` | `'backend'` | — | — | ⚠️ Test-harness verified only |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `@update:searchModel` | `string` | Use with `v-model:searchModel` |
| `@onSort` | `SortEvent` | |
| `@onRowClick` | `TableData` | Requires `:isRowClickable="true"` |
| `@onHover` | `{ active: boolean; data: TableData }` | |
| `@update:selectedData` | `string \| number \| TableDataProps` | Requires `:isMultiSelect="true"` |
| `@onApplyFilter` | `TableHeaderFilterType` | |

---

## Slots

| Slot | Scoped | Scope Props | Notes |
|---|---|---|---|
| `#default` | No | — | General content |
| `#tableActionSection` | No | — | Custom content in action bar |
| `#action-name` | No | — | |
| `#[column.field]` | Yes | `row`, `row-index` | Per-column cell override |
| `#action` | Yes | `row` | Row action buttons |
| `#empty-state` | No | — | Custom empty state |
| `#loading` | No | — | Custom loading state |
| `#footer` | No | — | Mount `spr-table-pagination` here |

---

## table-pagination Required Props

All four required. Missing any causes pagination to not render.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `v-model:selectedRowCount` | `number` | `10` | Rows per page |
| `v-model:currentPage` | `number` | `1` | Current page number |
| `:totalItems` | `number` | `1` | Total row count across all pages |
| `:dropdownSelection` | `{ text: string; value: string }[]` | see manifest | Page size options |

---

## Header Interface

```ts
interface Header {
  field: string           // must match key in tableData rows exactly
  name: string            // display label
  sort?: boolean
  hasAvatar?: boolean
  hasIcon?: boolean
  hasSubtext?: boolean
  hasLozengeTitle?: boolean
  hasChipTitle?: boolean
  badgeText?: string
  badgeVariant?: string
  avatarVariant?: string
  customTailwindClasses?: string
  width?: string
  filterList?: MenuListType[]
}
```

---

## Known Gotchas

1. **Wrapper height is required.** `spr-table` defaults to `fullHeight: true`. Without a parent div with explicit height, `tbody` collapses to `height: 0`. Silent blank render, no error.
2. **Cell values require `{ title }` shape.** Flat strings render blank cells silently.
3. **`headers` must be `ref`.** Plain const declarations may not trigger proper reactivity.
4. **`:headers` is required but the MCP usage example omits it.** Never use the MCP-generated example as reference.
5. **Component tags must be kebab-case.** PascalCase throws a resolve error.
6. **Never import the component.** Global registration only — named imports throw a syntax error.
7. **`header.field` must exactly match the key in each row object.** Mismatch = blank column, no error.
8. **`table-pagination` mounts in `#footer` slot**, not as a sibling.
9. **Multi-select requires both `:isMultiSelect="true"` and `:selectedKeyId`** set to the unique identifier field name.
10. **`version="backend"`** switches to server-side mode. Test-harness verified — not in manifest.

---

## Verification Checklist

Before marking any eval prompt complete that uses `spr-table`:

- [ ] Parent wrapper has explicit height (e.g. `style="height: 600px"`)
- [ ] No component imports in script — types only
- [ ] `headers` declared as `ref<Header[]>`
- [ ] All cell values use `{ title: '...' }` shape
- [ ] Table renders with visible column headers
- [ ] All data rows visible
- [ ] Pagination controls visible and functional (if used)
- [ ] Search filters rows (if used)
- [ ] Row click handler fires (if used)
- [ ] Custom cell slots render correctly (if used)
- [ ] Empty state displays when data is `[]` (if used)