<script setup>
// [DI-2] Role Picker — single-action gate, no content before selection
// Resolves FP-3 (Generic Framing Mismatch)
// Research: role-specific framing significantly increases perceived relevance and completion.
// Gate: NO lesson content is shown until a role is selected.

import { ref } from 'vue'

const emit = defineEmits(['continue'])

const selectedRole = ref(null)

const roles = [
  {
    id: 'customer-service',
    label: 'Customer Service',
    description: 'Handle enquiries, resolve issues, support customers',
  },
  {
    id: 'hr-admin',
    label: 'HR & Admin',
    description: 'Manage people, documents, communications, scheduling',
  },
  {
    id: 'operations',
    label: 'Operations',
    description: 'Track processes, coordinate teams, manage workflow',
  },
  {
    id: 'other',
    label: 'Other / Not listed',
    description: 'General office, mixed duties, or unlisted role',
  },
]

function select(roleId) {
  selectedRole.value = roleId
}

function proceed() {
  if (selectedRole.value) {
    emit('continue', selectedRole.value)
  }
}
</script>

<template>
  <div class="screen" role="main" aria-label="Select your role">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header -->
    <!-- [DI-2] Immediately confirm why role matters — sets relevance expectation -->
    <div class="page-header">
      <h1 class="page-title">What's your role?</h1>
      <p class="page-sub">We'll show you AI examples that apply to your actual work.</p>
    </div>

    <!-- [DI-2] Role cards — single selection, no content before this gate -->
    <!-- [FP-3] Role-specific content only unlocked after selection -->
    <!-- Using plain styled divs (same pattern as HRIS task rows) — SprCard inside v-for
         loses slot rendering context; one wrapping SprCard + row divs is the stable pattern -->
    <div class="content">
      <SprCard
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
        :has-content-padding="false"
      >
        <template #default>
          <div class="roles-list" role="radiogroup" aria-label="Select your role">
            <div
              v-for="(role, i) in roles"
              :key="role.id"
              class="role-row"
              :class="{ selected: selectedRole === role.id, 'border-b': i < roles.length - 1 }"
              role="radio"
              :aria-checked="selectedRole === role.id"
              tabindex="0"
              @click="select(role.id)"
              @keydown.enter="select(role.id)"
              @keydown.space.prevent="select(role.id)"
            >
              <div class="role-row-text">
                <span class="role-label">{{ role.label }}</span>
                <span class="role-description">{{ role.description }}</span>
              </div>
              <div class="check-circle" :class="{ active: selectedRole === role.id }" aria-hidden="true">
                <span v-if="selectedRole === role.id" class="check-mark">✓</span>
              </div>
            </div>
          </div>
        </template>
      </SprCard>
    </div>

    <!-- CTA — disabled until selection made -->
    <div class="cta-area">
      <SprButton
        tone="success"
        size="large"
        :fullwidth="true"
        :disabled="!selectedRole"
        aria-label="Continue with selected role"
        @click="proceed"
      >
        {{ selectedRole ? "Let's go" : 'Select your role to continue' }}
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

/* iOS Status Bar */
.status-bar {
  height: 59px;
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
  padding: 24px 24px 8px;
  flex-shrink: 0;
}
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green */
  margin-bottom: 6px;
}
.page-sub {
  font-size: 14px;
  color: #5d6c6b; /* mushroom-600 */
  line-height: 1.4;
}

/* Scrollable content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 24px 0;
}

/* Role rows inside single SprCard — same pattern as HRIS task list rows */
.roles-list {
  display: flex;
  flex-direction: column;
}
.role-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 12px;
  cursor: pointer;
  transition: background 0.1s ease;
  outline: none;
}
.role-row.border-b {
  border-bottom: 1px solid #E6EAEA; /* mushroom-100 */
}
.role-row:hover {
  background: #F0FDF4; /* kangkong-50 */
}
.role-row.selected {
  background: #dcfce6; /* kangkong-100 */
}
.role-row:focus-visible {
  box-shadow: inset 0 0 0 2px #158039; /* kangkong-700 — WCAG 2.1 AA */
}

.role-row-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}
.role-label {
  font-size: 15px;
  font-weight: 600;
  color: #00291b; /* intentional: brand deep green */
}
.role-description {
  font-size: 13px;
  color: #5d6c6b; /* mushroom-600 */
  line-height: 1.4;
}

/* Check circle */
.check-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #D9DEDE; /* mushroom-200 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;
}
.check-circle.active {
  background: #158039; /* kangkong-700 */
  border-color: #158039;
}
.check-mark {
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

/* CTA */
.cta-area {
  padding: 16px 24px 48px;
  flex-shrink: 0;
}
</style>
