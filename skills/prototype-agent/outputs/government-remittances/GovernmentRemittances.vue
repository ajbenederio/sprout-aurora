<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Remittance records ───────────────────────────────────────────────────────
const allRecords = [
  { id:  1, type: 'SSS',       period: 'January 2026',   periodKey: 'Jan', employeeShare: '₱ 800.00',    employerShare: '₱ 1,900.00',  total: '₱ 2,700.00',   dueDate: 'Jan 31, 2026', filedDate: 'Jan 28, 2026', referenceNo: 'SSS-2601-0081', status: 'Filed'      },
  { id:  2, type: 'SSS',       period: 'February 2026',  periodKey: 'Feb', employeeShare: '₱ 800.00',    employerShare: '₱ 1,900.00',  total: '₱ 2,700.00',   dueDate: 'Feb 28, 2026', filedDate: 'Feb 25, 2026', referenceNo: 'SSS-2602-0094', status: 'Filed'      },
  { id:  3, type: 'SSS',       period: 'March 2026',     periodKey: 'Mar', employeeShare: '₱ 800.00',    employerShare: '₱ 1,900.00',  total: '₱ 2,700.00',   dueDate: 'Mar 31, 2026', filedDate: 'Mar 27, 2026', referenceNo: 'SSS-2603-0112', status: 'Filed'      },
  { id:  4, type: 'SSS',       period: 'April 2026',     periodKey: 'Apr', employeeShare: '₱ 800.00',    employerShare: '₱ 1,900.00',  total: '₱ 2,700.00',   dueDate: 'Apr 30, 2026', filedDate: '—',             referenceNo: '—',             status: 'Pending'    },
  { id:  5, type: 'PhilHealth', period: 'January 2026',  periodKey: 'Jan', employeeShare: '₱ 550.00',    employerShare: '₱ 550.00',    total: '₱ 1,100.00',   dueDate: 'Jan 15, 2026', filedDate: 'Jan 12, 2026', referenceNo: 'PH-2601-0041',  status: 'Filed'      },
  { id:  6, type: 'PhilHealth', period: 'February 2026', periodKey: 'Feb', employeeShare: '₱ 550.00',    employerShare: '₱ 550.00',    total: '₱ 1,100.00',   dueDate: 'Feb 15, 2026', filedDate: 'Feb 14, 2026', referenceNo: 'PH-2602-0058',  status: 'Filed'      },
  { id:  7, type: 'PhilHealth', period: 'March 2026',    periodKey: 'Mar', employeeShare: '₱ 550.00',    employerShare: '₱ 550.00',    total: '₱ 1,100.00',   dueDate: 'Mar 15, 2026', filedDate: 'Mar 13, 2026', referenceNo: 'PH-2603-0072',  status: 'Filed'      },
  { id:  8, type: 'PhilHealth', period: 'April 2026',    periodKey: 'Apr', employeeShare: '₱ 550.00',    employerShare: '₱ 550.00',    total: '₱ 1,100.00',   dueDate: 'Apr 15, 2026', filedDate: '—',             referenceNo: '—',             status: 'Processing' },
  { id:  9, type: 'Pag-IBIG',  period: 'January 2026',   periodKey: 'Jan', employeeShare: '₱ 200.00',    employerShare: '₱ 200.00',    total: '₱ 400.00',     dueDate: 'Jan 15, 2026', filedDate: 'Jan 14, 2026', referenceNo: 'HDMF-2601-033', status: 'Filed'      },
  { id: 10, type: 'Pag-IBIG',  period: 'February 2026',  periodKey: 'Feb', employeeShare: '₱ 200.00',    employerShare: '₱ 200.00',    total: '₱ 400.00',     dueDate: 'Feb 15, 2026', filedDate: 'Feb 12, 2026', referenceNo: 'HDMF-2602-044', status: 'Filed'      },
  { id: 11, type: 'Pag-IBIG',  period: 'March 2026',     periodKey: 'Mar', employeeShare: '₱ 200.00',    employerShare: '₱ 200.00',    total: '₱ 400.00',     dueDate: 'Mar 15, 2026', filedDate: '—',             referenceNo: '—',             status: 'Overdue'    },
  { id: 12, type: 'Pag-IBIG',  period: 'April 2026',     periodKey: 'Apr', employeeShare: '₱ 200.00',    employerShare: '₱ 200.00',    total: '₱ 400.00',     dueDate: 'Apr 15, 2026', filedDate: '—',             referenceNo: '—',             status: 'Pending'    },
  { id: 13, type: 'BIR',       period: 'January 2026',   periodKey: 'Jan', employeeShare: '₱ 3,200.00',  employerShare: '—',            total: '₱ 3,200.00',   dueDate: 'Jan 20, 2026', filedDate: 'Jan 17, 2026', referenceNo: 'BIR-2601-1780', status: 'Filed'      },
  { id: 14, type: 'BIR',       period: 'February 2026',  periodKey: 'Feb', employeeShare: '₱ 3,450.00',  employerShare: '—',            total: '₱ 3,450.00',   dueDate: 'Feb 20, 2026', filedDate: 'Feb 18, 2026', referenceNo: 'BIR-2602-1823', status: 'Filed'      },
  { id: 15, type: 'BIR',       period: 'March 2026',     periodKey: 'Mar', employeeShare: '₱ 3,180.00',  employerShare: '—',            total: '₱ 3,180.00',   dueDate: 'Mar 20, 2026', filedDate: '—',             referenceNo: '—',             status: 'Overdue'    },
  { id: 16, type: 'BIR',       period: 'April 2026',     periodKey: 'Apr', employeeShare: '₱ 3,320.00',  employerShare: '—',            total: '₱ 3,320.00',   dueDate: 'Apr 20, 2026', filedDate: '—',             referenceNo: '—',             status: 'Pending'    },
]

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: 'type',          name: 'Contribution Type', sort: true  },
  { field: 'period',        name: 'Period',            sort: true  },
  { field: 'employeeShare', name: 'Employee Share',    sort: false },
  { field: 'employerShare', name: 'Employer Share',    sort: false },
  { field: 'total',         name: 'Total',             sort: false },
  { field: 'dueDate',       name: 'Due Date',          sort: true  },
  { field: 'filedDate',     name: 'Filed Date',        sort: false },
  { field: 'status',        name: 'Status'                         },
])

// ─── Table data — cells must be { title } objects ─────────────────────────────
const tableData = computed(() =>
  filteredRecords.value.map(r => ({
    id:            r.id,
    type:          { title: r.type          },
    period:        { title: r.period        },
    employeeShare: { title: r.employeeShare },
    employerShare: { title: r.employerShare },
    total:         { title: r.total         },
    dueDate:       { title: r.dueDate       },
    filedDate:     { title: r.filedDate     },
    status:        { title: r.status        },
    // keep raw fields for slot rendering
    _type:   r.type,
    _status: r.status,
  }))
)

// ─── Filter state ─────────────────────────────────────────────────────────────
const typeFilter   = ref('')
const periodFilter = ref('')

const typeOptions = [
  { text: 'All Types',   value: ''          },
  { text: 'SSS',         value: 'SSS'       },
  { text: 'PhilHealth',  value: 'PhilHealth'},
  { text: 'Pag-IBIG',   value: 'Pag-IBIG'  },
  { text: 'BIR',         value: 'BIR'       },
]

const periodOptions = [
  { text: 'All Periods',    value: ''    },
  { text: 'April 2026',     value: 'Apr' },
  { text: 'March 2026',     value: 'Mar' },
  { text: 'February 2026',  value: 'Feb' },
  { text: 'January 2026',   value: 'Jan' },
]

function clearFilters() {
  typeFilter.value   = ''
  periodFilter.value = ''
}

const hasActiveFilters = computed(() => !!typeFilter.value || !!periodFilter.value)

// ─── Filtered records ─────────────────────────────────────────────────────────
const filteredRecords = computed(() =>
  allRecords.filter(r => {
    const matchType   = !typeFilter.value   || r.type      === typeFilter.value
    const matchPeriod = !periodFilter.value || r.periodKey === periodFilter.value
    return matchType && matchPeriod
  })
)

// ─── Status summary counts ────────────────────────────────────────────────────
const summary = computed(() => ({
  filed:      allRecords.filter(r => r.status === 'Filed').length,
  pending:    allRecords.filter(r => r.status === 'Pending').length,
  overdue:    allRecords.filter(r => r.status === 'Overdue').length,
  processing: allRecords.filter(r => r.status === 'Processing').length,
}))

// ─── Lozenge helpers ──────────────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Filed')      return 'success'
  if (status === 'Processing') return 'information'
  if (status === 'Pending')    return 'caution'
  if (status === 'Overdue')    return 'danger'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Filed'
}

function typeTone(type: string): string {
  if (type === 'SSS')        return 'information'
  if (type === 'PhilHealth') return 'success'
  if (type === 'Pag-IBIG')   return 'caution'
  if (type === 'BIR')        return 'neutral'
  return 'neutral'
}
</script>

<template>
  <div class="gr-page">

    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="gr-header">
      <div class="gr-header__eyebrow">Payroll</div>
      <div class="gr-header__row">
        <div>
          <h1 class="gr-header__title">Government Remittances</h1>
          <p class="gr-header__subtitle">
            Track SSS, PhilHealth, Pag-IBIG, and BIR contributions and filing status.
          </p>
        </div>
        <spr-button variant="primary" tone="success">File remittance</spr-button>
      </div>
    </div>

    <!-- ── Summary tiles ─────────────────────────────────────────────────── -->
    <div class="gr-summary">
      <div class="gr-summary__tile">
        <span class="gr-summary__count gr-summary__count--filed">{{ summary.filed }}</span>
        <span class="gr-summary__label">Filed</span>
      </div>
      <div class="gr-summary__tile">
        <span class="gr-summary__count gr-summary__count--processing">{{ summary.processing }}</span>
        <span class="gr-summary__label">Processing</span>
      </div>
      <div class="gr-summary__tile">
        <span class="gr-summary__count gr-summary__count--pending">{{ summary.pending }}</span>
        <span class="gr-summary__label">Pending</span>
      </div>
      <div class="gr-summary__tile">
        <span class="gr-summary__count gr-summary__count--overdue">{{ summary.overdue }}</span>
        <span class="gr-summary__label">Overdue</span>
      </div>
    </div>

    <!-- ── Filter bar ────────────────────────────────────────────────────── -->
    <div class="gr-filters">
      <div class="gr-filters__inputs">
        <spr-select
          id="type-filter"
          v-model="typeFilter"
          :options="typeOptions"
          textField="text"
          valueField="value"
          label=""
          placeholder="Contribution type"
          class="gr-filters__select"
        />
        <spr-select
          id="period-filter"
          v-model="periodFilter"
          :options="periodOptions"
          textField="text"
          valueField="value"
          label=""
          placeholder="Period"
          class="gr-filters__select"
        />
        <button
          v-if="hasActiveFilters"
          class="gr-filters__clear"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <!-- Active filter chips -->
      <div v-if="hasActiveFilters" class="gr-filters__chips">
        <span v-if="typeFilter"   class="gr-filters__chip">{{ typeFilter }}</span>
        <span v-if="periodFilter" class="gr-filters__chip">
          {{ periodOptions.find(o => o.value === periodFilter)?.text }}
        </span>
      </div>
    </div>

    <!-- ── Table ─────────────────────────────────────────────────────────── -->
    <div class="gr-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="tableData"
        :emptyState="{
          description: 'No remittance records found',
          subDescription: 'Try adjusting the contribution type or period filter.',
          image: 'list',
          size: 'large',
        }"
      >
        <!-- Contribution type — lozenge -->
        <template #type="{ row }">
          <spr-lozenge
            :label="(row as any)._type"
            :tone="typeTone((row as any)._type)"
          />
        </template>

        <!-- Status — lozenge -->
        <template #status="{ row }">
          <spr-lozenge
            :label="(row as any)._status"
            :tone="statusTone((row as any)._status)"
            :fill="statusFill((row as any)._status)"
          />
        </template>
      </spr-table>
    </div>

  </div>
</template>

<style scoped>
.gr-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.gr-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.gr-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.gr-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.gr-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Summary tiles ──────────────────────────────────────────────────────── */
.gr-summary {
  display: flex;
  gap: 12px;
}

.gr-summary__tile {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid #d9dede;
  background: #fff;
}

.gr-summary__count {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.gr-summary__label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #5d6c6b;
}

.gr-summary__count--filed      { color: #158039; }
.gr-summary__count--processing { color: #0592b5; }
.gr-summary__count--pending    { color: #d97706; }
.gr-summary__count--overdue    { color: #da2f38; }

/* ── Filters ────────────────────────────────────────────────────────────── */
.gr-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gr-filters__inputs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.gr-filters__select {
  width: 220px;
  flex-shrink: 0;
}

.gr-filters__clear {
  font-size: 13px;
  color: #da2f38;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  font-weight: 500;
  text-decoration: underline;
  flex-shrink: 0;
}

.gr-filters__clear:hover { color: #b61f27; }

.gr-filters__chips {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.gr-filters__chip {
  font-size: 12px;
  background: #dcfce6;
  color: #14532b;
  border-radius: 100px;
  padding: 2px 10px;
  font-weight: 500;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.gr-table-wrap {
  height: 600px;
  width: 100%;
}
</style>
