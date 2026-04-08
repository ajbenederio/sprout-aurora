<script setup lang="ts">
import { ref, computed } from 'vue'

// ─── Form state ─────────────────────────────────────────────────────────────
const dateRange  = ref({ startDate: '', endDate: '' })
const leaveType  = ref('')
const reason     = ref('')

// ─── Submission state ────────────────────────────────────────────────────────
const submitted  = ref(false)  // true after first submit attempt — enables live validation
const isSuccess  = ref(false)

// ─── Leave type options ──────────────────────────────────────────────────────
const leaveTypeOptions = [
  { text: 'Vacation Leave (VL)',          value: 'VL'   },
  { text: 'Sick Leave (SL)',              value: 'SL'   },
  { text: 'Emergency Leave',              value: 'EL'   },
  { text: 'Bereavement Leave',            value: 'BL'   },
  { text: 'Maternity Leave',              value: 'ML'   },
  { text: 'Paternity Leave',              value: 'PL'   },
  { text: 'Service Incentive Leave (SIL)',value: 'SIL'  },
]

// ─── Validation ──────────────────────────────────────────────────────────────
const errors = computed(() => ({
  dateRange: submitted.value && (!dateRange.value.startDate || !dateRange.value.endDate),
  leaveType: submitted.value && !leaveType.value,
  reason:    submitted.value && reason.value.trim().length < 10,
}))

const isValid = computed(() =>
  !!dateRange.value.startDate &&
  !!dateRange.value.endDate &&
  !!leaveType.value &&
  reason.value.trim().length >= 10
)

// ─── Leave duration display ──────────────────────────────────────────────────
const leaveDuration = computed(() => {
  const { startDate, endDate } = dateRange.value
  if (!startDate || !endDate) return null
  const start = new Date(startDate)
  const end   = new Date(endDate)
  const diff  = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return diff === 1 ? '1 day' : `${diff} days`
})

// ─── Handlers ────────────────────────────────────────────────────────────────
function handleSubmit() {
  submitted.value = true
  if (!isValid.value) return

  // Simulate submission success
  isSuccess.value = true
}

function handleReset() {
  dateRange.value  = { startDate: '', endDate: '' }
  leaveType.value  = ''
  reason.value     = ''
  submitted.value  = false
  isSuccess.value  = false
}
</script>

<template>
  <div class="lrf-page">

    <!-- Page header -->
    <div class="lrf-header">
      <div class="lrf-header__eyebrow">Self Service</div>
      <h1 class="lrf-header__title">File a Leave Request</h1>
      <p class="lrf-header__subtitle">
        Submit your leave request for approval. Make sure dates don't overlap with existing approved requests.
      </p>
    </div>

    <!-- ── Success state ────────────────────────────────────────────────────── -->
    <div v-if="isSuccess" class="lrf-success">
      <div class="lrf-success__icon">✓</div>
      <div class="lrf-success__body">
        <p class="lrf-success__title">Leave request submitted</p>
        <p class="lrf-success__desc">
          Your request has been sent to your manager for approval.
          You'll receive a notification once it's reviewed.
        </p>
      </div>
      <spr-button @click="handleReset">File another request</spr-button>
    </div>

    <!-- ── Form ─────────────────────────────────────────────────────────────── -->
    <div v-else class="lrf-card">

      <!-- Date range -->
      <div class="lrf-field">
        <spr-date-range-picker
          id="leave-date-range"
          v-model="dateRange"
          label="Leave Dates"
          width="100%"
          :error="errors.dateRange"
          :displayHelper="errors.dateRange"
          helperText="Please select both a start and end date"
        />
        <p v-if="leaveDuration && !errors.dateRange" class="lrf-duration-hint">
          Duration: <strong>{{ leaveDuration }}</strong>
        </p>
      </div>

      <!-- Leave type -->
      <div class="lrf-field">
        <spr-select
          id="leave-type"
          v-model="leaveType"
          :options="leaveTypeOptions"
          textField="text"
          valueField="value"
          label="Leave Type"
          placeholder="Select leave type..."
          :clearable="true"
          :error="errors.leaveType"
          :displayHelper="errors.leaveType"
          helperText="Please select a leave type"
        />
      </div>

      <!-- Reason -->
      <div class="lrf-field">
        <spr-textarea
          id="leave-reason"
          v-model="reason"
          label="Reason for Leave"
          supportingLabel="Required"
          placeholder="Briefly describe the reason for your leave request..."
          :rows="5"
          :error="errors.reason"
          :hasCounter="true"
          :maxLength="500"
        >
          <template #helperMessage>
            <span v-if="errors.reason" class="lrf-error-msg">
              {{ reason.trim().length === 0
                  ? 'Please provide a reason for your leave.'
                  : 'Reason must be at least 10 characters.' }}
            </span>
          </template>
        </spr-textarea>
      </div>

      <!-- Policy reminder -->
      <div class="lrf-reminder">
        <span class="lrf-reminder__icon">ℹ</span>
        <p class="lrf-reminder__text">
          Vacation and emergency leaves require at least 3 working days' advance notice.
          Sick leave may be filed on the day of absence with supervisor notification by 9:00 AM.
        </p>
      </div>

      <!-- Actions -->
      <div class="lrf-actions">
        <spr-button
          variant="tertiary"
          @click="handleReset"
        >
          Clear form
        </spr-button>
        <spr-button
          tone="success"
          @click="handleSubmit"
        >
          Submit request
        </spr-button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.lrf-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 32px 80px;
  font-family: 'Rubik', sans-serif;
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.lrf-header {
  margin-bottom: 32px;
}

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
  margin: 0 0 10px;
  line-height: 1.25;
}

.lrf-header__subtitle {
  font-size: 14px;
  color: #5d6c6b;
  line-height: 1.6;
  margin: 0;
}

/* ── Card ───────────────────────────────────────────────────────────────── */
.lrf-card {
  background: #fff;
  border: 1px solid #d9dede; /* mushroom-200 */
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Fields ─────────────────────────────────────────────────────────────── */
.lrf-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lrf-duration-hint {
  font-size: 13px;
  color: #5d6c6b;
  margin: 0;
}

.lrf-duration-hint strong {
  color: #158039;
}

.lrf-error-msg {
  font-size: 12px;
  color: #da2f38; /* tomato-600 */
}

/* ── Policy reminder ────────────────────────────────────────────────────── */
.lrf-reminder {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f0fdf4; /* kangkong-50 */
  border: 1px solid #bbf7ce; /* kangkong-200 */
  border-radius: 6px;
  padding: 12px 16px;
}

.lrf-reminder__icon {
  font-size: 16px;
  color: #158039;
  flex-shrink: 0;
  line-height: 1.5;
}

.lrf-reminder__text {
  font-size: 13px;
  color: #14532b; /* kangkong-900 */
  line-height: 1.6;
  margin: 0;
}

/* ── Actions ────────────────────────────────────────────────────────────── */
.lrf-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid #eff1f1; /* mushroom-50 */
}

/* ── Success state ──────────────────────────────────────────────────────── */
.lrf-success {
  background: #fff;
  border: 1px solid #bbf7ce; /* kangkong-200 */
  border-radius: 8px;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.lrf-success__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dcfce6; /* kangkong-100 */
  color: #158039;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lrf-success__body {
  flex: 1;
}

.lrf-success__title {
  font-size: 16px;
  font-weight: 600;
  color: #00291b;
  margin: 0 0 6px;
}

.lrf-success__desc {
  font-size: 14px;
  color: #5d6c6b;
  line-height: 1.6;
  margin: 0;
}
</style>
