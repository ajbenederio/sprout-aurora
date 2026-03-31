<script setup>
import { ref, computed } from 'vue'
import { useNav } from '@/composables/useNav.js'
import BulkUploadModal from './BulkUploadModal.vue'

// Research anchor: PRD §Design — Bulk Upload visible alongside Add Employee, not buried in settings
// Research anchor: DI-1 — template download is primary CTA; Bulk Upload button prominent in page header
const { navigate } = useNav()

const showBulkUpload = ref(false)
const recentUploadBanner = ref(null) // { committed: number }
const searchQuery = ref('')

function onUploaded({ committed }) {
  recentUploadBanner.value = { committed }
}

const allEmployees = ref([
  { id: 'EMP-0001', name: 'Maria Santos',     dept: 'Operations',  role: 'Operations Manager',  status: 'Active',   hire: 'Jan 15, 2024' },
  { id: 'EMP-0002', name: 'Jose Reyes',        dept: 'Finance',     role: 'Finance Analyst',      status: 'Active',   hire: 'Feb 1, 2024'  },
  { id: 'EMP-0003', name: 'Ana Cruz',          dept: 'HR',          role: 'HR Coordinator',       status: 'Active',   hire: 'Mar 3, 2024'  },
  { id: 'EMP-0004', name: 'Carlo Mendoza',     dept: 'IT',          role: 'IT Specialist',        status: 'Active',   hire: 'Mar 10, 2024' },
  { id: 'EMP-0005', name: 'Liza Ramos',        dept: 'Operations',  role: 'Customer Support',     status: 'On Leave', hire: 'Apr 5, 2023'  },
  { id: 'EMP-0006', name: 'Mark Torres',       dept: 'Sales',       role: 'Sales Executive',      status: 'Active',   hire: 'May 12, 2023' },
  { id: 'EMP-0007', name: 'Grace Villanueva',  dept: 'IT',          role: 'QA Analyst',           status: 'Active',   hire: 'Jun 1, 2023'  },
  { id: 'EMP-0008', name: 'Ben Aquino',        dept: 'Finance',     role: 'Accountant',           status: 'Active',   hire: 'Jul 18, 2023' },
  { id: 'EMP-0009', name: 'Cathy Lim',         dept: 'Sales',       role: 'Account Manager',      status: 'Active',   hire: 'Aug 2, 2023'  },
  { id: 'EMP-0010', name: 'Dan Garcia',        dept: 'Operations',  role: 'Logistics Coordinator', status: 'Inactive', hire: 'Sep 14, 2022' },
])

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return allEmployees.value
  return allEmployees.value.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.dept.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q)
  )
})

const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

const statusTone = (s) =>
  s === 'Active' ? 'success' : s === 'On Leave' ? 'caution' : 'neutral'

const activeCount   = computed(() => allEmployees.value.filter(e => e.status === 'Active').length)
const onLeaveCount  = computed(() => allEmployees.value.filter(e => e.status === 'On Leave').length)
const inactiveCount = computed(() => allEmployees.value.filter(e => e.status === 'Inactive').length)
</script>

<template>
  <div class="page">

    <!-- ── Top Nav ──────────────────────────────────────────────────────────── -->
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

      <!-- Page header -->
      <div class="page-header">
        <div class="page-header-left">
          <p class="breadcrumb">Dashboard <span class="breadcrumb-sep">/</span> Employees</p>
          <h1 class="page-title">Employee Hub</h1>
        </div>
        <!-- Research anchor: PRD §Design — "Add Employee" + "Bulk Upload" co-located in page header -->
        <div class="page-header-actions">
          <SprButton tone="neutral" variant="secondary" size="medium">
            + Add Employee
          </SprButton>
          <SprButton tone="success" variant="primary" size="medium" @click="showBulkUpload = true">
            ↑ Bulk Upload
          </SprButton>
        </div>
      </div>

      <!-- Post-upload success banner -->
      <!-- Research anchor: Success Summary — confirms committed count in context (FP-1) -->
      <div v-if="recentUploadBanner" class="upload-banner">
        <span class="banner-check">✓</span>
        <span class="banner-text">
          <strong>{{ recentUploadBanner.committed }} employees</strong> added via bulk upload and committed to Sprout HR.
        </span>
        <button class="banner-dismiss" @click="recentUploadBanner = null">✕</button>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" style="flex:1">
          <template #content>
            <div class="stat-cell">
              <span class="stat-label">Total Employees</span>
              <span class="stat-value">{{ allEmployees.length }}</span>
            </div>
          </template>
        </SprCard>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" style="flex:1">
          <template #content>
            <div class="stat-cell">
              <span class="stat-label">Active</span>
              <span class="stat-value stat-value--green">{{ activeCount }}</span>
            </div>
          </template>
        </SprCard>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" style="flex:1">
          <template #content>
            <div class="stat-cell">
              <span class="stat-label">On Leave</span>
              <span class="stat-value stat-value--amber">{{ onLeaveCount }}</span>
            </div>
          </template>
        </SprCard>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" style="flex:1">
          <template #content>
            <div class="stat-cell">
              <span class="stat-label">Inactive</span>
              <span class="stat-value stat-value--gray">{{ inactiveCount }}</span>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Employee table card -->
      <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
        <template #content>

          <!-- Table toolbar -->
          <div class="table-toolbar">
            <div class="search-wrap">
              <span class="search-icon">🔍</span>
              <input
                v-model="searchQuery"
                class="search-input"
                placeholder="Search by name, department, or role…"
              />
            </div>
            <div class="toolbar-right">
              <SprLozenge :label="`${filtered.length} results`" tone="neutral" />
            </div>
          </div>

          <!-- Table header -->
          <div class="table-head">
            <div class="col col-emp">Employee</div>
            <div class="col col-dept">Department</div>
            <div class="col col-role">Role</div>
            <div class="col col-hire">Hire Date</div>
            <div class="col col-status">Status</div>
          </div>

          <!-- Table rows -->
          <div
            v-for="(emp, i) in filtered"
            :key="emp.id"
            class="table-row"
            :class="{ 'table-row--last': i === filtered.length - 1 }"
          >
            <div class="col col-emp">
              <div class="emp-cell">
                <div class="emp-avatar">{{ initials(emp.name) }}</div>
                <div class="emp-info">
                  <span class="emp-name">{{ emp.name }}</span>
                  <span class="emp-id">{{ emp.id }}</span>
                </div>
              </div>
            </div>
            <div class="col col-dept">{{ emp.dept }}</div>
            <div class="col col-role">{{ emp.role }}</div>
            <div class="col col-hire">{{ emp.hire }}</div>
            <div class="col col-status">
              <SprLozenge :label="emp.status" :tone="statusTone(emp.status)" :fill="emp.status === 'Active'" />
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filtered.length === 0" class="empty-state">
            <p>No employees match your search.</p>
          </div>

        </template>
      </SprCard>

    </main>

    <!-- Bulk Upload Modal -->
    <BulkUploadModal v-model="showBulkUpload" @uploaded="onUploaded" />

  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f1f2f3;
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
}

/* ── Top Nav ── */
.topnav {
  height: 60px;
  background: #00291b;
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
  color: #dcfce6;
  letter-spacing: -0.5px;
}

.logo-hr {
  font-size: 11px;
  font-weight: 600;
  color: #86efa8;
  letter-spacing: 0.04em;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-link {
  font-size: 14px;
  color: #86efa8;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s;
}

.nav-link:hover { opacity: 1; }

.nav-link--active {
  color: #fff;
  opacity: 1;
  font-weight: 500;
  border-bottom: 2px solid #4ade7b;
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
  background: #158039;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name { font-size: 13px; color: #dcfce6; }
.user-caret { font-size: 10px; color: #86efa8; }

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
  color: #5d6c6b;
  margin-bottom: 4px;
}

.breadcrumb-sep { margin: 0 4px; color: #b8c1c0; }

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #00291b;
}

.page-header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* ── Upload Banner ── */
.upload-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #86efa8;
  border-radius: 10px;
  padding: 12px 16px;
}

.banner-check {
  color: #158039;
  font-size: 16px;
  flex-shrink: 0;
}

.banner-text { font-size: 14px; color: #14532b; flex: 1; }

.banner-dismiss {
  background: none;
  border: none;
  font-size: 13px;
  color: #5d6c6b;
  cursor: pointer;
  padding: 2px 4px;
}

/* ── Stats Row ── */
.stats-row {
  display: flex;
  gap: 16px;
}

.stat-cell {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #00291b;
  line-height: 1.1;
}

.stat-value--green { color: #158039; }
.stat-value--amber { color: #b45309; }
.stat-value--gray  { color: #738482; }

/* ── Table ── */
.table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid #e6eaea;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f2f3;
  border: 1px solid #d9dede;
  border-radius: 8px;
  padding: 7px 12px;
  width: 320px;
}

.search-icon { font-size: 13px; color: #5d6c6b; }

.search-input {
  border: none;
  background: none;
  font-size: 14px;
  font-family: 'Rubik', system-ui, sans-serif;
  color: #262b2b;
  outline: none;
  width: 100%;
}

.search-input::placeholder { color: #919f9d; }

.toolbar-right { display: flex; align-items: center; gap: 8px; }

.table-head {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e6eaea;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f1f2f3;
  transition: background 0.1s;
}

.table-row:hover { background: #fafafa; }
.table-row--last { border-bottom: none; }

.col { display: flex; align-items: center; }
.col-emp    { flex: 2.5; }
.col-dept   { flex: 1.5; font-size: 14px; color: #5d6c6b; }
.col-role   { flex: 2;   font-size: 14px; color: #5d6c6b; }
.col-hire   { flex: 1.5; font-size: 14px; color: #5d6c6b; }
.col-status { flex: 1; }

.table-head .col {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
}

.emp-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.emp-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #00291b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.emp-info { display: flex; flex-direction: column; gap: 2px; }
.emp-name { font-size: 14px; font-weight: 600; color: #00291b; }
.emp-id   { font-size: 11px; color: #5d6c6b; }

.empty-state {
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #5d6c6b;
}
</style>
