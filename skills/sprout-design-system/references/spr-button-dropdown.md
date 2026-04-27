# `spr-button-dropdown` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-23**

---

## Basic Usage

```vue
<template>
  <spr-button-dropdown
    dropdown-id="actions"
    v-model="selected"
    :menu-list="menuItems"
    width="160px"
    popper-width="160px"
    @click="handleMainClick"
  >
    Actions
  </spr-button-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref([])

const menuItems = [
  { text: 'Add', value: 'add' },
  { text: 'Edit', value: 'edit' },
  { text: 'Delete', value: 'delete' },
]

const handleMainClick = () => console.log('main button clicked')
</script>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `dropdownId` | `string` | — | **Yes** | Unique identifier for the dropdown instance. Must be unique per page when using multiple instances. |
| `modelValue` | `MenuListType[] \| string[] \| Record<string, unknown>[]` | `[]` | No | Currently selected items. Use with `v-model`. |
| `menuList` | `MenuListType[] \| string[] \| Record<string, unknown>[]` | `[]` | No | Options to display in the dropdown. Each item must use `{ text, value }` shape — see MenuListType below. |
| `tone` | `'neutral' \| 'success'` | `'neutral'` | No | Color theme. `danger` is not available. |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | No | Visual style. `tertiary` is not available. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Size of the button dropdown. |
| `disabled` | `boolean` | `false` | No | Disables both the main button and the dropdown trigger. |
| `width` | `string` | `'fit-content'` | No | Width of the entire component. |
| `popper-width` | `string` | `'fit-content'` | No | Width of the dropdown menu. |
| `popper-inner-width` | `string` | `'unset'` | No | Width of the inner content area of the dropdown. |
| `placement` | `'auto' \| 'auto-start' \| 'auto-end' \| 'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom'` | No | Position of the dropdown relative to the button. |

---

## Slots

| Slot | Description |
|---|---|
| `default` | Content for the main (left) button label. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `click` | `MouseEvent` | Emitted when the main (left) button is clicked. |
| `update:modelValue` | `string \| number` | Emitted when a dropdown item is selected. Payload is the **value** of the selected item, not the full object. |

---

## MenuListType

```typescript
type MenuListType = {
  text: string;           // Required — display label in the dropdown
  value: string | number; // Required — emitted on selection
  icon?: string;          // Iconify icon name
  iconColor?: string;     // Tailwind class for icon color
  textColor?: string;     // Tailwind class for item text color
  onClickFn?: () => void; // Optional click handler on the item itself
  disabled?: boolean;
  subtext?: string;
  subvalue?: string;
  sublevel?: MenuListType[];
  group?: string;
};
```

---

## Common Patterns

**Basic actions menu:**
```vue
<spr-button-dropdown
  dropdown-id="row-actions"
  v-model="selected"
  :menu-list="[
    { text: 'Edit', value: 'edit' },
    { text: 'Delete', value: 'delete', textColor: 'spr-text-color-danger-base' },
  ]"
  @update:model-value="(val) => handleAction(val)"
>
  Actions
</spr-button-dropdown>
```

**With icons:**
```vue
<spr-button-dropdown
  dropdown-id="actions-icon"
  v-model="selected"
  :menu-list="[
    { text: 'Add', value: 'add', icon: 'ph:plus', iconColor: 'spr-text-color-supporting' },
    { text: 'Delete', value: 'delete', icon: 'ph:trash', textColor: 'spr-text-color-danger-base' },
  ]"
>
  Actions
</spr-button-dropdown>
```

---

## Verified Behaviors

- ✅ `{ text, value }` is the correct `menuList` item shape — renders item text correctly
- ✅ `{ label, value }` is **wrong** — renders all items as "Unnamed"
- ✅ `update:modelValue` emits the raw **value** string (e.g. `"add"`), not the full item object
- ✅ Works standalone — does **not** require a parent `spr-button` wrapper
- ✅ `default` slot sets the main button label
- ✅ Right side caret always opens the dropdown; left side emits `@click`
- ⚠️ `modelValue` expects `Array` but emit returns a string — Vue will warn `Expected Array, got String`. This is a component-internal inconsistency; non-blocking.
- ⚠️ `aria-hidden` console warning on dropdown open/close is internal — safe to ignore

---

## Global Patterns

- **Kebab-case tag** — `<spr-button-dropdown>`, never `<SprButtonDropdown>`
- **No component imports** — never `import { SprButtonDropdown }`. No types to import for this component.
- **Props are camelCase in template** — `:dropdownId`, `:menuList`, `:popperWidth`

---

## MCP Warning
`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
