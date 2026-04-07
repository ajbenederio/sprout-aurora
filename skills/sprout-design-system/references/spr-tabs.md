# `spr-tabs` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <spr-tabs
    :list="tabs"
    :activeTab="defaultTab"
    @tabIndex="i => activeIndex = i"
  />

  <div v-if="activeIndex === 0">Overview content</div>
  <div v-if="activeIndex === 1">Details content</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'History', value: 'history' },
]

// Always derive activeTab from the list — never hardcode a label string
const defaultTab = tabs[0].label
const activeIndex = ref(0)
</script>
```

---

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `list` | `Array<{ label: string, value: string }>` | `[]` | Tab items — must use `label/value` shape |
| `activeTab` | `string` | `""` | Must match the `label` string of the target tab exactly — always derive from list, never hardcode |
| `underlined` | `boolean` | `false` | Switches to underlined variant — uppercase text with active underline |

---

## Critical: List Item Shape

Only `{ label, value }` shape is supported. Other shapes crash the component on mount.

```ts
// ✅ Correct
const tabs = [
  { label: 'Tab One', value: 'tab1' },
  { label: 'Tab Two', value: 'tab2' },
]

// ❌ Wrong — crashes with TypeError on mount
const tabs = [
  { title: 'Tab One', value: 'tab1' },
]
```

---

## Critical: activeTab Must Be Derived, Never Hardcoded

`activeTab` matches by `label` text — not by `value`, not by index. Hardcoding the label string creates a silent bug if the label ever changes.

```ts
// ✅ Always do this — derive from the list
const defaultTab = tabs[0].label

// ❌ Never do this — fragile, breaks silently on label changes
activeTab="Tab Two"
activeTab="tab2"
activeTab="1"
```

---

## Critical: No Slots — Content Is Externally Managed

`spr-tabs` has no content slots. Tab panel content must be managed externally using the `tabIndex` emit.

```vue
<spr-tabs :list="tabs" :activeTab="defaultTab" @tabIndex="i => activeIndex = i" />

<!-- Switch content panels by index -->
<div v-if="activeIndex === 0">First panel</div>
<div v-if="activeIndex === 1">Second panel</div>
<div v-if="activeIndex === 2">Third panel</div>
```

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `tabIndex` | `number` | Zero-based index of the clicked tab |

---

## Variants

| Variant | Description |
|---|---|
| Default (pill) | Tabs render as pill buttons; active tab has filled green background |
| Underlined (`underlined: true`) | Tabs render as uppercase text; active tab has green underline |

Note: In the default pill variant, inactive tabs have a gray border — reduced visual contrast between active and inactive states. Use `underlined` when clearer distinction is needed.

---

## Common Patterns

```vue
<!-- Default pill tabs with content panels -->
<template>
  <spr-tabs
    :list="tabs"
    :activeTab="defaultTab"
    @tabIndex="i => activeIndex = i"
  />
  <div v-if="activeIndex === 0">Overview content</div>
  <div v-if="activeIndex === 1">Details content</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
]

const defaultTab = tabs[0].label
const activeIndex = ref(0)
</script>
```

```vue
<!-- Underlined variant -->
<spr-tabs
  :list="tabs"
  :activeTab="defaultTab"
  :underlined="true"
  @tabIndex="i => activeIndex = i"
/>
```

---

## Verified Behaviors

- ✅ `list` requires `{ label, value }` shape — other shapes crash on mount
- ✅ `activeTab` matches by `label` text — not by `value` or index
- ✅ `@tabIndex` emits zero-based index of the clicked tab
- ✅ `underlined` renders uppercase text tabs with active underline
- ✅ No slots — tab content must be managed externally via `tabIndex` emit
- ✅ No wrapper div required
- ⚠️ Default pill variant has low active/inactive contrast — inactive tabs have gray border

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-tabs>`, never `<SprTabs>`
- **No component imports** — never `import { SprTabs }`. No types to import for basic usage.
- **Props are camelCase in template** — `:activeTab`, `:underlined`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, no props). Always verify in the test harness.
