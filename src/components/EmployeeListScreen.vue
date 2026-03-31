<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useNav } from '@/composables/useNav.js'

interface Employee {
  id: number
  name: string
  employeeId: string
  department: string
  position: string
  status: string
}

interface TableHeader {
  field: string
  name: string
  sort?: boolean
}

interface PaginationOption {
  text: number
  value: number
}

const { navigate } = useNav()

// --- State ---
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(10)

watch([searchQuery, rowsPerPage], () => { currentPage.value = 1 })

// --- Mock Data ---
const allEmployees = ref<Employee[]>([
  { id: 1,  name: 'Maria Santos',    employeeId: 'EMP-0001', department: 'Engineering',  position: 'Senior Software Engineer',  status: 'Active'       },
  { id: 2,  name: 'Jose Reyes',       employeeId: 'EMP-0002', department: 'Finance',       position: 'Finance Analyst',           status: 'Active'       },
  { id: 3,  name: 'Ana Cruz',         employeeId: 'EMP-0003', department: 'HR',            position: 'HR Manager',                status: 'Active'       },
  { id: 4,  name: 'Carlo Mendoza',    employeeId: 'EMP-0004', department: 'IT',            position: 'IT Specialist',             status: 'Active'       },
  { id: 5,  name: 'Liza Ramos',       employeeId: 'EMP-0005', department: 'Operations',    position: 'Customer Support Lead',     status: 'On Leave'     },
  { id: 6,  name: 'Mark Torres',      employeeId: 'EMP-0006', department: 'Sales',         position: 'Sales Executive',           status: 'Active'       },
  { id: 7,  name: 'Grace Villanueva', employeeId: 'EMP-0007', department: 'IT',            position: 'QA Analyst',                status: 'Active'       },
  { id: 8,  name: 'Ben Aquino',       employeeId: 'EMP-0008', department: 'Finance',       position: 'Accountant',                status: 'Active'       },
  { id: 9,  name: 'Cathy Lim',        employeeId: 'EMP-0009', department: 'Sales',         position: 'Account Manager',           status: 'Active'       },
  { id: 10, name: 'Dan Garcia',       employeeId: 'EMP-0010', department: 'Operations',    position: 'Logistics Coordinator',     status: 'Inactive'     },
  { id: 11, name: 'Elena Pascual',    employeeId: 'EMP-0011', department: 'Engineering',   position: 'Frontend Developer',        status: 'Probationary' },
  { id: 12, name: 'Felix Navarro',    employeeId: 'EMP-0012', department: 'HR',            position: 'Recruitment Specialist',    status: 'Active'       },
  { id: 13, name: 'Gloria Dela Rosa', employeeId: 'EMP-0013', department: 'Finance',       position: 'Payroll Officer',           status: 'Active'       },
  { id: 14, name: 'Henry Castillo',   employeeId: 'EMP-0014', department: 'Operations',    position: 'Operations Manager',        status: 'Active'       },
  { id: 15, name: 'Iris Ocampo',      employeeId: 'EMP-0015', department: 'Engineering',   position: 'Backend Developer',         status: 'Active'       },
  { id: 16, name: 'James Bautista',   employeeId: 'EMP-0016', department: 'Sales',         position: 'Sales Manager',             status: 'On Leave'     },
  { id: 17, name: 'Karen Robles',     employeeId: 'EMP-0017', department: 'IT',            position: 'Systems Administrator',     status: 'Active'       },
  { id: 18, name: 'Luis Fernandez',   employeeId: 'EMP-0018', department: 'Engineering',   position: 'DevOps Engineer',           status: 'Probationary' },
  { id: 19, name: 'Mia Domingo',      employeeId: 'EMP-0019', department: 'HR',            position: 'Training Coordinator',      status: 'Active'       },
  { id: 20, name: 'Nathan Aguilar',   employeeId: 'EMP-0020', department: 'Finance',       position: 'Tax Compliance Officer',    status: 'Active'       },
  { id: 21, name: 'Olivia Macaraeg',  employeeId: 'EMP-0021', department: 'Operations',    position: 'Supply Chain Analyst',      status: 'Inactive'     },
  { id: 22, name: 'Paolo Guerrero',   employeeId: 'EMP-0022', department: 'Engineering',   position: 'Mobile Developer',          status: 'Active'       },
  { id: 23, name: 'Queenie Soriano',  employeeId: 'EMP-0023', department: 'Sales',         position: 'Business Development Rep',  status: 'Terminated'   },
  { id: 24, name: 'Ramon Tolentino',  employeeId: 'EMP-0024', department: 'IT',            position: 'Network Engineer',          status: 'Active'       },
  { id: 25, name: 'Sofia Abad',       employeeId: 'EMP-0025', department: 'HR',            position: 'Compensation & Benefits',   status: 'Active'       },
])

// --- Computed ---
const filteredEmployees = computed<Employee[]>(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allEmployees.value
  return allEmployees.value.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.department.toLowerCase().includes(q) ||
    e.position.toLowerCase().includes(q)
  )
})

const paginatedEmployees = computed<Employee[]>(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredEmployees.value.slice(start, start + rowsPerPage.value)
})

// --- Table Config ---
const headers = ref<TableHeader[]>([
  { field: 'name',       name: 'Employee',   sort: true },
  { field: 'department', name: 'Department', sort: true },
  { field: 'position',   name: 'Position',   sort: true },
  { field: 'status',     name: 'Status' },
])

const paginationDropdown = ref<PaginationOption[]>([
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
])

// --- Helpers ---
const initials = (name: string): string =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

const STATUS_TONE: Record<string, string> = {
  'Active':       'success',
  'Inactive':     'neutral',
  'On Leave':     'pending',
  'Probationary': 'caution',
  'Terminated':   'danger',
}
</script>

<template>
  <div class="page">

    <!-- ── Top Nav ─────────────────────────────────────────────────────────── -->
    <nav class="topnav">
      <div class="topnav-left">
        <div class="logo">
          <span class="logo-sprout">sprout</span>
          <span class="logo-hr">HR</span>
        </div>
        <div class="nav-links">
          <span class="nav-link" @click="navigate('hris-dashboard')">Dashboard</span>
          <span class="nav-link nav-link--active">Employees</span>
          <span class="nav-link">Payroll</span>
          <span class="nav-link">Leave</span>
          <span class="nav-link">Reports</span>
        </div>
      </div>
      <div class="topnav-right">
        <div class="user-pill">
          <div class="user-avatar">M</div>
          <span class="user-name">Maria Santos</span>
          <span class="user-caret">▾</span>
        </div>
      </div>
    </nav>

    <!-- ── Main Content ─────────────────────────────────────────────────────── -->
    <main class="main">

      <!-- Page Header -->
      <div class="page-header">
        <div>
          <p class="breadcrumb">Dashboard <span class="breadcrumb-sep">/</span> Employees</p>
          <h1 class="page-title">Employee Directory</h1>
        </div>
        <SprButton tone="success" variant="primary" size="medium">
          + Add Employee
        </SprButton>
      </div>

      <!-- Search toolbar above the table -->
      <!-- Research anchor: [pattern-based] search input above data table -->
      <div class="toolbar">
        <SprInputSearch
          v-model="searchQuery"
          placeholder="Search by name, department, or position…"
        />
        <SprLozenge
          :label="`${filteredEmployees.length} result${filteredEmployees.length !== 1 ? 's' : ''}`"
          tone="neutral"
        />
      </div>

      <!-- Data Table -->
      <!-- Research anchor: [domain-knowledge] HRIS employee list with status badges -->
      <SprTable
        :headers="headers"
        :dataTable="paginatedEmployees"
        variant="white"
        :fullHeight="false"
        :emptyState="{
          description: 'No employees found',
          subDescription: 'Try a different search term',
          image: 'empty',
          size: 'large',
        }"
      >
        <!-- Employee name cell: avatar + name + employee ID -->
        <template #name="{ row }">
          <div class="name-cell">
            <SprAvatar
              :initial="initials(row.name as string)"
              size="sm"
              variant="initial"
              color="primary"
            />
            <div class="name-details">
              <span class="emp-name">{{ row.name }}</span>
              <span class="emp-id">{{ row.employeeId }}</span>
            </div>
          </div>
        </template>

        <!-- Status cell: lozenge with tone by employment status -->
        <template #status="{ row }">
          <SprLozenge
            :label="row.status as string"
            :tone="STATUS_TONE[row.status as string] ?? 'plain'"
            :fill="true"
          />
        </template>

        <!-- Pagination in footer -->
        <template #footer>
          <SprTablePagination
            v-model:selectedRowCount="rowsPerPage"
            v-model:currentPage="currentPage"
            :totalItems="filteredEmployees.length"
            :dropdownSelection="paginationDropdown"
            :bordered="false"
          />
        </template>
      </SprTable>

    </main>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--spr-white-100);   /* white-100: #F1F2F3 */
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
}

/* ── Top Nav ── */
.topnav {
  height: 60px;
  background: #00291b; /* brand deep-green — no spr- token exists for this value */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-shrink: 0;
}

.topnav-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.logo-sprout {
  font-size: 18px;
  font-weight: 700;
  color: var(--spr-kangkong-100);   /* kangkong-100: #DCFCE6 */
  letter-spacing: -0.5px;
}

.logo-hr {
  font-size: 11px;
  font-weight: 600;
  color: var(--spr-kangkong-300);   /* kangkong-300: #86EFA8 */
  letter-spacing: 0.04em;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-link {
  font-size: 14px;
  color: var(--spr-kangkong-300);   /* kangkong-300: #86EFA8 */
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s;
}

.nav-link:hover { opacity: 1; }

.nav-link--active {
  color: var(--spr-white-50);       /* white-50: #FFFFFF */
  opacity: 1;
  font-weight: 500;
  border-bottom: 2px solid var(--spr-kangkong-400);  /* kangkong-400: #4ADE7B */
  padding-bottom: 2px;
}

.topnav-right { display: flex; align-items: center; }

.user-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--spr-kangkong-700);  /* kangkong-700: #158039 */
  color: var(--spr-white-50);           /* white-50: #FFFFFF */
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name { font-size: 13px; color: var(--spr-kangkong-100); }  /* kangkong-100: #DCFCE6 */
.user-caret { font-size: 10px; color: var(--spr-kangkong-300); } /* kangkong-300: #86EFA8 */

/* ── Main ── */
.main {
  flex: 1;
  overflow-y: auto;
  padding: 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main::-webkit-scrollbar { display: none; }

/* ── Page Header ── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.breadcrumb {
  font-size: 12px;
  color: var(--spr-mushroom-600);   /* mushroom-600: #5D6C6B */
  margin-bottom: 4px;
}

.breadcrumb-sep { margin: 0 4px; color: var(--spr-mushroom-300); }  /* mushroom-300: #B8C1C0 */

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #00291b; /* brand deep-green — no spr- token exists for this value */
}

/* ── Toolbar ── */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ── Name Cell ── */
.name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.emp-name {
  font-size: 14px;
  font-weight: 600;
  color: #00291b; /* brand deep-green — no spr- token exists for this value */
}

.emp-id {
  font-size: 11px;
  color: var(--spr-mushroom-600);  /* mushroom-600: #5D6C6B */
}
</style>
