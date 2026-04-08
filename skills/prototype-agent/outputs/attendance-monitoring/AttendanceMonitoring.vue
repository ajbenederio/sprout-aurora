<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ───────────────────────────────────────────────────────────────────
interface AttendanceRecord {
  id:         number
  date:       string
  employee:   string
  employeeId: string
  department: string
  position:   string
  shift:      string
  timeIn:     string
  timeOut:    string
  breakTotal: string
  duration:   string
  overtime:   string
  status:     string
  notes:      string
  // table cell shape
  _date:       { title: string }
  _employee:   { title: string }
  _timeIn:     { title: string }
  _timeOut:    { title: string }
  _duration:   { title: string }
  _status:     { title: string }
}

// ─── Records ─────────────────────────────────────────────────────────────────
const records = ref<AttendanceRecord[]>([
  { id:  1, date: 'April 8, 2026',  employee: 'Maria Santos',     employeeId: 'EMP-00101', department: 'Engineering',     position: 'Frontend Developer',     shift: '8:00 AM – 5:00 PM', timeIn: '7:58 AM',  timeOut: '5:02 PM',  breakTotal: '1h 00m', duration: '8h 04m', overtime: '—',      status: 'Present',  notes: 'On time.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Maria Santos'    }, _timeIn: { title: '7:58 AM'  }, _timeOut: { title: '5:02 PM'  }, _duration: { title: '8h 04m' }, _status: { title: 'Present'  } },
  { id:  2, date: 'April 8, 2026',  employee: 'Jose Reyes',       employeeId: 'EMP-00102', department: 'Human Resources', position: 'HR Specialist',          shift: '8:00 AM – 5:00 PM', timeIn: '9:15 AM',  timeOut: '5:00 PM',  breakTotal: '1h 00m', duration: '6h 45m', overtime: '—',      status: 'Late',     notes: 'Arrived 1h 15m past shift start. No prior notice.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Jose Reyes'      }, _timeIn: { title: '9:15 AM'  }, _timeOut: { title: '5:00 PM'  }, _duration: { title: '6h 45m' }, _status: { title: 'Late'     } },
  { id:  3, date: 'April 8, 2026',  employee: 'Ana Cruz',         employeeId: 'EMP-00103', department: 'Finance',         position: 'Accountant',             shift: '8:00 AM – 5:00 PM', timeIn: '—',        timeOut: '—',        breakTotal: '—',      duration: '—',      overtime: '—',      status: 'On Leave', notes: 'Filed vacation leave. Approved Apr 5, 2026.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Ana Cruz'        }, _timeIn: { title: '—'        }, _timeOut: { title: '—'        }, _duration: { title: '—'      }, _status: { title: 'On Leave' } },
  { id:  4, date: 'April 8, 2026',  employee: 'Carlos Dela Rosa', employeeId: 'EMP-00104', department: 'Engineering',     position: 'Backend Developer',      shift: '8:00 AM – 5:00 PM', timeIn: '8:01 AM',  timeOut: '7:32 PM',  breakTotal: '1h 00m', duration: '10h 31m',overtime: '2h 31m', status: 'Present',  notes: 'Rendered overtime for sprint deadline.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Carlos Dela Rosa'}, _timeIn: { title: '8:01 AM'  }, _timeOut: { title: '7:32 PM'  }, _duration: { title: '10h 31m'}, _status: { title: 'Present'  } },
  { id:  5, date: 'April 8, 2026',  employee: 'Liza Mendoza',     employeeId: 'EMP-00105', department: 'Marketing',       position: 'Marketing Manager',      shift: '8:00 AM – 5:00 PM', timeIn: '8:00 AM',  timeOut: '12:05 PM', breakTotal: '—',      duration: '4h 05m', overtime: '—',      status: 'Half Day', notes: 'Approved half-day (AM). Personal errand.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Liza Mendoza'    }, _timeIn: { title: '8:00 AM'  }, _timeOut: { title: '12:05 PM' }, _duration: { title: '4h 05m' }, _status: { title: 'Half Day' } },
  { id:  6, date: 'April 8, 2026',  employee: 'Ramon Villanueva', employeeId: 'EMP-00106', department: 'Operations',      position: 'Operations Analyst',     shift: '8:00 AM – 5:00 PM', timeIn: '—',        timeOut: '—',        breakTotal: '—',      duration: '—',      overtime: '—',      status: 'Absent',   notes: 'No notice of absence. HR notified.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Ramon Villanueva'}, _timeIn: { title: '—'        }, _timeOut: { title: '—'        }, _duration: { title: '—'      }, _status: { title: 'Absent'   } },
  { id:  7, date: 'April 8, 2026',  employee: 'Grace Tan',        employeeId: 'EMP-00107', department: 'Finance',         position: 'Finance Manager',        shift: '8:00 AM – 5:00 PM', timeIn: '7:55 AM',  timeOut: '5:10 PM',  breakTotal: '1h 00m', duration: '8h 15m', overtime: '—',      status: 'Present',  notes: 'On time.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Grace Tan'       }, _timeIn: { title: '7:55 AM'  }, _timeOut: { title: '5:10 PM'  }, _duration: { title: '8h 15m' }, _status: { title: 'Present'  } },
  { id:  8, date: 'April 8, 2026',  employee: 'Michael Lim',      employeeId: 'EMP-00108', department: 'Engineering',     position: 'DevOps Engineer',        shift: '8:00 AM – 5:00 PM', timeIn: '8:22 AM',  timeOut: '5:00 PM',  breakTotal: '1h 00m', duration: '7h 38m', overtime: '—',      status: 'Late',     notes: 'Arrived 22 minutes past shift start.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Michael Lim'     }, _timeIn: { title: '8:22 AM'  }, _timeOut: { title: '5:00 PM'  }, _duration: { title: '7h 38m' }, _status: { title: 'Late'     } },
  { id:  9, date: 'April 8, 2026',  employee: 'Patricia Ocampo',  employeeId: 'EMP-00109', department: 'Human Resources', position: 'Recruitment Specialist', shift: '8:00 AM – 5:00 PM', timeIn: '8:00 AM',  timeOut: '5:00 PM',  breakTotal: '1h 00m', duration: '8h 00m', overtime: '—',      status: 'Present',  notes: 'On time.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Patricia Ocampo' }, _timeIn: { title: '8:00 AM'  }, _timeOut: { title: '5:00 PM'  }, _duration: { title: '8h 00m' }, _status: { title: 'Present'  } },
  { id: 10, date: 'April 8, 2026',  employee: 'Rowena Castillo',  employeeId: 'EMP-00110', department: 'Operations',      position: 'Project Manager',        shift: '8:00 AM – 5:00 PM', timeIn: '8:05 AM',  timeOut: '5:00 PM',  breakTotal: '1h 00m', duration: '7h 55m', overtime: '—',      status: 'Present',  notes: 'On time.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Rowena Castillo' }, _timeIn: { title: '8:05 AM'  }, _timeOut: { title: '5:00 PM'  }, _duration: { title: '7h 55m' }, _status: { title: 'Present'  } },
  { id: 11, date: 'April 8, 2026',  employee: 'Eduardo Manalo',   employeeId: 'EMP-00111', department: 'Sales',           position: 'Account Manager',        shift: '8:00 AM – 5:00 PM', timeIn: '8:00 AM',  timeOut: '5:00 PM',  breakTotal: '1h 00m', duration: '8h 00m', overtime: '—',      status: 'Present',  notes: 'On time.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Eduardo Manalo'  }, _timeIn: { title: '8:00 AM'  }, _timeOut: { title: '5:00 PM'  }, _duration: { title: '8h 00m' }, _status: { title: 'Present'  } },
  { id: 12, date: 'April 8, 2026',  employee: 'Jennifer Ramos',   employeeId: 'EMP-00112', department: 'Finance',         position: 'Payroll Specialist',     shift: '8:00 AM – 5:00 PM', timeIn: '—',        timeOut: '—',        breakTotal: '—',      duration: '—',      overtime: '—',      status: 'Absent',   notes: 'Filed sick leave on the same day. Medical cert pending.',
    _date: { title: 'Apr 8, 2026'  }, _employee: { title: 'Jennifer Ramos'  }, _timeIn: { title: '—'        }, _timeOut: { title: '—'        }, _duration: { title: '—'      }, _status: { title: 'Absent'   } },
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_date',     name: 'Date',      sort: true  },
  { field: '_employee', name: 'Employee',  sort: true  },
  { field: '_timeIn',   name: 'Time In',   sort: false },
  { field: '_timeOut',  name: 'Time Out',  sort: false },
  { field: '_duration', name: 'Duration',  sort: false },
  { field: '_status',   name: 'Status'                 },
])

// ─── Sidepanel state ──────────────────────────────────────────────────────────
const panelOpen    = ref(false)
const selectedRow  = ref<AttendanceRecord | null>(null)

function handleRowClick(row: any) {
  // row is the raw table row — find the full record by id
  const found = records.value.find(r => r.id === row.id)
  if (found) {
    selectedRow.value = found
    panelOpen.value   = true
  }
}

function closePanel() {
  panelOpen.value  = false
  // Delay clearing so panel close animation completes
  setTimeout(() => { selectedRow.value = null }, 300)
}

// ─── Status helpers ───────────────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Present')  return 'success'
  if (status === 'Late')     return 'caution'
  if (status === 'Absent')   return 'danger'
  if (status === 'Half Day') return 'information'
  return 'neutral' // On Leave
}

function statusFill(status: string): boolean {
  return status === 'Present'
}

// ─── Summary counts ───────────────────────────────────────────────────────────
const summary = computed(() => ({
  present:  records.value.filter(r => r.status === 'Present').length,
  late:     records.value.filter(r => r.status === 'Late').length,
  absent:   records.value.filter(r => r.status === 'Absent').length,
  onLeave:  records.value.filter(r => r.status === 'On Leave').length,
  halfDay:  records.value.filter(r => r.status === 'Half Day').length,
}))
</script>

<template>
  <div class="am-page">

    <!-- ── Page header ───────────────────────────────────────────────────── -->
    <div class="am-header">
      <div class="am-header__eyebrow">Attendance</div>
      <div class="am-header__row">
        <div>
          <h1 class="am-header__title">Daily Time Records</h1>
          <p class="am-header__subtitle">April 8, 2026 · Click any row to view full attendance detail.</p>
        </div>
        <spr-button variant="secondary">Export report</spr-button>
      </div>
    </div>

    <!-- ── Summary tiles ─────────────────────────────────────────────────── -->
    <div class="am-summary">
      <div class="am-summary__tile am-summary__tile--present">
        <span class="am-summary__count">{{ summary.present }}</span>
        <span class="am-summary__label">Present</span>
      </div>
      <div class="am-summary__tile am-summary__tile--late">
        <span class="am-summary__count">{{ summary.late }}</span>
        <span class="am-summary__label">Late</span>
      </div>
      <div class="am-summary__tile am-summary__tile--absent">
        <span class="am-summary__count">{{ summary.absent }}</span>
        <span class="am-summary__label">Absent</span>
      </div>
      <div class="am-summary__tile am-summary__tile--halfday">
        <span class="am-summary__count">{{ summary.halfDay }}</span>
        <span class="am-summary__label">Half Day</span>
      </div>
      <div class="am-summary__tile am-summary__tile--leave">
        <span class="am-summary__count">{{ summary.onLeave }}</span>
        <span class="am-summary__label">On Leave</span>
      </div>
    </div>

    <!-- ── Table — height wrapper required ──────────────────────────────── -->
    <div class="am-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="records"
        :isRowClickable="true"
        :tableActions="{ search: true, filter: false, option: false }"
        @onRowClick="handleRowClick"
      >
        <!-- Status column -->
        <template #_status="{ row }">
          <spr-lozenge
            :label="(row._status as any).title"
            :tone="statusTone((row._status as any).title)"
            :fill="statusFill((row._status as any).title)"
          />
        </template>
      </spr-table>
    </div>

    <!-- ── Attendance detail sidepanel ───────────────────────────────────── -->
    <spr-sidepanel
      :isOpen="panelOpen"
      :headerTitle="selectedRow?.employee ?? 'Attendance Detail'"
      :headerSubtitle="selectedRow?.date"
      size="md"
      :hasBackdrop="true"
      :closeOutside="true"
      :escapeClose="true"
      @close="closePanel"
    >
      <template #default>
        <div v-if="selectedRow" class="am-panel">

          <!-- Status + employee info -->
          <div class="am-panel__hero">
            <div class="am-panel__hero-left">
              <p class="am-panel__name">{{ selectedRow.employee }}</p>
              <p class="am-panel__meta">{{ selectedRow.position }} · {{ selectedRow.department }}</p>
              <p class="am-panel__meta">{{ selectedRow.employeeId }}</p>
            </div>
            <spr-lozenge
              :label="selectedRow.status"
              :tone="statusTone(selectedRow.status)"
              :fill="statusFill(selectedRow.status)"
            />
          </div>

          <div class="am-panel__divider" />

          <!-- Shift info -->
          <div class="am-panel__section">
            <p class="am-panel__section-label">Shift Schedule</p>
            <p class="am-panel__section-value">{{ selectedRow.shift }}</p>
          </div>

          <!-- Time breakdown grid -->
          <div class="am-panel__grid">
            <div class="am-panel__cell">
              <span class="am-panel__cell-label">Time In</span>
              <span class="am-panel__cell-value" :class="{ 'am-panel__cell-value--late': selectedRow.status === 'Late' }">
                {{ selectedRow.timeIn }}
              </span>
            </div>
            <div class="am-panel__cell">
              <span class="am-panel__cell-label">Time Out</span>
              <span class="am-panel__cell-value">{{ selectedRow.timeOut }}</span>
            </div>
            <div class="am-panel__cell">
              <span class="am-panel__cell-label">Break</span>
              <span class="am-panel__cell-value">{{ selectedRow.breakTotal }}</span>
            </div>
            <div class="am-panel__cell">
              <span class="am-panel__cell-label">Total Hours</span>
              <span class="am-panel__cell-value am-panel__cell-value--highlight">{{ selectedRow.duration }}</span>
            </div>
          </div>

          <!-- Overtime -->
          <div v-if="selectedRow.overtime !== '—'" class="am-panel__overtime">
            <span class="am-panel__overtime-label">Overtime Rendered</span>
            <span class="am-panel__overtime-value">{{ selectedRow.overtime }}</span>
          </div>

          <div class="am-panel__divider" />

          <!-- Notes -->
          <div class="am-panel__section">
            <p class="am-panel__section-label">Notes / Remarks</p>
            <p class="am-panel__notes">{{ selectedRow.notes }}</p>
          </div>

        </div>
      </template>

      <template #footer>
        <spr-button variant="secondary" @click="closePanel">Close</spr-button>
        <spr-button variant="primary" tone="success">Edit record</spr-button>
      </template>
    </spr-sidepanel>

  </div>
</template>

<style scoped>
.am-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.am-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.am-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.am-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 4px;
}

.am-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  margin: 0;
}

/* ── Summary tiles ──────────────────────────────────────────────────────── */
.am-summary {
  display: flex;
  gap: 12px;
}

.am-summary__tile {
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

.am-summary__count {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.am-summary__label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #5d6c6b;
}

.am-summary__tile--present  .am-summary__count { color: #158039; }
.am-summary__tile--late     .am-summary__count { color: #ff9700; }
.am-summary__tile--absent   .am-summary__count { color: #da2f38; }
.am-summary__tile--halfday  .am-summary__count { color: #0592b5; }
.am-summary__tile--leave    .am-summary__count { color: #738482; }

/* ── Table ──────────────────────────────────────────────────────────────── */
.am-table-wrap {
  height: 560px;
  width: 100%;
}

/* ── Sidepanel body ─────────────────────────────────────────────────────── */
.am-panel {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.am-panel__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.am-panel__name {
  font-size: 17px;
  font-weight: 600;
  color: #00291b;
  margin: 0 0 4px;
}

.am-panel__meta {
  font-size: 13px;
  color: #5d6c6b;
  margin: 0 0 2px;
}

.am-panel__divider {
  height: 1px;
  background: #eff1f1;
}

.am-panel__section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #5d6c6b;
  margin: 0 0 6px;
}

.am-panel__section-value {
  font-size: 14px;
  color: #262b2b;
  margin: 0;
}

/* Time breakdown grid — 2×2 */
.am-panel__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.am-panel__cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #eff1f1;
  border-radius: 6px;
  padding: 14px 16px;
}

.am-panel__cell-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #5d6c6b;
}

.am-panel__cell-value {
  font-size: 20px;
  font-weight: 700;
  color: #00291b;
}

.am-panel__cell-value--late {
  color: #ff9700;
}

.am-panel__cell-value--highlight {
  color: #158039;
}

/* Overtime */
.am-panel__overtime {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #dcfce6;
  border-radius: 6px;
  padding: 12px 16px;
}

.am-panel__overtime-label {
  font-size: 13px;
  font-weight: 500;
  color: #14532b;
}

.am-panel__overtime-value {
  font-size: 15px;
  font-weight: 700;
  color: #158039;
}

/* Notes */
.am-panel__notes {
  font-size: 14px;
  color: #262b2b;
  line-height: 1.7;
  margin: 0;
  background: #eff1f1;
  border-radius: 6px;
  padding: 12px 14px;
}
</style>
