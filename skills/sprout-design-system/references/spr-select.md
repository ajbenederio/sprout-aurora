# `spr-select` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-select
    id="basic"
    v-model="selected"
    :options="options"
    label="Label"
    placeholder="Select one..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('')
const options = ['Apple', 'Banana', 'Cherry']
</script>
```

---

## Props

### Core Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `id` | `string` | — | ✅ | Required for accessibility |
| `modelValue` | `string \| number \| Record<string, unknown>` | `""` | — | Use `v-model` |
| `options` | `MenuListType[] \| string[] \| Record<string, unknown>[]` | `[]` | ✅ | Accepts string arrays or object arrays |
| `textField` | `string` | `"text"` | — | Object key to use as display label |
| `valueField` | `string` | `"value"` | — | Object key to use as value identifier |
| `placeholder` | `string` | — | — | Placeholder text |
| `label` | `string` | `""` | — | Renders above the field |
| `supportingLabel` | `string` | `""` | — | Renders inline next to label |
| `groupItemsBy` | `string` | — | — | Valid: `"A-Z"` `"Z-A"` — groups options alphabetically |

### State Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `active` | `boolean` | `false` | Blue border — visually distinct from base |
| `disabled` | `boolean` | `false` | Greyed out, non-interactive |
| `error` | `boolean` | `false` | Red border |
| `clearable` | `boolean` | `false` | Shows X button to clear selection after value is set |
| `searchable` | `boolean` | `false` | Renders search input inside dropdown |
| `disabledLocalSearch` | `boolean` | `false` | Disables built-in search filtering (for async search) |
| `inputLoader` | `boolean` | `false` | Shows loader in the input |
| `optionsLoader` | `boolean` | `false` | Shows loader in the options list |
| `infiniteScrollLoader` | `boolean` | `false` | Enables infinite scroll loading pattern |

### Helper Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `displayHelper` | `boolean` | `false` | Renders helper row below field |
| `helperText` | `string` | `""` | Helper text; requires `displayHelper: true` |
| `helperIcon` | `string` | `null` | Icon for helper row |
| `displayText` | `string` | `""` | Override text shown in the input field |

### Display Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `lozenge` | `boolean` | `false` | Renders options as lozenges |
| `itemIcon` | `string` | `""` | Icon to show per option item |
| `avatarVariant` | `string` | `""` | Avatar variant per option |
| `avatarSource` | `string` | `""` | Avatar image source per option |

### Advanced / Popper Props
These control dropdown positioning and are rarely needed in product usage.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `placement` | `string` | `"bottom"` | Dropdown placement — see valid values |
| `distance` | `number` | `6` | Gap between input and dropdown |
| `autoHide` | `boolean` | `false` | Auto-hide dropdown on outside interaction |
| `popperStrategy` | `string` | `"absolute"` | Valid: `"fixed"` `"absolute"` |
| `popperWidth` | `string` | `"100%"` | Dropdown width |
| `width` | `string` | `"100%"` | Input width |
| `wrapperPosition` | `string` | `"relative"` | CSS position of wrapper element |

---

## Critical: Object Options Return Full Object

When using object options, `v-model` receives the **entire matched object**, not just the `valueField`.

```ts
// options: [{ id: 1, label: 'Option A' }]
// textField: "label", valueField: "id"
// After selection, selected.value === { id: 1, label: 'Option A' }

// To get just the ID:
const selectedId = computed(() => selected.value?.id)
```

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `unknown` | Wired via `v-model` |
| `search-string` | `string \| number` | Fired on search input — use for async search |
| `get-selected-option` | — | Fires on selection |
| `infinite-scroll-trigger` | `boolean` | Fires at scroll bottom — use for pagination |
| `popper-state` | — | Internal — ignore in product usage |

⚠️ `popper-state` emits a Vue validation warning in the console (`Invalid event arguments: event validation failed for event "popper-state"`). This comes from the component itself — not a usage error. Safe to ignore.

---

## Slots

| Slot | Description |
|---|---|
| `helperMessage` | Custom helper content below the field |

---

## Common Patterns

```vue
<!-- String array — simplest usage -->
<spr-select id="fruit" v-model="selected" :options="['Apple', 'Banana', 'Cherry']" label="Fruit" />

<!-- Object options -->
<spr-select
  id="dept"
  v-model="selected"
  :options="departments"
  textField="name"
  valueField="id"
  label="Department"
/>

<!-- Searchable -->
<spr-select
  id="search"
  v-model="selected"
  :options="options"
  label="Search Select"
  :searchable="true"
  placeholder="Type to search..."
/>

<!-- Clearable -->
<spr-select
  id="clear"
  v-model="selected"
  :options="options"
  label="Clearable"
  :clearable="true"
/>

<!-- Grouped alphabetically -->
<spr-select
  id="grouped"
  v-model="selected"
  :options="options"
  label="Grouped"
  groupItemsBy="A-Z"
/>

<!-- Error with helper -->
<spr-select
  id="err"
  v-model="selected"
  :options="options"
  label="Required Field"
  :error="true"
  :displayHelper="true"
  helperText="This field is required"
/>

<!-- Async search (disable local filtering) -->
<spr-select
  id="async"
  v-model="selected"
  :options="asyncOptions"
  label="Async Search"
  :searchable="true"
  :disabledLocalSearch="true"
  @search-string="onSearch"
/>
```

---

## Subcomponents

| Component | Tag | Notes |
|---|---|---|
| SelectMultiple | `<spr-select-multiple>` | Multi-select with chips, select-all, count display — full props in MCP, unverified in harness |
| SelectLadderized | `<spr-select-ladderized>` | Hierarchical/nested select — full props in MCP, unverified in harness |

---

## Verified Behaviors

- ✅ `v-model` works correctly
- ✅ String array options work out of the box
- ✅ Object options render correctly with custom `textField` / `valueField`
- ✅ Object options return the full matched object (not just `valueField`) on selection
- ✅ `searchable` renders search input inside dropdown
- ✅ `clearable` renders X button after selection
- ✅ `error` renders red border
- ✅ `disabled` renders greyed out, non-interactive
- ✅ `groupItemsBy="A-Z"` groups options alphabetically
- ✅ `displayHelper` + `helperText` renders below field
- ✅ No wrapper div required
- ⚠️ `popper-state` console warning is internal — not a usage error

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-select>`, never `<SprSelect>`
- **No component imports** — never `import { SprSelect }`. No types needed for basic usage.
- **Props are camelCase in template** — `:modelValue`, `:textField`, `:valueField`, `:groupItemsBy`
- **Use `v-model`** — do not bind `:modelValue` and `@update:modelValue` manually

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
