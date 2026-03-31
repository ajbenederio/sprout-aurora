<script setup>
import { ref } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { navigate, goBack } = useNav()

const wizardSteps = ref([
  { number: 1, label: 'Configure', status: 'completed' },
  { number: 2, label: 'Compute',   status: 'completed' },
  { number: 3, label: 'Review',    status: 'active'    },
  { number: 4, label: 'Approve',   status: 'pending'   },
])

const complianceChanges = ref([
  {
    id: 'sss',
    source: 'SSS (RA 11199)',
    description: 'Monthly contribution rates increased. Employee share +₱75–₱125 depending on salary bracket.',
    impact: '+₱8,640',
  },
  {
    id: 'philhealth',
    source: 'PhilHealth',
    description: 'Premium rate increased to 5% of monthly basic salary.',
    impact: '+₱3,840',
  },
])

const topVariance = ref([
  { name: 'Maria Santos',  reason: 'SSS + PhilHealth rate change',    delta: 8640,  type: 'Compliance'   },
  { name: 'Jose Reyes',    reason: 'Overtime — 12 hrs extra',          delta: 4200,  type: 'Overtime'     },
  { name: 'Ana Cruz',      reason: 'Leave without pay — 2 days',       delta: -3600, type: 'Leave'        },
  { name: 'Carlo Mendoza', reason: 'Night differential adjustment',    delta: 2100,  type: 'Differential' },
])

const breakdown = ref([
  { label: 'Basic Salaries',     value: '₱1,920,000', isDeduction: false },
  { label: 'Overtime Pay',       value: '₱48,200',    isDeduction: false },
  { label: 'Night Differential', value: '₱24,800',    isDeduction: false },
  { label: 'SSS Contributions',  value: '₱48,240',    isDeduction: true  },
  { label: 'PhilHealth',         value: '₱24,120',    isDeduction: true  },
  { label: 'Pag-IBIG',           value: '₱9,600',     isDeduction: true  },
  { label: 'Withholding Tax',    value: '₱316,800',   isDeduction: true  },
])

const showApproveModal = ref(false)
const isApproving = ref(false)

const fmt = (n) => {
  const a = Math.abs(n)
  if (a >= 1000) return `₱${(a / 1000).toFixed(1)}K`
  return `₱${a.toLocaleString()}`
}

const approveRun = async () => {
  isApproving.value = true
  await new Promise((r) => setTimeout(r, 1500))
  isApproving.value = false
  showApproveModal.value = false
  navigate('government-filing')
}
</script>

<template>
  <div class="screen">

    <!-- iOS Status Bar — no DS component for native chrome -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <button class="back-btn" @click="goBack()">‹ Payroll</button>
      <h1 class="page-title">Review Payroll</h1>
    </div>

    <!-- Wizard Stepper Strip -->
    <div class="stepper-strip">
      <SprStepper
        variant="horizontal"
        :steps="wizardSteps"
        :has-lines="true"
        type="solid"
      />
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- This Run stats — 3 SprCards in a row -->
      <div class="section">
        <div class="section-label">This Run — Mar 1–15, 2026</div>
        <div class="stat-row">
          <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" class="stat-card">
            <template #content>
              <div class="stat-value">48</div>
              <div class="stat-label">Employees</div>
            </template>
          </SprCard>
          <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" class="stat-card">
            <template #content>
              <div class="stat-value">₱2.19M</div>
              <div class="stat-label">Gross Pay</div>
            </template>
          </SprCard>
          <SprCard tone="caution" :show-header="false" :show-footer="false" border-radius-size="lg" class="stat-card">
            <template #content>
              <div class="stat-value stat-value--sm">+₱16.6K</div>
              <div class="stat-label">vs Last Run</div>
            </template>
          </SprCard>
        </div>
      </div>

      <!-- Compliance Changes -->
      <div class="section">
        <SprCard tone="caution" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="compliance-inner">
              <strong class="compliance-title">⚠ Compliance changes applied to this run</strong>
              <div
                v-for="change in complianceChanges"
                :key="change.id"
                class="compliance-row"
              >
                <div class="compliance-left">
                  <span class="compliance-source">{{ change.source }}</span>
                  <span class="compliance-desc">{{ change.description }}</span>
                </div>
                <span class="compliance-impact">{{ change.impact }}</span>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Top Variance Drivers -->
      <div class="section">
        <div class="section-label">Top Changes vs Last Run</div>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(emp, i) in topVariance"
              :key="emp.name"
              class="emp-row"
              :class="{ 'emp-row--divider': i < topVariance.length - 1 }"
            >
              <div class="emp-left">
                <span class="emp-name">{{ emp.name }}</span>
                <span class="emp-reason">{{ emp.reason }}</span>
              </div>
              <div class="emp-right">
                <span class="emp-delta" :class="emp.delta > 0 ? 'emp-delta--up' : 'emp-delta--down'">
                  {{ emp.delta > 0 ? '+' : '-' }}{{ fmt(emp.delta) }}
                </span>
                <SprLozenge
                  :label="emp.type"
                  :tone="emp.delta > 0 ? 'caution' : 'neutral'"
                />
              </div>
            </div>
          </template>
        </SprCard>
        <button class="see-all-btn" @click="navigate('employee-list')">See all 48 employees ›</button>
      </div>

      <!-- Breakdown -->
      <div class="section">
        <div class="section-label">Breakdown</div>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(row, i) in breakdown"
              :key="row.label"
              class="breakdown-row"
              :class="{ 'breakdown-row--divider': i < breakdown.length - 1 }"
            >
              <span class="breakdown-label">{{ row.label }}</span>
              <span class="breakdown-value" :class="{ 'breakdown-value--deduction': row.isDeduction }">
                {{ row.isDeduction ? '-' : '' }}{{ row.value }}
              </span>
            </div>
          </template>
        </SprCard>
      </div>

      <div style="height:120px"></div>
    </div>

    <!-- Fixed Footer -->
    <div class="footer">
      <div class="footer-meta">
        <span class="footer-period">Mar 1–15, 2026 · 1st Half</span>
        <SprLozenge label="Ready to approve" tone="success" :fill="true" />
      </div>
      <SprButton
        tone="success"
        variant="primary"
        size="large"
        :fullwidth="true"
        @click="showApproveModal = true"
      >
        Approve Payroll Run
      </SprButton>
    </div>

    <!-- Approve Confirmation — in-screen overlay (SprModal avoided: teleports to <body>, breaks 430px shell) -->
    <div v-if="showApproveModal" class="overlay" @click.self="showApproveModal = false">
      <div class="overlay-dialog">
        <h2 class="overlay-title">Approve Payroll Run?</h2>
        <div class="modal-body">
          <p class="modal-text">
            You're about to approve the <strong>Mar 1–15, 2026 (1st Half)</strong> payroll run
            for <strong>48 employees</strong> totaling <strong>₱2,193,440</strong>.
          </p>
          <p class="modal-text modal-text--muted">
            This action cannot be undone. Payslips will be generated and government
            contributions (SSS, PhilHealth, Pag-IBIG) will be queued for remittance.
          </p>
        </div>
        <div class="modal-footer">
          <SprButton tone="neutral" variant="secondary" size="medium" :fullwidth="true" @click="showApproveModal = false">
            Cancel
          </SprButton>
          <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" :disabled="isApproving" @click="approveRun">
            {{ isApproving ? 'Approving…' : 'Yes, Approve' }}
          </SprButton>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.screen {
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: 'Rubik', system-ui, sans-serif;
  overflow: hidden;
  position: relative;
}

/* ─── Status Bar ─────────────────────────────── */
.status-bar {
  height: 59px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
  flex-shrink: 0;
}
.status-time {
  font-family: 'SF Pro Text', system-ui, sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #000;
  letter-spacing: -0.24px;
}
.status-icons {
  display: flex;
  gap: 6px;
  font-family: 'SF Pro Text', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
}

/* ─── Page Header ────────────────────────────── */
.page-header {
  background: #fff;
  padding: 10px 16px 14px;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
}
.back-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #158039;
  cursor: pointer;
  font-family: inherit;
  margin-bottom: 4px;
  display: block;
}
.page-title { font-size: 20px; font-weight: 600; color: #00291b; margin: 0; }

/* ─── Stepper Strip ──────────────────────────── */
.stepper-strip {
  background: #fff;
  padding: 12px 20px;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
}

/* ─── Scrollable Content ─────────────────────── */
.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f1f2f3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.content::-webkit-scrollbar { display: none; }

.section { display: flex; flex-direction: column; gap: 0; }
.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  margin-bottom: 6px;
  padding-left: 2px;
}

/* ─── Stat Row ───────────────────────────────── */
.stat-row { display: flex; gap: 8px; }
.stat-card { flex: 1; text-align: center; }
.stat-value { font-size: 18px; font-weight: 700; color: #00291b; }
.stat-value--sm { font-size: 15px; }
.stat-label { font-size: 11px; color: #5d6c6b; margin-top: 3px; }

/* ─── Compliance Card ────────────────────────── */
.compliance-inner { display: flex; flex-direction: column; gap: 10px; }
.compliance-title { font-size: 13px; color: #92400e; }
.compliance-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.compliance-left { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.compliance-source { font-size: 12px; font-weight: 600; color: #00291b; }
.compliance-desc { font-size: 12px; color: #5d6c6b; line-height: 1.4; }
.compliance-impact { font-size: 13px; font-weight: 600; color: #92400e; white-space: nowrap; }

/* ─── Employee Variance Rows ─────────────────── */
.emp-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
}
.emp-row--divider { border-bottom: 1px solid #f1f2f3; }
.emp-left { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.emp-name { font-size: 13px; font-weight: 500; color: #00291b; }
.emp-reason { font-size: 11px; color: #5d6c6b; }
.emp-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.emp-delta { font-size: 13px; font-weight: 600; }
.emp-delta--up { color: #92400e; }
.emp-delta--down { color: #158039; }

.see-all-btn {
  background: none;
  border: none;
  padding: 8px 2px 0;
  font-size: 13px;
  color: #158039;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
}

/* ─── Breakdown Rows ─────────────────────────── */
.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
}
.breakdown-row--divider { border-bottom: 1px solid #f1f2f3; }
.breakdown-label { font-size: 13px; color: #00291b; }
.breakdown-value { font-size: 13px; font-weight: 500; color: #00291b; }
.breakdown-value--deduction { color: #dc2626; }

/* ─── Fixed Footer ───────────────────────────── */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #e1e6e4;
  padding: 12px 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
}
.footer-meta { display: flex; justify-content: space-between; align-items: center; }
.footer-period { font-size: 12px; color: #5d6c6b; }

/* ─── In-screen Overlay (modal fallback) ─────── */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0;
}
.overlay-dialog {
  width: 100%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 24px 16px 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.overlay-title {
  font-size: 18px;
  font-weight: 600;
  color: #00291b;
  margin: 0;
}

/* ─── Modal Content ──────────────────────────── */
.modal-body { display: flex; flex-direction: column; gap: 12px; }
.modal-text { font-size: 14px; color: #00291b; line-height: 1.5; margin: 0; }
.modal-text--muted { font-size: 13px; color: #5d6c6b; }
.modal-footer { display: flex; gap: 8px; width: 100%; }
</style>
