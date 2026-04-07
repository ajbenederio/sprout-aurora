# spr-button-dropdown

## Overview
A subcomponent of `spr-button` that adds a multi-select dropdown menu to a button. Must always be nested inside `spr-button` — it cannot be used standalone.

## Usage

```vue
<spr-button variant="primary">
  Actions
  <spr-button-dropdown
    :model-value="selected"
    dropdown-id="dropdown-1"
    :menu-list="menuItems"
    @update:model-value="onSelect"
  />
</spr-button>
```

```js
const selected = ref([])

const menuItems = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

const onSelect = (item) => {
  const exists = selected.value.findIndex(i => i.value === item.value)
  if (exists >= 0) {
    selected.value.splice(exists, 1)
  } else {
    selected.value.push(item)
  }
}
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `modelValue` | `Array` | Yes | Array of selected items. Each item is a full `{ label, value }` object. |
| `dropdownId` | `String` | Yes | Unique identifier for the dropdown instance. |
| `menuList` | `Array` | Yes | List of options. Each item must be `{ label: string, value: string }`. |

## Behavior

- **Multi-select** — each option click emits a single selected `{ label, value }` object via `update:modelValue`. The parent is responsible for maintaining the array (adding/removing items).
- **Do not use `v-model` directly** — the component emits a single object, not the updated array. Use `:model-value` + `@update:model-value` and handle accumulation manually.
- **Button label is static** — the label inside `spr-button` does not update to reflect selections. Manage label text in the parent if dynamic labels are needed.
- The `aria-hidden` console warning on dropdown open/close is internal to the component. Ignore it.

## Constraints

- Must be nested inside `spr-button` — standalone use renders a ghost trigger element.
- No slots — content is driven entirely by `menuList`.
- `dropdownId` must be unique per page if multiple instances are used.

## Verified
Design System Next v2.27.9 · April 2026
