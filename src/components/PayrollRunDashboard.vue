<script setup>
import { ref } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { navigate, goBack, canGoBack } = useNav()

const wizardSteps = ref([
  { number: 1, label: 'Configure', status: 'completed' },
  { number: 2, label: 'Compute',   status: 'completed' },
  { number: 3, label: 'Review',    status: 'active'    },
  { number: 4, label: 'Approve',   status: 'pending'   },
])

const pendingItems = [
  '3 attendance exceptions to resolve',
  '1 department manager approval pending',
]

const recentRuns = ref([
  { period: 'Feb 16–28, 2026', type: '2nd Half', employees: 48, gross: '₱2,184,320' },
  { period: 'Feb 1–15, 2026',  type: '1st Half', employees: 48, gross: '₱2,176,800' },
  { period: 'Jan 16–31, 2026', type: '2nd Half', employees: 47, gross: '₱2,141,500' },
])
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
      <div style="display:flex;align-items:center;justify-content:space-between">
        <button v-if="canGoBack" class="back-btn" @click="goBack()">‹ Back</button>
        <span class="page-title">Payroll</span>
        <SprLozenge label="Mar 1–15, 2026" tone="success" :fill="true" />
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Compliance Alert — SprCard tone="caution" -->
      <div class="section">
        <SprCard tone="caution" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="alert-inner">
              <div class="alert-title-row">
                <span class="alert-icon">⚠</span>
                <strong class="alert-title">Compliance Update</strong>
                <SprLozenge label="Action needed" tone="caution" :fill="true" />
              </div>
              <p class="alert-body">
                SSS monthly contribution rates updated (RA 11199). This run affects
                <strong>48 employees</strong> — estimated variance: <strong>₱8,640</strong>.
              </p>
              <p class="alert-note">
                New rates will be applied automatically. Review the change summary before approving.
              </p>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- In-Progress Run — SprCard tone="information" -->
      <div class="section">
        <div class="section-label">In Progress</div>
        <SprCard tone="information" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="run-inner">

              <!-- Run meta -->
              <div class="run-meta-row">
                <div>
                  <div class="run-period">Mar 1–15, 2026</div>
                  <div class="run-sub">1st Half · 48 employees</div>
                </div>
                <SprLozenge label="In Progress" tone="pending" :fill="true" />
              </div>

              <!-- Stepper -->
              <SprStepper
                variant="horizontal"
                :steps="wizardSteps"
                :has-lines="true"
                type="solid"
              />

              <!-- Progress Bar -->
              <SprProgressBar
                :value="75"
                :max="100"
                size="sm"
                color="success"
                label-placement="bottom-end"
                supporting-label="Step 3 of 4 — Review"
              />

              <!-- Pending items -->
              <div class="pending-box">
                <p class="pending-label">Needs attention before approval:</p>
                <p v-for="item in pendingItems" :key="item" class="pending-item">· {{ item }}</p>
              </div>

              <!-- Resume button -->
              <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" @click="navigate('payroll-review')">
                Resume Run
              </SprButton>

            </div>
          </template>
        </SprCard>
      </div>

      <!-- Recent Runs -->
      <div class="section">
        <div class="section-label">Recent Runs</div>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(run, i) in recentRuns"
              :key="run.period"
              class="run-row"
              :class="{ 'run-row--divider': i < recentRuns.length - 1 }"
              @click="navigate('payroll-review')" style="cursor:pointer"
            >
              <div class="run-row-left">
                <span class="run-row-period">{{ run.period }}</span>
                <span class="run-row-meta">{{ run.type }} · {{ run.employees }} employees</span>
              </div>
              <div class="run-row-right">
                <span class="run-row-gross">{{ run.gross }}</span>
                <SprLozenge label="Posted" tone="success" :fill="true" />
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <div style="height:24px"></div>
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
  height: 52px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #e1e6e4;
  flex-shrink: 0;
}
.page-title {
  font-weight: 600;
  font-size: 20px;
  color: #00291b;
}
.back-btn { background:none; border:none; padding:0; font-size:14px; color:#158039; cursor:pointer; font-family:inherit; }

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

/* ─── Alert Card Content ─────────────────────── */
.alert-inner { display: flex; flex-direction: column; gap: 8px; }
.alert-title-row { display: flex; align-items: center; gap: 8px; }
.alert-icon { font-size: 16px; }
.alert-title { font-size: 14px; color: #00291b; flex: 1; }
.alert-body { font-size: 13px; color: #00291b; line-height: 1.5; }
.alert-note { font-size: 12px; color: #5d6c6b; line-height: 1.4; }

/* ─── Run Card Content ───────────────────────── */
.run-inner { display: flex; flex-direction: column; gap: 14px; }
.run-meta-row { display: flex; justify-content: space-between; align-items: flex-start; }
.run-period { font-weight: 600; font-size: 15px; color: #00291b; }
.run-sub { font-size: 12px; color: #5d6c6b; margin-top: 2px; }

/* ─── Pending Box ────────────────────────────── */
.pending-box {
  background: rgba(0,0,0,0.04);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.pending-label { font-size: 12px; font-weight: 600; color: #00291b; }
.pending-item { font-size: 12px; color: #5d6c6b; line-height: 1.4; }

/* ─── Recent Runs ────────────────────────────── */
.run-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
.run-row--divider { border-bottom: 1px solid #f1f2f3; }
.run-row-left { display: flex; flex-direction: column; gap: 3px; }
.run-row-period { font-weight: 500; font-size: 14px; color: #00291b; }
.run-row-meta { font-size: 12px; color: #5d6c6b; }
.run-row-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.run-row-gross { font-weight: 500; font-size: 14px; color: #00291b; }
</style>
