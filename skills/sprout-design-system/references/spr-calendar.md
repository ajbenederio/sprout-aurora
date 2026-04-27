# `spr-calendar` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-23**

---

## Basic Usage

```vue
<template>
  <div style="height: 600px;">
    <spr-calendar
      v-model:search="search"
      v-model:selected-cell="selectedCell"
      :employees="employees"
      :initial-date="initialDate"
      @onCellClick="(data) => console.log('cell clicked', data)"
      @update:firstLastDayOfWeek="(range) => console.log('week range', range)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
const selectedCell = ref({ employeeId: '', date: '', shift: null })
const initialDate = new Date()

const employees = ref([
  {
    id: 1,
    name: 'Maria Santos',
    position: 'HR Manager',
    avatar: '',
    highlight: false,
    hoursWorked: 40,
    hoursTarget: 48,
    schedule: {
      '2026-04-23': [
        { startTime: '09:00AM', endTime: '06:00PM', location: 'Office A', type: 'Standard Day Shift' }
      ],
    },
  },
])
</script>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `employees` | `Employee[]` | `[]` | No | Array of employee data including schedule. See Employee shape below. |
| `initialDate` | `Date` | `new Date()` | No | The date whose week is shown on mount. |
| `search` | `string` | `''` | No | Search string state. Does **not** filter employees internally — the parent must filter the `employees` array and pass the filtered result. Does **not** render a search input — provide your own in the `#filter` slot. Use `v-model:search` to keep state in sync. |
| `selectedCell` | `SelectedShift` | `{ employeeId: '', date: '', shift: null }` | No | Currently selected cell. Use `v-model:selected-cell` for two-way binding. |
| `loading` | `boolean` | `false` | No | Shows a loading state in the calendar. |
| `emptyStateTitle` | `string` | `'No List Found'` | No | Title shown in the empty state. |
| `emptyStateDescription` | `string` | `''` | No | Description shown in the empty state. |
| `emptyStateButtonText` | `string` | `''` | No | Button text shown in the empty state. |
| `hideCopyButton` | `boolean` | `false` | No | When true, hides the copy button on cells. |
| `infiniteLoading` | `boolean` | `false` | No | When true, enables infinite scroll loading indicator. |
| `loadingTextCompleted` | `string` | `''` | No | Text shown when infinite loading completes. |

---

## Slots

| Slot | Scoped | Scope Props | Description |
|---|---|---|---|
| `headerActions` | No | — | Custom content rendered in the top-right of the calendar header. |
| `filter` | No | — | Custom content rendered as a full-width row below the header. |
| `fixedCell` | Yes | `{ details }` | Custom content rendered inside every cell. `details` contains `{ employeeId, date }` for empty cells and `{ employeeId, date, shift: ShiftType[] }` for scheduled cells. |
| `hoverCell` | Yes | `{ details }` | Custom content rendered inside cells on hover. Same `details` shape as `fixedCell`. |
| `copy` | Yes | `{ copy }` | Custom content for the copy action on cells. |
| `empty-state` | No | — | Custom content shown when `employees` is empty. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `onCellClick` | `SelectedShift` | Emitted when a cell is clicked. Payload is `{ employeeId, date, shift }`. |
| `update:selectedCell` | `SelectedShift` | Emitted when selected cell changes. Use with `v-model:selected-cell`. |
| `update:search` | `string` | Emitted when search input changes. Use with `v-model:search`. |
| `update:firstLastDayOfWeek` | `{ firstDay: string, lastDay: string }` | Emitted on mount and on week navigation. Use to fetch data for the visible week range. |
| `update:sort` | `'asc' \| 'desc'` | Emitted when the Employee Name column sort changes. |
| `loadMore` | — | Emitted when infinite scroll triggers at the bottom of the employee list. |
| `onClickEmptyButton` | — | Emitted when the empty state button is clicked. |

---

## Data Shapes

### Employee

```typescript
type Employee = {
  id: string | number;
  name: string;
  position: string;
  avatar?: string;
  highlight?: boolean;
  hoursWorked?: number;
  hoursTarget?: number;
  schedule: {
    [date: string]: ShiftType[]; // date format: 'YYYY-MM-DD'
  };
}
```

### ShiftType

```typescript
type ShiftType = {
  startTime: string;  // e.g. '09:00AM'
  endTime: string;    // e.g. '06:00PM'
  location: string;
  type: string;       // e.g. 'Standard Day Shift'
}
```

### SelectedShift

```typescript
type SelectedShift = {
  employeeId: string;
  date: string;
  shift: ShiftType | 'restday' | null | undefined;
}
```

---

## Common Patterns

**Basic calendar with week navigation tracking:**
```vue
<template>
  <div style="height: 600px;">
    <spr-calendar
      v-model:search="search"
      v-model:selected-cell="selectedCell"
      :employees="employees"
      :initial-date="new Date()"
      @update:firstLastDayOfWeek="({ firstDay, lastDay }) => fetchSchedules(firstDay, lastDay)"
      @onCellClick="handleCellClick"
    />
  </div>
</template>
```

**With search input and parent-side filtering:**
```vue
<template>
  <div style="height: 600px;">
    <spr-calendar
      v-model:search="search"
      :employees="filteredEmployees"
      :initial-date="new Date()"
    >
      <template #filter>
        <div style="padding: 8px;">
          <spr-input
            id="cal-search"
            v-model="search"
            placeholder="Search employees..."
          />
        </div>
      </template>
    </spr-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const employees = ref([
  { id: 1, name: 'Maria Santos', position: 'HR Manager', avatar: '', highlight: false, hoursWorked: 40, hoursTarget: 48, schedule: {} },
  { id: 2, name: 'Jose Reyes', position: 'Developer', avatar: '', highlight: false, hoursWorked: 32, hoursTarget: 48, schedule: {} },
])

const filteredEmployees = computed(() =>
  search.value
    ? employees.value.filter(e =>
        e.name.toLowerCase().includes(search.value.toLowerCase())
      )
    : employees.value
)
</script>
```

> `spr-calendar` does not filter employees internally. The parent must compute `filteredEmployees` and pass it in. `v-model:search` only syncs the string state.

**With custom cell content:**
```vue
<spr-calendar :employees="employees" :initial-date="new Date()">
  <template #fixedCell="{ details }">
    <div v-if="details.shift" class="custom-cell">
      {{ details.shift[0]?.type }}
    </div>
  </template>
</spr-calendar>
```

**Empty state with custom message:**
```vue
<spr-calendar
  :employees="[]"
  :initial-date="new Date()"
  empty-state-title="No Employees Found"
  empty-state-description="Try adjusting your search filters"
  empty-state-button-text="Reset Filters"
  @onClickEmptyButton="resetFilters"
/>
```

---

## Verified Behaviors

- ✅ Calendar renders with employee rows and weekly schedule grid
- ✅ `v-model:selected-cell` updates reactively on cell click — full `SelectedShift` object
- ✅ `v-model:search` binds to the built-in search input
- ✅ `#headerActions` slot renders in the top-right of the header bar
- ✅ `#filter` slot renders as a full-width row below the header
- ✅ `#fixedCell` slot renders inside every cell, including empty ones — always receives `details`
- ✅ `onCellClick` emit fires with `{ employeeId, date, shift }` on cell click
- ✅ `update:selectedCell` emit fires on cell click
- ✅ `update:firstLastDayOfWeek` fires on mount and on week navigation
- ✅ `update:sort` fires as `'asc'` or `'desc'` when Employee Name column is sorted
- ✅ Week navigation (prev/next arrows) works — updates the visible week
- ✅ Height wrapper required — calendar must be inside a container with explicit height
- ⚠️ `search` does **not** filter employees internally — parent must compute a filtered array and pass it via `:employees`. `v-model:search` only syncs the string state for external use (e.g. API calls)
- ⚠️ `#fixedCell` renders in ALL cells (empty and scheduled) — always guard with `v-if="details.shift"` if you only want content on scheduled cells
- ⚠️ Props that were in the old card but do NOT exist in MCP and should not be used: `company-options`, `department-options`, `branch-options`, `v-model:selected-company`, `v-model:selected-department`, `v-model:selected-branch` — filter UI must be built manually using the `#filter` slot

---

## Global Patterns

- **Kebab-case tag** — `<spr-calendar>`, never `<SprCalendar>`
- **No component imports** — never `import { SprCalendar }`. No types to import for this component.
- **Props are camelCase in template** — `:employees`, `:initialDate`, `:emptyStateTitle`, `:hideCopyButton`, `:infiniteLoading`
- **Height wrapper required** — always wrap in a container with explicit height, e.g. `style="height: 600px;"`
- **Use `v-model:search` and `v-model:selected-cell`** — not plain `:search` + `@update:search`

---

## MCP Warning
`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.