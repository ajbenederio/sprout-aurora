<script setup>
import { ref, computed } from 'vue'
import { useNav } from '@/composables/useNav.js'
const { goBack } = useNav()

const activeFilter = ref('all')

const leaveRequests = ref([
  { id: 1, name: 'Ana Reyes',    initials: 'AR', type: 'Sick Leave', typeBadge: 'danger',   start: 'Mar 11', end: 'Mar 12', days: 2, status: 'pending' },
  { id: 2, name: 'Ben Cruz',     initials: 'BC', type: 'Vacation',   typeBadge: 'info',     start: 'Mar 14', end: 'Mar 17', days: 4, status: 'pending' },
  { id: 3, name: 'Carla Santos', initials: 'CS', type: 'SIL',        typeBadge: 'success',  start: 'Mar 18', end: 'Mar 18', days: 1, status: 'approved' },
  { id: 4, name: 'David Lim',    initials: 'DL', type: 'Vacation',   typeBadge: 'info',     start: 'Mar 20', end: 'Mar 21', days: 2, status: 'rejected' },
  { id: 5, name: 'Eva Garcia',   initials: 'EG', type: 'Sick Leave', typeBadge: 'danger',   start: 'Mar 25', end: 'Mar 25', days: 1, status: 'pending' },
])

const filteredRequests = computed(() =>
  activeFilter.value === 'all'
    ? leaveRequests.value
    : leaveRequests.value.filter(r => r.status === activeFilter.value)
)

const pendingCount = computed(() => leaveRequests.value.filter(r => r.status === 'pending').length)

function approve(id) { const r = leaveRequests.value.find(r => r.id === id); if (r) r.status = 'approved' }
function reject(id)  { const r = leaveRequests.value.find(r => r.id === id); if (r) r.status = 'rejected' }

function typeTone(variant) {
  const map = { danger: 'danger', info: 'information', success: 'success', warning: 'caution' }
  return map[variant] || 'neutral'
}

const dotColor = {
  success: '#158039',
  pending: '#f59e0b',
  caution: '#f97316',
  danger: '#ef4444',
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
      <span style="font-weight:600;font-size:18px;color:#00291b;flex:1;">Leave Requests</span>
      <div class="flex gap-2 items-center">
        <SprLozenge label="Mar 2026" tone="neutral" />
        <SprLozenge :label="`${pendingCount} pending`" tone="caution" :fill="true" />
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <button
        v-for="chip in ['all', 'pending', 'approved', 'rejected']"
        :key="chip"
        class="text-xs font-medium border rounded-full px-3 py-1.5 cursor-pointer flex-shrink-0"
        :style="activeFilter === chip
          ? 'background:#dcfce6;color:#158039;border-color:#158039;'
          : 'background:#fff;color:#5d6c6b;border-color:#e1e6e4;'"
        @click="activeFilter = chip"
      >
        {{ chip.charAt(0).toUpperCase() + chip.slice(1) }}
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="content">

      <!-- Empty State -->
      <template v-if="filteredRequests.length === 0">
        <SprCard tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="py-12 flex flex-col items-center gap-2 p-4">
              <span class="text-4xl">👤</span>
              <span class="text-sm font-medium" style="color:#00291b;">
                No {{ activeFilter === 'all' ? '' : activeFilter }} requests
              </span>
              <span class="text-xs" style="color:#5d6c6b;">All leave requests have been processed.</span>
            </div>
          </template>
        </SprCard>
      </template>

      <!-- Request Cards -->
      <template v-else>
        <SprCard v-for="req in filteredRequests" :key="req.id" tone="plain" :show-header="false" :show-footer="false" border-radius-size="lg">
          <template #content>
            <div class="pt-4 pb-3 flex flex-col gap-2 px-4">

              <!-- Top row: avatar + name + type lozenge -->
              <div class="flex items-center gap-2">
                <!-- Avatar: no DS equivalent -->
                <div style="width:24px;height:24px;border-radius:50%;background:#00291b;color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:10px;flex-shrink:0">{{ req.initials.charAt(0) }}</div>
                <span class="text-sm font-medium flex-1" style="color:#00291b;">{{ req.name }}</span>
                <SprLozenge :label="req.type" :tone="typeTone(req.typeBadge)" :fill="true" />
              </div>

              <!-- Date row: indented past avatar -->
              <div class="pl-8">
                <span class="text-xs" style="color:#5d6c6b;">
                  {{ req.start }} – {{ req.end }} · {{ req.days }} day{{ req.days > 1 ? 's' : '' }}
                </span>
              </div>

              <!-- Action row: pending -->
              <div v-if="req.status === 'pending'" class="flex gap-2 pt-1">
                <SprButton tone="success" variant="primary" size="small" @click="approve(req.id)">Approve</SprButton>
                <SprButton tone="neutral" variant="secondary" size="small" @click="reject(req.id)">Reject</SprButton>
              </div>

              <!-- Status row: approved / rejected -->
              <div v-else class="flex items-center gap-1.5">
                <!-- StatusDot: no DS equivalent -->
                <span :style="`width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;background:${req.status === 'approved' ? dotColor.success : dotColor.danger}`" />
                <SprLozenge
                  :label="req.status"
                  :tone="req.status === 'approved' ? 'success' : 'danger'"
                  :fill="true"
                />
              </div>

            </div>
          </template>
        </SprCard>
      </template>

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
  position: relative;
  overflow: hidden;
}

.status-bar {
  height: 59px;
  flex-shrink: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
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
  flex-shrink: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #e1e6e4;
}

.filter-bar {
  height: 44px;
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #e1e6e4;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  overflow-x: auto;
}
.filter-bar::-webkit-scrollbar { display: none; }

.content {
  flex: 1;
  overflow-y: auto;
  background: #f1f2f3;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content::-webkit-scrollbar { display: none; }
</style>
