<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Employee info ───────────────────────────────────────────────────────────
const employee = {
  name:           'Angelo Bautista',
  position:       'Sales Executive',
  department:     'Sales',
  employeeId:     'EMP-00210',
  lastWorkingDay: 'April 30, 2026',
  resignationDate:'April 8, 2026',
}

// ─── Clearance table ─────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: 'item',       name: 'Clearance Item', sort: false },
  { field: 'department', name: 'Department',      sort: true  },
  { field: 'assignedTo', name: 'Assigned To',     sort: false },
  { field: 'dueDate',    name: 'Due Date',         sort: true  },
  { field: 'status',     name: 'Status'                        },
])

const clearanceItems = ref([
  {
    id: 1,
    item:       { title: 'Return laptop and accessories'    },
    department: { title: 'IT'                               },
    assignedTo: { title: 'Mark Dela Cruz'                   },
    dueDate:    { title: 'Apr 28, 2026'                     },
    status:     { title: 'Pending'                          },
  },
  {
    id: 2,
    item:       { title: 'Deactivate system accounts'       },
    department: { title: 'IT'                               },
    assignedTo: { title: 'Mark Dela Cruz'                   },
    dueDate:    { title: 'Apr 30, 2026'                     },
    status:     { title: 'Pending'                          },
  },
  {
    id: 3,
    item:       { title: 'Return company ID and access card' },
    department: { title: 'Admin'                            },
    assignedTo: { title: 'Carla Santos'                     },
    dueDate:    { title: 'Apr 28, 2026'                     },
    status:     { title: 'Completed'                        },
  },
  {
    id: 4,
    item:       { title: 'Final pay computation'            },
    department: { title: 'Payroll'                          },
    assignedTo: { title: 'Jennifer Ramos'                   },
    dueDate:    { title: 'May 30, 2026'                     },
    status:     { title: 'In Progress'                      },
  },
  {
    id: 5,
    item:       { title: 'Knowledge transfer documentation' },
    department: { title: 'Sales'                            },
    assignedTo: { title: 'Ronald Mercado'                   },
    dueDate:    { title: 'Apr 25, 2026'                     },
    status:     { title: 'In Progress'                      },
  },
  {
    id: 6,
    item:       { title: 'Department head clearance sign-off'},
    department: { title: 'Sales'                            },
    assignedTo: { title: 'Ronald Mercado'                   },
    dueDate:    { title: 'Apr 29, 2026'                     },
    status:     { title: 'Pending'                          },
  },
  {
    id: 7,
    item:       { title: 'HR clearance form submission'     },
    department: { title: 'Human Resources'                  },
    assignedTo: { title: 'Cristina Palma'                   },
    dueDate:    { title: 'Apr 29, 2026'                     },
    status:     { title: 'Pending'                          },
  },
  {
    id: 8,
    item:       { title: 'Exit interview'                   },
    department: { title: 'Human Resources'                  },
    assignedTo: { title: 'Cristina Palma'                   },
    dueDate:    { title: 'Apr 28, 2026'                     },
    status:     { title: 'Completed'                        },
  },
  {
    id: 9,
    item:       { title: 'Finance expense report clearance' },
    department: { title: 'Finance'                          },
    assignedTo: { title: 'Grace Tan'                        },
    dueDate:    { title: 'Apr 26, 2026'                     },
    status:     { title: 'Not Required'                     },
  },
])

// ─── Status lozenge mapping ──────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Completed')    return 'success'
  if (status === 'In Progress')  return 'information'
  if (status === 'Pending')      return 'caution'
  return 'neutral' // Not Required
}

// ─── Progress summary ────────────────────────────────────────────────────────
const completedCount = computed(() =>
  clearanceItems.value.filter(i => i.status.title === 'Completed' || i.status.title === 'Not Required').length
)
const totalCount = computed(() => clearanceItems.value.length)

// ─── Confirmation modal ──────────────────────────────────────────────────────
const showConfirmModal = ref(false)
const isConfirmed      = ref(false)

function handleConfirm() {
  isConfirmed.value     = true
  showConfirmModal.value = false
}
</script>

<template>
  <div class="ob-page">

    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="ob-header">
      <div class="ob-header__eyebrow">Offboarding</div>
      <div class="ob-header__row">
        <div>
          <h1 class="ob-header__title">{{ employee.name }}</h1>
          <p class="ob-header__meta">
            {{ employee.position }} · {{ employee.department }} · {{ employee.employeeId }}
          </p>
        </div>
        <spr-button
          variant="primary"
          tone="danger"
          :disabled="isConfirmed"
          @click="showConfirmModal = true"
        >
          {{ isConfirmed ? 'Resignation confirmed' : 'Confirm resignation' }}
        </spr-button>
      </div>
    </div>

    <!-- ── Status banner ─────────────────────────────────────────────────── -->
    <div v-if="isConfirmed" class="ob-confirmed-banner">
      <span class="ob-confirmed-banner__icon">✓</span>
      <div>
        <p class="ob-confirmed-banner__title">Resignation confirmed</p>
        <p class="ob-confirmed-banner__desc">
          Last working day is <strong>{{ employee.lastWorkingDay }}</strong>.
          Offboarding is now in progress.
        </p>
      </div>
    </div>

    <!-- ── Key dates card ────────────────────────────────────────────────── -->
    <div class="ob-dates">
      <div class="ob-dates__item">
        <span class="ob-dates__label">Resignation Date</span>
        <span class="ob-dates__value">{{ employee.resignationDate }}</span>
      </div>
      <div class="ob-dates__divider" />
      <div class="ob-dates__item">
        <span class="ob-dates__label">Last Working Day</span>
        <span class="ob-dates__value">{{ employee.lastWorkingDay }}</span>
      </div>
      <div class="ob-dates__divider" />
      <div class="ob-dates__item">
        <span class="ob-dates__label">Clearance Progress</span>
        <span class="ob-dates__value ob-dates__value--progress">
          {{ completedCount }} / {{ totalCount }} items cleared
        </span>
      </div>
    </div>

    <!-- ── Clearance table ───────────────────────────────────────────────── -->
    <div class="ob-section">
      <h2 class="ob-section__title">Clearance Checklist</h2>
      <p class="ob-section__subtitle">
        All items must be cleared before final pay is released.
      </p>

      <div class="ob-table-wrap">
        <spr-table
          :headers="headers"
          :dataTable="clearanceItems"
          :emptyState="{
            description: 'No clearance items found',
            size: 'large',
          }"
        >
          <!-- Status column — lozenge with tone -->
          <template #status="{ row }">
            <spr-lozenge
              :label="(row.status as any).title"
              :tone="statusTone((row.status as any).title)"
              :fill="(row.status as any).title === 'Completed'"
            />
          </template>
        </spr-table>
      </div>
    </div>

    <!-- ── Confirm resignation modal ────────────────────────────────────── -->
    <spr-modal
      v-model="showConfirmModal"
      title="Confirm Resignation"
      size="sm"
      :staticBackdrop="true"
    >
      <template #default>
        <div class="ob-modal-body">

          <!-- Warning block -->
          <div class="ob-modal-warning">
            <span class="ob-modal-warning__icon">⚠</span>
            <p class="ob-modal-warning__text">
              This action will officially record the resignation of
              <strong>{{ employee.name }}</strong> and cannot be undone.
            </p>
          </div>

          <p class="ob-modal-detail">
            Confirming will trigger the offboarding workflow and notify all assigned
            clearance officers. The employee's last working day will be set to
            <strong>{{ employee.lastWorkingDay }}</strong>.
          </p>

          <ul class="ob-modal-checklist">
            <li>All clearance items will be activated for processing</li>
            <li>Payroll will be notified to begin final pay computation</li>
            <li>IT will schedule account deactivation on the last working day</li>
          </ul>
        </div>
      </template>

      <template #footer>
        <spr-button
          variant="secondary"
          @click="showConfirmModal = false"
        >
          Cancel
        </spr-button>
        <spr-button
          variant="primary"
          tone="danger"
          @click="handleConfirm"
        >
          Yes, confirm resignation
        </spr-button>
      </template>
    </spr-modal>

  </div>
</template>

<style scoped>
.ob-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.ob-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.ob-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ob-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.ob-header__meta {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Confirmed banner ───────────────────────────────────────────────────── */
.ob-confirmed-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7ce;
  border-radius: 8px;
  padding: 16px 20px;
}

.ob-confirmed-banner__icon {
  font-size: 18px;
  color: #158039;
  flex-shrink: 0;
  line-height: 1.5;
}

.ob-confirmed-banner__title {
  font-size: 14px;
  font-weight: 600;
  color: #00291b;
  margin: 0 0 2px;
}

.ob-confirmed-banner__desc {
  font-size: 13px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Key dates ──────────────────────────────────────────────────────────── */
.ob-dates {
  display: flex;
  align-items: center;
  gap: 0;
  background: #fff;
  border: 1px solid #d9dede;
  border-radius: 8px;
  padding: 20px 28px;
}

.ob-dates__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.ob-dates__divider {
  width: 1px;
  height: 36px;
  background: #d9dede;
  margin: 0 28px;
  flex-shrink: 0;
}

.ob-dates__label {
  font-size: 12px;
  font-weight: 500;
  color: #5d6c6b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ob-dates__value {
  font-size: 15px;
  font-weight: 600;
  color: #00291b;
}

.ob-dates__value--progress {
  color: #158039;
}

/* ── Section ────────────────────────────────────────────────────────────── */
.ob-section__title {
  font-size: 17px;
  font-weight: 600;
  color: #00291b;
  margin: 0 0 4px;
}

.ob-section__subtitle {
  font-size: 13px;
  color: #5d6c6b;
  margin: 0 0 16px;
}

/* Height wrapper — required for spr-table */
.ob-table-wrap {
  height: 520px;
  width: 100%;
}

/* ── Modal body ─────────────────────────────────────────────────────────── */
.ob-modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ob-modal-warning {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fef2f3; /* tomato-50 */
  border: 1px solid #fdcbce; /* tomato-200 */
  border-radius: 6px;
  padding: 12px 16px;
}

.ob-modal-warning__icon {
  font-size: 18px;
  color: #da2f38; /* tomato-600 */
  flex-shrink: 0;
  line-height: 1.4;
}

.ob-modal-warning__text {
  font-size: 14px;
  color: #440b0e; /* tomato-950 */
  line-height: 1.6;
  margin: 0;
}

.ob-modal-detail {
  font-size: 14px;
  color: #262b2b;
  line-height: 1.7;
  margin: 0;
}

.ob-modal-checklist {
  font-size: 13px;
  color: #5d6c6b;
  line-height: 1.8;
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
