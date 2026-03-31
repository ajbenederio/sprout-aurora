<script setup>
import { ref } from 'vue'

// Helper: format Date → 'YYYY-MM-DD'
function fmt(date) {
  return date.toISOString().slice(0, 10)
}

// Hardcoded seed week: Mar 17–23, 2026
const base = new Date('2026-03-17')
function d(offset) {
  const dt = new Date(base)
  dt.setDate(base.getDate() + offset)
  return fmt(dt)
}

const employees = ref([
  {
    id: '1',
    name: 'Ana Reyes',
    position: 'Cashier',
    schedule: {
      [d(0)]: [{ startTime: '08:00', endTime: '16:00', location: 'Main Branch', type: 'Morning' }],
      [d(1)]: [{ startTime: '08:00', endTime: '16:00', location: 'Main Branch', type: 'Morning' }],
      [d(2)]: 'restday',
      [d(3)]: [{ startTime: '13:00', endTime: '21:00', location: 'Main Branch', type: 'Afternoon' }],
      [d(4)]: [{ startTime: '13:00', endTime: '21:00', location: 'Main Branch', type: 'Afternoon' }],
      [d(5)]: [{ startTime: '08:00', endTime: '16:00', location: 'Main Branch', type: 'Morning' }],
      [d(6)]: 'restday',
    },
  },
  {
    id: '2',
    name: 'Ben Cruz',
    position: 'Supervisor',
    schedule: {
      [d(0)]: [{ startTime: '09:00', endTime: '18:00', location: 'Head Office', type: 'Regular' }],
      [d(1)]: [{ startTime: '09:00', endTime: '18:00', location: 'Head Office', type: 'Regular' }],
      [d(2)]: [{ startTime: '09:00', endTime: '18:00', location: 'Head Office', type: 'Regular' }],
      [d(3)]: [{ startTime: '09:00', endTime: '18:00', location: 'Head Office', type: 'Regular' }],
      [d(4)]: [{ startTime: '09:00', endTime: '18:00', location: 'Head Office', type: 'Regular' }],
      [d(5)]: 'restday',
      [d(6)]: 'restday',
    },
  },
  {
    id: '3',
    name: 'Carla Santos',
    position: 'Teller',
    schedule: {
      [d(0)]: 'restday',
      [d(1)]: [{ startTime: '21:00', endTime: '05:00', location: 'Main Branch', type: 'Night' }],
      [d(2)]: [{ startTime: '21:00', endTime: '05:00', location: 'Main Branch', type: 'Night' }],
      [d(3)]: [{ startTime: '21:00', endTime: '05:00', location: 'Main Branch', type: 'Night' }],
      [d(4)]: [{ startTime: '21:00', endTime: '05:00', location: 'Main Branch', type: 'Night' }],
      [d(5)]: [{ startTime: '21:00', endTime: '05:00', location: 'Main Branch', type: 'Night' }],
      [d(6)]: 'restday',
    },
  },
  {
    id: '4',
    name: 'David Lim',
    position: 'Security',
    schedule: {
      [d(0)]: [{ startTime: '06:00', endTime: '14:00', location: 'Main Branch', type: 'Morning' }],
      [d(1)]: [{ startTime: '06:00', endTime: '14:00', location: 'Main Branch', type: 'Morning' }],
      [d(2)]: [{ startTime: '06:00', endTime: '14:00', location: 'Main Branch', type: 'Morning' }],
      [d(3)]: 'restday',
      [d(4)]: 'restday',
      [d(5)]: [{ startTime: '06:00', endTime: '14:00', location: 'Main Branch', type: 'Morning' }],
      [d(6)]: [{ startTime: '06:00', endTime: '14:00', location: 'Main Branch', type: 'Morning' }],
    },
  },
  {
    id: '5',
    name: 'Eva Garcia',
    position: 'Accountant',
    schedule: {
      [d(0)]: [{ startTime: '08:00', endTime: '17:00', location: 'Head Office', type: 'Regular' }],
      [d(1)]: [{ startTime: '08:00', endTime: '17:00', location: 'Head Office', type: 'Regular' }],
      [d(2)]: [{ startTime: '08:00', endTime: '17:00', location: 'Head Office', type: 'Regular' }],
      [d(3)]: [{ startTime: '08:00', endTime: '17:00', location: 'Head Office', type: 'Regular' }],
      [d(4)]: [{ startTime: '08:00', endTime: '17:00', location: 'Head Office', type: 'Regular' }],
      [d(5)]: 'restday',
      [d(6)]: 'restday',
    },
  },
])

const search = ref('')
const initialDate = base
</script>

<template>
  <div class="screen">

    <!-- Desktop Top Bar -->
    <header class="top-bar">
      <div class="top-bar-left">
        <span class="brand">Sprout</span>
        <span class="divider">·</span>
        <span class="page-title">Shift Center</span>
      </div>
      <div class="top-bar-right">
        <SprLozenge label="Mar 2026" tone="neutral" />
        <input
          v-model="search"
          placeholder="Search employee..."
          class="search-input"
        />
        <SprButton tone="success" variant="primary" size="small">+ Add Shift</SprButton>
      </div>
    </header>

    <!-- Calendar (takes remaining height) -->
    <div class="content">
      <SprCalendar
        :employees="employees"
        :initial-date="initialDate"
        :search="search"
        empty-state-title="No employees found"
        empty-state-description="Try a different search term."
      />
    </div>

  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.screen {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
}

.top-bar {
  height: 64px;
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #e1e6e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
.top-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand {
  font-weight: 700;
  font-size: 16px;
  color: #00291b;
}
.divider {
  color: #5d6c6b;
  font-size: 16px;
}
.page-title {
  font-weight: 600;
  font-size: 16px;
  color: #5d6c6b;
}
.top-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search-input {
  width: 220px;
  padding: 6px 10px;
  border: 1px solid #e1e6e4;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Rubik', system-ui, sans-serif;
  color: #00291b;
  outline: none;
}
.search-input:focus {
  border-color: #158039;
}

.content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
