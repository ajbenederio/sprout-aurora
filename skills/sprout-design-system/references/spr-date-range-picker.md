# `spr-date-range-picker` Reference Card
**Design System Next v2.27.9 · Browser-verified 2026-04-27**

---

## Basic Usage

```vue
<spr-date-range-picker
  id="leave-range"
  v-model="dateRange"
  label="Leave Period"
/>

<script setup lang="ts">
import { ref } from 'vue'
const dateRange = ref({ startDate: '', endDate: '' })
</script>
```

---

## Props

| Prop | Type | Default | Required | Notes |
|---|---|---|---|---|
| `id` | `string` | `'date-range-picker'` | ✅ Yes | Required. |
| `modelValue` | `DateRangeType` | `{ startDate: '', endDate: '' }` | ✅ Yes | Bind via `v-model`. Must be an object with both keys. |
| `label` | `string` | `''` | No | Field label. |
| `disabled` | `boolean` | `false` | No | Disables both inputs. |
| `readonly` | `boolean` | `false` | No | Makes inputs read-only. |
| `error` | `boolean` | `false` | No | Renders red border on both inputs. |
| `format` | `string` | `'MM-DD-YYYY'` | No | Controls v-model output string format. |
| `separator` | `string` | `'to'` | No | Text rendered between start and end inputs. |
| `allowSameDay` | `boolean` | `false` | No | Allows selecting the same date for start and end. |
| `maxRange` | `number` | `null` | No | Maximum number of days between start and end. |
| `minRange` | `number` | `1` | No | Minimum number of days between start and end. |
| `width` | `string` | `'100%'` | No | CSS width of the component. |
| `placement` | `string` | `'bottom'` | No | Popper placement. Same valid values as `spr-date-picker`. |
| `displayHelper` | `boolean` | `false` | No | Must be `true` for `#helperMessage` slot to render. |
| `helperText` | `string` | `''` | No | Helper text. Overridden by `#helperMessage` slot if provided. |
| `helperIcon` | `string` | `null` | No | Icon name for helper area. Exact format unverified. |
| `restDays` | `RestDayType[]` | `[]` | No | Days to mark as rest days. |
| `disabledDates` | `DisabledDatesType` | — | No | Partial objects accepted without error. |
| `minMaxYear` | `MinMaxYearType` | `{ min: 1900, max: currentYear }` | No | Year range for the year picker. |
| `currentYear` | `string` | current year | No | Initial year displayed. |
| `wrapperPosition` | `string` | `'relative'` | No | CSS position of wrapper. |
| `popperStrategy` | `string` | `'absolute'` | No | Valid values: `'fixed'`, `'absolute'`. |
| `popperContainer` | `string` | `''` | No | Container selector for popper. |
| `active` | `boolean` | `false` | No | Internal composable use — do not set in templates. |

---

## Slots

| Slot | Scoped | Description |
|---|---|---|
| `#default` | Yes — exposes `handle-click` | Replaces the default trigger. Use to render a custom trigger element. |
| `#helperMessage` | No | Custom helper content. Requires `displayHelper: true`. Overrides `helperText` prop. |

---

## Emits

| Event | Payload | Notes |
|---|---|---|
| `update:modelValue` | `DateRangeType` | Standard v-model update. |
| `rangeChange` | `{ startDate: string; endDate: string; isValid: boolean }` | Fires on every range update, including partial selection (endDate still `''`). `isValid` can be `true` even with empty endDate — guard with `if (isValid && endDate)`. |
| `getInputValue` | `DateRangeType \| null` | Returns current range object. |
| `getDateFormats` | `Record<string, ...>` | Fires on date selection. |
| `getMonthList` | `Array<object>` | Fires on **mount**, not on selection. |
| `getYearList` | `Array<number>` | Fires on **mount**, not on selection. |

---

## Types

```ts
import type { RestDayType, DisabledDatesType, MinMaxYearType } from 'design-system-next'

type DateRangeType = { startDate: string; endDate: string }

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

---

## Common Patterns

**Basic range selection:**
```vue
<spr-date-range-picker
  id="leave-range"
  v-model="range"
  label="Leave Period"
/>

<script setup lang="ts">
import { ref } from 'vue'
const range = ref({ startDate: '', endDate: '' })
</script>
```

**With constraints:**
```vue
<spr-date-range-picker
  id="booking-range"
  v-model="range"
  label="Booking Period"
  :allowSameDay="true"
  :maxRange="30"
  :minRange="1"
/>
```

**Custom separator:**
```vue
<spr-date-range-picker
  id="period"
  v-model="range"
  label="Period"
  separator="–"
/>
```

**React to range changes:**
```vue
<spr-date-range-picker
  id="range"
  v-model="range"
  label="Date Range"
  @rangeChange="onRangeChange"
/>

<script setup lang="ts">
import { ref } from 'vue'
const range = ref({ startDate: '', endDate: '' })

function onRangeChange({ startDate, endDate, isValid }: { startDate: string; endDate: string; isValid: boolean }) {
  if (isValid && endDate) {
    // both dates selected and valid
  }
}
</script>
```

**With helper message:**
```vue
<spr-date-range-picker
  id="range"
  v-model="range"
  label="Leave Period"
  :displayHelper="true"
>
  <template #helperMessage>
    <span>Maximum leave duration is 30 days.</span>
  </template>
</spr-date-range-picker>
```

---

## Verified Behaviors

- ✅ `id` and `v-model` are both required — v-model must be `{ startDate: '', endDate: '' }` shape
- ✅ `error: true` renders red border on both start and end inputs
- ✅ `separator` prop changes the text between inputs — `'–'` renders correctly
- ✅ `allowSameDay` and `maxRange` props accepted without error
- ✅ `#helperMessage` slot renders when `displayHelper: true`; slot overrides `helperText` prop
- ✅ `rangeChange` fires on every range update including partial selection (startDate only, endDate empty)
- ✅ `rangeChange` `isValid` can be `true` even when `endDate` is still `''` — guard with `if (isValid && endDate)` if you need both dates
- ✅ `getMonthList` and `getYearList` fire on mount
- ✅ `width` default is `'100%'` — not `'400px'`
- ✅ `#default` scoped slot pattern same as `spr-date-picker` — exposes `handle-click`
- ⚠️ `active` prop is internal composable use — do not set in templates
- ⚠️ `helperText` prop not visible when `#helperMessage` slot is provided — slot takes precedence

---

## Global Patterns

- **Kebab-case tag** — `<spr-date-range-picker>`, never `<SprDateRangePicker>`
- **No component imports** — never `import { SprDateRangePicker }`. Only import types: `import type { RestDayType, DisabledDatesType, MinMaxYearType } from 'design-system-next'`
- **Props are camelCase in template** — `:displayHelper`, `:restDays`, `:disabledDates`, `:allowSameDay`, `:maxRange`, `:minRange`

---

## MCP Warning

`get_component` returns a `usageExample` generated from metadata — it is **not verified** and contains errors (PascalCase tag, direct component import, missing required props). Always verify in the test harness.
