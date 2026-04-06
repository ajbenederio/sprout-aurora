<script setup lang="ts">
import { ref } from 'vue'
import type { RestDayType, DisabledDatesType, MinMaxYearType } from 'design-system-next'

const date1 = ref('')
const date2 = ref('')
const date3 = ref('')
const date4 = ref('')
const date5 = ref('')
const date6 = ref('')
const date7 = ref('')

const minMax: MinMaxYearType = { min: 2000, max: 2030 }

const disabledWeekends: Partial<DisabledDatesType> = { weekends: true }

const restDays: RestDayType[] = ['sa', 'su']

function onGetInputValue(val: string | null) {
  console.log('getInputValue:', val)
}
function onGetDateFormats(val: Record<string, unknown>) {
  console.log('getDateFormats:', val)
}
function onGetMonthList(val: Array<object>) {
  console.log('getMonthList:', val)
}
function onGetYearList(val: Array<number>) {
  console.log('getYearList:', val)
}
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 40px; max-width: 600px;">

    <!-- 1. Basic — required props only -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">1. Basic — id + v-model only</p>
      <spr-date-picker
        id="dp-basic"
        v-model="date1"
        label="Pick a date"
        @get-input-value="onGetInputValue"
        @get-date-formats="onGetDateFormats"
        @get-month-list="onGetMonthList"
        @get-year-list="onGetYearList"
      />
      <p style="margin-top: 4px; font-size: 12px;">v-model value: "{{ date1 }}"</p>
    </div>

    <!-- 2. Error state -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">2. Error state</p>
      <spr-date-picker
        id="dp-error"
        v-model="date2"
        label="Error Date"
        :error="true"
      />
    </div>

    <!-- 3. Disabled -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">3. Disabled</p>
      <spr-date-picker
        id="dp-disabled"
        v-model="date3"
        label="Disabled Date"
        :disabled="true"
      />
    </div>

    <!-- 4. Readonly -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">4. Readonly</p>
      <spr-date-picker
        id="dp-readonly"
        v-model="date3"
        label="Readonly Date"
        :readonly="true"
      />
    </div>

    <!-- 5. restDays — weekends blocked -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">5. restDays — sa + su blocked</p>
      <spr-date-picker
        id="dp-rest"
        v-model="date4"
        label="No Weekends"
        :rest-days="restDays"
      />
    </div>

    <!-- 6. disabledDates — weekends disabled -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">6. disabledDates — weekends: true</p>
      <spr-date-picker
        id="dp-disabled-dates"
        v-model="date5"
        label="Disabled Weekends"
        :disabled-dates="disabledWeekends"
      />
    </div>

    <!-- 7. minMaxYear constraint -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">7. minMaxYear — 2000 to 2030</p>
      <spr-date-picker
        id="dp-minmax"
        v-model="date6"
        label="Year Range 2000–2030"
        :min-max-year="minMax"
      />
    </div>

    <!-- 8. Custom format -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">8. format — YYYY/MM/DD</p>
      <spr-date-picker
        id="dp-format"
        v-model="date7"
        label="Custom Format"
        format="YYYY/MM/DD"
      />
      <p style="margin-top: 4px; font-size: 12px;">v-model value: "{{ date7 }}"</p>
    </div>

    <!-- 9. displayHelper + helperText -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">9. displayHelper + helperText</p>
      <spr-date-picker
        id="dp-helper"
        v-model="date1"
        label="With Helper"
        :display-helper="true"
        helper-text="Select a date from the calendar"
      />
    </div>

    <!-- 10. helperMessage slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">10. helperMessage slot</p>
      <spr-date-picker
        id="dp-helper-slot"
        v-model="date1"
        label="Slot Helper"
      >
        <template #helperMessage>
          <span style="color: purple;">Slot-rendered helper</span>
        </template>
      </spr-date-picker>
    </div>

    <!-- 11. default scoped slot — custom trigger -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">11. default slot — custom trigger via handle-click</p>
      <spr-date-picker
        id="dp-slot-trigger"
        v-model="date1"
        label="Custom Trigger"
      >
        <template #default="{ 'handle-click': handleClick }">
          <button @click="handleClick" style="padding: 8px 16px; background: teal; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Open Calendar
          </button>
        </template>
      </spr-date-picker>
    </div>

  </div>
</template>