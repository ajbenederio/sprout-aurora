<script setup>
import { ref, computed } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { goBack } = useNav()

const filings = ref([
  { id: 'sss',        agency: 'SSS',        form: 'R-3',    amount: '₱201,600', due: 'Mar 10', daysLeft: 0, status: 'ready' },
  { id: 'philhealth', agency: 'PhilHealth', form: 'RF-1',   amount: '₱62,000',  due: 'Mar 10', daysLeft: 0, status: 'ready' },
  { id: 'pagibig',    agency: 'Pag-IBIG',   form: 'MSRF',   amount: '₱9,600',   due: 'Mar 10', daysLeft: 0, status: 'pending' },
  { id: 'bir',        agency: 'BIR',        form: '1601-C', amount: '₱38,400',  due: 'Mar 10', daysLeft: 0, status: 'ready' },
])

const readyCount = computed(() => filings.value.filter(f => f.status === 'ready').length)
const allSubmitted = ref(false)

function submitAll() {
  filings.value.forEach(f => { if (f.status === 'ready') f.status = 'submitted' })
  if (filings.value.every(f => f.status !== 'ready' && f.status !== 'pending' || f.status === 'submitted')) allSubmitted.value = filings.value.every(f => f.status === 'submitted')
}

const dotColor = {
  success: '#158039',
  pending: '#f59e0b',
  information: '#3b82f6',
}
</script>

<template>
  <div class="screen">

    <!-- iOS Status Bar -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header -->
    <div class="page-header" style="display:flex;align-items:center;gap:8px;">
      <button @click="goBack()" style="background:none;border:none;font-size:14px;color:#158039;cursor:pointer;font-family:inherit;padding:0">‹</button>
      <span style="font-weight:600;font-size:18px;color:#00291b;flex:1;">Government Filings</span>
      <SprLozenge label="Mar 1–15, 2026" tone="information" :fill="true" />
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- All Submitted Success State -->
      <SprCard v-if="allSubmitted" tone="success" :show-header="false" :show-footer="false" border-radius-size="lg">
        <template #content>
          <div class="pt-4 flex items-center gap-2 px-4 pb-4">
            <!-- StatusDot: no DS equivalent -->
            <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor.success}`" />
            <span class="text-sm font-medium text-green-800">All 4 remittances submitted for Mar 1–15.</span>
          </div>
        </template>
      </SprCard>

      <!-- Progress Summary Card -->
      <SprCard v-else tone="information" :show-header="false" :show-footer="false" border-radius-size="lg">
        <template #content>
          <div class="pt-4 flex items-center gap-2 px-4 pb-4">
            <!-- StatusDot: no DS equivalent -->
            <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor.information}`" />
            <span class="text-sm" style="color:#1e40af;">{{ readyCount }} of 4 remittances ready. {{ 4 - readyCount }} pending submission.</span>
          </div>
        </template>
      </SprCard>

      <!-- Section Label -->
      <div class="section-label">REMITTANCES</div>

      <!-- Filing Cards -->
      <SprCard v-for="filing in filings" :key="filing.id" tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
        <template #content>
          <div class="pt-4 pb-3 flex flex-col gap-2 px-4">

            <!-- Top Row: Agency + Due Lozenge -->
            <div class="flex justify-between items-start">
              <div class="flex flex-col">
                <span class="text-sm font-semibold" style="color:#00291b;">{{ filing.agency }}</span>
                <span class="text-xs" style="color:#5d6c6b;">{{ filing.form }}</span>
              </div>
              <SprLozenge :label="`Due ${filing.due}`" :tone="filing.daysLeft <= 2 ? 'danger' : 'caution'" :fill="true" />
            </div>

            <!-- Amount + Status Row -->
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium" style="color:#00291b;">{{ filing.amount }}</span>
              <div class="flex items-center gap-1.5">
                <template v-if="filing.status === 'ready'">
                  <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor.success}`" />
                  <span class="text-xs" style="color:#158039;">Ready to remit</span>
                </template>
                <template v-else-if="filing.status === 'pending'">
                  <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor.pending}`" />
                  <span class="text-xs" style="color:#5d6c6b;">Generating…</span>
                </template>
                <template v-else-if="filing.status === 'submitted'">
                  <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor.success}`" />
                  <span class="text-xs" style="color:#158039;">Submitted</span>
                </template>
              </div>
            </div>

            <!-- Action Row -->
            <div v-if="filing.status !== 'submitted'">
              <SprButton tone="neutral" variant="secondary" size="small" :disabled="filing.status === 'pending'">
                Download {{ filing.form }}
              </SprButton>
            </div>

          </div>
        </template>
      </SprCard>

      <!-- Spacer for footer clearance -->
      <div class="h-20"></div>

    </div>

    <!-- Fixed Footer -->
    <div class="footer">
      <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" :disabled="readyCount === 0 || allSubmitted" @click="submitAll">
        Submit All Ready
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
  position: relative;
  overflow: hidden;
}

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

.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f1f2f3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.content::-webkit-scrollbar { display: none; }

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  padding-left: 2px;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: #ffffff;
  border-top: 1px solid #e1e6e4;
  padding: 12px 16px;
  display: flex;
  align-items: center;
}
</style>
