<script setup>
import { ref, computed, watch } from 'vue'

// Research anchor: DI-1 (template download primary CTA), DI-2 (single-pass error table),
// DI-3 (persistent download error log CTA), DI-5 (progress indicator during processing)
// FP-1 (download-fix-reupload loop), FP-2 (opaque errors), FP-3 (Excel format destruction),
// FP-4 (constrained value surprise)

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'uploaded'])

// ── State machine ──────────────────────────────────────────────────────────────
// 'upload' → 'validating' → 'errors' | 'success'
const uploadState = ref('upload')
const uploadedFiles = ref([])
const progressValue = ref(0)
// demoToggle lets reviewers switch between error/success outcomes
const demoToggle = ref('errors')
let progressTimer = null

watch(() => props.modelValue, (val) => { if (val) resetModal() })

function resetModal() {
  uploadState.value = 'upload'
  uploadedFiles.value = []
  progressValue.value = 0
  clearProgress()
}

function closeModal() {
  clearProgress()
  emit('update:modelValue', false)
}

function clearProgress() {
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null }
}

// ── Stepper ────────────────────────────────────────────────────────────────────
const wizardSteps = computed(() => [
  {
    number: 1, label: 'Upload',
    status: uploadState.value === 'upload' ? 'active' : 'completed',
  },
  {
    number: 2, label: 'Validate',
    status: uploadState.value === 'validating'
      ? 'active'
      : uploadState.value === 'upload'
        ? 'pending'
        : 'completed',
  },
  {
    number: 3, label: 'Done',
    status: ['errors', 'success'].includes(uploadState.value) ? 'active' : 'pending',
  },
])

// ── Validation simulation ──────────────────────────────────────────────────────
// Research anchor: DI-5 — progress with row count feedback prevents abandoned uploads (FP-1)
function startValidation() {
  uploadState.value = 'validating'
  progressValue.value = 0
  progressTimer = setInterval(() => {
    progressValue.value = Math.min(progressValue.value + 4, 100)
    if (progressValue.value >= 100) {
      clearProgress()
      setTimeout(() => { uploadState.value = demoToggle.value }, 400)
    }
  }, 70)
}

function reUpload() {
  uploadState.value = 'upload'
  uploadedFiles.value = []
}

function handleDone() {
  emit('uploaded', { committed: committedCount.value })
  closeModal()
}

// ── Mock data ──────────────────────────────────────────────────────────────────
// Research anchor: DI-2 — error table: row number + field + plain-language message (FP-2)
const TOTAL_ROWS = 25

const errorRows = [
  { row: 6,  field: 'TIN',               message: 'Invalid format — expected 000-000-000-000',                              fix: 'Re-enter as 123-456-789-000' },
  { row: 12, field: 'Hire Date',          message: 'Required field is blank',                                                 fix: 'Enter a valid hire date (MM/DD/YYYY)' },
  { row: 19, field: 'Tax Classification', message: '"Full Time" is not an allowed value',                                    fix: 'Use: Standard, Minimum Wage Earner, ROHQ, or Consultant' },
]

const committedCount = computed(() => TOTAL_ROWS - errorRows.length)

// For SprTable error display (desktop has the width)
const errorTableHeaders = [
  { field: 'row',     name: 'Row #',   width: '80px' },
  { field: 'field',   name: 'Field',   width: '180px' },
  { field: 'message', name: 'Error message' },
  { field: 'fix',     name: 'Suggested fix' },
]

const errorTableData = errorRows.map(e => ({
  row:     { title: `Row ${e.row}` },
  field:   { title: e.field },
  message: { title: e.message },
  fix:     { title: e.fix },
}))

const staticBackdrop = computed(() => uploadState.value === 'validating')
</script>

<template>
  <!-- Research anchor: PRD §Design — modal entry point from Employee Hub -->
  <SprModal
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Bulk Upload Employees"
    size="xl"
    :has-footer="true"
    :close-button-x="uploadState !== 'validating'"
    :static-backdrop="staticBackdrop"
  >

    <!-- ── Modal body ──────────────────────────────────────────────────────── -->
    <template #default>
      <div class="modal-body">

        <!-- Stepper (all states) -->
        <div class="stepper-wrap">
          <SprStepper
            variant="horizontal"
            :steps="wizardSteps"
            :has-lines="true"
            type="solid"
          />
        </div>

        <!-- ── STEP 1: Upload ──────────────────────────────────────────────── -->
        <div v-if="uploadState === 'upload'" class="step-content step-upload">

          <!-- Left column: template download -->
          <!-- Research anchor: DI-1 — template download is primary CTA on first open (FP-4) -->
          <div class="upload-col upload-col--left">
            <div class="section-label">Step 1 — Download Template</div>

            <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
              <template #content>
                <div class="template-card">
                  <div class="template-icon">📄</div>
                  <div class="template-info">
                    <p class="template-title">Employee Upload Template</p>
                    <p class="template-desc">
                      Excel + CSV format. Includes required/optional column markers,
                      a sample data row, and a <strong>Reference Sheet</strong> tab
                      listing all allowed values for dropdown fields.
                    </p>
                    <!-- Research anchor: DI-4 — reference sheet for constrained values (FP-4) -->
                    <ul class="template-fields">
                      <li>Personal Info, Work Info, Government Info</li>
                      <li>Compensation &amp; Payroll Info</li>
                      <li>Account Settings</li>
                    </ul>
                  </div>
                  <SprButton tone="success" variant="primary" size="medium" @click.prevent="() => {}">
                    Download
                  </SprButton>
                </div>
              </template>
            </SprCard>

            <!-- Research anchor: FP-3 — Excel format destruction warning -->
            <div class="hint-box">
              <span class="hint-icon">💡</span>
              <div class="hint-text">
                <strong>Excel tip:</strong> Format numeric columns (contact numbers, IDs)
                as <em>Text</em> before entering data to prevent Excel from stripping
                leading zeros. Save as <strong>.xlsx</strong> or <strong>UTF-8 CSV</strong>.
              </div>
            </div>
          </div>

          <!-- Right column: file upload -->
          <div class="upload-col upload-col--right">
            <div class="section-label">Step 2 — Upload Completed File</div>

            <!-- Research anchor: FP-1 — file upload zone; drag-drop + browse fallback -->
            <SprFileUpload
              v-model="uploadedFiles"
              type="center"
              title="Drop your .xlsx or .csv file here"
              :show-supported-file-type-label="true"
              supported-file-type-label=".xlsx, .csv · Max 10 MB · Up to 500 rows"
              :max-file-size="10"
              :multiple="false"
            />

            <!-- Demo toggle (prototype only) -->
            <div class="demo-toggle">
              <span class="demo-label">Demo outcome:</span>
              <button class="demo-btn" :class="{ active: demoToggle === 'errors' }" @click="demoToggle = 'errors'">
                Show errors
              </button>
              <button class="demo-btn" :class="{ active: demoToggle === 'success' }" @click="demoToggle = 'success'">
                Show success
              </button>
            </div>
          </div>

        </div>

        <!-- ── STEP 2: Validating ──────────────────────────────────────────── -->
        <!-- Research anchor: DI-5 — progress indicator with row count feedback (FP-1) -->
        <div v-else-if="uploadState === 'validating'" class="step-content step-center">
          <div class="validating-wrap">
            <div class="validating-icon">⚙</div>
            <div class="validating-text">
              <p class="text-lg-bold">Validating file…</p>
              <p class="text-sm-muted">Checking {{ TOTAL_ROWS }} records — do not close this window</p>
            </div>
            <div class="progress-wrap">
              <SprProgressBar
                size="lg"
                :value="progressValue"
                :max="100"
                color="success"
                label-placement="right"
              />
            </div>
          </div>
        </div>

        <!-- ── STEP 3a: Errors ─────────────────────────────────────────────── -->
        <!-- Research anchor: DI-2 — single-pass error table: row + field + message (FP-2) -->
        <!-- Research anchor: DI-3 — persistent download error log (FP-1) -->
        <div v-else-if="uploadState === 'errors'" class="step-content">

          <!-- Summary row -->
          <div class="result-summary">
            <div class="result-badges">
              <SprLozenge :label="`${committedCount} of ${TOTAL_ROWS} rows committed`" tone="success" :fill="true" />
              <SprLozenge :label="`${errorRows.length} rows failed`" tone="danger" :fill="true" />
            </div>
            <!-- Research anchor: DI-3 — download error log CTA persists throughout error review -->
            <SprButton tone="neutral" variant="secondary" size="small" @click="() => {}">
              ↓ Download Error Log
            </SprButton>
          </div>

          <!-- Info bar: partial import confirmation -->
          <div class="info-bar">
            <span class="info-icon">✓</span>
            <span class="info-text">
              <strong>{{ committedCount }} valid records were committed</strong> and are now active in Sprout HR.
              Download the error log, correct the {{ errorRows.length }} failed rows, and re-upload only those rows.
            </span>
          </div>

          <!-- Error table (desktop has the width for SprTable) -->
          <SprTable
            :headers="errorTableHeaders"
            :data-table="errorTableData"
            variant="white"
            :full-height="false"
            :loading="false"
          />

        </div>

        <!-- ── STEP 3b: Success ───────────────────────────────────────────── -->
        <div v-else-if="uploadState === 'success'" class="step-content step-center">
          <div class="success-wrap">
            <div class="success-icon">✓</div>
            <div class="success-text">
              <p class="text-lg-bold">{{ TOTAL_ROWS }} employees added successfully</p>
              <p class="text-sm-muted">All records are committed and synced to Sprout HR and Sprout Payroll.</p>
            </div>
          </div>

          <SprCard tone="success" :show-header="false" :show-footer="false" border-radius-size="lg" style="width:100%">
            <template #content>
              <div class="success-list">
                <div v-for="(emp, i) in [
                  { init: 'MS', name: 'Maria Santos',    role: 'Operations Manager' },
                  { init: 'JR', name: 'Jose Reyes',       role: 'Finance Analyst' },
                  { init: 'AC', name: 'Ana Cruz',          role: 'HR Coordinator' },
                ]" :key="i" class="success-emp">
                  <div class="success-emp-avatar">{{ emp.init }}</div>
                  <div class="success-emp-info">
                    <span class="emp-name-sm">{{ emp.name }}</span>
                    <span class="emp-role-sm">{{ emp.role }}</span>
                  </div>
                  <SprLozenge label="Added" tone="success" />
                </div>
                <p class="success-more">+ {{ TOTAL_ROWS - 3 }} more employees — invite emails sent to all</p>
              </div>
            </template>
          </SprCard>
        </div>

      </div>
    </template>

    <!-- ── Modal footer ────────────────────────────────────────────────────── -->
    <template #footer>
      <div class="footer-row">

        <!-- Step 1 -->
        <template v-if="uploadState === 'upload'">
          <SprButton tone="neutral" variant="tertiary" size="medium" @click="closeModal">Cancel</SprButton>
          <SprButton
            tone="success" variant="primary" size="medium"
            :disabled="uploadedFiles.length === 0"
            @click="startValidation"
          >Start Validation</SprButton>
        </template>

        <!-- Step 2 -->
        <template v-else-if="uploadState === 'validating'">
          <span class="validating-label">Validating {{ TOTAL_ROWS }} records…</span>
        </template>

        <!-- Step 3a: errors -->
        <!-- Research anchor: DI-3 — re-upload path kept accessible after error review (FP-1) -->
        <template v-else-if="uploadState === 'errors'">
          <SprButton tone="neutral" variant="tertiary" size="medium" @click="() => {}">Download Error Log</SprButton>
          <SprButton tone="success" variant="primary" size="medium" @click="reUpload">Correct &amp; Re-upload</SprButton>
        </template>

        <!-- Step 3b: success -->
        <template v-else-if="uploadState === 'success'">
          <SprButton tone="neutral" variant="secondary" size="medium" @click="reUpload">Upload More</SprButton>
          <SprButton tone="success" variant="primary" size="medium" @click="handleDone">View Employees</SprButton>
        </template>

      </div>
    </template>

  </SprModal>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Rubik', system-ui, sans-serif;
  min-height: 360px;
}

.stepper-wrap {
  padding: 4px 0 8px;
  border-bottom: 1px solid #e6eaea;
  padding-bottom: 20px;
}

.step-content { display: flex; flex-direction: column; gap: 16px; }
.step-center  { align-items: center; justify-content: center; min-height: 320px; }

/* ── Section label ── */
.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  margin-bottom: 8px;
}

/* ── Upload step two-col layout ── */
.step-upload {
  flex-direction: row !important;
  gap: 24px;
  align-items: flex-start;
}

.upload-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-col--left  { flex: 1.1; }
.upload-col--right { flex: 1; }

/* ── Template card ── */
.template-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
}

.template-icon { font-size: 28px; flex-shrink: 0; margin-top: 2px; }

.template-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }

.template-title {
  font-size: 14px;
  font-weight: 600;
  color: #00291b;
}

.template-desc {
  font-size: 13px;
  color: #5d6c6b;
  line-height: 1.5;
}

.template-fields {
  font-size: 12px;
  color: #738482;
  padding-left: 16px;
  line-height: 1.8;
}

/* ── Hint box ── */
.hint-box {
  display: flex;
  gap: 10px;
  background: #fffaec;
  border: 1px solid #ffe5a5;
  border-radius: 8px;
  padding: 12px 14px;
}

.hint-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }

.hint-text {
  font-size: 12px;
  color: #7c4209;
  line-height: 1.5;
}

/* ── Demo toggle ── */
.demo-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f1f2f3;
  border: 1px dashed #b8c1c0;
  border-radius: 8px;
}

.demo-label { font-size: 12px; color: #5d6c6b; }

.demo-btn {
  font-size: 12px;
  font-family: 'Rubik', system-ui, sans-serif;
  padding: 3px 10px;
  border-radius: 5px;
  border: 1px solid #b8c1c0;
  background: #fff;
  cursor: pointer;
  color: #5d6c6b;
}

.demo-btn.active { background: #00291b; color: #fff; border-color: #00291b; }

/* ── Validating step ── */
.validating-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 0;
  width: 100%;
}

.validating-icon {
  font-size: 48px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.validating-text { text-align: center; display: flex; flex-direction: column; gap: 4px; }

.progress-wrap { width: 400px; }

.text-lg-bold { font-size: 18px; font-weight: 700; color: #00291b; }
.text-sm-muted { font-size: 13px; color: #5d6c6b; }

/* ── Error step ── */
.result-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result-badges { display: flex; align-items: center; gap: 8px; }

.info-bar {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7ce;
  border-radius: 8px;
  padding: 12px 16px;
}

.info-icon { color: #158039; font-size: 15px; flex-shrink: 0; margin-top: 1px; }

.info-text { font-size: 13px; color: #14532b; line-height: 1.5; }

/* ── Success step ── */
.success-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  width: 100%;
}

.success-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #158039;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success-text { display: flex; flex-direction: column; gap: 4px; }

.success-list {
  padding: 8px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.success-emp {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #d9fce6;
}

.success-emp:last-of-type { border-bottom: none; }

.success-emp-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #158039;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success-emp-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.emp-name-sm { font-size: 13px; font-weight: 600; color: #00291b; }
.emp-role-sm { font-size: 12px; color: #5d6c6b; }

.success-more {
  font-size: 12px;
  color: #5d6c6b;
  padding-top: 10px;
  text-align: center;
}

/* ── Footer ── */
.footer-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.validating-label {
  font-size: 13px;
  color: #5d6c6b;
}
</style>
