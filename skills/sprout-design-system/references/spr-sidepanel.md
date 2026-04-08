# `spr-sidepanel` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-07**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <spr-button label="Open Panel" @click="isOpen = true" />

  <spr-sidepanel
    :isOpen="isOpen"
    headerTitle="Panel Title"
    @close="isOpen = false"
  >
    <template #default>
      Panel body content goes here.
    </template>
    <template #footer>
      <spr-button label="Close" @click="isOpen = false" />
    </template>
  </spr-sidepanel>
</template>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `isOpen` | `boolean` | `false` | Yes (effectively) | Controls panel visibility. Not a v-model — bind `:isOpen` and toggle via `@close` |
| `headerTitle` | `string` | `'Sidepanel Header'` | No | Title shown in the header bar |
| `headerSubtitle` | `string` | — | No | Subtitle shown below the title; also overridable via `#subtitle` slot |
| `size` | `string` | `'sm'` | No | Valid: `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `height` | `string \| number` | `'calc(100vh - 32px)'` | No | Accepts CSS string or number (px) |
| `hideHeader` | `boolean` | `false` | No | Hides the entire header bar including title and X button |
| `position` | `string` | `'right'` | No | Only valid value is `'right'` — effectively fixed |
| `hasBackdrop` | `boolean` | `true` | No | Shows/hides the backdrop overlay behind the panel |
| `closeOutside` | `boolean` | `true` | No | Clicking outside closes the panel |
| `escapeClose` | `boolean` | `true` | No | Pressing ESC closes the panel |
| `isExpandable` | `boolean` | `false` | No | Renders an expand/shrink toggle icon in the header |
| `isExpanded` | `boolean` | `false` | No | Controls expanded state when `isExpandable` is true — must be managed externally |
| `isStacking` | `boolean` | `false` | No | For stacking panel layouts — behavior unverified |
| `isActivePanel` | `boolean` | `false` | No | For stacking panel layouts — behavior unverified |
| `footerNoPadding` | `boolean` | `false` | No | Removes padding from the footer slot area |
| `footerNoTopBorder` | `boolean` | `false` | No | Removes the top border from the footer slot area |
| `isLoading` | `boolean` | `false` | No | Renders a loading state inside the panel — behavior unverified |

---

## Slots

| Slot | Description |
|---|---|
| `default` | Main body content of the panel |
| `footer` | Footer area — use for action buttons. Affected by `footerNoPadding` and `footerNoTopBorder` |
| `subtitle` | Renders below the header title — overrides or supplements `headerSubtitle` prop |
| `header` | Fully replaces the entire header bar, including the title and X button |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `close` | — | Fires when the panel is closed via X button, backdrop click, or ESC |
| `onClose` | — | Also fires on every close — both `close` and `onClose` fire together on every close event |
| `expand` | — | Fires when the expand toggle is clicked (requires `isExpandable: true`) |
| `shrink` | — | Fires when the expand toggle is clicked again to shrink (requires `isExpandable: true`) |

---

## Common Patterns

### Basic open/close with footer button

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <spr-button label="View Details" @click="open = true" />

  <spr-sidepanel
    :isOpen="open"
    headerTitle="Employee Details"
    headerSubtitle="Full record"
    @close="open = false"
  >
    <template #default>
      <p>Content here.</p>
    </template>
    <template #footer>
      <spr-button label="Close" @click="open = false" />
    </template>
  </spr-sidepanel>
</template>
```

### No backdrop, no outside close (modal-like behavior)

```vue
<spr-sidepanel
  :isOpen="open"
  headerTitle="Confirm Action"
  :hasBackdrop="false"
  :closeOutside="false"
  :escapeClose="false"
  @close="open = false"
>
  <template #default>User must use the footer button to close.</template>
  <template #footer>
    <spr-button label="Done" @click="open = false" />
  </template>
</spr-sidepanel>
```

### Expandable panel

```vue
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const expanded = ref(false)
</script>

<template>
  <spr-sidepanel
    :isOpen="open"
    :isExpandable="true"
    :isExpanded="expanded"
    headerTitle="Expandable Panel"
    @close="open = false"
    @expand="expanded = true"
    @shrink="expanded = false"
  >
    <template #default>Content adjusts when expanded.</template>
  </spr-sidepanel>
</template>
```

### Custom header slot

```vue
<spr-sidepanel
  :isOpen="open"
  @close="open = false"
>
  <template #header>
    <div class="custom-header">My Custom Header</div>
  </template>
  <template #default>Body content.</template>
</spr-sidepanel>
```

> ⚠️ `#header` slot fully replaces the entire header bar, including the X close button. You are responsible for providing a close mechanism in your slot content or footer.

---

## Subcomponents

| Component | Tag | Props documented | Notes |
|---|---|---|---|
| `stacking-sidepanel` | `<spr-stacking-sidepanel>` | None | MCP-only, unverified. Empty props/emits in MCP JSON. See DEFERRED. |

---

## Verified Behaviors

- ✅ `isOpen` controls panel visibility — not a v-model, managed via `:isOpen` prop + `@close` handler
- ✅ Both `close` and `onClose` fire on every close event (X button, backdrop click, ESC) — they are equivalent
- ✅ `size` prop visually changes panel width — `sm`, `md`, `lg`, `xl` all work
- ✅ `hasBackdrop: false` removes the backdrop overlay
- ✅ `closeOutside: false` prevents backdrop click from closing
- ✅ `escapeClose: false` prevents ESC from closing
- ✅ `isExpandable: true` renders an expand icon button in the header
- ✅ `expand` and `shrink` emits fire when the expand toggle is clicked
- ⚠️ `isExpanded` must be managed externally — bind `:isExpanded` and toggle via `@expand` / `@shrink`
- ✅ `#subtitle` slot renders below the header title
- ✅ `#header` slot fully replaces the entire header bar including the X button
- ✅ `#footer` slot renders a footer area below the body
- ✅ `footerNoPadding` and `footerNoTopBorder` visually affect the footer area
- ⚠️ `position` only accepts `'right'` — effectively fixed, do not vary
- ⚠️ `isStacking`, `isActivePanel`, `isLoading` accepted without error but behavior unverified

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-sidepanel>`, never `<SprSidepanel>`
- **No component imports** — never `import { SprSidepanel }`. No types to import for this component.
- **Props are camelCase in template** — `:isOpen`, `:headerTitle`, `:hasBackdrop`, `:closeOutside`, `:escapeClose`, `:isExpandable`, `:isExpanded`, `:footerNoPadding`, `:footerNoTopBorder`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
