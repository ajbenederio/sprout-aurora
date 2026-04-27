<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 40px; max-width: 600px;">

    <!-- SECTION 1: spr-date-picker — basic usage -->
    <div>
      <h3>1. Date Picker — basic</h3>
      <spr-date-picker
        id="dp-basic"
        v-model="date1"
        label="Start Date"
        @getInputValue="onDpInputValue"
        @getMonthList="onDpMonthList"
        @getYearList="onDpYearList"
        @getDateFormats="onDpDateFormats"
      />
      <p>v-model value: {{ date1 }}</p>
    </div>

    <!-- SECTION 2: spr-date-picker — error + disabled states -->
    <div>
      <h3>2. Date Picker — error state</h3>
      <spr-date-picker
        id="dp-error"
        v-model="date2"
        label="Error Date"
        :error="true"
      />
    </div>

    <div>
      <h3>3. Date Picker — disabled</h3>
      <spr-date-picker
        id="dp-disabled"
        v-model="date3"
        label="Disabled Date"
        :disabled="true"
      />
    </div>

    <!-- SECTION 3: spr-date-picker — helperMessage slot (requires displayHelper: true) -->
    <div>
      <h3>4. Date Picker — helperMessage slot</h3>
      <spr-date-picker
        id="dp-helper"
        v-model="date4"
        label="With Helper"
        :displayHelper="true"
        helperText="This is helperText prop"
      >
        <template #helperMessage>
          <span style="color: blue;">Custom helper via slot</span>
        </template>
      </spr-date-picker>
    </div>

    <!-- SECTION 4: spr-date-picker — restDays (weekend rest) -->
    <div>
      <h3>5. Date Picker — restDays (su + sa greyed)</h3>
      <spr-date-picker
        id="dp-restdays"
        v-model="date5"
        label="Weekdays Only"
        :restDays="['su', 'sa']"
      />
    </div>

    <!-- SECTION 5: spr-date-picker — disabledDates (partial object) -->
    <div>
      <h3>6. Date Picker — disabledDates (future disabled)</h3>
      <spr-date-picker
        id="dp-disabled-dates"
        v-model="date6"
        label="No Future Dates"
        :disabledDates="{ futureDates: true }"
      />
    </div>

    <!-- SECTION 6: spr-date-picker — custom trigger via default scoped slot -->
    <div>
      <h3>7. Date Picker — custom trigger slot</h3>
      <spr-date-picker
        id="dp-slot"
        v-model="date7"
        label="Custom Trigger"
      >
        <template #default="{ 'handle-click': handleClick }">
          <button @click="handleClick" style="padding: 8px 16px; cursor: pointer;">
            📅 Pick a date ({{ date7 || 'none' }})
          </button>
        </template>
      </spr-date-picker>
    </div>

    <hr />

    <!-- SECTION 7: spr-date-range-picker — basic usage -->
    <div>
      <h3>8. Date Range Picker — basic</h3>
      <spr-date-range-picker
        id="drp-basic"
        v-model="range1"
        label="Date Range"
        @rangeChange="onRangeChange"
        @getInputValue="onDrpInputValue"
      />
      <p>v-model: {{ range1 }}</p>
    </div>

    <!-- SECTION 8: spr-date-range-picker — allowSameDay + minRange/maxRange -->
    <div>
      <h3>9. Date Range Picker — allowSameDay, maxRange 7</h3>
      <spr-date-range-picker
        id="drp-constraints"
        v-model="range2"
        label="Max 7 Days"
        :allowSameDay="true"
        :maxRange="7"
        :minRange="1"
        separator="–"
      />
      <p>v-model: {{ range2 }}</p>
    </div>

    <!-- SECTION 9: spr-date-range-picker — error state -->
    <div>
      <h3>10. Date Range Picker — error state</h3>
      <spr-date-range-picker
        id="drp-error"
        v-model="range3"
        label="Error Range"
        :error="true"
      />
    </div>

    <!-- SECTION 10: spr-date-range-picker — helperMessage slot -->
    <div>
      <h3>11. Date Range Picker — helperMessage slot</h3>
      <spr-date-range-picker
        id="drp-helper"
        v-model="range4"
        label="With Helper"
        :displayHelper="true"
      >
        <template #helperMessage>
          <span style="color: green;">Range helper via slot</span>
        </template>
      </spr-date-range-picker>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// date-picker refs
const date1 = ref('')
const date2 = ref('')
const date3 = ref('')
const date4 = ref('')
const date5 = ref('')
const date6 = ref('')
const date7 = ref('')

// date-range-picker refs
const range1 = ref({ startDate: '', endDate: '' })
const range2 = ref({ startDate: '', endDate: '' })
const range3 = ref({ startDate: '', endDate: '' })
const range4 = ref({ startDate: '', endDate: '' })

// date-picker emit handlers
function onDpInputValue(val: string | null) {
  console.log('[dp] getInputValue:', val)
}
function onDpMonthList(val: Array<object>) {
  console.log('[dp] getMonthList (fires on mount):', val)
}
function onDpYearList(val: Array<number>) {
  console.log('[dp] getYearList (fires on mount):', val)
}
function onDpDateFormats(val: unknown) {
  console.log('[dp] getDateFormats:', val)
}

// date-range-picker emit handlers
function onRangeChange(val: { startDate: string; endDate: string; isValid: boolean }) {
  console.log('[drp] rangeChange:', val)
}
function onDrpInputValue(val: unknown) {
  console.log('[drp] getInputValue:', val)
}
</script>