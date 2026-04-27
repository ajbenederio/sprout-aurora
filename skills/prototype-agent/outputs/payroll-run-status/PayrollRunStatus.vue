<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PayrollBatch {
  id:          number
  name:        string
  period:      string
  employees:   number
  amount:      number
  runDate:     string
  status:      string
  _name:       { title: string }
  _period:     { title: string }
  _employees:  { title: string }
  _amount:     { title: string }
  _runDate:    { title: string }
  _status:     { title: string }
}

function batch(
  id: number, name: string, period: string,
  employees: number, amount: number, runDate: string, status: string
): PayrollBatch {
  return {
    id, name, period, employees, amount, runDate, status,
    _name:      { title: name },
    _period:    { title: period },
    _employees: { title: `${employees} employees` },
    _amount:    { title: `₱${amount.toLocaleString()}` },
    _runDate:   { title: runDate },
    _status:    { title: status },
  }
}

// ─── Payroll batch seed data ──────────────────────────────────────────────────
const allBatches = ref<PayrollBatch[]>([
  batch(1, 'Regular Payroll',       'Jan 2026', 142, 3_240_500, 'Jan 15, 2026', 'Completed'),
  batch(2, 'Regular Payroll',       'Feb 2026', 144, 3_290_000, 'Feb 15, 2026', 'Completed'),
  batch(3, 'Regular Payroll',       'Mar 2026', 144, 3_310_800, 'Mar 15, 2026', 'Completed'),
  batch(4, '13th Month Pay',        'Mar 2026', 138, 8_450_000, 'Mar 31, 2026', 'Completed'),
  batch(5, 'Off-cycle Adjustment',  'Mar 2026',   3,    24_600, 'Mar 20, 2026', 'Failed'),
  batch(6, 'Regular Payroll',       'Apr 2026', 145, 3_315_200, 'Apr 15, 2026', 'Completed'),
  batch(7, 'Regular Payroll',       'Apr 2026', 145, 3_315_200, 'Apr 30, 2026', 'Processing'),
  batch(8, 'Supplemental Payroll',  'Apr 2026',  12,   180_400, 'Apr 30, 2026', 'Pending'),
])

// ─── Demo: simulate zero-data empty state ─────────────────────────────────────
const simulateEmpty = ref(false)
const visibleBatches = computed(() => simulateEmpty.value ? [] : allBatches.value)

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_name',      name: 'Batch Name',      sort: true  },
  { field: '_period',    name: 'Pay Period',       sort: true  },
  { field: '_employees', name: 'Employees',        sort: false },
  { field: '_amount',    name: 'Total Amount',     sort: false },
  { field: '_runDate',   name: 'Run Date',         sort: true  },
  { field: '_status',    name: 'Status'                        },
])

// ─── Filter state ─────────────────────────────────────────────────────────────
const statusFilter = ref('')
const periodFilter = ref('')

const statusOptions = ['Completed', 'Processing', 'Pending', 'Failed']
const periodOptions = ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026']

// Reset to page 1 when filters change
watch([statusFilter, periodFilter], () => { currentPage.value = 1 })

// ─── Filtered + paged data ────────────────────────────────────────────────────
const filtered = computed(() => {
  return visibleBatches.value.filter(b => {
    const matchStatus = !statusFilter.value || b.status === statusFilter.value
    const matchPeriod = !periodFilter.value || b.period === periodFilter.value
    return matchStatus && matchPeriod
  })
})

const hasActiveFilters = computed(() => !!statusFilter.value || !!periodFilter.value)

function clearFilters() {
  statusFilter.value = ''
  periodFilter.value = ''
}

// ─── Pagination ───────────────────────────────────────────────────────────────
const rowCount    = ref(10)
const currentPage = ref(1)
const totalItems  = computed(() => filtered.value.length)

const dropdownOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
]

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * rowCount.value
  return filtered.value.slice(start, start + rowCount.value)
})

// ─── Summary stats ────────────────────────────────────────────────────────────
const stats = computed(() => ({
  completed:  allBatches.value.filter(b => b.status === 'Completed').length,
  processing: allBatches.value.filter(b => b.status === 'Processing').length,
  pending:    allBatches.value.filter(b => b.status === 'Pending').length,
  failed:     allBatches.value.filter(b => b.status === 'Failed').length,
}))

// ─── Status lozenge helpers ───────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Completed')  return 'success'
  if (status === 'Processing') return 'information'
  if (status === 'Pending')    return 'caution'
  if (status === 'Failed')     return 'danger'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Completed'
}
</script>

<template>
  <div class="pr-page">

    <!-- ── Page header ───────────────────────────────────────────────────────── -->
    <div class="pr-header">
      <div class="pr-header__eyebrow">Payroll</div>
      <div class="pr-header__row">
        <div>
          <h1 class="pr-header__title">Payroll Run Status</h1>
          <p class="pr-header__subtitle">Monitor and review all payroll batch runs.</p>
        </div>
        <!-- Demo toggle for empty state testing -->
        <spr-button
          variant="secondary"
          size="small"
          @click="simulateEmpty = !simulateEmpty"
        >
          {{ simulateEmpty ? 'Show batches' : 'Demo: empty state' }}
        </spr-button>
      </div>
    </div>

    <!-- ── Summary stat tiles ────────────────────────────────────────────────── -->
    <div v-if="!simulateEmpty" class="pr-stats">
      <div class="pr-stat pr-stat--completed">
        <span class="pr-stat__count">{{ stats.completed }}</span>
        <span class="pr-stat__label">Completed</span>
      </div>
      <div class="pr-stat pr-stat--processing">
        <span class="pr-stat__count">{{ stats.processing }}</span>
        <span class="pr-stat__label">Processing</span>
      </div>
      <div class="pr-stat pr-stat--pending">
        <span class="pr-stat__count">{{ stats.pending }}</span>
        <span class="pr-stat__label">Pending</span>
      </div>
      <div class="pr-stat pr-stat--failed">
        <span class="pr-stat__count">{{ stats.failed }}</span>
        <span class="pr-stat__label">Failed</span>
      </div>
    </div>

    <!-- ── Zero-data empty state ─────────────────────────────────────────────── -->
    <div v-if="simulateEmpty" class="pr-empty-wrap">
      <spr-empty-state
        description="No payroll batches yet"
        subDescription="Payroll runs will appear here once a batch has been initiated."
        image="dashboard"
        size="large"
      >
        <template #button>
          <spr-button variant="primary" tone="success">
            Run payroll
          </spr-button>
        </template>
      </spr-empty-state>
    </div>

    <!-- ── Filter bar + table (shown when batches exist) ─────────────────────── -->
    <template v-else>

      <!-- Filter bar -->
      <div class="pr-filters">
        <div class="pr-filters__selects">
          <spr-select
            id="status-filter"
            v-model="statusFilter"
            :options="statusOptions"
            label=""
            placeholder="All statuses"
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

        <div class="pr-filters__right">
          <!-- Result count -->
          <span class="pr-filters__count">
            {{ totalItems }} batch{{ totalItems !== 1 ? 'es' : '' }}
          </span>
          <!-- Clear filters — only shown when a filter is active -->
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

      <!-- Payroll batch table -->
      <div class="pr-table-wrap">
        <spr-table
          :headers="headers"
          :dataTable="pagedData"
          :emptyState="{
            description: 'No batches match your filters',
            subDescription: 'Try a different status or pay period.',
            image: 'list',
            size: 'large',
          }"
        >
          <!-- Status column — lozenge per batch state -->
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

    </template>

  </div>
</template>

<style scoped>
.pr-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.pr-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.pr-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.pr-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.pr-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Stat tiles ──────────────────────────────────────────────────────────── */
.pr-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.pr-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.pr-stat__count {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.pr-stat__label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pr-stat--completed  { background: #f0fdf4; border-color: #bbf7d0; }
.pr-stat--completed  .pr-stat__count { color: #14532b; }
.pr-stat--completed  .pr-stat__label { color: #16a34a; }

.pr-stat--processing { background: #eff6ff; border-color: #bfdbfe; }
.pr-stat--processing .pr-stat__count { color: #1e3a5f; }
.pr-stat--processing .pr-stat__label { color: #2563eb; }

.pr-stat--pending    { background: #fffbeb; border-color: #fde68a; }
.pr-stat--pending    .pr-stat__count { color: #78350f; }
.pr-stat--pending    .pr-stat__label { color: #d97706; }

.pr-stat--failed     { background: #fef2f2; border-color: #fecaca; }
.pr-stat--failed     .pr-stat__count { color: #7f1d1d; }
.pr-stat--failed     .pr-stat__label { color: #dc2626; }

/* ── Filter bar ──────────────────────────────────────────────────────────── */
.pr-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pr-filters__selects {
  display: flex;
  gap: 12px;
}

.pr-filters__selects > * {
  width: 180px;
}

.pr-filters__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pr-filters__count {
  font-size: 13px;
  color: #5d6c6b;
}

/* ── Table ───────────────────────────────────────────────────────────────── */
.pr-table-wrap {
  height: 520px;
  width: 100%;
}

/* ── Empty state wrapper ─────────────────────────────────────────────────── */
.pr-empty-wrap {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}
</style>
