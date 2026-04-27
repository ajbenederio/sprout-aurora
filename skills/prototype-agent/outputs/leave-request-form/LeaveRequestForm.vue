<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MinMaxYearType } from 'design-system-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface DateRange {
  startDate: string
  endDate:   string
}

// ─── Form state ───────────────────────────────────────────────────────────────
const dateRange = ref<DateRange>({ startDate: '', endDate: '' })
const leaveType = ref('')
const reason    = ref('')

// ─── UI state ─────────────────────────────────────────────────────────────────
const submitted = ref(false)
const isSuccess = ref(false)

// ─── Leave type options (string array keeps v-model as plain string) ──────────
const leaveTypeOptions = [
  'Vacation Leave',
  'Sick Leave',
  'Emergency Leave',
  'Maternity / Paternity Leave',
  'Birthday Leave',
  'Bereavement Leave',
]

// ─── Date picker year constraints ─────────────────────────────────────────────
const minMaxYear: MinMaxYearType = {
  min: new Date().getFullYear(),
  max: new Date().getFullYear() + 2,
}

// ─── Validation ───────────────────────────────────────────────────────────────
const errors = computed(() => ({
  dateRange: !dateRange.value.startDate || !dateRange.value.endDate,
  leaveType: !leaveType.value,
  reason:    reason.value.trim().length < 10,
}))

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

// ─── Derived: leave duration in calendar days ─────────────────────────────────
const leaveDuration = computed(() => {
  if (!dateRange.value.startDate || !dateRange.value.endDate) return null
  const start = new Date(dateRange.value.startDate)
  const end   = new Date(dateRange.value.endDate)
  const days  = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1
  return days > 0 ? days : null
})

// ─── Submit / reset ───────────────────────────────────────────────────────────
function handleSubmit() {
  submitted.value = true
  if (hasErrors.value) return
  isSuccess.value = true
}

function handleReset() {
  dateRange.value = { startDate: '', endDate: '' }
  leaveType.value = ''
  reason.value    = ''
  submitted.value = false
  isSuccess.value = false
}

// ─── Date formatting helper ───────────────────────────────────────────────────
function formatDate(d: string): string {
  if (!d) return ''
  const [m, day, y] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`
}
</script>

<template>
  <div class="lrf-page">

    <!-- ── Page header ───────────────────────────────────────────────────────── -->
    <div class="lrf-header">
      <div class="lrf-header__eyebrow">Leave Management</div>
      <h1 class="lrf-header__title">File a Leave Request</h1>
      <p class="lrf-header__subtitle">
        Complete all fields below. Your request will be routed to your direct supervisor for approval.
      </p>
    </div>

    <!-- ── Success state ─────────────────────────────────────────────────────── -->
    <div v-if="isSuccess" class="lrf-success">
      <div class="lrf-success__icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#dcfce6"/>
          <path d="M9 16.5L13.5 21L23 12" stroke="#158039" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="lrf-success__title">Leave Request Filed</h2>
      <p class="lrf-success__body">
        Your request has been submitted and is pending supervisor approval.
        You will receive an email notification once a decision is made.
      </p>

      <!-- Filed request summary -->
      <div class="lrf-summary">
        <div class="lrf-summary__row">
          <span class="lrf-summary__label">Leave Type</span>
          <span class="lrf-summary__value">{{ leaveType }}</span>
        </div>
        <div class="lrf-summary__row">
          <span class="lrf-summary__label">Dates</span>
          <span class="lrf-summary__value">
            {{ formatDate(dateRange.startDate) }} – {{ formatDate(dateRange.endDate) }}
            <span class="lrf-summary__days">
              ({{ leaveDuration }} day{{ leaveDuration !== 1 ? 's' : '' }})
            </span>
          </span>
        </div>
        <div class="lrf-summary__row">
          <span class="lrf-summary__label">Reason</span>
          <span class="lrf-summary__value">{{ reason }}</span>
        </div>
      </div>

      <spr-button variant="secondary" @click="handleReset">
        File another request
      </spr-button>
    </div>

    <!-- ── Form ──────────────────────────────────────────────────────────────── -->
    <form v-else class="lrf-form" @submit.prevent="handleSubmit">

      <!-- Date range — leave period -->
      <!-- displayHelper required for #helperMessage slot to render (spr-date-range-picker) -->
      <div class="lrf-field">
        <spr-date-range-picker
          id="leave-dates"
          v-model="dateRange"
          label="Leave Period"
          :minMaxYear="minMaxYear"
          :error="submitted && errors.dateRange"
          :displayHelper="submitted && errors.dateRange"
        >
          <template #helperMessage>
            <span class="lrf-error-msg">Please select both a start and end date.</span>
          </template>
        </spr-date-range-picker>

        <!-- Live duration pill — appears once both dates are selected -->
        <div v-if="leaveDuration" class="lrf-duration">
          <spr-lozenge
            :label="`${leaveDuration} day${leaveDuration !== 1 ? 's' : ''}`"
            tone="information"
          />
        </div>
      </div>

      <!-- Leave type select -->
      <spr-select
        id="leave-type"
        v-model="leaveType"
        label="Leave Type"
        placeholder="Select leave type..."
        :options="leaveTypeOptions"
        :error="submitted && errors.leaveType"
        :displayHelper="submitted && errors.leaveType"
        helperText="Please select a leave type."
        :clearable="true"
      />

      <!-- Reason textarea — #helperMessage renders without displayHelper on spr-textarea -->
      <spr-textarea
        id="leave-reason"
        v-model="reason"
        label="Reason"
        supporting-label="Required"
        placeholder="Briefly describe the reason for your leave..."
        :rows="5"
        :error="submitted && errors.reason"
        :hasCounter="true"
        :maxLength="500"
      >
        <template #helperMessage>
          <span v-if="submitted && errors.reason" class="lrf-error-msg">
            Please provide a reason (at least 10 characters).
          </span>
        </template>
      </spr-textarea>

      <!-- Validation summary banner — shown only after a failed submit attempt -->
      <div v-if="submitted && hasErrors" class="lrf-validation-banner">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="lrf-validation-banner__icon">
          <circle cx="8" cy="8" r="7.25" stroke="#b45309" stroke-width="1.5"/>
          <path d="M8 5v3.5" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="8" cy="11" r="0.75" fill="#b45309"/>
        </svg>
        Please fix the errors above before submitting.
      </div>

      <!-- Form actions -->
      <div class="lrf-actions">
        <spr-button variant="secondary" type="button" @click="handleReset">
          Clear form
        </spr-button>
        <spr-button variant="primary" tone="success" type="submit">
          Submit request
        </spr-button>
      </div>

    </form>

  </div>
</template>

<style scoped>
.lrf-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 32px 80px;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.lrf-header__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #158039;
  margin-bottom: 8px;
}

.lrf-header__title {
  font-size: 26px;
  font-weight: 700;
  color: #00291b;
  margin: 0 0 8px;
}

.lrf-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  line-height: 1.6;
  margin: 0;
}

/* ── Form ────────────────────────────────────────────────────────────────── */
.lrf-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Date field + duration pill ──────────────────────────────────────────── */
.lrf-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lrf-duration {
  display: flex;
  align-items: center;
}

/* ── Inline error text ───────────────────────────────────────────────────── */
.lrf-error-msg {
  font-size: 12px;
  color: #dc2626;
}

/* ── Validation summary banner ───────────────────────────────────────────── */
.lrf-validation-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #92400e;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 6px;
  padding: 10px 14px;
}

.lrf-validation-banner__icon {
  flex-shrink: 0;
}

/* ── Form actions ────────────────────────────────────────────────────────── */
.lrf-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}

/* ── Success state ───────────────────────────────────────────────────────── */
.lrf-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.lrf-success__icon {
  line-height: 0;
}

.lrf-success__title {
  font-size: 22px;
  font-weight: 700;
  color: #00291b;
  margin: 0;
}

.lrf-success__body {
  font-size: 14px;
  color: #5d6c6b;
  line-height: 1.6;
  margin: 0;
}

/* ── Filed request summary card ──────────────────────────────────────────── */
.lrf-summary {
  width: 100%;
  border: 1px solid #d9dede;
  border-radius: 8px;
  overflow: hidden;
}

.lrf-summary__row {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid #eff1f1;
}

.lrf-summary__row:last-child {
  border-bottom: none;
}

.lrf-summary__label {
  width: 100px;
  flex-shrink: 0;
  font-weight: 600;
  color: #4c5857;
}

.lrf-summary__value {
  color: #262b2b;
  line-height: 1.5;
}

.lrf-summary__days {
  color: #5d6c6b;
  margin-left: 4px;
}
</style>
