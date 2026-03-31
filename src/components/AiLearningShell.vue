<script setup>
// AiLearningShell — wires all 5 AI learning screens into a self-contained flow
// Screen order: reframe → role-picker → lesson → session-complete → home (→ lesson loop)
//
// To add to App.vue: import AiLearningShell and add 'ai-learning' to screenMap.
// No external router required — shell manages its own currentScreen state.

import { ref, computed } from 'vue'
import AiLearningAnxietyReframe  from './AiLearningAnxietyReframe.vue'
import AiLearningRolePicker       from './AiLearningRolePicker.vue'
import AiLearningLesson           from './AiLearningLesson.vue'
import AiLearningSessionComplete  from './AiLearningSessionComplete.vue'
import AiLearningHome             from './AiLearningHome.vue'
import AiLearningProgressMap      from './AiLearningProgressMap.vue'

// Screen state
const currentScreen = ref('reframe')

// User state — flows between screens
const selectedRole    = ref('customer-service')
const xpEarned        = ref(88)
const streakCount     = ref(0)
const xpTotal         = ref(0)
const lessonsCompleted = ref(0)

// Path progress — increases 10% per lesson, capped at 100
const pathProgress = computed(() => Math.min(lessonsCompleted.value * 10, 100))

// Navigation handlers
function onReframeContinue() {
  currentScreen.value = 'role-picker'
}

function onRolePickerContinue(role) {
  selectedRole.value = role
  currentScreen.value = 'lesson'
}

function onLessonComplete(xp) {
  xpEarned.value = xp
  xpTotal.value += xp
  streakCount.value += 1
  lessonsCompleted.value += 1
  currentScreen.value = 'session-complete'
}

function onSessionCompleteContinue() {
  currentScreen.value = 'home'
}

function onViewProgress() {
  currentScreen.value = 'progress-map'
}

function onStartLesson() {
  currentScreen.value = 'lesson'
}
</script>

<template>
  <!-- Each child fills the 430×932 shell exactly — no wrapper styling needed -->
  <AiLearningAnxietyReframe
    v-if="currentScreen === 'reframe'"
    @continue="onReframeContinue"
  />

  <AiLearningRolePicker
    v-else-if="currentScreen === 'role-picker'"
    @continue="onRolePickerContinue"
  />

  <AiLearningLesson
    v-else-if="currentScreen === 'lesson'"
    :role="selectedRole"
    @complete="onLessonComplete"
  />

  <AiLearningSessionComplete
    v-else-if="currentScreen === 'session-complete'"
    :role="selectedRole"
    :xp-earned="xpEarned"
    :streak-count="streakCount"
    @continue="onSessionCompleteContinue"
    @view-progress="onViewProgress"
  />

  <AiLearningHome
    v-else-if="currentScreen === 'home'"
    :role="selectedRole"
    :streak-count="streakCount"
    :xp-total="xpTotal"
    :path-progress="pathProgress"
    :lessons-completed="lessonsCompleted"
    @start-lesson="onStartLesson"
    @view-progress="onViewProgress"
  />

  <AiLearningProgressMap
    v-else-if="currentScreen === 'progress-map'"
    :role="selectedRole"
    :lessons-completed="lessonsCompleted"
    :xp-total="xpTotal"
    @back="currentScreen = 'home'"
    @start-lesson="onStartLesson"
  />
</template>
