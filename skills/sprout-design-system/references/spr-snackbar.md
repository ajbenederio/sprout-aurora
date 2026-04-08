# `spr-snackbar` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-08**
Branch: `refactor/2-improve-design-system-inaccuracies`

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'

const snackbar = ref()
</script>

<template>
  <spr-snackbar ref="snackbar" />

  <spr-button @click="snackbar.showSuccess({ text: 'Changes saved', showIcon: true })">
    Save
  </spr-button>
</template>
```

> ⚠️ `spr-snackbar` must be mounted in the template before any trigger method is called. The internal Pinia store is initialized on mount — calling methods before mount will throw a Pinia error.

---

## Architecture

`spr-snackbar` is **not a prop-driven component**. It is a singleton container that:
- Teleports to `<body>` — renders outside the normal DOM tree
- Manages an internal queue of snacks via a Pinia store
- Exposes trigger methods via template ref (`ref="snackbar"`)
- Auto-dismisses each snack after `duration` ms (default 4000)

`useSnackbar` appears in MCP's `composables` array but is **not exported** from the package at v2.27.9 and cannot be imported. Use the template ref pattern exclusively.

---

## Trigger Methods (via template ref)

| Method | Signature | Notes |
|---|---|---|
| `showSnackbar` | `(payload: SnackPayload) => void` | Full control — set all fields manually |
| `showSuccess` | `(payload: SnackPayload) => void` | Sets `tone: 'success'` automatically |
| `showInformation` | `(payload: SnackPayload) => void` | Sets `tone: 'information'` automatically |
| `showDanger` | `(payload: SnackPayload) => void` | Sets `tone: 'danger'` automatically |
| `showCaution` | `(payload: SnackPayload) => void` | Sets `tone: 'caution'` automatically |

### SnackPayload shape

| Field | Type | Default | Notes |
|---|---|---|---|
| `text` | `string` | — | **Required.** Message text displayed in the snack |
| `tone` | `string` | `'information'` | Valid: `'success'`, `'information'`, `'danger'`, `'caution'`. Auto-set by shorthand methods |
| `showIcon` | `boolean` | `false` | Renders a tone-matched icon in the snack |
| `showAction` | `boolean` | `false` | Renders a clickable action label |
| `actionText` | `string` | `'action'` | Label for the action link — requires `showAction: true` |
| `action` | `Function` | `() => {}` | Callback fired when action label is clicked |
| `duration` | `number` | `4000` | Auto-dismiss delay in ms |
| `actionIconProps` | `ActionIconProps` | — | Icon props for the action area — shape unverified |

---

## Props

`spr-snackbar` has **no props**. All configuration is passed via trigger method payloads.

---

## Slots

`spr-snackbar` exposes two slots but they are not the primary API — use trigger methods instead.

| Slot | Description |
|---|---|
| `default` | Internal use — snacks are rendered here by the store |
| `snackbarActions` | Purpose unverified in harness |

---

## Subcomponent: `spr-snack`

`spr-snack` is the individual toast element. It is rendered internally by `spr-snackbar` from store data — **do not use `spr-snack` directly in templates**. Pass all snack configuration via the trigger method payload instead.

### spr-snack props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `text` | `string` | — | ✅ | Message text |
| `tone` | `string` | `'information'` | No | Valid: `'success'`, `'information'`, `'danger'`, `'caution'` |
| `showIcon` | `boolean` | `false` | No | Shows tone-matched icon |
| `showAction` | `boolean` | `false` | No | Shows action label |
| `actionText` | `string` | `'action'` | No | Action label text |
| `action` | `Function` | `() => {}` | No | Action click callback |
| `duration` | `number` | `4000` | No | Auto-dismiss delay in ms |
| `actionIconProps` | `ActionIconProps` | — | No | Shape unverified |

### spr-snack emits

| Event | Payload | Notes |
|---|---|---|
| `click` | `MouseEvent` | Fires on snack click |

### spr-snack slots

| Slot | Description |
|---|---|
| `icon` | Custom icon content |
| `label` | Custom label content |
| `default` | Custom default content |

---

## Common Patterns

### Success confirmation

```vue
<script setup lang="ts">
import { ref } from 'vue'
const snackbar = ref()

function handleSave() {
  // ...save logic
  snackbar.value.showSuccess({ text: 'Record saved', showIcon: true })
}
</script>

<template>
  <spr-snackbar ref="snackbar" />
  <spr-button @click="handleSave">Save</spr-button>
</template>
```

### With undo action

```vue
<script setup lang="ts">
import { ref } from 'vue'
const snackbar = ref()

function handleBulkUpdate() {
  // ...update logic
  snackbar.value.showSnackbar({
    text: 'Records updated',
    tone: 'success',
    showIcon: true,
    showAction: true,
    actionText: 'Undo',
    action: () => undoBulkUpdate(),
    duration: 6000,
  })
}
</script>

<template>
  <spr-snackbar ref="snackbar" />
  <spr-button @click="handleBulkUpdate">Apply Changes</spr-button>
</template>
```

### Error feedback

```vue
snackbar.value.showDanger({ text: 'Failed to save. Please try again.', showIcon: true })
```

### Multiple snacks

```vue
// Calling trigger methods in sequence stacks snacks — each auto-dismisses independently
snackbar.value.showSuccess({ text: 'Step 1 complete', showIcon: true })
snackbar.value.showInformation({ text: 'Step 2 running...', showIcon: true })
```

---

## Verified Behaviors

- ✅ `ref="snackbar"` exposes `showSuccess`, `showDanger`, `showInformation`, `showCaution`, `showSnackbar` methods — confirmed present on the Vue component proxy via DevTools console (`Proxy(Object) {showSnackbar: f, showSuccess: f, showInformation: f, showDanger: f, showCaution: f}`)
- ✅ Toasts teleport to `<body>` and render fixed on screen — outside normal DOM flow
- ✅ All 4 tone variants render with distinct colors — green, red, blue, yellow
- ✅ `showIcon: true` renders a tone-matched icon in the snack
- ✅ Snacks auto-dismiss after `duration` ms (default 4000)
- ✅ `showAction: true` + `actionText` + `action` renders a clickable action label
- ✅ Action callback fires correctly on click
- ✅ Multiple snacks stack when triggered in sequence
- ⚠️ `useSnackbar` composable listed in MCP is **not exported** from the package — do not attempt to import it
- ⚠️ `spr-snackbar` must be mounted before calling any trigger method — store initializes on mount
- ⚠️ `spr-snack` is internal — do not use directly in templates, pass config via trigger payload
- ⚠️ `actionIconProps` type `ActionIconProps` shape is unverified

---

## Global Patterns (apply to all components)

- **Kebab-case tag** — `<spr-snackbar>`, never `<SprSnackbar>`
- **No component imports** — never `import { SprSnackbar }`. No types to import for this component.
- **Template ref is the API** — `ref="snackbar"` then call `snackbar.value.showSuccess(...)` etc.

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.

`get_component` also lists `useSnackbar` in the `composables` array — this is **not exported** from the package at v2.27.9 and cannot be imported. Ignore it entirely.
