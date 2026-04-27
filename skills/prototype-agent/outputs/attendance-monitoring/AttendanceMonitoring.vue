<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Header } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface AttendanceRecord {
  id:           number
  employee:     string
  position:     string
  date:         string
  day:          string
  timeIn:       string
  timeOut:      string
  breakMin:     number
  hoursWorked:  number
  status:       string
  remarks:      string
  // { title } cell shapes for spr-table
  _employee:    { title: string }
  _date:        { title: string }
  _timeIn:      { title: string }
  _timeOut:     { title: string }
  _hoursWorked: { title: string }
  _status:      { title: string }
}

function rec(
  id: number, employee: string, position: string,
  date: string, day: string, timeIn: string, timeOut: string,
  breakMin: number, hoursWorked: number, status: string, remarks = ''
): AttendanceRecord {
  return {
    id, employee, position, date, day, timeIn, timeOut,
    breakMin, hoursWorked, status, remarks,
    _employee:    { title: employee },
    _date:        { title: date },
    _timeIn:      { title: timeIn  || '—' },
    _timeOut:     { title: timeOut || '—' },
    _hoursWorked: { title: hoursWorked ? `${hoursWorked.toFixed(2)} hrs` : '—' },
    _status:      { title: status },
  }
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const allRecords = ref<AttendanceRecord[]>([
  rec(1,  'Maria Santos',     'HR Manager',          'Apr 21, 2026', 'Monday',    '08:01 AM', '05:03 PM', 60, 8.03, 'Present'),
  rec(2,  'Jose Reyes',       'Developer',           'Apr 21, 2026', 'Monday',    '08:24 AM', '05:30 PM', 60, 8.10, 'Late',    'Arrived 24 mins late.'),
  rec(3,  'Ana Cruz',         'Designer',            'Apr 21, 2026', 'Monday',    '08:00 AM', '05:00 PM', 60, 8.00, 'Present'),
  rec(4,  'Carlos Dela Rosa', 'Backend Developer',   'Apr 21, 2026', 'Monday',    '—',        '—',        0,  0,    'Absent',  'No notification filed.'),
  rec(5,  'Liza Mendoza',     'Marketing Manager',   'Apr 21, 2026', 'Monday',    '08:05 AM', '12:00 PM', 30, 3.92, 'Half-day','Medical appointment PM.'),
  rec(6,  'Maria Santos',     'HR Manager',          'Apr 22, 2026', 'Tuesday',   '07:58 AM', '05:10 PM', 60, 8.20, 'Present'),
  rec(7,  'Jose Reyes',       'Developer',           'Apr 22, 2026', 'Tuesday',   '08:03 AM', '06:00 PM', 60, 8.95, 'Present'),
  rec(8,  'Ana Cruz',         'Designer',            'Apr 22, 2026', 'Tuesday',   '—',        '—',        0,  0,    'On Leave','Approved VL filed Apr 18.'),
  rec(9,  'Carlos Dela Rosa', 'Backend Developer',   'Apr 22, 2026', 'Tuesday',   '08:00 AM', '05:00 PM', 60, 8.00, 'Present'),
  rec(10, 'Liza Mendoza',     'Marketing Manager',   'Apr 22, 2026', 'Tuesday',   '08:45 AM', '05:30 PM', 60, 7.75, 'Late',    'Arrived 45 mins late.'),
  rec(11, 'Maria Santos',     'HR Manager',          'Apr 23, 2026', 'Wednesday', '08:02 AM', '05:05 PM', 60, 8.05, 'Present'),
  rec(12, 'Jose Reyes',       'Developer',           'Apr 23, 2026', 'Wednesday', '08:00 AM', '05:00 PM', 60, 8.00, 'Present'),
  rec(13, 'Ana Cruz',         'Designer',            'Apr 23, 2026', 'Wednesday', '08:10 AM', '05:00 PM', 60, 7.83, 'Present'),
  rec(14, 'Carlos Dela Rosa', 'Backend Developer',   'Apr 23, 2026', 'Wednesday', '08:15 AM', '05:15 PM', 60, 8.00, 'Late',    'Arrived 15 mins late.'),
  rec(15, 'Liza Mendoza',     'Marketing Manager',   'Apr 23, 2026', 'Wednesday', '08:00 AM', '05:00 PM', 60, 8.00, 'Present'),
])

// ─── Table headers ────────────────────────────────────────────────────────────
const headers = ref<Header[]>([
  { field: '_employee',    name: 'Employee',      sort: true  },
  { field: '_date',        name: 'Date',          sort: true  },
  { field: '_timeIn',      name: 'Time In',       sort: false },
  { field: '_timeOut',     name: 'Time Out',      sort: false },
  { field: '_hoursWorked', name: 'Hours Worked',  sort: false },
  { field: '_status',      name: 'Status'                     },
])

// ─── Search ───────────────────────────────────────────────────────────────────
const search = ref('')

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return allRecords.value
  return allRecords.value.filter(r =>
    r.employee.toLowerCase().includes(q)
  )
})

// ─── Sidepanel ────────────────────────────────────────────────────────────────
const panelOpen   = ref(false)
const selectedRec = ref<AttendanceRecord | null>(null)

function handleRowClick(row: any) {
  selectedRec.value = row as AttendanceRecord
  panelOpen.value   = true
}

function closePanel() {
  panelOpen.value = false
}

// ─── Status helpers ───────────────────────────────────────────────────────────
function statusTone(status: string): string {
  if (status === 'Present')  return 'success'
  if (status === 'Late')     return 'caution'
  if (status === 'Absent')   return 'danger'
  if (status === 'Half-day') return 'information'
  if (status === 'On Leave') return 'neutral'
  return 'neutral'
}

function statusFill(status: string): boolean {
  return status === 'Present'
}

// ─── Summary: counts for current filtered set ─────────────────────────────────
const summary = computed(() => ({
  present:  filtered.value.filter(r => r.status === 'Present').length,
  late:     filtered.value.filter(r => r.status === 'Late').length,
  absent:   filtered.value.filter(r => r.status === 'Absent').length,
  halfday:  filtered.value.filter(r => r.status === 'Half-day').length,
  onLeave:  filtered.value.filter(r => r.status === 'On Leave').length,
}))
</script>

<template>
  <div class="am-page">

    <!-- ── Page header ───────────────────────────────────────────────────────── -->
    <div class="am-header">
      <div class="am-header__eyebrow">Attendance</div>
      <div class="am-header__row">
        <div>
          <h1 class="am-header__title">Attendance Monitoring</h1>
          <p class="am-header__subtitle">
            Daily time records — click any row to view the full attendance detail.
          </p>
        </div>

        <!-- Search input -->
        <div class="am-search">
          <spr-input
            id="attendance-search"
            v-model="search"
            placeholder="Search by employee name..."
          />
        </div>
      </div>
    </div>

    <!-- ── Summary chips ─────────────────────────────────────────────────────── -->
    <div class="am-summary">
      <div class="am-chip am-chip--present">
        <span class="am-chip__count">{{ summary.present }}</span>
        <span class="am-chip__label">Present</span>
      </div>
      <div class="am-chip am-chip--late">
        <span class="am-chip__count">{{ summary.late }}</span>
        <span class="am-chip__label">Late</span>
      </div>
      <div class="am-chip am-chip--absent">
        <span class="am-chip__count">{{ summary.absent }}</span>
        <span class="am-chip__label">Absent</span>
      </div>
      <div class="am-chip am-chip--halfday">
        <span class="am-chip__count">{{ summary.halfday }}</span>
        <span class="am-chip__label">Half-day</span>
      </div>
      <div class="am-chip am-chip--leave">
        <span class="am-chip__count">{{ summary.onLeave }}</span>
        <span class="am-chip__label">On Leave</span>
      </div>
    </div>

    <!-- ── Attendance table ──────────────────────────────────────────────────── -->
    <div class="am-table-wrap">
      <spr-table
        :headers="headers"
        :dataTable="filtered"
        :isRowClickable="true"
        @onRowClick="handleRowClick"
        :emptyState="{
          description: 'No records found',
          subDescription: 'Try a different employee name.',
          image: 'employees',
          size: 'large',
        }"
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

    <!-- ── Attendance detail sidepanel ───────────────────────────────────────── -->
    <spr-sidepanel
      :isOpen="panelOpen"
      :headerTitle="selectedRec?.employee ?? 'Attendance Detail'"
      :headerSubtitle="selectedRec?.position ?? ''"
      size="md"
      @close="closePanel"
    >
      <template #default>
        <div v-if="selectedRec" class="am-detail">

          <!-- Status badge at top of panel -->
          <div class="am-detail__status-row">
            <spr-lozenge
              :label="selectedRec.status"
              :tone="statusTone(selectedRec.status)"
              :fill="statusFill(selectedRec.status)"
            />
          </div>

          <!-- Date + day -->
          <div class="am-detail__section">
            <div class="am-detail__section-title">Date</div>
            <div class="am-detail__grid">
              <div class="am-detail__row">
                <span class="am-detail__label">Date</span>
                <span class="am-detail__value">{{ selectedRec.date }}</span>
              </div>
              <div class="am-detail__row">
                <span class="am-detail__label">Day</span>
                <span class="am-detail__value">{{ selectedRec.day }}</span>
              </div>
            </div>
          </div>

          <!-- Time records -->
          <div class="am-detail__section">
            <div class="am-detail__section-title">Time Records</div>
            <div class="am-detail__grid">
              <div class="am-detail__row">
                <span class="am-detail__label">Time In</span>
                <span class="am-detail__value" :class="{ 'am-detail__value--late': selectedRec.status === 'Late' }">
                  {{ selectedRec.timeIn || '—' }}
                </span>
              </div>
              <div class="am-detail__row">
                <span class="am-detail__label">Time Out</span>
                <span class="am-detail__value">{{ selectedRec.timeOut || '—' }}</span>
              </div>
              <div class="am-detail__row">
                <span class="am-detail__label">Break</span>
                <span class="am-detail__value">
                  {{ selectedRec.breakMin ? `${selectedRec.breakMin} mins` : '—' }}
                </span>
              </div>
              <div class="am-detail__row am-detail__row--total">
                <span class="am-detail__label">Total Hours</span>
                <span class="am-detail__value am-detail__value--bold">
                  {{ selectedRec.hoursWorked ? `${selectedRec.hoursWorked.toFixed(2)} hrs` : '—' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Remarks — only shown if present -->
          <div v-if="selectedRec.remarks" class="am-detail__section">
            <div class="am-detail__section-title">Remarks</div>
            <p class="am-detail__remarks">{{ selectedRec.remarks }}</p>
          </div>

        </div>
      </template>

      <template #footer>
        <spr-button variant="secondary" @click="closePanel">
          Close
        </spr-button>
      </template>
    </spr-sidepanel>

  </div>
</template>

<style scoped>
.am-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
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
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
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

.am-search {
  width: 280px;
  flex-shrink: 0;
}

/* ── Summary chips ───────────────────────────────────────────────────────── */
.am-summary {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.am-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid;
  font-size: 13px;
}

.am-chip__count {
  font-weight: 700;
  font-size: 15px;
}

.am-chip__label {
  font-weight: 500;
}

.am-chip--present  { background: #f0fdf4; border-color: #bbf7d0; color: #14532b; }
.am-chip--late     { background: #fffbeb; border-color: #fde68a; color: #78350f; }
.am-chip--absent   { background: #fef2f2; border-color: #fecaca; color: #7f1d1d; }
.am-chip--halfday  { background: #eff6ff; border-color: #bfdbfe; color: #1e3a5f; }
.am-chip--leave    { background: #eff1f1; border-color: #d9dede; color: #4c5857; }

/* ── Table ───────────────────────────────────────────────────────────────── */
.am-table-wrap {
  height: 580px;
  width: 100%;
}

/* ── Sidepanel detail ────────────────────────────────────────────────────── */
.am-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 4px 0;
}

.am-detail__status-row {
  display: flex;
  align-items: center;
}

.am-detail__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.am-detail__section-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #5d6c6b;
  padding-bottom: 4px;
  border-bottom: 1px solid #eff1f1;
}

.am-detail__grid {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.am-detail__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f6f6;
  font-size: 14px;
}

.am-detail__row:last-child {
  border-bottom: none;
}

.am-detail__row--total {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px solid #d9dede;
  border-bottom: none;
}

.am-detail__label {
  color: #5d6c6b;
  font-size: 13px;
}

.am-detail__value {
  color: #262b2b;
  font-size: 14px;
}

.am-detail__value--bold {
  font-weight: 700;
  color: #00291b;
}

.am-detail__value--late {
  color: #d97706;
  font-weight: 600;
}

.am-detail__remarks {
  font-size: 13px;
  color: #5d6c6b;
  background: #eff1f1;
  border-left: 3px solid #b8c1c0;
  padding: 10px 14px;
  border-radius: 0 4px 4px 0;
  margin: 0;
  line-height: 1.6;
}
</style>
