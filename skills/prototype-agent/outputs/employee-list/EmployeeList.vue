<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Employee {
  id:          number
  name:        string
  department:  string
  position:    string
  status:      string
  _name:       { title: string }
  _department: { title: string }
  _position:   { title: string }
  _status:     { title: string }
}

function emp(
  id: number, name: string, dept: string, position: string, status: string
): Employee {
  return {
    id, name, department: dept, position, status,
    _name:       { title: name     },
    _department: { title: dept     },
    _position:   { title: position },
    _status:     { title: status   },
  }
}

// ─── Employee seed data ───────────────────────────────────────────────────────
const allEmployees = ref<Employee[]>([
  emp(1,  'Maria Santos',      'Engineering',     'Frontend Developer',      'Active'),
  emp(2,  'Jose Reyes',        'Human Resources', 'HR Specialist',           'Active'),
  emp(3,  'Ana Cruz',          'Finance',         'Accountant',              'On Probation'),
  emp(4,  'Carlos Dela Rosa',  'Engineering',     'Backend Developer',       'Active'),
  emp(5,  'Liza Mendoza',      'Marketing',       'Marketing Manager',       'Active'),
  emp(6,  'Ramon Villanueva',  'Operations',      'Operations Analyst',      'On Probation'),
  emp(7,  'Grace Tan',         'Finance',         'Finance Manager',         'Active'),
  emp(8,  'Michael Lim',       'Engineering',     'DevOps Engineer',         'Active'),
  emp(9,  'Patricia Ocampo',   'Human Resources', 'Recruitment Specialist',  'On Leave'),
  emp(10, 'Rowena Castillo',   'Operations',      'Project Manager',         'Active'),
  emp(11, 'Eduardo Manalo',    'Sales',           'Account Manager',         'Active'),
  emp(12, 'Jennifer Ramos',    'Finance',         'Payroll Specialist',      'Active'),
  emp(13, 'Rico Bautista',     'Sales',           'Sales Executive',         'On Probation'),
  emp(14, 'Theresa Gomez',     'Marketing',       'Brand Strategist',        'Active'),
  emp(15, 'Daniel Torres',     'Engineering',     'QA Engineer',             'Inactive'),
  emp(16, 'Sophia Navarro',    'Human Resources', 'HR Manager',              'Active'),
  emp(17, 'Mark Aquino',       'Engineering',     'Tech Lead',               'Active'),
  emp(18, 'Cristina Flores',   'Finance',         'Budget Analyst',          'On Leave'),
  emp(19, 'Bernard Santos',    'Operations',      'Supply Chain Analyst',    'Active'),
  emp(20, 'Janelle Cruz',      'Marketing',       'Content Strategist',      'Active'),
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_name',       name: 'Name',              sort: true  },
  { field: '_department', name: 'Department',         sort: true  },
  { field: '_position',   name: 'Position',           sort: false },
  { field: '_status',     name: 'Employment Status'               },
])

// ─── Search ───────────────────────────────────────────────────────────────────
const search = ref('')

// ─── Pagination ───────────────────────────────────────────────────────────────
const rowCount    = ref(10)
const currentPage = ref(1)

const dropdownOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
]

// Reset to page 1 whenever the search query changes
watch(search, () => { currentPage.value = 1 })

// ─── Computed: filtered + paged data ─────────────────────────────────────────
const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return allEmployees.value
  return allEmployees.value.filter(e =>
    e.name.toLowerCase().includes(q)       ||
    e.department.toLowerCase().includes(q) ||
    e.position.toLowerCase().includes(q)
  )
})

const totalItems = computed(() => filtered.value.length)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * rowCount.value
  return filtered.value.slice(start, start + rowCount.value)
})

// ─── Status lozenge helpers ───────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Active')       return 'success'
  if (status === 'On Probation') return 'caution'
  if (status === 'On Leave')     return 'information'
  if (status === 'Inactive')     return 'neutral'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Active'
}
</script>

<template>
  <div class="el-page">

    <!-- ── Page header ──────────────────────────────────────────────────────── -->
    <div class="el-header">
      <div class="el-header__eyebrow">People</div>
      <div class="el-header__row">
        <div>
          <h1 class="el-header__title">Employee List</h1>
          <p class="el-header__subtitle">
            {{ totalItems }} employee{{ totalItems !== 1 ? 's' : '' }}
            {{ search ? 'matching your search' : 'total' }}
          </p>
        </div>

        <!-- Search input — sits above the table for fast employee lookup -->
        <div class="el-search">
          <spr-input
            id="employee-search"
            v-model="search"
            placeholder="Search by name, department, or position..."
          />
        </div>
      </div>
    </div>

    <!-- ── Employee table ───────────────────────────────────────────────────── -->
    <div class="el-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="pagedData"
        :emptyState="{
          description: 'No employees found',
          subDescription: 'Try a different name, department, or position.',
          image: 'location',
          size: 'large',
        }"
      >
        <!-- Employment status — lozenge renders tone by status value -->
        <template #_status="{ row }">
          <spr-lozenge
            :label="(row._status as any).title"
            :tone="statusTone((row._status as any).title)"
            :fill="statusFill((row._status as any).title)"
          />
        </template>

        <!-- Pagination in footer slot -->
        <template #footer>
          <spr-table-pagination
            v-model:selectedRowCount="rowCount"
            v-model:currentPage="currentPage"
            :totalItems="totalItems"
            :dropdownSelection="dropdownOptions"
          />
        </template>
      </spr-table>
    </div>

  </div>
</template>

<style scoped>
.el-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.el-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.el-header__row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.el-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.el-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Search ──────────────────────────────────────────────────────────────── */
.el-search {
  width: 320px;
  flex-shrink: 0;
}

/* ── Table ───────────────────────────────────────────────────────────────── */
.el-table-wrap {
  height: 600px;
  width: 100%;
}
</style>
