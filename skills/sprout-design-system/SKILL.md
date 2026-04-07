---
name: sprout-design-system
description: >
  Guide for building Vue 3 applications using the Sprout Design System (design-system-next).
  Use this skill when: (1) Building Vue 3 pages or features that need UI components from the
  Sprout/Toge Design System, (2) Looking up component APIs - props, events, slots, and usage
  examples, (3) Setting up or configuring a project to consume design-system-next, (4) Using
  design tokens (colors, typography, border-color, border-radius, max-width) with the spr- Tailwind prefix,
  (5) Working with the Pinia snackbar store, (6) Scaffolding new pages with spr-prefixed
  components like spr-button, spr-input, spr-modal, spr-table, spr-select, (7) Using design
  color tokens from src/assets/styles/tailwind.css (semantic and raw palette).
---

# Sprout Design System

> **Skill version:** 2.1.0 | **Generated from design-system-next:** v2.27.9

## Installation & Setup

```bash
npm install design-system-next
```

### Global Registration (required)

```ts
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import SproutDesignSystem from 'design-system-next';
import 'design-system-next/style.css';

const app = createApp(App);
app.use(createPinia()); // Must come BEFORE SproutDesignSystem — required for snackbar store
app.use(SproutDesignSystem);
app.mount('#app');
```

All components auto-register with the `spr-` prefix: `<spr-button>`, `<spr-input>`, `<spr-modal>`, etc.

> ⚠️ **Never use tree-shaking named imports for components** — `import { Button } from 'design-system-next'` throws a runtime syntax error. Only import types:
> ```ts
> import type { ButtonPropTypes, InputPropTypes } from 'design-system-next';
> ```

---

## Tailwind CSS Integration

**Important:** If the consuming app has its own Tailwind CSS setup, always prefer standard (or app-prefixed) Tailwind utility classes for general layout, spacing, sizing, display, flexbox, grid, and other standard utilities. Only use `spr-` prefixed classes for the design system's specific visual tokens.

### When to use `spr-` prefixed classes

Use `spr-` **only** for these design system tokens:
- **Colors** — Prefer semantic tokens from `src/assets/styles/tailwind.css`: `spr-text-color-base`, `spr-background-color-hover`, `spr-border-color-brand-base`, etc. For specific shades use raw palette: `spr-text-kangkong-700`, `spr-bg-tomato-500`. Full list: [references/color-tokens.md](references/color-tokens.md)
- **Typography** — `spr-heading-md`, `spr-body-sm-regular`, `spr-font-main`, `spr-font-size-300`
- **Border Color** — `spr-border-color-base`, `spr-border-color-brand-base` (see [references/color-tokens.md](references/color-tokens.md))
- **Border Radius** — `spr-rounded-border-radius-md`, `spr-rounded-border-radius-lg`
- **Max Width** — `spr-max-w-sm`, `spr-max-w-md`, `spr-max-w-lg`
- **Skeletal Loader** — `spr-skeletal-loader`

### When to use standard Tailwind classes

Use standard Tailwind (no `spr-` prefix) for everything else:
- **Layout** — `flex`, `grid`, `block`, `inline-flex`, `relative`, `absolute`
- **Spacing** — `p-4`, `m-2`, `px-6`, `gap-4`, `space-y-2`
- **Sizing** — `w-full`, `h-10`, `w-1/2`, `min-h-screen`
- **Flexbox / Grid** — `items-center`, `justify-between`, `col-span-2`, `flex-1`
- **Other** — `overflow-hidden`, `cursor-pointer`, `opacity-50`, `transition`

```html
<!-- Correct: standard Tailwind for layout, spr- only for design tokens -->
<div class="flex gap-4 p-6 spr-bg-white-50 spr-rounded-border-radius-md">
  <spr-button tone="success">Save</spr-button>
</div>
```

Custom breakpoints: `sm: 575.98px`, `md: 767.98px`, `lg: 991.98px`, `xl: 1199.98px`, `xxl: 1399.98px`

Preflight is disabled.

---

## Icons (Iconify)

The design system uses `@iconify/vue` for all icons.

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="ph:trash" />
  <Icon icon="ph:pencil" class="spr-text-color-brand-base" />
  <spr-button has-icon>
    <Icon icon="ph:plus" />
    Add Item
  </spr-button>
</template>
```

Primary icon set is Phosphor (`ph:`). Browse at https://icon-sets.iconify.design/ph/

---

## Snackbar (Pinia Store)

Use the Pinia store approach — it is verified. The template ref approach (`snackbarRef.value?.showSuccess()`) is **unverified** — do not use it.

```ts
import { useSnackbarStore } from 'design-system-next';

const snackbar = useSnackbarStore();
snackbar.message({ text: 'Saved successfully', tone: 'success', duration: 4000 });
```

> ⚠️ `createPinia()` must run **before** `app.use(SproutDesignSystem)` in `main.ts` or the snackbar store throws.

---

## Component Quick Reference

### Available Components (65 exported)

**Actions & Buttons:** Button, ButtonDropdown, FloatingAction
**Form Inputs:** Input, InputContactNumber, InputCurrency, InputDropdown, InputEmail, InputPassword, InputSearch, InputUrl, InputUsername, Textarea, Checkbox, Radio, RadioGrouped, Switch, Slider, Select, SelectMultiple, SelectLadderized, FileUpload
**Date & Time:** DatePicker, DateCalendarPicker, DateRangePicker, MonthYearPicker, TimePicker
**Data Display:** Avatar, Badge, Banner, Chips, Icon, Logo, Lozenge, ProgressBar, Status, EmptyState, AuditTrail
**Layout & Navigation:** Accordion, Card, Collapsible, List, Tabs, Table, TablePagination, Stepper, Sidenav
**Overlays & Feedback:** Modal, Tooltip, Dropdown, Popper, Snackbar, Sidepanel, StackingSidepanel
**Filters:** Filter, AttributeFilter
**Scheduling:** Calendar, CalendarCell

### Component Naming Convention

- Global registration only: `spr-{component-name}` (kebab-case with spr- prefix)
  - `<spr-button>`, `<spr-input>`, `<spr-date-picker>`, `<spr-select>`
- **Never use PascalCase tags** — `<SprButton>` throws a Vue resolve error
- **Never import components** — only import types

### Props and Bindings

- **Props are camelCase** in template bindings: `:accordionItems`, `:minMaxYear`, `:hasCounter`, `:dataTable`
- **Slot names are kebab-case**: `#footer-actions`, `#helper-message`, `#popper-content`
- **Use `v-model`** for components that support it — never bind `:modelValue` and `@update:modelValue` manually

---

## Detailed API References

Individual verified reference cards live at `skills/sprout-design-system/references/`. Always load the specific card for each component you are using. These cards are browser-verified ground truth — follow them exactly.

### Verified Cards — Load These Directly

| Component | Card path | Status |
|---|---|---|
| `spr-table` | `skills/sprout-design-system/references/spr-table.md` | ✅ Browser-verified |
| `spr-table-pagination` | `skills/sprout-design-system/references/spr-table-pagination.md` | ✅ Browser-verified |
| `spr-accordion` | `skills/sprout-design-system/references/spr-accordion.md` | ✅ Browser-verified |
| `spr-button` | `skills/sprout-design-system/references/spr-button.md` | ✅ Browser-verified |
| `spr-button-dropdown` | `skills/sprout-design-system/references/spr-button-dropdown.md` | ✅ Browser-verified |
| `spr-input` | `skills/sprout-design-system/references/spr-input.md` | ✅ Browser-verified |
| `spr-select` | `skills/sprout-design-system/references/spr-select.md` | ✅ Browser-verified |
| `spr-textarea` | `skills/sprout-design-system/references/spr-textarea.md` | ✅ Browser-verified |
| `spr-date-picker` | `skills/sprout-design-system/references/spr-date-picker.md` | ✅ Browser-verified |
| `spr-modal` | `skills/sprout-design-system/references/spr-modal.md` | ✅ Browser-verified |
| `spr-badge` | `skills/sprout-design-system/references/spr-badge.md` | ✅ Browser-verified |
| `spr-lozenge` | `skills/sprout-design-system/references/spr-lozenge.md` | ✅ Browser-verified |
| `spr-empty-state` | `skills/sprout-design-system/references/spr-empty-state.md` | ✅ Browser-verified |
| `spr-tabs` | `skills/sprout-design-system/references/spr-tabs.md` | ✅ Browser-verified |
| `spr-tooltip` | `skills/sprout-design-system/references/spr-tooltip.md` | ✅ Browser-verified |

### Components Not Yet Verified — Use MCP Only, With Caution

For components not listed above, query MCP via `get_component`. Rules:
- **Never use the `usageExample` field** — it is auto-generated and contains errors (PascalCase tags, direct imports, missing required props)
- Flag the component as unverified in ASSUMPTIONS
- See `skills/sprout-design-system/references/DEFERRED.md` for known flagged items

### Always Load For Any Component

- **Color tokens** — `skills/sprout-design-system/references/color-tokens.md`
- **Utilities** — `skills/sprout-design-system/references/utilities.md`

---

## Common Patterns

> ⚠️ All patterns below are browser-verified. Do not modify prop names, shapes, or slot names — silent failures produce no console errors.

### Form with Validation Feedback

```vue
<script setup lang="ts">
import { ref } from 'vue'

const name = ref<string>('')
const role = ref('')
const hasError = ref<boolean>(false)

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' }
]
</script>

<template>
  <!-- spr-input: error is boolean, no error-message or required prop -->
  <spr-input
    id="name-input"
    v-model="name"
    label="Full Name"
    placeholder="Enter your name"
    :error="hasError"
  />

  <!-- spr-select: id and options are both required -->
  <spr-select
    id="role-select"
    v-model="role"
    label="Role"
    :options="roleOptions"
  />

  <spr-button tone="success" @click="submit">Submit</spr-button>
</template>
```

### Modal with Form

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref<boolean>(false)
const value = ref<string>('')
</script>

<template>
  <spr-button @click="showModal = true">Open Modal</spr-button>

  <!-- id is required. Closing: set showModal.value = false — no @close event -->
  <spr-modal id="edit-modal" v-model="showModal" title="Edit Record">
    <spr-input id="value-input" v-model="value" label="Name" />

    <!-- Correct slot name is #footer-actions, not #footer -->
    <template #footer-actions>
      <spr-button variant="secondary" @click="showModal = false">Cancel</spr-button>
      <spr-button tone="success" @click="save">Save</spr-button>
    </template>
  </spr-modal>
</template>
```

### Table with Pagination

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Employee {
  name: string
  department: string
  position: string
  status: string
}

// headers is required — missing it causes blank render with no console error
const headers = ref([
  { title: 'Name', field: 'name' },
  { title: 'Department', field: 'department' },
  { title: 'Position', field: 'position' },
  { title: 'Status', field: 'status' }
])

const items = ref<Employee[]>([
  { name: 'Maria Santos', department: 'Engineering', position: 'Senior Dev', status: 'Active' }
])

const totalItems = ref<number>(100)
const currentPage = ref<number>(1)
const selectedRowCount = ref<number>(10) // must match a value in dropdownSelection

// value must be number, not string
const dropdownSelection = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 }
]
</script>

<template>
  <!-- height wrapper is required — without it, table renders blank -->
  <div style="height: 400px;">
    <spr-table :headers="headers" :data-table="items">
      <template #actions="{ item }">
        <spr-button size="small" variant="tertiary" has-icon>
          <Icon icon="ph:pencil" />
        </spr-button>
      </template>
    </spr-table>
  </div>

  <spr-table-pagination
    v-model:selected-row-count="selectedRowCount"
    v-model:current-page="currentPage"
    :total-items="totalItems"
    :dropdown-selection="dropdownSelection"
  />
</template>
```

### Accordion

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { AccordionItem } from 'design-system-next'

// AccordionItem shape: { title, collapseId, subtitle? }
const items = ref<AccordionItem[]>([
  { title: 'What is the leave policy?', collapseId: 'leave-policy' },
  { title: 'How do I file a request?', collapseId: 'file-request' }
])
</script>

<template>
  <spr-accordion :accordion-items="items">
    <!-- Slot name must match collapseId exactly — use dynamic slot syntax -->
    <template v-for="item in items" #[item.collapseId] :key="item.collapseId">
      <p>Content for {{ item.title }}</p>
    </template>
  </spr-accordion>
</template>
```

### Tabs

```vue
<script setup lang="ts">
import { ref } from 'vue'

// list requires { label, value } shape — { title, value } crashes on mount
const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' }
]

// activeTab matches by label text, not value or index — always derive from list
const activeTab = ref<string>(tabs[0].label)
const activeIndex = ref<number>(0)
</script>

<template>
  <spr-tabs
    :list="tabs"
    :active-tab="activeTab"
    @tab-index="activeIndex = $event"
  />

  <!-- Tab content managed externally via tabIndex emit (zero-based) -->
  <div v-if="activeIndex === 0">Overview content</div>
  <div v-if="activeIndex === 1">Details content</div>
</template>
```

### Date Picker

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { MinMaxYearType } from 'design-system-next'

// id and v-model are both required
const date = ref<string>('')
const minMax: MinMaxYearType = { min: 2000, max: 2030 }
</script>

<template>
  <spr-date-picker
    id="start-date"
    v-model="date"
    label="Start Date"
    :min-max-year="minMax"
  />
</template>
```

### Lozenge

```vue
<template>
  <spr-lozenge tone="success" label="Active" />
  <spr-lozenge tone="danger" label="Terminated" />
  <spr-lozenge tone="caution" label="Pending" />
  <spr-lozenge tone="neutral" label="Draft" />
</template>
```

### Empty State

```vue
<template>
  <spr-empty-state
    title="No records found"
    description="Try adjusting your filters."
  >
    <template #button>
      <spr-button tone="success">Add Record</spr-button>
    </template>
  </spr-empty-state>
</template>
```

---

## Sprout Products

Available product logos (for `<spr-logo>`): `hr`, `hr-mobile`, `performance-plus`, `recruit-plus`, `sail`, `readycash`, `readywage`

```vue
<spr-logo name="hr" theme="dark" width="50px" />
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Components render unstyled | Missing CSS import | Add `import 'design-system-next/style.css'` in main.ts |
| Snackbar doesn't work | Missing Pinia or wrong order | Add `app.use(createPinia())` BEFORE `app.use(SproutDesignSystem)` |
| `spr-` utility classes not working | Tailwind not configured | Ensure consuming app's tailwind.config includes the design system's content paths |
| Icons not rendering | Missing @iconify/vue | Run `npm install @iconify/vue` — it's a peer dependency |
| Table renders blank | Missing `:headers` prop | `:headers` is required — pass `Header[]` array |
| Table renders blank | Missing height wrapper | Wrap `<spr-table>` in a div with explicit height |
| Table rows render blank | Flat string cell values | Cell values must be `{ title }` objects — `{ name: { title: 'Maria' } }` not `{ name: 'Maria' }` |
| Pagination not visible | Wrong placement | `spr-table-pagination` mounts inside `#footer` slot of `spr-table` — not as a sibling outside it |
| Pagination shows wrong page | `selectedRowCount` mismatch | `selectedRowCount` initial value must exactly match a `value` in `dropdownSelection` |
| Select has no options | Wrong prop name | Use `:options`, not `:menu-list` |
| Modal footer empty | Wrong slot name | Use `#footer-actions`, not `#footer` |
| Accordion slots empty | Wrong slot name | Slot name must match `collapseId` exactly — use dynamic `#[item.collapseId]` syntax |
| Tabs crash on mount | Wrong list shape | `list` requires `{ label, value }` — not `{ title, value }` |

---

## Related Skills

- **design-system-docu-skills** — For creating and maintaining VitePress component documentation