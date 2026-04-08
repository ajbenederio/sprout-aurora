<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Batch data ──────────────────────────────────────────────────────────────
const allBatches = [
  { id: 1,  batchName: { title: 'April 2026 — Regular'          }, payPeriod: { title: 'Apr 1–30, 2026'   }, employees: { title: '142'         }, totalNetPay: { title: '₱ 4,218,500.00' }, status: { title: 'Completed'          }, runDate: { title: 'Apr 5, 2026'  } },
  { id: 2,  batchName: { title: 'April 2026 — Probationary'     }, payPeriod: { title: 'Apr 1–30, 2026'   }, employees: { title: '23'          }, totalNetPay: { title: '₱ 412,300.00'   }, status: { title: 'Processing'        }, runDate: { title: 'Apr 8, 2026'  } },
  { id: 3,  batchName: { title: 'April 2026 — Contractual'      }, payPeriod: { title: 'Apr 1–30, 2026'   }, employees: { title: '8'           }, totalNetPay: { title: '₱ 96,000.00'    }, status: { title: 'Pending Approval'  }, runDate: { title: 'Apr 8, 2026'  } },
  { id: 4,  batchName: { title: 'March 2026 — Regular'          }, payPeriod: { title: 'Mar 1–31, 2026'   }, employees: { title: '139'         }, totalNetPay: { title: '₱ 4,105,750.00' }, status: { title: 'Completed'          }, runDate: { title: 'Mar 5, 2026'  } },
  { id: 5,  batchName: { title: 'March 2026 — Probationary'     }, payPeriod: { title: 'Mar 1–31, 2026'   }, employees: { title: '19'          }, totalNetPay: { title: '₱ 342,000.00'   }, status: { title: 'Completed'          }, runDate: { title: 'Mar 5, 2026'  } },
  { id: 6,  batchName: { title: 'March 2026 — Contractual'      }, payPeriod: { title: 'Mar 1–31, 2026'   }, employees: { title: '5'           }, totalNetPay: { title: '₱ 60,000.00'    }, status: { title: 'Failed'             }, runDate: { title: 'Mar 6, 2026'  } },
  { id: 7,  batchName: { title: 'February 2026 — Regular'       }, payPeriod: { title: 'Feb 1–28, 2026'   }, employees: { title: '138'         }, totalNetPay: { title: '₱ 4,088,200.00' }, status: { title: 'Completed'          }, runDate: { title: 'Feb 5, 2026'  } },
  { id: 8,  batchName: { title: 'February 2026 — Probationary'  }, payPeriod: { title: 'Feb 1–28, 2026'   }, employees: { title: '21'          }, totalNetPay: { title: '₱ 378,000.00'   }, status: { title: 'Completed'          }, runDate: { title: 'Feb 5, 2026'  } },
  { id: 9,  batchName: { title: 'April 2026 — 13th Month Draft' }, payPeriod: { title: 'Apr 1–30, 2026'   }, employees: { title: '165'         }, totalNetPay: { title: '—'              }, status: { title: 'Draft'              }, runDate: { title: '—'            } },
  { id: 10, batchName: { title: 'January 2026 — Regular'        }, payPeriod: { title: 'Jan 1–31, 2026'   }, employees: { title: '135'         }, totalNetPay: { title: '₱ 3,996,500.00' }, status: { title: 'Completed'          }, runDate: { title: 'Jan 5, 2026'  } },
]

// ─── Headers ─────────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: 'batchName',   name: 'Batch Name',        sort: true  },
  { field: 'payPeriod',   name: 'Pay Period',         sort: true  },
  { field: 'employees',   name: 'Employees',          sort: false },
  { field: 'totalNetPay', name: 'Total Net Pay',      sort: false },
  { field: 'status',      name: 'Status'                          },
  { field: 'runDate',     name: 'Run Date',           sort: true  },
])

// ─── Filter state ─────────────────────────────────────────────────────────────
const statusFilter    = ref('')
const periodFilter    = ref('')
const searchQuery     = ref('')

const statusOptions = [
  { text: 'All Statuses',      value: '' },
  { text: 'Draft',             value: 'Draft' },
  { text: 'Pending Approval',  value: 'Pending Approval' },
  { text: 'Processing',        value: 'Processing' },
  { text: 'Completed',         value: 'Completed' },
  { text: 'Failed',            value: 'Failed' },
]

const periodOptions = [
  { text: 'All Periods',       value: '' },
  { text: 'April 2026',        value: 'Apr' },
  { text: 'March 2026',        value: 'Mar' },
  { text: 'February 2026',     value: 'Feb' },
  { text: 'January 2026',      value: 'Jan' },
]

function clearFilters() {
  statusFilter.value = ''
  periodFilter.value = ''
  searchQuery.value  = ''
}

const hasActiveFilters = computed(() =>
  !!statusFilter.value || !!periodFilter.value || !!searchQuery.value.trim()
)

// ─── Demo: toggle empty state ─────────────────────────────────────────────────
const forceEmpty = ref(false)

// ─── Filtered data ────────────────────────────────────────────────────────────
const filteredBatches = computed(() => {
  if (forceEmpty.value) return []

  return allBatches.filter(b => {
    const matchStatus = !statusFilter.value || b.status.title === statusFilter.value
    const matchPeriod = !periodFilter.value || b.payPeriod.title.startsWith(periodFilter.value)
    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch = !q || b.batchName.title.toLowerCase().includes(q)
    return matchStatus && matchPeriod && matchSearch
  })
})

const hasNoBatches = computed(() => forceEmpty.value)

// ─── Status lozenge ───────────────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Completed')        return 'success'
  if (status === 'Processing')       return 'information'
  if (status === 'Pending Approval') return 'caution'
  if (status === 'Failed')           return 'danger'
  return 'neutral' // Draft
}

function statusFill(status: string): boolean {
  return status === 'Completed'
}
</script>

<template>
  <div class="pr-page">

    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="pr-header">
      <div class="pr-header__eyebrow">Payroll</div>
      <div class="pr-header__row">
        <div>
          <h1 class="pr-header__title">Payroll Runs</h1>
          <p class="pr-header__subtitle">Track and manage payroll batch processing status.</p>
        </div>
        <div class="pr-header__actions">
          <!-- Demo toggle: simulate no batches -->
          <spr-button variant="secondary" @click="forceEmpty = !forceEmpty">
            {{ forceEmpty ? 'Show batches' : 'Demo empty state' }}
          </spr-button>
          <spr-button variant="primary" tone="success" :disabled="forceEmpty">
            New payroll run
          </spr-button>
        </div>
      </div>
    </div>

    <!-- ── Empty state — no batches exist ───────────────────────────────── -->
    <div v-if="hasNoBatches" class="pr-empty-wrap">
      <spr-empty-state
        description="No payroll runs yet"
        subDescription="Start your first payroll run to process employee salaries and generate payslips."
        image="dashboard"
        size="large"
      >
        <template #button>
          <spr-button tone="success" @click="forceEmpty = false">
            Create first payroll run
          </spr-button>
        </template>
      </spr-empty-state>
    </div>

    <!-- ── Filter bar + table ────────────────────────────────────────────── -->
    <template v-else>

      <!-- Filter bar -->
      <div class="pr-filters">
        <div class="pr-filters__inputs">
          <!-- Search — spr-table built-in handles this via tableActions -->
          <spr-input
            id="payroll-search"
            v-model="searchQuery"
            placeholder="Search batch name..."
            class="pr-filters__search"
          />

          <!-- Status filter — spr-select (spr-filter is always-open panel, wrong shape) -->
          <spr-select
            id="status-filter"
            v-model="statusFilter"
            :options="statusOptions"
            textField="text"
            valueField="value"
            label=""
            placeholder="Status"
            class="pr-filters__select"
          />

          <!-- Period filter -->
          <spr-select
            id="period-filter"
            v-model="periodFilter"
            :options="periodOptions"
            textField="text"
            valueField="value"
            label=""
            placeholder="Pay period"
            class="pr-filters__select"
          />
        </div>

        <!-- Active filter chips + clear -->
        <div v-if="hasActiveFilters" class="pr-filters__active">
          <span class="pr-filters__active-label">Filtered:</span>
          <span v-if="statusFilter" class="pr-filters__chip">{{ statusFilter }}</span>
          <span v-if="periodFilter" class="pr-filters__chip">{{ periodOptions.find(o => o.value === periodFilter)?.text }}</span>
          <span v-if="searchQuery.trim()" class="pr-filters__chip">"{{ searchQuery.trim() }}"</span>
          <button class="pr-filters__clear" @click="clearFilters">Clear all</button>
        </div>
      </div>

      <!-- Table — height wrapper required -->
      <div class="pr-table-wrap">
        <spr-table
          :headers="headers"
          :dataTable="filteredBatches"
          :emptyState="{
            description: 'No matching payroll runs',
            subDescription: 'Try adjusting your filters or search term.',
            image: 'list',
            size: 'large',
          }"
        >
          <!-- Status column — lozenge -->
          <template #status="{ row }">
            <spr-lozenge
              :label="(row.status as any).title"
              :tone="statusTone((row.status as any).title)"
              :fill="statusFill((row.status as any).title)"
            />
          </template>
        </spr-table>
      </div>

    </template>
  </div>
</template>

<style scoped>
.pr-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
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

.pr-header__actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}

/* ── Empty state ────────────────────────────────────────────────────────── */
.pr-empty-wrap {
  background: #fff;
  border: 1px solid #d9dede;
  border-radius: 8px;
  padding: 60px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Filter bar ─────────────────────────────────────────────────────────── */
.pr-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pr-filters__inputs {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.pr-filters__search {
  flex: 1;
  min-width: 0;
}

.pr-filters__select {
  width: 180px;
  flex-shrink: 0;
}

/* Active filter chips */
.pr-filters__active {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pr-filters__active-label {
  font-size: 12px;
  color: #5d6c6b;
  font-weight: 500;
}

.pr-filters__chip {
  font-size: 12px;
  background: #dcfce6; /* kangkong-100 */
  color: #14532b;      /* kangkong-900 */
  border-radius: 100px;
  padding: 2px 10px;
  font-weight: 500;
}

.pr-filters__clear {
  font-size: 12px;
  color: #da2f38;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  font-weight: 500;
  text-decoration: underline;
}

.pr-filters__clear:hover {
  color: #b61f27;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.pr-table-wrap {
  height: 580px;
  width: 100%;
}
</style>
