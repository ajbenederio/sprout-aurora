<template>
  <div style="padding: 24px;">
    <div style="height: 600px;">
      <spr-calendar
        v-model:search="search"
        :employees="filteredEmployees"
        :initial-date="initialDate"
      >
        <template #filter>
          <div style="padding: 8px;">
            <spr-input
              id="cal-search"
              v-model="search"
              placeholder="Search employees..."
            />
          </div>
        </template>
      </spr-calendar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const initialDate = new Date()

const employees = ref([
  { id: 1, name: 'Maria Santos', position: 'HR Manager', avatar: '', highlight: false, hoursWorked: 40, hoursTarget: 48, schedule: {} },
  { id: 2, name: 'Jose Reyes', position: 'Developer', avatar: '', highlight: false, hoursWorked: 32, hoursTarget: 48, schedule: {} },
  { id: 3, name: 'Ana Cruz', position: 'Designer', avatar: '', highlight: false, hoursWorked: 38, hoursTarget: 48, schedule: {} },
])

const filteredEmployees = computed(() =>
  search.value
    ? employees.value.filter(e =>
        e.name.toLowerCase().includes(search.value.toLowerCase())
      )
    : employees.value
)
</script>