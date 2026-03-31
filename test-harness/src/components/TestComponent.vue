<template>
  <div style="height: 600px; width: 100%;">
    <spr-table
      :headers="headers"
      :dataTable="tableData"
    >
      <template #footer>
        <spr-table-pagination
          v-model:selectedRowCount="rowCount"
          v-model:currentPage="currentPage"
          :totalItems="totalItems"
          :dropdownSelection="dropdownSelection"
        />
      </template>
    </spr-table>
  </div>
</template>

<script setup lang="ts">
import type { Header } from 'design-system-next'
import { ref } from 'vue'

interface Employee {
  id: number
  name: string
  department: string
  position: string
  status: string
}

const headers = ref<Header[]>([
  { field: 'name', name: 'Name' },
  { field: 'department', name: 'Department' },
  { field: 'position', name: 'Position' },
  { field: 'status', name: 'Status' },
])

const tableData = ref([
  {
    id: 1,
    name: { title: 'Maria Santos' },
    department: { title: 'Engineering' },
    position: { title: 'Frontend Developer' },
    status: { title: 'Active' },
  },
  {
    id: 2,
    name: { title: 'Jose Reyes' },
    department: { title: 'HR' },
    position: { title: 'HR Specialist' },
    status: { title: 'Active' },
  },
  {
    id: 3,
    name: { title: 'Ana Cruz' },
    department: { title: 'Finance' },
    position: { title: 'Accountant' },
    status: { title: 'On Leave' },
  },
])

const rowCount = ref(10)
const currentPage = ref(1)
const totalItems = ref(3)
const dropdownSelection = [
  { text: '10', value: '10' },
  { text: '20', value: '20' },
  { text: '50', value: '50' },
]
</script>
