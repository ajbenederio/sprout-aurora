<script setup lang="ts">
// Research anchor: [domain-knowledge] HR admin mobile — employee directory lookup
import { ref, computed, watch } from 'vue'

interface Employee {
  id: number
  name: string
  employeeId: string
  department: string
  position: string
  status: string
}

// --- State ---
// Research anchor: [domain-knowledge] search + pagination reset on query change
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(10)

watch([searchQuery, rowsPerPage], () => { currentPage.value = 1 })

// --- Mock data ---
const allEmployees = ref<Employee[]>([
  { id: 1,  name: 'Maria Santos',     employeeId: 'EMP-0001', department: 'Engineering',  position: 'Senior Software Engineer',  status: 'Active'       },
  { id: 2,  name: 'Jose Reyes',        employeeId: 'EMP-0002', department: 'Finance',       position: 'Finance Analyst',           status: 'Active'       },
  { id: 3,  name: 'Ana Cruz',          employeeId: 'EMP-0003', department: 'HR',            position: 'HR Manager',                status: 'Active'       },
  { id: 4,  name: 'Carlo Mendoza',     employeeId: 'EMP-0004', department: 'IT',            position: 'IT Specialist',             status: 'Active'       },
  { id: 5,  name: 'Liza Ramos',        employeeId: 'EMP-0005', department: 'Operations',    position: 'Customer Support Lead',     status: 'On Leave'     },
  { id: 6,  name: 'Mark Torres',       employeeId: 'EMP-0006', department: 'Sales',         position: 'Sales Executive',           status: 'Active'       },
  { id: 7,  name: 'Grace Villanueva',  employeeId: 'EMP-0007', department: 'IT',            position: 'QA Analyst',                status: 'Active'       },
  { id: 8,  name: 'Ben Aquino',        employeeId: 'EMP-0008', department: 'Finance',       position: 'Accountant',                status: 'Active'       },
  { id: 9,  name: 'Cathy Lim',         employeeId: 'EMP-0009', department: 'Sales',         position: 'Account Manager',           status: 'Active'       },
  { id: 10, name: 'Dan Garcia',        employeeId: 'EMP-0010', department: 'Operations',    position: 'Logistics Coordinator',     status: 'Inactive'     },
  { id: 11, name: 'Elena Pascual',     employeeId: 'EMP-0011', department: 'Engineering',   position: 'Frontend Developer',        status: 'Probationary' },
  { id: 12, name: 'Felix Navarro',     employeeId: 'EMP-0012', department: 'HR',            position: 'Recruitment Specialist',    status: 'Active'       },
  { id: 13, name: 'Gloria Dela Rosa',  employeeId: 'EMP-0013', department: 'Finance',       position: 'Payroll Officer',           status: 'Active'       },
  { id: 14, name: 'Henry Castillo',    employeeId: 'EMP-0014', department: 'Operations',    position: 'Operations Manager',        status: 'Active'       },
  { id: 15, name: 'Iris Ocampo',       employeeId: 'EMP-0015', department: 'Engineering',   position: 'Backend Developer',         status: 'Active'       },
  { id: 16, name: 'James Bautista',    employeeId: 'EMP-0016', department: 'Sales',         position: 'Sales Manager',             status: 'On Leave'     },
  { id: 17, name: 'Karen Robles',      employeeId: 'EMP-0017', department: 'IT',            position: 'Systems Administrator',     status: 'Active'       },
  { id: 18, name: 'Luis Fernandez',    employeeId: 'EMP-0018', department: 'Engineering',   position: 'DevOps Engineer',           status: 'Probationary' },
  { id: 19, name: 'Mia Domingo',       employeeId: 'EMP-0019', department: 'HR',            position: 'Training Coordinator',      status: 'Active'       },
  { id: 20, name: 'Nathan Aguilar',    employeeId: 'EMP-0020', department: 'Finance',       position: 'Tax Compliance Officer',    status: 'Active'       },
  { id: 21, name: 'Olivia Macaraeg',   employeeId: 'EMP-0021', department: 'Operations',    position: 'Supply Chain Analyst',      status: 'Inactive'     },
  { id: 22, name: 'Paolo Guerrero',    employeeId: 'EMP-0022', department: 'Engineering',   position: 'Mobile Developer',          status: 'Active'       },
  { id: 23, name: 'Queenie Soriano',   employeeId: 'EMP-0023', department: 'Sales',         position: 'Business Development Rep',  status: 'Terminated'   },
  { id: 24, name: 'Ramon Tolentino',   employeeId: 'EMP-0024', department: 'IT',            position: 'Network Engineer',          status: 'Active'       },
  { id: 25, name: 'Sofia Abad',        employeeId: 'EMP-0025', department: 'HR',            position: 'Compensation & Benefits',   status: 'Active'       },
])

// --- Computed ---
// Research anchor: [domain-knowledge] search across name, dept, position — FP-1 (scan friction)
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

// --- Table config ---
const headers = ref([
  { field: 'name',       name: 'Employee',   sort: true },
  { field: 'department', name: 'Dept',       sort: true },
  { field: 'position',   name: 'Position',   sort: true },
  { field: 'status',     name: 'Status' },
])

const paginationDropdown = ref([
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
])

// --- Status tone map ---
// Research anchor: [domain-knowledge] HRIS employment status → Sprout lozenge tones
const STATUS_TONE: Record<string, string> = {
  'Active':       'success',
  'Inactive':     'neutral',
  'On Leave':     'pending',
  'Probationary': 'caution',
  'Terminated':   'danger',
}

const initials = (name: string): string =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="screen">

    <!-- iOS Status Bar -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header -->
    <!-- Research anchor: [domain-knowledge] HR admin context — identity + title -->
    <div class="page-header">
      <div>
        <p class="breadcrumb">Dashboard <span class="breadcrumb-sep">/</span> Employees</p>
        <h1 class="page-title">Directory</h1>
      </div>
      <SprButton tone="success" variant="primary" size="small">+ Add</SprButton>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Search toolbar -->
      <!-- Research anchor: [domain-knowledge] search resolves FP-1 (scan friction on long list) -->
      <div class="toolbar">
        <SprInputSearch
          v-model="searchQuery"
          placeholder="Name, department, position…"
        />
        <SprLozenge
          :label="`${filteredEmployees.length}`"
          tone="neutral"
        />
      </div>

      <!-- Data table -->
      <!-- Research anchor: [domain-knowledge] tabular layout for multi-field employee data -->
      <SprTable
        :headers="headers"
        :dataTable="paginatedEmployees"
        variant="white"
        :fullHeight="false"
        :emptyState="{
          description: 'No employees found',
          subDescription: 'Try a different search term',
          image: 'list',
          size: 'small',
        }"
      >
        <!-- Name cell: avatar + name + ID — [domain-knowledge] identity anchor in HRIS lists -->
        <template #name="{ row }">
          <div class="name-cell">
            <SprAvatar
              :initial="initials(row.name as string)"
              variant="initial"
              color="primary"
              size="xs"
            />
            <div class="name-details">
              <span class="emp-name">{{ row.name }}</span>
              <span class="emp-id">{{ row.employeeId }}</span>
            </div>
          </div>
        </template>

        <!-- Status cell: filled lozenge — [domain-knowledge] status visibility on mobile -->
        <template #status="{ row }">
          <SprLozenge
            :label="row.status as string"
            :tone="STATUS_TONE[row.status as string] ?? 'plain'"
            :fill="true"
          />
        </template>

        <!-- Pagination — resolves FP-2 (losing place in list) -->
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

    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Mobile shell — 430×932px fixed */
.screen {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: #f1f2f3;
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
  position: relative;
}

/* iOS Status Bar */
.status-bar {
  height: 44px;
  background: #00291b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}

.status-time {
  font-family: 'SF Pro Text', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #ffffff;
}

/* Page Header */
.page-header {
  background: #00291b;
  padding: 12px 16px 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
}

.breadcrumb {
  font-size: 11px;
  color: #86efa8; /* kangkong-300 — no spr- token */
  margin-bottom: 2px;
}

.breadcrumb-sep { margin: 0 3px; }

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #dcfce6; /* kangkong-100 — no spr- token */
}

/* Scrollable Content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content::-webkit-scrollbar { display: none; }

/* Search Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Name Cell */
.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-details {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.emp-name {
  font-size: 12px;
  font-weight: 600;
  color: #00291b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.emp-id {
  font-size: 10px;
  color: #5d6c6b;
}
</style>
