# `spr-accordion` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-01**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<template>
  <div style="padding: 24px;">
    <spr-accordion
      :accordionItems="items"
      :isDefaultOpen="false"
      :alwaysOpen="false"
      :bordered="true"
      accordionTrigger="button"
    >
      <template v-for="item in items" #[item.collapseId] :key="item.collapseId">
        Content for {{ item.title }}
      </template>
    </spr-accordion>
  </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from 'design-system-next'

const items: AccordionItem[] = [
  { title: 'Section 1', collapseId: 'section-1' },
  { title: 'Section 2', subtitle: 'Optional subtitle', collapseId: 'section-2' },
]
</script>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `accordionItems` | `AccordionItem[]` | `[]` | ✅ | Data array driving all rows |
| `isDefaultOpen` | `boolean` | `false` | — | Opens all items on mount |
| `alwaysOpen` | `boolean` | `false` | — | Keeps expanded items open when another is clicked |
| `bordered` | `boolean` | `true` | — | Renders outer border and row dividers |
| `accordionTrigger` | `"header"` \| `"button"` | `"button"` | — | Controls trigger element type |

---

## AccordionItem Interface

```ts
interface AccordionItem {
  title: string
  subtitle?: string   // renders visibly below title — browser-verified
  collapseId: string  // must be unique; used as dynamic slot name
}
```

---

## Slots

| Slot | Description |
|---|---|
| `#[item.collapseId]` | Dynamic slot per item. Name must match the item's `collapseId`. Revealed on row click. |

**Verified slot syntax:**
```vue
<template v-for="item in items" #[item.collapseId] :key="item.collapseId">
  <!-- slot content -->
</template>
```

---

## Verified Behaviors

- ✅ Rows render from `accordionItems` array
- ✅ Clicking a row expands it and reveals slot content
- ✅ `subtitle` renders below `title` in the row header
- ✅ `bordered="true"` shows outer border and row dividers
- ✅ No wrapper div or explicit height required (unlike `spr-table`)
- ✅ `accordionTrigger` works as a static string attribute — no `:` binding needed
- ✅ Dynamic slot syntax `#[item.collapseId]` works as written

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-accordion>`, never `<SprAccordion>`
- **No component imports** — never `import { SprAccordion }`. Only import types:
  ```ts
  import type { AccordionItem } from 'design-system-next'
  ```
- **Props are camelCase in template** — `:accordionItems`, `:isDefaultOpen`, not kebab-case

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
