<script setup>
// [DI-5] Home / Dashboard — stickiness-first design
// Research: DAU/MAU ratio is the north star metric. Home screen's job is to return users tomorrow.
// Rule: show streak + today's lesson CTA + one path progress signal. Nothing else.
// No social feed, no settings, no feature discovery. Every element serves Day-7 return rate.

import { computed } from 'vue'

const props = defineProps({
  role: {
    type: String,
    default: 'customer-service',
  },
  streakCount: {
    type: Number,
    default: 1,
  },
  xpTotal: {
    type: Number,
    default: 88,
  },
  pathProgress: {
    type: Number,
    default: 10, // 0–100, percentage of role path completed
  },
  lessonsCompleted: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['start-lesson', 'view-progress'])

const roleLabelMap = {
  'customer-service': 'Customer Service',
  'hr-admin':         'HR & Admin',
  'operations':       'Operations',
  'other':            'General',
}
const roleLabel = computed(() => roleLabelMap[props.role] || 'Your Role')

const nextLessonTitle = computed(() => {
  const titles = {
    'customer-service': 'How to handle a complaint with AI',
    'hr-admin':         'Using AI to prep for a 1-on-1',
    'operations':       'Spotting trends in weekly data',
    'other':            'Making AI work for your most common task',
  }
  return titles[props.role] || titles['other']
})
</script>

<template>
  <div class="screen" role="main" aria-label="Your AI learning dashboard">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Page Header: streak + XP — most habit-forming signals at top (DI-5) -->
    <div class="page-header">
      <div class="header-left">
        <span class="header-greeting">Keep going</span>
        <span class="header-role">{{ roleLabel }} path</span>
      </div>
      <!-- Streak — prominent position, top right -->
      <div class="streak-badge" aria-label="Current streak">
        <SprLozenge
          :label="`${streakCount}d streak`"
          tone="success"
          :fill="true"
        />
      </div>
    </div>

    <!-- Scrollable content -->
    <div class="content">

      <!-- Path progress — "you're X% through" surfaces forward momentum (FP-2) -->
      <SprCard
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
      >
        <template #default>
          <div class="progress-card">
            <div class="progress-header">
              <span class="progress-label">Your {{ roleLabel }} path</span>
              <span class="progress-pct" aria-label="Path completion">{{ pathProgress }}%</span>
            </div>
            <!-- [DI-5] Progress bar — the only indicator of long-term progress on Home -->
            <SprProgressBar
              size="sm"
              :value="pathProgress"
              :max="100"
              color="success"
              :label="false"
            />
            <div class="progress-stats">
              <span class="stat-item">
                <span class="stat-value">{{ lessonsCompleted }}</span>
                <span class="stat-label">lesson{{ lessonsCompleted !== 1 ? 's' : '' }} done</span>
              </span>
              <span class="stat-divider" aria-hidden="true">·</span>
              <span class="stat-item">
                <span class="stat-value">{{ xpTotal }}</span>
                <span class="stat-label">XP total</span>
              </span>
            </div>
          </div>
        </template>
      </SprCard>

      <!-- [FP-2] View full path link — surfaces deeper progress without cluttering Home -->
      <button
        class="view-path-link"
        aria-label="View your full learning path"
        @click="emit('view-progress')"
      >
        View your full path →
      </button>

      <!-- Today's lesson — the primary action, prominently placed -->
      <!-- [DI-5] Primary CTA is always "today's lesson" — not feature discovery -->
      <div class="today-section">
        <div class="section-label">TODAY</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
          :has-content-padding="false"
        >
          <template #default>
            <div class="today-card">
              <div class="today-card-text">
                <span class="today-card-eyebrow">Next lesson</span>
                <span class="today-card-title">{{ nextLessonTitle }}</span>
                <span class="today-card-meta">~5 min · {{ roleLabel }}</span>
              </div>
              <div class="today-card-arrow" aria-hidden="true">›</div>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Bottom spacer -->
      <div class="h-spacer"></div>
    </div>

    <!-- Fixed CTA — start today's lesson -->
    <!-- [DI-5] This is the only large action. No competing CTAs. -->
    <div class="cta-area">
      <SprButton
        tone="success"
        size="large"
        :fullwidth="true"
        aria-label="Start today's lesson"
        @click="emit('start-lesson')"
      >
        Start today's lesson
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
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #E6EAEA; /* mushroom-100 */
  flex-shrink: 0;
}
.header-left {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.header-greeting {
  font-size: 18px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green */
}
.header-role {
  font-size: 13px;
  color: #5d6c6b; /* mushroom-600 */
}

/* Scrollable content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.h-spacer { height: 80px; }

/* Progress card */
.progress-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #00291b; /* intentional: brand deep green */
}
.progress-pct {
  font-size: 14px;
  font-weight: 700;
  color: #158039; /* kangkong-700 */
}
.progress-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stat-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.stat-value {
  font-size: 15px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green */
}
.stat-label {
  font-size: 12px;
  color: #5d6c6b; /* mushroom-600 */
}
.stat-divider {
  color: #D9DEDE; /* mushroom-200 */
  font-size: 16px;
}

/* View path link */
.view-path-link {
  background: none;
  border: none;
  font-family: 'Rubik', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #158039;
  cursor: pointer;
  padding: 0;
  text-align: left;
  text-decoration: none;
}
.view-path-link:focus-visible {
  outline: 2px solid #158039;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Section label */
.section-label {
  font-size: 11px;
  font-weight: 700;
  color: #5d6c6b; /* mushroom-600 */
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

/* Today's lesson card */
.today-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 12px;
  cursor: pointer;
}
.today-card-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}
.today-card-eyebrow {
  font-size: 11px;
  font-weight: 700;
  color: #158039; /* kangkong-700 */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.today-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #00291b; /* intentional: brand deep green */
  line-height: 1.3;
}
.today-card-meta {
  font-size: 12px;
  color: #5d6c6b; /* mushroom-600 */
}
.today-card-arrow {
  font-size: 22px;
  color: #5d6c6b; /* mushroom-600 */
  flex-shrink: 0;
}

/* CTA */
.cta-area {
  padding: 16px 24px 48px;
  flex-shrink: 0;
}
</style>
