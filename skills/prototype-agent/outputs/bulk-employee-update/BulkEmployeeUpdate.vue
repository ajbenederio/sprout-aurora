<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Employee data ────────────────────────────────────────────────────────────
const employees = ref<Employee[]>([
  emp(1,  'Maria Santos',     'Engineering',     'Frontend Developer',     'Active'),
  emp(2,  'Jose Reyes',       'Human Resources', 'HR Specialist',          'Active'),
  emp(3,  'Ana Cruz',         'Finance',         'Accountant',             'On Probation'),
  emp(4,  'Carlos Dela Rosa', 'Engineering',     'Backend Developer',      'Active'),
  emp(5,  'Liza Mendoza',     'Marketing',       'Marketing Manager',      'Active'),
  emp(6,  'Ramon Villanueva', 'Operations',      'Operations Analyst',     'On Probation'),
  emp(7,  'Grace Tan',        'Finance',         'Finance Manager',        'Active'),
  emp(8,  'Michael Lim',      'Engineering',     'DevOps Engineer',        'Active'),
  emp(9,  'Patricia Ocampo',  'Human Resources', 'Recruitment Specialist', 'On Leave'),
  emp(10, 'Rowena Castillo',  'Operations',      'Project Manager',        'Active'),
  emp(11, 'Eduardo Manalo',   'Sales',           'Account Manager',        'Active'),
  emp(12, 'Jennifer Ramos',   'Finance',         'Payroll Specialist',     'Active'),
  emp(13, 'Rico Bautista',    'Sales',           'Sales Executive',        'On Probation'),
  emp(14, 'Theresa Gomez',    'Marketing',       'Brand Strategist',       'Active'),
  emp(15, 'Daniel Torres',    'Engineering',     'QA Engineer',            'Inactive'),
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_name',       name: 'Name',       sort: true  },
  { field: '_department', name: 'Department', sort: true  },
  { field: '_position',   name: 'Position',   sort: false },
  { field: '_status',     name: 'Status'                  },
])

// ─── Multi-select state ───────────────────────────────────────────────────────
// With returnCompleteSelectedProperties=true, emit payload is full row objects
const selectedData = ref<any[]>([])
const selectedCount = computed(() => selectedData.value.length)
const hasSelection  = computed(() => selectedCount.value > 0)

// ─── Bulk update form ─────────────────────────────────────────────────────────
const updateField = ref('')
const updateValue = ref('')

const fieldOptions = [
  { text: 'Department',        value: 'department' },
  { text: 'Employment Status', value: 'status'     },
]

const valueOptions = computed(() => {
  if (updateField.value === 'department') return [
    { text: 'Engineering',     value: 'Engineering'     },
    { text: 'Human Resources', value: 'Human Resources' },
    { text: 'Finance',         value: 'Finance'         },
    { text: 'Sales',           value: 'Sales'           },
    { text: 'Marketing',       value: 'Marketing'       },
    { text: 'Operations',      value: 'Operations'      },
  ]
  if (updateField.value === 'status') return [
    { text: 'Active',       value: 'Active'       },
    { text: 'On Probation', value: 'On Probation' },
    { text: 'On Leave',     value: 'On Leave'     },
    { text: 'Inactive',     value: 'Inactive'     },
  ]
  return []
})

// Reset value whenever field changes
watch(updateField, () => { updateValue.value = '' })

const canApply = computed(() =>
  hasSelection.value && !!updateField.value && !!updateValue.value
)

// ─── Undo snapshot ────────────────────────────────────────────────────────────
const snapshot = ref<Employee[] | null>(null)

// ─── Snackbar ─────────────────────────────────────────────────────────────────
const snackbarRef = ref<any>(null)

// ─── Apply changes ────────────────────────────────────────────────────────────
function applyChanges() {
  if (!canApply.value) return

  // Save snapshot for undo
  snapshot.value = JSON.parse(JSON.stringify(employees.value))

  const selectedIds = new Set(selectedData.value.map((row: any) => row.id))
  const count       = selectedIds.size
  const field       = updateField.value
  const value       = updateValue.value
  const fieldLabel  = fieldOptions.find(f => f.value === field)?.text ?? field

  employees.value = employees.value.map(e => {
    if (!selectedIds.has(e.id)) return e
    const updated = { ...e, [field]: value }
    if (field === 'department') updated._department = { title: value }
    if (field === 'status')     updated._status     = { title: value }
    return updated
  })

  // Reset selection and form
  selectedData.value = []
  updateField.value  = ''
  updateValue.value  = ''

  console.log('snackbarRef.value:', snackbarRef.value)
  snackbarRef.value?.showSuccess({
    text:       `${count} employee${count !== 1 ? 's' : ''} updated — ${fieldLabel} set to "${value}"`,
    showAction: true,
    actionText: 'Undo',
    action:     handleUndo,
    duration:   8000,
  })
}

function handleUndo() {
  if (!snapshot.value) return
  employees.value = snapshot.value
  snapshot.value  = null

  snackbarRef.value?.showInformation({
    text:     'Update undone — employees restored',
    duration: 4000,
  })
}

// ─── Status lozenge helpers ───────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Active')       return 'success'
  if (status === 'On Probation') return 'caution'
  if (status === 'On Leave')     return 'information'
  if (status === 'Inactive')     return 'danger'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Active'
}
</script>

<template>
  <div class="bu-page">

    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="bu-header">
      <div class="bu-header__eyebrow">Employees</div>
      <div class="bu-header__row">
        <div>
          <h1 class="bu-header__title">Bulk Employee Update</h1>
          <p class="bu-header__subtitle">
            Select one or more rows, choose a field and value, then click Apply changes.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Selection action bar ──────────────────────────────────────────── -->
    <Transition name="bu-bar">
      <div v-if="hasSelection" class="bu-action-bar">

        <div class="bu-action-bar__left">
          <!-- Checkmark badge -->
          <div class="bu-action-bar__badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="bu-action-bar__count">
            {{ selectedCount }} employee{{ selectedCount !== 1 ? 's' : '' }} selected
          </span>
        </div>

        <div class="bu-action-bar__controls">
          <!-- Field selector -->
          <spr-select
            id="bulk-field"
            v-model="updateField"
            :options="fieldOptions"
            textField="text"
            valueField="value"
            label=""
            placeholder="Select field..."
            class="bu-action-bar__select"
          />

          <!-- Value selector — disabled until field is chosen -->
          <spr-select
            id="bulk-value"
            v-model="updateValue"
            :options="valueOptions"
            textField="text"
            valueField="value"
            label=""
            placeholder="New value..."
            :disabled="!updateField"
            class="bu-action-bar__select"
          />

          <spr-button
            variant="primary"
            tone="success"
            :disabled="!canApply"
            @click="applyChanges"
          >
            Apply changes
          </spr-button>
        </div>

      </div>
    </Transition>

    <!-- ── Employee table ────────────────────────────────────────────────── -->
    <div class="bu-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="employees"
        :isMultiSelect="true"
        :selectedKeyId="'id'"
        :returnCompleteSelectedProperties="true"
        :tableActions="{ search: true, filter: false, option: false }"
        @update:selectedData="selectedData = $event"
      >
        <!-- Status column — lozenge -->
        <template #_status="{ row }">
          <spr-lozenge
            :label="(row._status as any).title"
            :tone="statusTone((row._status as any).title)"
            :fill="statusFill((row._status as any).title)"
          />
        </template>
      </spr-table>
    </div>

    <!-- ── Snackbar ───────────────────────────────────────────────────────── -->
    <spr-snackbar ref="snackbarRef" />

  </div>
</template>

<style scoped>
.bu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.bu-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.bu-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.bu-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.bu-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Selection action bar ───────────────────────────────────────────────── */
.bu-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 8px;
  padding: 14px 20px;
}

.bu-action-bar__left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.bu-action-bar__badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #158039;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bu-action-bar__count {
  font-size: 14px;
  font-weight: 600;
  color: #14532b;
}

.bu-action-bar__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bu-action-bar__select {
  width: 200px;
}

/* ── Transition ─────────────────────────────────────────────────────────── */
.bu-bar-enter-active,
.bu-bar-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.bu-bar-enter-from,
.bu-bar-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.bu-table-wrap {
  height: 600px;
  width: 100%;
}
</style>
