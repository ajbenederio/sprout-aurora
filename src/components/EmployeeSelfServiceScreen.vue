<script setup>
import { ref } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { navigate, goBack } = useNav()

const showBreakdown = ref(false)
const showLeaveForm = ref(false)
const leaveType = ref('Sick Leave')
const leaveStart = ref('')
const leaveEnd = ref('')

const attendance = [
  { day: 'Monday',    date: 'Mar 4', state: 'success', timeIn: '8:02 AM',  timeOut: '5:01 PM' },
  { day: 'Tuesday',   date: 'Mar 5', state: 'success', timeIn: '8:15 AM',  timeOut: '5:00 PM' },
  { day: 'Wednesday', date: 'Mar 6', state: 'pending', timeIn: '8:47 AM',  timeOut: '5:03 PM' },
  { day: 'Thursday',  date: 'Mar 7', state: 'success', timeIn: '8:05 AM',  timeOut: '5:00 PM' },
  { day: 'Friday',    date: 'Mar 8', state: 'danger',  timeIn: 'Absent',   timeOut: '—' },
]

const deductions = [
  { label: 'SSS',        amount: '₱1,400', note: '5% of ₱28,000 MSC — mandatory social insurance' },
  { label: 'PhilHealth', amount: '₱700',   note: '2.5% employee share — national health insurance' },
  { label: 'Pag-IBIG',  amount: '₱200',   note: 'Maximum monthly contribution — housing fund' },
  { label: 'Tax',        amount: '₱2,860', note: 'BIR TRAIN bracket — ₱22k–₱43k monthly income' },
]

const dotColor = {
  success: '#158039',
  pending: '#f59e0b',
  caution: '#f97316',
  danger: '#ef4444',
}
</script>

<template>
  <div class="screen">

    <!-- 1. iOS Status Bar -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- 2. Page Header -->
    <div class="page-header">
      <button @click="goBack()" style="background:none;border:none;font-size:14px;color:#158039;cursor:pointer;font-family:inherit;padding:0;margin-right:8px">‹</button>
      <div class="flex flex-col gap-0.5">
        <span class="text-lg font-semibold" style="color:#00291b">Isabel Ramos</span>
        <span class="text-xs" style="color:#5d6c6b">Employee</span>
      </div>
      <!-- Avatar: no DS equivalent -->
      <div style="width:40px;height:40px;border-radius:50%;background:#dcfce6;color:#158039;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:16px;flex-shrink:0">I</div>
    </div>

    <!-- 3. Scrollable Content -->
    <div class="content">

      <!-- a. Leave Form Overlay -->
      <div
        v-if="showLeaveForm"
        class="absolute inset-0 bg-black/50 z-10 flex items-start justify-center pt-16"
      >
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" style="width:320px;margin:0 16px">
          <template #content>
            <div class="pt-4 flex flex-col gap-3 px-4 pb-4">
              <span class="text-base font-semibold" style="color:#00291b">File Leave Request</span>

              <div class="flex flex-col gap-1">
                <label class="text-xs" style="color:#5d6c6b">Leave Type</label>
                <select
                  v-model="leaveType"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-[Rubik] focus:outline-none"
                >
                  <option>Sick Leave</option>
                  <option>Vacation</option>
                  <option>SIL</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs" style="color:#5d6c6b">Start Date</label>
                <input
                  type="date"
                  v-model="leaveStart"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-[Rubik] focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs" style="color:#5d6c6b">End Date</label>
                <input
                  type="date"
                  v-model="leaveEnd"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-[Rubik] focus:outline-none"
                />
              </div>

              <div class="flex gap-2">
                <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" @click="showLeaveForm = false">Submit</SprButton>
                <SprButton tone="neutral" variant="secondary" size="small" @click="showLeaveForm = false">Cancel</SprButton>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- b. Next Payday -->
      <SprCard tone="information" :show-header="false" :show-footer="false" border-radius-size="lg">
        <template #content>
          <div class="pt-4 pb-3 flex justify-between items-center px-4">
            <div class="flex flex-col gap-0.5">
              <span class="text-xs font-medium" style="color:#5d6c6b">Next Payday</span>
              <span class="text-sm font-medium" style="color:#00291b">Mar 16, 2026 · 6 days away</span>
            </div>
            <div class="flex flex-col items-end gap-0.5">
              <span class="text-xl font-bold" style="color:#158039">₱22,840</span>
              <span class="text-xs" style="color:#5d6c6b">projected net</span>
            </div>
          </div>
        </template>
      </SprCard>

      <!-- c. Leave Balance -->
      <div class="flex flex-col gap-1.5">
        <span class="section-label">LEAVE BALANCE</span>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="pt-4 pb-3 flex flex-col gap-3 px-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-xs font-medium" style="color:#00291b">Vacation</span>
                  <span class="text-xs" style="color:#5d6c6b">12 of 15 days</span>
                </div>
                <SprProgressBar :value="12" :max="15" size="sm" color="caution" />
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-xs font-medium" style="color:#00291b">Sick Leave</span>
                  <span class="text-xs" style="color:#5d6c6b">5 of 15 days</span>
                </div>
                <SprProgressBar :value="5" :max="15" size="sm" color="success" />
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-xs font-medium" style="color:#00291b">SIL</span>
                  <span class="text-xs" style="color:#5d6c6b">3 of 5 days</span>
                </div>
                <SprProgressBar :value="3" :max="5" size="sm" color="success" />
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- d. Quick Actions -->
      <div class="flex gap-2">
        <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" @click="showLeaveForm = true">File Leave</SprButton>
        <SprButton tone="neutral" variant="secondary" size="medium" :fullwidth="true" @click="navigate('employee-payslip')">View Payslip</SprButton>
      </div>

      <!-- e. Last Payslip -->
      <div class="flex flex-col gap-1.5">
        <span class="section-label">LAST PAYSLIP</span>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="pt-4 pb-3 flex flex-col gap-3 px-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium" style="color:#00291b">Feb 16–28, 2026</span>
                <SprLozenge label="Posted" tone="success" :fill="true" />
              </div>

              <div class="grid grid-cols-3 text-center">
                <div class="flex flex-col gap-0.5">
                  <span class="text-xs" style="color:#5d6c6b">Gross</span>
                  <span class="text-sm font-medium" style="color:#00291b">₱28,000</span>
                </div>
                <div class="flex flex-col gap-0.5">
                  <span class="text-xs" style="color:#5d6c6b">Deductions</span>
                  <span class="text-sm font-medium text-amber-600">₱5,160</span>
                </div>
                <div class="flex flex-col gap-0.5">
                  <span class="text-xs" style="color:#5d6c6b">Net</span>
                  <span class="text-sm font-bold" style="color:#158039">₱22,840</span>
                </div>
              </div>

              <SprButton tone="neutral" variant="secondary" size="small" @click="showBreakdown = !showBreakdown">
                {{ showBreakdown ? 'Hide' : 'Show' }} Deduction Breakdown
              </SprButton>

              <div v-if="showBreakdown" class="border-t border-gray-100 pt-3 flex flex-col gap-2">
                <div
                  v-for="ded in deductions"
                  :key="ded.label"
                  class="flex justify-between items-start"
                >
                  <div class="flex flex-col gap-0.5 flex-1 pr-3">
                    <span class="text-xs font-medium" style="color:#00291b">{{ ded.label }}</span>
                    <p class="text-xs italic" style="color:#5d6c6b">{{ ded.note }}</p>
                  </div>
                  <span class="text-xs font-medium" style="color:#00291b">{{ ded.amount }}</span>
                </div>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- f. Attendance This Week -->
      <div class="flex flex-col gap-1.5">
        <span class="section-label">THIS WEEK</span>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(day, i) in attendance"
              :key="day.day"
              class="flex items-center gap-2 px-4 py-2.5"
              :class="{ 'border-b border-gray-100': i < attendance.length - 1 }"
            >
              <!-- StatusDot: no DS equivalent -->
              <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor[day.state] || dotColor.pending}`" />
              <span class="text-xs font-medium w-20" style="color:#00291b">{{ day.day }}</span>
              <span class="text-xs flex-1" style="color:#5d6c6b">{{ day.date }}</span>
              <span class="text-xs" style="color:#5d6c6b">{{ day.timeIn }} – {{ day.timeOut }}</span>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- g. Spacer -->
      <div class="h-6"></div>

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
  height: 64px;
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
  position: relative;
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
</style>
