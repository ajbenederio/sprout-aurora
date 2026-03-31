<script setup>
// [DI-4] Session Complete — variable reward, capability statement, streak started
// Resolves FP-2 (Progress Invisibility)
// Research: variable reward (not fixed XP) is required for habit loop reward phase.
// Key: show ONE concrete capability sentence — makes progress feel real, not abstract.
// Streak counter starts here — Day 1 is the most important retention moment.

const props = defineProps({
  role: {
    type: String,
    default: 'customer-service',
  },
  xpEarned: {
    type: Number,
    default: 88,
  },
  streakCount: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['continue', 'view-progress'])

// Role-specific capability statements — confirms a real, job-relevant skill gained
// Avoids vague "you learned about AI" — states exactly what the user can now do
const capabilityMap = {
  'customer-service': 'You can now write a prompt to handle a routine customer message in seconds.',
  'hr-admin':         'You can now use a prompt to summarize documents and draft communications faster.',
  'operations':       'You can now use a prompt to identify patterns in feedback or data.',
  'other':            'You can now write a clear prompt to get AI to help with a task in your role.',
}

const capability = capabilityMap[props.role] || capabilityMap['other']
</script>

<template>
  <div class="screen" role="main" aria-label="Lesson complete">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <div class="content">

      <!-- Celebration area — typography-first, no sparkle/AI badge (DI-5) -->
      <div class="celebration-area" aria-label="Well done">
        <div class="celebration-circle" aria-hidden="true">
          <div class="celebration-inner"></div>
        </div>
        <h1 class="celebration-headline">Nice work.</h1>
        <p class="celebration-sub">You completed your first lesson.</p>
      </div>

      <!-- [DI-4] Variable XP — not fixed badge; creates variable reward -->
      <!-- SprLozenge: label prop for text, tone="success", :fill="true" for solid -->
      <div class="xp-area" aria-label="Experience points earned">
        <SprLozenge
          :label="`+${xpEarned} XP`"
          tone="success"
          :fill="true"
        />
      </div>

      <!-- [FP-2] Capability statement — makes learning tangible, not just a completion tick -->
      <SprCard
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
      >
        <template #default>
          <div class="capability-card">
            <p class="capability-label">You can now</p>
            <p class="capability-text">{{ capability }}</p>
          </div>
        </template>
      </SprCard>

      <!-- Streak started — Day 1 is the most important retention moment -->
      <SprCard
        tone="plain"
        :show-header="false"
        :show-footer="false"
        border-radius-size="lg"
      >
        <template #default>
          <div class="streak-card">
            <div class="streak-count-wrap">
              <span class="streak-number">{{ streakCount }}</span>
              <span class="streak-unit">day streak</span>
            </div>
            <p class="streak-message">
              Come back tomorrow to keep it going.
            </p>
          </div>
        </template>
      </SprCard>

    </div>

    <!-- [DI-4] Two CTAs: view skill map (progress) or return tomorrow (habit loop) -->
    <div class="cta-area">
      <SprButton
        tone="success"
        size="large"
        :fullwidth="true"
        aria-label="See your skill path"
        @click="emit('view-progress')"
      >
        See my progress
      </SprButton>
      <button
        class="secondary-cta"
        aria-label="Return to home dashboard"
        @click="emit('continue')"
      >
        Come back tomorrow
      </button>
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

/* Scrollable content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Celebration — typography-first, no sparkle/AI badge */
.celebration-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 8px;
  gap: 12px;
}
.celebration-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #dcfce6; /* kangkong-100 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.celebration-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #158039; /* kangkong-700 */
}
.celebration-headline {
  font-size: 32px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green */
  text-align: center;
}
.celebration-sub {
  font-size: 16px;
  color: #5d6c6b; /* mushroom-600 */
  text-align: center;
}

/* [DI-4] XP lozenge — centered, prominent */
.xp-area {
  display: flex;
  justify-content: center;
}

/* [FP-2] Capability statement card */
.capability-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.capability-label {
  font-size: 11px;
  font-weight: 700;
  color: #158039; /* kangkong-700 */
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.capability-text {
  font-size: 16px;
  font-weight: 500;
  color: #00291b; /* intentional: brand deep green */
  line-height: 1.5;
}

/* Streak card */
.streak-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.streak-count-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.streak-number {
  font-size: 36px;
  font-weight: 700;
  color: #158039; /* kangkong-700 */
  line-height: 1;
}
.streak-unit {
  font-size: 16px;
  font-weight: 500;
  color: #00291b; /* intentional: brand deep green */
}
.streak-message {
  font-size: 14px;
  color: #5d6c6b; /* mushroom-600 */
  line-height: 1.4;
}

/* CTA */
.cta-area {
  padding: 16px 24px 48px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.secondary-cta {
  background: none;
  border: none;
  font-family: 'Rubik', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #5d6c6b;
  cursor: pointer;
  text-align: center;
  padding: 4px 0;
}
.secondary-cta:focus-visible {
  outline: 2px solid #158039;
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
