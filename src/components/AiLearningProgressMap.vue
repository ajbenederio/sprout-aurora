<script setup>
// AiLearningProgressMap — Visual skill path showing completed and upcoming lessons
// Research brief §11 screen 7 — "Visual map of completed and upcoming skills"
// DI-5: surfaces forward momentum; combats FP-2 (Progress Invisibility)
// 10 role-specific skills per path; status derived from lessonsCompleted prop

import { computed } from 'vue'

const props = defineProps({
  role:             { type: String, default: 'customer-service' },
  lessonsCompleted: { type: Number, default: 1 },
  xpTotal:          { type: Number, default: 88 },
})

const emit = defineEmits(['back', 'start-lesson'])

const roleLabelMap = {
  'customer-service': 'Customer Service',
  'hr-admin':         'HR & Admin',
  'operations':       'Operations',
  'other':            'General',
}
const roleLabel = computed(() => roleLabelMap[props.role] || 'Your Role')

const skillsByRole = {
  'customer-service': [
    'What is a prompt?',
    'Handling complaints with AI',
    'Writing faster replies',
    'Summarizing long emails',
    'Spotting tone in messages',
    'Drafting escalation notes',
    'Using AI for FAQs',
    'Checking AI output quality',
    'Prompts that save time',
    'Building your AI habit',
  ],
  'hr-admin': [
    'What is a prompt?',
    'Summarizing documents with AI',
    'Drafting communications faster',
    'Prepping for 1-on-1s',
    'Writing job descriptions with AI',
    'AI for onboarding checklists',
    'Reviewing policies with AI',
    'Meeting summary prompts',
    'Checking AI output quality',
    'Building your AI habit',
  ],
  'operations': [
    'What is a prompt?',
    'Spotting patterns in feedback',
    'Writing process docs with AI',
    'Summarizing team updates',
    'Vendor communication prompts',
    'AI for status updates',
    'Tracking action items with AI',
    'Risk-spotting prompts',
    'Checking AI output quality',
    'Building your AI habit',
  ],
  'other': [
    'What is a prompt?',
    'Applying AI to your daily tasks',
    'Writing clearer messages',
    'Summarizing with AI',
    'Giving AI better context',
    'Checking AI output quality',
    'Saving time with AI',
    'Role-specific prompt tactics',
    'Building an AI habit',
    'Your next AI challenge',
  ],
}

const skills = computed(() => {
  const list = skillsByRole[props.role] || skillsByRole['other']
  return list.map((name, i) => {
    let status
    if (i < props.lessonsCompleted)      status = 'completed'
    else if (i === props.lessonsCompleted) status = 'active'
    else                                   status = 'upcoming'
    return { name, status, number: i + 1 }
  })
})

const pathProgress = computed(() => Math.min(props.lessonsCompleted * 10, 100))
</script>

<template>
  <div class="screen" role="main" aria-label="Your AI learning path">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Header -->
    <div class="page-header">
      <button class="back-btn" @click="emit('back')" aria-label="Back to dashboard">
        ‹ Home
      </button>
      <span class="header-title">Your AI Path</span>
      <div class="header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Path summary with overall progress -->
    <div class="path-summary">
      <div class="path-label-row">
        <span class="path-label">{{ roleLabel }} path</span>
        <span class="path-pct" aria-label="`${pathProgress}% complete`">{{ pathProgress }}%</span>
      </div>
      <!-- [FP-2] Progress bar — makes cumulative progress visible at a glance -->
      <SprProgressBar
        size="sm"
        :value="pathProgress"
        :max="100"
        color="success"
        :label="false"
      />
      <div class="path-stats">
        <span class="stat">{{ lessonsCompleted }} of {{ skills.length }} lessons done</span>
        <span class="stat-dot" aria-hidden="true">·</span>
        <span class="stat">{{ xpTotal }} XP earned</span>
      </div>
    </div>

    <!-- Skill list -->
    <div class="skill-list" role="list" aria-label="Skill path">
      <div
        v-for="skill in skills"
        :key="skill.number"
        class="skill-row"
        :class="[`skill-row--${skill.status}`]"
        role="listitem"
        :aria-label="`Lesson ${skill.number}: ${skill.name} — ${skill.status}`"
      >
        <!-- Status node — green filled = done, green outline = active, gray = upcoming -->
        <div
          class="skill-node"
          :class="[`skill-node--${skill.status}`]"
          aria-hidden="true"
        >
          <span v-if="skill.status === 'completed'" class="skill-check">✓</span>
          <span v-else class="skill-num">{{ skill.number }}</span>
        </div>

        <!-- Skill name + sub-label -->
        <div class="skill-info">
          <span class="skill-name">{{ skill.name }}</span>
          <span v-if="skill.status === 'completed'" class="skill-meta skill-meta--done">Completed</span>
          <span v-else-if="skill.status === 'active'"   class="skill-meta skill-meta--active">Up next · ~5 min</span>
          <span v-else                                   class="skill-meta skill-meta--locked">Coming up</span>
        </div>

        <!-- Action — only active skill has a start button -->
        <div class="skill-action">
          <SprButton
            v-if="skill.status === 'active'"
            tone="success"
            size="small"
            variant="primary"
            :aria-label="`Start ${skill.name}`"
            @click="emit('start-lesson')"
          >
            Start
          </SprButton>
          <span
            v-else-if="skill.status === 'upcoming'"
            class="skill-lock"
            aria-hidden="true"
          >○</span>
        </div>
      </div>
    </div>

    <!-- Footer CTA -->
    <div class="cta-area">
      <SprButton
        tone="neutral"
        variant="secondary"
        size="large"
        :fullwidth="true"
        aria-label="Back to home dashboard"
        @click="emit('back')"
      >
        Back to home
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

/* Page header */
.page-header {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #E6EAEA;
  flex-shrink: 0;
}
.back-btn {
  background: none;
  border: none;
  font-family: 'Rubik', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #158039;
  cursor: pointer;
  padding: 4px 0;
  min-width: 60px;
}
.back-btn:focus-visible {
  outline: 2px solid #158039;
  outline-offset: 2px;
  border-radius: 4px;
}
.header-title {
  font-size: 16px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green */
}
.header-spacer { width: 60px; }

/* Path summary */
.path-summary {
  padding: 16px 24px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #E6EAEA;
  flex-shrink: 0;
}
.path-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.path-label {
  font-size: 14px;
  font-weight: 600;
  color: #00291b;
}
.path-pct {
  font-size: 14px;
  font-weight: 700;
  color: #158039; /* kangkong-700 */
}
.path-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stat {
  font-size: 12px;
  color: #5d6c6b; /* mushroom-600 */
}
.stat-dot {
  color: #D9DEDE;
  font-size: 14px;
}

/* Skill list — scrollable */
.skill-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}
.skill-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px;
  border-bottom: 1px solid #F5F6F6;
  transition: background 0.15s;
}
.skill-row--upcoming { opacity: 0.5; }

/* Node indicator */
.skill-node {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.skill-node--completed {
  background: #158039;
  color: #ffffff;
}
.skill-node--active {
  background: #dcfce6; /* kangkong-100 */
  color: #158039;
  border: 2px solid #158039;
}
.skill-node--upcoming {
  background: #F5F6F6;
  color: #5d6c6b;
}
.skill-check { font-size: 16px; font-weight: 700; }
.skill-num   { font-size: 14px; font-weight: 700; }

/* Skill info */
.skill-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.skill-name {
  font-size: 14px;
  font-weight: 500;
  color: #00291b;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.skill-meta        { font-size: 12px; }
.skill-meta--done  { color: #158039; }
.skill-meta--active { color: #158039; font-weight: 500; }
.skill-meta--locked { color: #5d6c6b; }

/* Upcoming lock dot */
.skill-lock {
  font-size: 18px;
  color: #D9DEDE;
}

/* Skill action */
.skill-action { flex-shrink: 0; }

/* Footer CTA */
.cta-area {
  padding: 16px 24px 48px;
  flex-shrink: 0;
  border-top: 1px solid #E6EAEA;
}
</style>
