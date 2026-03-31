<script setup>
import { useNav } from '@/composables/useNav.js'
const { navigate } = useNav()

const tasks = [
  { label: 'Run Mar 1–15 payroll', state: 'pending', status: 'Pending', route: 'payroll-run' },
  { label: '7 leave requests pending', state: 'caution', status: 'Needs review', route: 'leave-management' },
  { label: 'File SSS R-3 by Mar 10', state: 'danger', status: 'Due today', route: 'government-filing' },
  { label: 'Manage shift schedules', state: 'success', status: 'View', route: 'shift-center' },
]

const activity = [
  {
    initial: 'S',
    title: 'SSS rate table updated to 15%',
    meta: 'System · Mar 10 · 8:00 AM',
  },
  {
    initial: 'M',
    title: 'Feb 16–28 payroll approved',
    meta: 'Maria Santos · Mar 5 · 4:32 PM',
  },
]

const dotColor = {
  success: '#158039',
  pending: '#f59e0b',
  caution: '#f97316',
  danger: '#ef4444',
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
    <div class="page-header">
      <div class="flex flex-col">
        <span class="text-xs" style="color:#5d6c6b">Good morning,</span>
        <span class="text-lg font-semibold" style="color:#00291b">Maria Santos</span>
      </div>
      <div @click="navigate('employee-self-service')" style="cursor:pointer">
        <!-- Avatar: no DS equivalent -->
        <div style="width:32px;height:32px;border-radius:50%;background:#00291b;color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0">M</div>
      </div>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Compliance Alert -->
      <SprCard tone="caution" :show-header="false" :show-footer="false" border-radius-size="lg">
        <template #content>
          <div class="flex items-start gap-2 p-4">
            <span class="text-amber-600 text-base leading-none mt-0.5">⚠</span>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-amber-900">Compliance Update</span>
                <SprLozenge label="Action needed" tone="caution" :fill="true" />
              </div>
              <p class="text-xs text-amber-800 leading-relaxed">
                SSS rate updated to 15% — affects <strong>48 employees</strong>. <span @click="navigate('payroll-run')" style="cursor:pointer">View impact ›</span>
              </p>
            </div>
          </div>
        </template>
      </SprCard>

      <!-- Stat Cards -->
      <div class="grid grid-cols-3 gap-2">
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="flex flex-col items-center gap-1 py-3">
              <span class="stat-label">Headcount</span>
              <span class="text-2xl font-bold" style="color:#00291b">124</span>
            </div>
          </template>
        </SprCard>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="flex flex-col items-center gap-1 py-3">
              <span class="stat-label">Pending Leaves</span>
              <span class="text-2xl font-bold text-amber-600">7</span>
            </div>
          </template>
        </SprCard>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="flex flex-col items-center gap-1 py-3">
              <span class="stat-label">Next Payroll</span>
              <span class="text-2xl font-bold" style="color:#00291b">Mar 16</span>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Tasks Today -->
      <div>
        <div class="section-label">TODAY</div>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(task, i) in tasks"
              :key="task.label"
              class="flex justify-between items-center px-4 py-3"
              :class="{ 'border-b border-gray-100': i < tasks.length - 1 }"
              @click="navigate(task.route)"
              style="cursor:pointer"
            >
              <span class="text-sm" style="color:#00291b">{{ task.label }}</span>
              <div class="flex items-center gap-1.5">
                <!-- StatusDot: no DS equivalent -->
                <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${dotColor[task.state] || dotColor.pending}`" />
                <span class="text-xs" style="color:#5d6c6b">{{ task.status }}</span>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Recent Activity -->
      <div>
        <div class="section-label">RECENT ACTIVITY</div>
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg" :has-content-padding="false">
          <template #content>
            <div
              v-for="(item, i) in activity"
              :key="item.title"
              class="flex items-start gap-3 px-4 py-3"
              :class="{ 'border-b border-gray-100': i < activity.length - 1 }"
            >
              <!-- Avatar: no DS equivalent -->
              <div style="width:24px;height:24px;border-radius:50%;background:#158039;color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:10px;flex-shrink:0">{{ item.initial }}</div>
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-semibold" style="color:#00291b">{{ item.title }}</span>
                <span class="text-xs" style="color:#5d6c6b">{{ item.meta }}</span>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Bottom spacer -->
      <div class="h-20"></div>
    </div>

    <!-- Fixed Footer -->
    <div class="footer">
      <SprButton tone="success" variant="primary" size="medium" :fullwidth="true" @click="navigate('payroll-run')">Start Payroll Run</SprButton>
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

/* Status Bar */
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

/* Page Header */
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

/* Scrollable Content */
.content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f1f2f3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content::-webkit-scrollbar { display: none; }

/* Footer */
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

/* Shared section label */
.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  margin-bottom: 6px;
  padding-left: 2px;
}

/* Stat card label */
.stat-label {
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #5d6c6b;
  text-align: center;
  line-height: 1.3;
}
</style>
