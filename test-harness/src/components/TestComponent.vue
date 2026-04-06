<script setup lang="ts">
import { ref } from 'vue'

// Instance 1 — defaults, minimal required props
const rowCount1 = ref(10)
const page1 = ref(1)

// Instance 2 — editableCurrentPage, no border
const rowCount2 = ref(20)
const page2 = ref(3)

// Instance 3 — showNumberOfRowsDropdown hidden, actions slot
const rowCount3 = ref(10)
const page3 = ref(1)

const dropdownOptions = [
  { text: '10', value: '10' },
  { text: '20', value: '20' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
]

function onPrevious(instance: number) {
  console.log(`[instance ${instance}] previous clicked`)
}
function onNext(instance: number) {
  console.log(`[instance ${instance}] next clicked`)
}
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">

    <!-- Instance 1: All required props, defaults for optionals -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">1. Default — bordered, no editable page, dropdown visible</p>
      <spr-table-pagination
        v-model:selectedRowCount="rowCount1"
        v-model:currentPage="page1"
        :totalItems="87"
        :dropdownSelection="dropdownOptions"
        @previous="onPrevious(1)"
        @next="onNext(1)"
      />
      <p style="margin-top: 8px; font-size: 12px;">selectedRowCount: {{ rowCount1 }} | currentPage: {{ page1 }}</p>
    </div>

    <!-- Instance 2: editableCurrentPage=true, bordered=false -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">2. editableCurrentPage=true, bordered=false</p>
      <spr-table-pagination
        v-model:selectedRowCount="rowCount2"
        v-model:currentPage="page2"
        :totalItems="200"
        :dropdownSelection="dropdownOptions"
        :bordered="false"
        :editableCurrentPage="true"
        @previous="onPrevious(2)"
        @next="onNext(2)"
      />
      <p style="margin-top: 8px; font-size: 12px;">selectedRowCount: {{ rowCount2 }} | currentPage: {{ page2 }}</p>
    </div>

    <!-- Instance 3: showNumberOfRowsDropdown=false, actions slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">3. showNumberOfRowsDropdown=false, #actions slot</p>
      <spr-table-pagination
        v-model:selectedRowCount="rowCount3"
        v-model:currentPage="page3"
        :totalItems="50"
        :dropdownSelection="dropdownOptions"
        :showNumberOfRowsDropdown="false"
        @previous="onPrevious(3)"
        @next="onNext(3)"
      >
        <template #actions>
          <button style="padding: 4px 12px; font-size: 12px;">Export</button>
        </template>
      </spr-table-pagination>
      <p style="margin-top: 8px; font-size: 12px;">selectedRowCount: {{ rowCount3 }} | currentPage: {{ page3 }}</p>
    </div>

  </div>
</template>