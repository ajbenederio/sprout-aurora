# `spr-date-picker` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-27**

---

## Basic Usage

```vue
<spr-date-picker
  id="leave-start"
  v-model="selectedDate"
  label="Start Date"
/>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `id` | `string` | — | ✅ Yes | Required. Missing causes silent failure. |
| `modelValue` | `string` | `''` | ✅ Yes | Bind via `v-model`. Missing causes silent failure. |
| `label` | `string` | `''` | No | Field label rendered above input. |
| `disabled` | `boolean` | `false` | No | Disables the input. |
| `readonly` | `boolean` | `false` | No | Makes input read-only. |
| `error` | `boolean` | `false` | No | Renders red border error state. |
| `format` | `string` | `'MM-DD-YYYY'` | No | Controls the v-model output string format. |
| `width` | `string` | `'100%'` | No | CSS width of the component. |
| `placement` | `string` | `'bottom'` | No | Popper placement. See valid values below. |
| `displayHelper` | `boolean` | `false` | No | Must be `true` for `#helperMessage` slot to render. |
| `helperText` | `string` | `''` | No | Helper text. Overridden by `#helperMessage` slot if provided. |
| `helperIcon` | `string` | `null` | No | Icon name for helper area. Exact format unverified. |
| `restDays` | `RestDayType[]` | `[]` | No | Days to mark as rest days. Valid values: `'su'` `'mo'` `'tu'` `'we'` `'th'` `'fr'` `'sa'`. |
| `disabledDates` | `DisabledDatesType` | — | No | Partial objects accepted without error. See type below. |
| `minMaxYear` | `MinMaxYearType` | `{ min: 1900, max: currentYear }` | No | Year range for the year picker. |
| `currentYear` | `string` | current year | No | Initial year displayed. |
| `wrapperPosition` | `string` | `'relative'` | No | CSS position of wrapper. |
| `popperStrategy` | `string` | `'absolute'` | No | Valid values: `'fixed'`, `'absolute'`. |
| `popperContainer` | `string` | `''` | No | Container selector for popper. |
| `active` | `boolean` | `false` | No | Internal composable use — do not set in templates. |

**`placement` valid values:** `auto` `auto-start` `auto-end` `top` `top-start` `top-end` `right` `right-start` `right-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end`

---

## Slots

| Slot | Scoped | Description |
|---|---|---|
| `#default` | Yes — exposes `handle-click` | Replaces the default input trigger. Use to render a custom trigger element. |
| `#helperMessage` | No | Custom helper content below the input. Requires `displayHelper: true`. Overrides `helperText` prop. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `string` | Standard v-model update. Formatted per `format` prop. |
| `getInputValue` | `string \| null` | Display string (e.g. `"APR-23-2026"`). Different format from v-model value. |
| `getDateFormats` | `Record<string, ...>` | Fires on date selection. |
| `getMonthList` | `Array<object>` | Fires on **mount**, not on selection. |
| `getYearList` | `Array<number>` | Fires on **mount**, not on selection. Array of years from `minMaxYear.min` to `max`. |

---

## Types

```ts
import type { RestDayType, DisabledDatesType, MinMaxYearType } from 'design-system-next'

type RestDayType = 'su' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa'

type DisabledDatesType = {
  to: string
  from: string
  pastDates: boolean | string
  futureDates: boolean | string
  selectedDates: Array<string>
  weekends: boolean
  weekdays: boolean
  selectedDays: Array<string>
}

type MinMaxYearType = { min: number; max: number }
```

Partial `DisabledDatesType` objects are accepted without error — only set the keys you need.

---

## Common Patterns

**Basic date selection:**
```vue
<spr-date-picker
  id="start-date"
  v-model="date"
  label="Start Date"
/>
```

**With error state:**
```vue
<spr-date-picker
  id="start-date"
  v-model="date"
  label="Start Date"
  :error="hasError"
/>
```

**Disable weekends:**
```vue
<spr-date-picker
  id="working-day"
  v-model="date"
  label="Working Day"
  :restDays="['su', 'sa']"
/>
```

**Disable future dates:**
```vue
<spr-date-picker
  id="past-only"
  v-model="date"
  label="Effective Date"
  :disabledDates="{ futureDates: true }"
/>
```

**Custom trigger via default slot:**
```vue
<spr-date-picker id="custom" v-model="date">
  <template #default="{ 'handle-click': handleClick }">
    <button @click="handleClick">📅 {{ date || 'Pick a date' }}</button>
  </template>
</spr-date-picker>
```

**With helper message slot:**
```vue
<spr-date-picker
  id="with-helper"
  v-model="date"
  label="Date"
  :displayHelper="true"
>
  <template #helperMessage>
    <span>Date must be within the current pay period.</span>
  </template>
</spr-date-picker>
```

---

## Verified Behaviors

- ✅ `id` and `v-model` are both required — missing either causes silent blank render
- ✅ `error: true` renders red border on the input
- ✅ `disabled: true` renders greyed-out, non-interactive input
- ✅ `restDays` prop accepted without error; `['su', 'sa']` marks weekends
- ✅ Partial `DisabledDatesType` object (`{ futureDates: true }`) accepted without error
- ✅ `#default` scoped slot renders custom trigger; `handle-click` opens the calendar
- ✅ `#helperMessage` slot renders when `displayHelper: true`; slot content overrides `helperText` prop
- ✅ `getMonthList` and `getYearList` fire on mount, not on date selection
- ✅ `getInputValue` emits a display-formatted string (different from v-model value)
- ✅ `width` default is `'100%'` — not `'400px'`
- ⚠️ `active` prop is internal composable use — do not set in templates
- ⚠️ `helperText` prop is not visible when `#helperMessage` slot is provided — slot takes precedence

---

## Global Patterns

- **Kebab-case tag** — `<spr-date-picker>`, never `<SprDatePicker>`
- **No component imports** — never `import { SprDatePicker }`. Only import types: `import type { RestDayType, DisabledDatesType, MinMaxYearType } from 'design-system-next'`
- **Props are camelCase in template** — `:displayHelper`, `:restDays`, `:disabledDates`, `:minMaxYear`, `:currentYear`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
