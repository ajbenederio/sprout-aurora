<script setup>
import { ref } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { goBack } = useNav()

// Research anchor: secondary user segment — employees checking payslips, deductions, 13th-month
// Design implication #5: plain-language guidance for non-experts at point of decision
// Whitespace opportunity: mobile-first read experience

// "What is this?" deduction expand — toggled via ref, no tooltip/accordion component needed
const expandedDeduction = ref(null)

const toggleDeduction = (id) => {
  expandedDeduction.value = expandedDeduction.value === id ? null : id
}

// Earnings — research anchor: 13th-month (RA 7641), night differential (DOLE Art. 86)
const earnings = [
  { id: 'basic',    label: 'Basic Salary',         amount: '₱25,000.00' },
  { id: 'overtime', label: 'Overtime Pay',          amount: '₱1,750.00'  },
  { id: 'nightdiff',label: 'Night Differential',    amount: '₱625.00'    },
  { id: '13th',     label: '13th Month (Prorated)', amount: '₱2,083.33'  },
]

const earningsTotal = '₱29,458.33'

// Deductions — research anchor: BIR, SSS RA 11199, PhilHealth, Pag-IBIG
// "What is this?" notes translated to plain language per implication #5
const deductions = [
  {
    id: 'sss',
    label: 'SSS Contribution',
    amount: '₱1,125.00',
    note: 'Social Security System (SSS) contributions fund your retirement, disability, sickness, and maternity benefits. Rates were updated this cycle per RA 11199 — your deduction reflects the new bracket.',
  },
  {
    id: 'philhealth',
    label: 'PhilHealth',
    amount: '₱737.50',
    note: 'PhilHealth is your national health insurance. Your share is 2.5% of your monthly basic salary. The premium rate increased to 5% this year — your employer pays the other half.',
  },
  {
    id: 'pagibig',
    label: 'Pag-IBIG Contribution',
    amount: '₱200.00',
    note: 'Pag-IBIG (Home Development Mutual Fund) supports housing loans and savings. The mandatory employee contribution is ₱100 per semi-monthly cut-off (2% of salary up to a ceiling).',
  },
  {
    id: 'tax',
    label: 'Withholding Tax',
    amount: '₱2,758.33',
    note: "Your withholding tax is computed using the annualized method under the TRAIN Law (RA 10963). It's deducted from each payroll and remitted to BIR on your behalf — you don't need to pay separately.",
  },
]

const totalDeductions = '₱4,820.83'
const netPay = '₱24,637.50'
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

    <!-- Page Header — employee name, period lozenge, back button -->
    <div class="page-header">
      <button class="back-btn" @click="goBack()">‹ Payroll</button>
      <div class="header-main-row">
        <h1 class="page-title">Maria Santos</h1>
        <SprLozenge label="Mar 1–15, 2026" tone="success" :fill="true" />
      </div>
      <p class="page-sub">Payslip · 1st Half</p>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Summary stat cards — gross, deductions, net -->
      <div class="section">
        <div class="stat-row">
          <SprCard
            tone="plain"
            :show-header="false"
            :show-footer="false"
            border-radius-size="lg"
            class="stat-card"
          >
            <template #content>
              <div class="stat-label">Gross Pay</div>
              <div class="stat-value">₱29,458</div>
            </template>
          </SprCard>
          <SprCard
            tone="plain"
            :show-header="false"
            :show-footer="false"
            border-radius-size="lg"
            class="stat-card"
          >
            <template #content>
              <div class="stat-label">Deductions</div>
              <div class="stat-value stat-value--deduction">-₱4,821</div>
            </template>
          </SprCard>
          <SprCard
            tone="success"
            :show-header="false"
            :show-footer="false"
            border-radius-size="lg"
            class="stat-card"
          >
            <template #content>
              <div class="stat-label">Net Pay</div>
              <div class="stat-value stat-value--net">₱24,638</div>
            </template>
          </SprCard>
        </div>
      </div>

      <!-- Compliance Note Banner — research anchor: implication #1 & #5, rate changes surfaced in-context -->
      <div class="section">
        <SprCard tone="caution" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="compliance-inner">
              <span class="compliance-icon">⚠</span>
              <p class="compliance-text">
                <strong>SSS and PhilHealth rates were updated this cycle.</strong>
                Your deductions reflect the new rates — no action needed on your end.
              </p>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Earnings Section -->
      <div class="section">
        <div class="section-label">Earnings</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
          :has-content-padding="false"
        >
          <template #content>
            <div
              v-for="(item, i) in earnings"
              :key="item.id"
              class="line-row"
              :class="{ 'line-row--divider': i < earnings.length - 1 }"
            >
              <span class="line-label">{{ item.label }}</span>
              <span class="line-amount">{{ item.amount }}</span>
            </div>
            <div class="line-row line-row--total">
              <span class="line-label line-label--total">Total Earnings</span>
              <span class="line-amount line-amount--total">{{ earningsTotal }}</span>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Deductions Section — research anchor: implication #5 plain-language inline notes -->
      <div class="section">
        <div class="section-label">Deductions</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
          :has-content-padding="false"
        >
          <template #content>
            <div
              v-for="(item, i) in deductions"
              :key="item.id"
              class="deduction-block"
              :class="{ 'deduction-block--divider': i < deductions.length - 1 }"
            >
              <div class="line-row">
                <span class="line-label">{{ item.label }}</span>
                <div class="deduction-right">
                  <span class="line-amount line-amount--deduction">-{{ item.amount }}</span>
                  <!-- "What is this?" toggle — ref-driven, no tooltip component needed -->
                  <button
                    class="info-btn"
                    :class="{ 'info-btn--active': expandedDeduction === item.id }"
                    @click="toggleDeduction(item.id)"
                    :aria-expanded="expandedDeduction === item.id"
                  >
                    {{ expandedDeduction === item.id ? 'Close' : 'What is this?' }}
                  </button>
                </div>
              </div>
              <!-- Inline note — plain language, expanded on tap -->
              <div v-if="expandedDeduction === item.id" class="info-note">
                {{ item.note }}
              </div>
            </div>
            <div class="line-row line-row--total">
              <span class="line-label line-label--total">Total Deductions</span>
              <span class="line-amount line-amount--deduction line-amount--total">-{{ totalDeductions }}</span>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- YTD Summary — year-to-date totals for tax and contributions -->
      <div class="section">
        <div class="section-label">Year-to-Date</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
          :has-content-padding="false"
        >
          <template #content>
            <div class="line-row line-row--divider">
              <span class="line-label">Tax Withheld</span>
              <span class="line-amount line-amount--deduction">₱8,275.00</span>
            </div>
            <div class="line-row line-row--divider">
              <span class="line-label">SSS Contributions</span>
              <span class="line-amount line-amount--deduction">₱2,700.00</span>
            </div>
            <div class="line-row line-row--divider">
              <span class="line-label">PhilHealth</span>
              <span class="line-amount line-amount--deduction">₱1,475.00</span>
            </div>
            <div class="line-row">
              <span class="line-label">Pag-IBIG</span>
              <span class="line-amount line-amount--deduction">₱400.00</span>
            </div>
          </template>
        </SprCard>
      </div>

      <div style="height:110px"></div>
    </div>

    <!-- Fixed Footer — download payslip -->
    <div class="footer">
      <div class="footer-period">Mar 1–15, 2026 · 1st Half</div>
      <SprButton
        tone="neutral"
        variant="secondary"
        size="large"
        :fullwidth="true"
      >
        Download Payslip
      </SprButton>
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
  margin-bottom: 6px;
  display: block;
}
.header-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}
.page-title { font-size: 20px; font-weight: 600; color: #00291b; margin: 0; }
.page-sub   { font-size: 12px; color: #5d6c6b; }

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
.stat-label { font-size: 10px; color: #5d6c6b; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em; }
.stat-value { font-size: 15px; font-weight: 700; color: #00291b; }
.stat-value--deduction { color: #dc2626; }
.stat-value--net { color: #158039; }

/* ─── Compliance Banner ──────────────────────── */
.compliance-inner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.compliance-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.compliance-text { font-size: 12px; color: #92400e; line-height: 1.5; }

/* ─── Line Rows (earnings & deductions) ──────── */
.line-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 11px 16px;
  gap: 8px;
}
.line-row--divider { border-bottom: 1px solid #f1f2f3; }
.line-row--total {
  border-top: 1px solid #e1e6e4;
  background: rgba(0, 0, 0, 0.02);
}
.line-label { font-size: 13px; color: #00291b; }
.line-label--total { font-weight: 600; }
.line-amount { font-size: 13px; font-weight: 500; color: #00291b; }
.line-amount--deduction { color: #dc2626; }
.line-amount--total { font-weight: 700; }

/* ─── Deduction Block ────────────────────────── */
.deduction-block { display: flex; flex-direction: column; }
.deduction-block--divider .line-row { border-bottom: 1px solid #f1f2f3; }
.deduction-block--divider .info-note { border-bottom: 1px solid #f1f2f3; }

.deduction-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

/* "What is this?" button — inline trigger */
.info-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  color: #158039;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.info-btn--active { color: #5d6c6b; text-decoration: none; }

/* Inline note — plain-language expansion */
.info-note {
  font-size: 12px;
  color: #5d6c6b;
  line-height: 1.55;
  padding: 8px 16px 12px;
  background: #f8faf9;
}

/* ─── Fixed Footer ───────────────────────────── */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #e1e6e4;
  padding: 10px 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}
.footer-period { font-size: 12px; color: #5d6c6b; text-align: center; }
</style>
