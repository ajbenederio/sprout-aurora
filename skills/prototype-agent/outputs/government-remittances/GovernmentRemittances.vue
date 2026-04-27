<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface RemittanceRecord {
  id:            number
  agency:        string
  period:        string
  employeeShare: number
  employerShare: number
  total:         number
  dueDate:       string
  status:        string
  // { title } shapes for spr-table
  _agency:        { title: string }
  _period:        { title: string }
  _employeeShare: { title: string }
  _employerShare: { title: string }
  _total:         { title: string }
  _dueDate:       { title: string }
  _status:        { title: string }
}

function peso(n: number): string {
  return n > 0 ? `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}` : '—'
}

function rec(
  id: number, agency: string, period: string,
  empShare: number, erShare: number, dueDate: string, status: string
): RemittanceRecord {
  const total = empShare + erShare
  return {
    id, agency, period,
    employeeShare: empShare, employerShare: erShare, total,
    dueDate, status,
    _agency:        { title: agency },
    _period:        { title: period },
    _employeeShare: { title: peso(empShare) },
    _employerShare: { title: peso(erShare)  },
    _total:         { title: peso(total)    },
    _dueDate:       { title: dueDate        },
    _status:        { title: status         },
  }
}

// ─── Seed data: 4 agencies × 4 periods ───────────────────────────────────────
// SSS: employee + employer share
// PhilHealth: equal split
// Pag-IBIG: equal split; Mar overdue to demonstrate danger state
// BIR (1601-C withholding tax): employer-side only, no employee share
const allRecords = ref<RemittanceRecord[]>([
  rec(1,  'SSS',       'Jan 2026', 81_382,  169_218, 'Jan 31, 2026', 'Filed'),
  rec(2,  'SSS',       'Feb 2026', 81_382,  169_218, 'Feb 28, 2026', 'Filed'),
  rec(3,  'SSS',       'Mar 2026', 81_382,  169_218, 'Mar 31, 2026', 'Filed'),
  rec(4,  'SSS',       'Apr 2026', 82_040,  170_460, 'Apr 30, 2026', 'Processing'),
  rec(5,  'PhilHealth','Jan 2026', 70_000,   70_000, 'Jan 20, 2026', 'Filed'),
  rec(6,  'PhilHealth','Feb 2026', 70_000,   70_000, 'Feb 20, 2026', 'Filed'),
  rec(7,  'PhilHealth','Mar 2026', 70_000,   70_000, 'Mar 20, 2026', 'Filed'),
  rec(8,  'PhilHealth','Apr 2026', 72_500,   72_500, 'Apr 20, 2026', 'Pending'),
  rec(9,  'Pag-IBIG',  'Jan 2026', 14_000,   14_000, 'Jan 15, 2026', 'Filed'),
  rec(10, 'Pag-IBIG',  'Feb 2026', 14_000,   14_000, 'Feb 15, 2026', 'Filed'),
  rec(11, 'Pag-IBIG',  'Mar 2026', 14_000,   14_000, 'Mar 15, 2026', 'Overdue'),
  rec(12, 'Pag-IBIG',  'Apr 2026', 14_500,   14_500, 'Apr 15, 2026', 'Pending'),
  rec(13, 'BIR',       'Jan 2026',      0,  185_400, 'Jan 10, 2026', 'Filed'),
  rec(14, 'BIR',       'Feb 2026',      0,  192_800, 'Feb 10, 2026', 'Filed'),
  rec(15, 'BIR',       'Mar 2026',      0,  198_500, 'Mar 10, 2026', 'Filed'),
  rec(16, 'BIR',       'Apr 2026',      0,  204_100, 'Apr 10, 2026', 'Pending'),
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_agency',        name: 'Agency',          sort: true  },
  { field: '_period',        name: 'Period',           sort: true  },
  { field: '_employeeShare', name: 'Employee Share',   sort: false },
  { field: '_employerShare', name: 'Employer Share',   sort: false },
  { field: '_total',         name: 'Total',            sort: false },
  { field: '_dueDate',       name: 'Due Date',         sort: false },
  { field: '_status',        name: 'Status'                        },
])

// ─── Filter state ─────────────────────────────────────────────────────────────
const agencyFilter = ref('')
const periodFilter = ref('')

const agencyOptions = ['SSS', 'PhilHealth', 'Pag-IBIG', 'BIR']
const periodOptions = ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026']

const hasActiveFilters = computed(() => !!agencyFilter.value || !!periodFilter.value)

function clearFilters() {
  agencyFilter.value = ''
  periodFilter.value = ''
}

// Reset page on filter change
watch([agencyFilter, periodFilter], () => { currentPage.value = 1 })

// ─── Filtered + paged data ────────────────────────────────────────────────────
const filtered = computed(() =>
  allRecords.value.filter(r => {
    const matchAgency = !agencyFilter.value || r.agency  === agencyFilter.value
    const matchPeriod = !periodFilter.value || r.period  === periodFilter.value
    return matchAgency && matchPeriod
  })
)

const totalItems = computed(() => filtered.value.length)

// ─── Pagination ───────────────────────────────────────────────────────────────
const rowCount    = ref(10)
const currentPage = ref(1)

const dropdownOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
]

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * rowCount.value
  return filtered.value.slice(start, start + rowCount.value)
})

// ─── Overdue alert — show when filtered view contains overdue items ────────────
const hasOverdue = computed(() => filtered.value.some(r => r.status === 'Overdue'))

// ─── Summary: total filed amount in current filtered set ─────────────────────
const filedTotal = computed(() =>
  filtered.value
    .filter(r => r.status === 'Filed')
    .reduce((sum, r) => sum + r.total, 0)
)

// ─── Status lozenge helpers ───────────────────────────────────────────────────
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
</script>

<template>
  <div class="gr-page">

    <!-- ── Page header ───────────────────────────────────────────────────────── -->
    <div class="gr-header">
      <div class="gr-header__eyebrow">Payroll · Compliance</div>
      <h1 class="gr-header__title">Government Remittances</h1>
      <p class="gr-header__subtitle">
        Track SSS, PhilHealth, Pag-IBIG, and BIR contribution filings by period.
      </p>
    </div>

    <!-- ── Overdue alert banner ───────────────────────────────────────────────── -->
    <div v-if="hasOverdue" class="gr-overdue-banner">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="gr-overdue-banner__icon">
        <circle cx="8" cy="8" r="7.25" stroke="#dc2626" stroke-width="1.5"/>
        <path d="M8 5v3.5" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="8" cy="11" r="0.75" fill="#dc2626"/>
      </svg>
      One or more remittances in this view are overdue. File immediately to avoid penalties.
    </div>

    <!-- ── Filter bar ────────────────────────────────────────────────────────── -->
    <div class="gr-filters">
      <div class="gr-filters__selects">
        <spr-select
          id="agency-filter"
          v-model="agencyFilter"
          :options="agencyOptions"
          label=""
          placeholder="All agencies"
          :clearable="true"
        />
        <spr-select
          id="period-filter"
          v-model="periodFilter"
          :options="periodOptions"
          label=""
          placeholder="All periods"
          :clearable="true"
        />
      </div>

      <div class="gr-filters__right">
        <span class="gr-filters__count">
          {{ totalItems }} record{{ totalItems !== 1 ? 's' : '' }}
          <template v-if="filedTotal > 0">
            · <span class="gr-filters__total">
                ₱{{ filedTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }} filed
              </span>
          </template>
        </span>
        <spr-button
          v-if="hasActiveFilters"
          variant="tertiary"
          size="small"
          @click="clearFilters"
        >
          Clear filters
        </spr-button>
      </div>
    </div>

    <!-- ── Remittance table ──────────────────────────────────────────────────── -->
    <div class="gr-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="pagedData"
        :emptyState="{
          description: 'No remittance records match your filters',
          subDescription: 'Try selecting a different agency or period.',
          image: 'list',
          size: 'large',
        }"
      >
        <!-- Status column — lozenge per filing state -->
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
.gr-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.gr-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
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

/* ── Overdue banner ──────────────────────────────────────────────────────── */
.gr-overdue-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #7f1d1d;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 10px 14px;
}

.gr-overdue-banner__icon {
  flex-shrink: 0;
}

/* ── Filter bar ──────────────────────────────────────────────────────────── */
.gr-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.gr-filters__selects {
  display: flex;
  gap: 12px;
}

.gr-filters__selects > * {
  width: 180px;
}

.gr-filters__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gr-filters__count {
  font-size: 13px;
  color: #5d6c6b;
}

.gr-filters__total {
  color: #158039;
  font-weight: 600;
}

/* ── Table ───────────────────────────────────────────────────────────────── */
.gr-table-wrap {
  height: 540px;
  width: 100%;
}
</style>
