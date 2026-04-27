<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface ClearanceItem {
  id:           number
  department:   string
  item:         string
  assignedTo:   string
  status:       string
  _department:  { title: string }
  _item:        { title: string }
  _assignedTo:  { title: string }
  _status:      { title: string }
}

function ci(
  id: number, dept: string, item: string, assignedTo: string, status: string
): ClearanceItem {
  return {
    id, department: dept, item, assignedTo, status,
    _department: { title: dept       },
    _item:       { title: item       },
    _assignedTo: { title: assignedTo },
    _status:     { title: status     },
  }
}

// ─── Clearance items ──────────────────────────────────────────────────────────
const clearanceItems = ref<ClearanceItem[]>([
  ci(1, 'IT',          'Equipment Return',         'IT Support',        'Pending'),
  ci(2, 'IT',          'System Access Revocation',  'IT Support',       'Pending'),
  ci(3, 'HR',          'Exit Interview',            'HR Manager',       'In Progress'),
  ci(4, 'HR',          'Benefits Termination',      'HR Specialist',    'Pending'),
  ci(5, 'Finance',     'Final Payroll Review',      'Payroll Team',     'Pending'),
  ci(6, 'Finance',     'Expense Reimbursement',     'Finance Manager',  'Cleared'),
  ci(7, 'Legal',       'NDA & IP Agreement Review', 'Legal Counsel',    'Blocked'),
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_department', name: 'Department',     sort: true  },
  { field: '_item',       name: 'Clearance Item', sort: false },
  { field: '_assignedTo', name: 'Assigned To',    sort: false },
  { field: '_status',     name: 'Status'                      },
])

// ─── Clearance progress ───────────────────────────────────────────────────────
const clearedCount  = computed(() => clearanceItems.value.filter(i => i.status === 'Cleared').length)
const totalCount    = computed(() => clearanceItems.value.length)
const allCleared    = computed(() => clearedCount.value === totalCount.value)
const hasBlocked    = computed(() => clearanceItems.value.some(i => i.status === 'Blocked'))

// ─── Resignation modal ────────────────────────────────────────────────────────
const showModal     = ref(false)
const isConfirmed   = ref(false)

// Effective date = 30 calendar days from today
const effectiveDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})

function confirmResignation() {
  showModal.value   = false
  isConfirmed.value = true
}

// ─── Status lozenge helpers ───────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Cleared')     return 'success'
  if (status === 'In Progress') return 'information'
  if (status === 'Pending')     return 'caution'
  if (status === 'Blocked')     return 'danger'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Cleared'
}
</script>

<template>
  <div class="ob-page">

    <!-- ── Page header ───────────────────────────────────────────────────────── -->
    <div class="ob-header">
      <div class="ob-header__eyebrow">Offboarding</div>
      <div class="ob-header__row">
        <div>
          <h1 class="ob-header__title">Employee Offboarding</h1>
          <p class="ob-header__subtitle">
            Track pending clearance requirements before processing the final resignation.
          </p>
        </div>

        <!-- Progress pill -->
        <div class="ob-header__progress">
          <span class="ob-header__progress-label">Clearance progress</span>
          <spr-lozenge
            :label="`${clearedCount} / ${totalCount} cleared`"
            :tone="allCleared ? 'success' : 'caution'"
            :fill="allCleared"
          />
        </div>
      </div>
    </div>

    <!-- ── Blocked warning banner ─────────────────────────────────────────────── -->
    <div v-if="hasBlocked" class="ob-warning-banner">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="ob-warning-banner__icon">
        <circle cx="8" cy="8" r="7.25" stroke="#b45309" stroke-width="1.5"/>
        <path d="M8 5v3.5" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="8" cy="11" r="0.75" fill="#b45309"/>
      </svg>
      One or more clearance items are blocked. Resolve them before confirming resignation.
    </div>

    <!-- ── Clearance table ───────────────────────────────────────────────────── -->
    <div class="ob-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="clearanceItems"
        :emptyState="{
          description: 'No clearance items found',
          subDescription: 'All offboarding tasks will appear here.',
          image: 'location',
          size: 'large',
        }"
      >
        <!-- Status column — lozenge per clearance state -->
        <template #_status="{ row }">
          <spr-lozenge
            :label="(row._status as any).title"
            :tone="statusTone((row._status as any).title)"
            :fill="statusFill((row._status as any).title)"
          />
        </template>
      </spr-table>
    </div>

    <!-- ── Action bar ────────────────────────────────────────────────────────── -->
    <!-- Confirmed state: show submitted banner -->
    <div v-if="isConfirmed" class="ob-confirmed-banner">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="#dcfce6"/>
        <path d="M5 9.5L7.5 12L13 7" stroke="#158039" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <p class="ob-confirmed-banner__title">Resignation confirmed</p>
        <p class="ob-confirmed-banner__subtitle">
          Effective date: {{ effectiveDate }}. HR has been notified and final pay processing will begin
          once all clearance items are marked cleared.
        </p>
      </div>
    </div>

    <!-- Pending state: show confirm button -->
    <div v-else class="ob-actions">
      <p class="ob-actions__note">
        Confirming resignation will notify HR and begin final pay processing.
      </p>
      <spr-button
        variant="primary"
        tone="danger"
        :disabled="hasBlocked"
        @click="showModal = true"
      >
        Confirm resignation
      </spr-button>
    </div>

    <!-- ── Confirm resignation modal ─────────────────────────────────────────── -->
    <!-- staticBackdrop=true: user must explicitly choose Cancel or Confirm -->
    <spr-modal
      v-model="showModal"
      title="Confirm Resignation"
      size="sm"
      :staticBackdrop="true"
    >
      <template #default>
        <div class="ob-modal-body">

          <!-- Warning icon -->
          <div class="ob-modal-body__icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#fef3c7"/>
              <path d="M20 13v8" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
              <circle cx="20" cy="26" r="1.2" fill="#d97706"/>
            </svg>
          </div>

          <p class="ob-modal-body__lead">
            You are about to formally confirm this employee's resignation.
            <strong>This action cannot be undone.</strong>
          </p>

          <ul class="ob-modal-body__list">
            <li>Effective date will be set to <strong>{{ effectiveDate }}</strong></li>
            <li>All system access will be scheduled for revocation on the effective date</li>
            <li>Final pay computation will begin once all clearance items are cleared</li>
            <li>HR and the employee's department head will be notified immediately</li>
          </ul>

          <p class="ob-modal-body__note">
            Make sure all pending clearance items are tracked before proceeding.
            Blocked items must be resolved separately.
          </p>

        </div>
      </template>

      <template #footer>
        <spr-button variant="secondary" @click="showModal = false">
          Cancel
        </spr-button>
        <spr-button variant="primary" tone="danger" @click="confirmResignation">
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
  gap: 20px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
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

.ob-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

.ob-header__progress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.ob-header__progress-label {
  font-size: 12px;
  color: #5d6c6b;
}

/* ── Blocked warning banner ──────────────────────────────────────────────── */
.ob-warning-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #92400e;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 6px;
  padding: 10px 14px;
}

.ob-warning-banner__icon {
  flex-shrink: 0;
}

/* ── Table ───────────────────────────────────────────────────────────────── */
.ob-table-wrap {
  height: 480px;
  width: 100%;
}

/* ── Actions bar ─────────────────────────────────────────────────────────── */
.ob-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.ob-actions__note {
  font-size: 13px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Confirmed banner ────────────────────────────────────────────────────── */
.ob-confirmed-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 8px;
}

.ob-confirmed-banner__title {
  font-size: 14px;
  font-weight: 600;
  color: #14532b;
  margin: 0 0 4px;
}

.ob-confirmed-banner__subtitle {
  font-size: 13px;
  color: #166534;
  margin: 0;
  line-height: 1.5;
}

/* ── Modal body ──────────────────────────────────────────────────────────── */
.ob-modal-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ob-modal-body__icon {
  display: flex;
  justify-content: center;
  padding-bottom: 4px;
}

.ob-modal-body__lead {
  font-size: 14px;
  color: #262b2b;
  line-height: 1.6;
  margin: 0;
}

.ob-modal-body__list {
  font-size: 13px;
  color: #262b2b;
  line-height: 1.8;
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ob-modal-body__note {
  font-size: 12px;
  color: #5d6c6b;
  background: #eff1f1;
  border-left: 3px solid #b8c1c0;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  margin: 0;
}
</style>
