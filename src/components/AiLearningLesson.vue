<script setup>
// [DI-3] Lesson Screen — 3-card format: Explain → Try → Reflect
// Resolves FP-1 (Intent-to-Action Chasm) + FP-3 (Generic Framing Mismatch) + FP-4 (First Failure Moment)
// Research: microlearning 83% completion vs 20-30% traditional; DOL framework mandates experiential learning.
// 3-card architecture: concept (explain) → prompted AI task (try) → reflection (reflect).
// Simulated AI response in MVP removes FP-4 failure risk. Never show failure without recovery path.

import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  role: {
    type: String,
    default: 'customer-service',
  },
})

const emit = defineEmits(['complete'])

// 3-card progression: 0 = explain, 1 = try, 2 = reflect
const currentCard = ref(0)
const showAiResponse = ref(false)
const reflectionAnswer = ref(null)

// [DI-4] Variable XP — not fixed, creates variable reward loop
// Range: 80–100 per session
const sessionXp = ref(0)
onMounted(() => {
  sessionXp.value = Math.floor(Math.random() * 21) + 80
})

// Progress: 33% → 66% → 100% across 3 cards
const progressValue = computed(() => Math.round(((currentCard.value + 1) / 3) * 100))

// [FP-3] Role-specific content map — all content anchored to the user's selected role
const roleContent = {
  'customer-service': {
    label: 'Customer Service',
    concept:
      'AI can handle repetitive questions — freeing you for conversations that need a human touch. A prompt is simply a clear instruction you give to AI, like telling a helpful colleague exactly what to do.',
    promptText:
      'Write a polite reply to a customer asking about a 2-day delivery delay. Keep it under 3 sentences.',
    aiResponse:
      '"Hi [Customer Name], thank you for reaching out. Your order has experienced a brief delay and will arrive within 2 business days. We appreciate your patience and are sorry for the inconvenience."',
    capability: 'write a prompt to handle a routine customer message',
  },
  'hr-admin': {
    label: 'HR & Admin',
    concept:
      'AI can help you draft communications, summarize documents, and handle routine paperwork faster — so you can focus on the people decisions that matter most.',
    promptText:
      'Summarize this job description into 3 bullet points highlighting only the must-have skills.',
    aiResponse:
      '"• 3+ years in HR operations or a similar people-facing role\n• Proficiency in HRIS platforms and employee data management\n• Clear written and verbal communication skills"',
    capability: 'use a prompt to summarize documents in seconds',
  },
  'operations': {
    label: 'Operations',
    concept:
      'AI can help you spot patterns in data, draft reports, and answer "what happened and why" questions faster — without needing to be a data analyst.',
    promptText:
      'Look at these 5 customer complaints and identify the most common underlying issue.',
    aiResponse:
      '"The most common issue across these complaints is delayed communication — customers were not notified proactively when their order status changed. This appears in 4 of 5 complaints."',
    capability: 'use a prompt to find patterns in feedback or data',
  },
  'other': {
    label: 'Your Work',
    concept:
      'AI responds to clear instructions called prompts. The clearer your instruction, the better the result. You don\'t need to know how AI works — just what you need done.',
    promptText:
      'Write a clear, friendly out-of-office reply for a 3-day absence.',
    aiResponse:
      '"Hi, thank you for your message! I\'m out of office from [start date] to [end date] with limited email access. I\'ll reply when I\'m back. For urgent matters, please contact [colleague name]."',
    capability: 'write a clear prompt for a task in your role',
  },
}

const content = computed(() => roleContent[props.role] || roleContent['other'])

function nextCard() {
  if (currentCard.value < 2) {
    currentCard.value++
    showAiResponse.value = false
  }
}

function revealAiResponse() {
  showAiResponse.value = true
}

function selectReflection(answer) {
  reflectionAnswer.value = answer
}

function finishLesson() {
  emit('complete', sessionXp.value)
}
</script>

<template>
  <div class="screen" role="main" :aria-label="`AI lesson for ${content.label}`">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- Lesson Header: role label + card progress -->
    <div class="lesson-header">
      <span class="role-label">{{ content.label }}</span>
      <span class="card-counter" aria-live="polite">{{ currentCard + 1 }} of 3</span>
    </div>

    <!-- [DI-3] Progress bar — makes lesson length visible, reduces FP-2 -->
    <div class="progress-wrap" aria-label="Lesson progress">
      <SprProgressBar
        size="xs"
        :value="progressValue"
        :max="100"
        color="success"
        :label="false"
      />
    </div>

    <!-- Scrollable card content -->
    <div class="content">

      <!-- Card 0: Explain — plain-language concept, ≤8th grade reading level (DI-3) -->
      <div v-if="currentCard === 0" class="card-wrap">
        <div class="card-tag">Concept</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
        >
          <template #default>
            <div class="card-content">
              <!-- [FP-3] Role-specific framing from the first word -->
              <p class="card-eyebrow">AI for {{ content.label }}</p>
              <p class="card-body">{{ content.concept }}</p>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Card 1: Try — prompted AI task with simulated response (DI-3, FP-4) -->
      <!-- [FP-4] Simulated response removes failure risk — user always sees a good result -->
      <div v-else-if="currentCard === 1" class="card-wrap">
        <div class="card-tag">Try it</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
        >
          <template #default>
            <div class="card-content">
              <p class="card-eyebrow">Your prompt</p>
              <!-- Pre-filled prompt — editable so user feels authorship -->
              <textarea
                class="prompt-textarea"
                :value="content.promptText"
                rows="4"
                aria-label="Your AI prompt — you can edit this"
              />

              <!-- Generate button — only shown before response -->
              <div v-if="!showAiResponse" class="try-cta">
                <SprButton
                  tone="neutral"
                  size="medium"
                  :fullwidth="true"
                  aria-label="See simulated AI response"
                  @click="revealAiResponse"
                >
                  See AI response
                </SprButton>
              </div>

              <!-- Simulated AI response — revealed after tap -->
              <Transition name="fade">
                <div v-if="showAiResponse" class="ai-response-wrap" aria-live="polite">
                  <p class="ai-response-label">AI response</p>
                  <div class="ai-response-bubble">
                    <p class="ai-response-text">{{ content.aiResponse }}</p>
                  </div>
                  <p class="ai-response-note">
                    This is a simulated response — real AI gives similar results.
                  </p>
                </div>
              </Transition>
            </div>
          </template>
        </SprCard>
      </div>

      <!-- Card 2: Reflect — non-judgmental one-tap reflection (DI-3) -->
      <!-- Reflection is binary: Yes / Sort of — never "No" or failure framing -->
      <div v-else-if="currentCard === 2" class="card-wrap">
        <div class="card-tag">Reflect</div>
        <SprCard
          tone="plain"
          :show-header="false"
          :show-footer="false"
          border-radius-size="lg"
        >
          <template #default>
            <div class="card-content">
              <p class="card-eyebrow">Quick check</p>
              <p class="card-body reflect-question">Did that feel useful for your work?</p>
              <div class="reflect-options" role="radiogroup" aria-label="Reflection response">
                <button
                  class="reflect-btn"
                  :class="{ active: reflectionAnswer === 'yes' }"
                  role="radio"
                  :aria-checked="reflectionAnswer === 'yes'"
                  @click="selectReflection('yes')"
                >
                  Yes, that was useful
                </button>
                <button
                  class="reflect-btn"
                  :class="{ active: reflectionAnswer === 'sort-of' }"
                  role="radio"
                  :aria-checked="reflectionAnswer === 'sort-of'"
                  @click="selectReflection('sort-of')"
                >
                  Sort of — I'd like more examples
                </button>
              </div>
            </div>
          </template>
        </SprCard>
      </div>

      <div class="h-spacer"></div>
    </div>

    <!-- Fixed footer CTA — advances card or completes lesson -->
    <div class="cta-area">
      <!-- Cards 0 and 1: Continue to next card -->
      <SprButton
        v-if="currentCard < 2"
        tone="success"
        size="large"
        :fullwidth="true"
        :disabled="currentCard === 1 && !showAiResponse"
        aria-label="Continue to next part"
        @click="nextCard"
      >
        Continue
      </SprButton>

      <!-- Card 2: Finish lesson -->
      <SprButton
        v-else
        tone="success"
        size="large"
        :fullwidth="true"
        :disabled="!reflectionAnswer"
        aria-label="Finish lesson and see results"
        @click="finishLesson"
      >
        Finish lesson
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

/* Lesson header */
.lesson-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}
.role-label {
  font-size: 13px;
  font-weight: 600;
  color: #158039; /* kangkong-700 */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-counter {
  font-size: 13px;
  color: #5d6c6b; /* mushroom-600 */
}

/* [DI-3] Progress bar — lesson length visible from start */
.progress-wrap {
  padding: 0 24px 16px;
  flex-shrink: 0;
}

/* Scrollable content */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
}
.h-spacer { height: 80px; }

/* Card type tag */
.card-tag {
  font-size: 11px;
  font-weight: 700;
  color: #5d6c6b; /* mushroom-600 */
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}

/* Card inner content */
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #158039; /* kangkong-700 */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-body {
  font-size: 16px;
  font-weight: 400;
  color: #00291b; /* intentional: brand deep green */
  line-height: 1.6;
}

/* Prompt textarea */
.prompt-textarea {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #D9DEDE; /* mushroom-200 */
  border-radius: 10px;
  font-family: 'Rubik', system-ui, sans-serif;
  font-size: 14px;
  color: #00291b;
  line-height: 1.5;
  resize: none;
  background: #F1F2F3; /* white-100 */
}
.prompt-textarea:focus {
  outline: none;
  border-color: #158039; /* kangkong-700 */
}

.try-cta {
  margin-top: 4px;
}

/* Simulated AI response */
.ai-response-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ai-response-label {
  font-size: 12px;
  font-weight: 600;
  color: #158039; /* kangkong-700 */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ai-response-bubble {
  background: #dcfce6; /* kangkong-100 */
  border-radius: 12px;
  padding: 14px;
}
.ai-response-text {
  font-size: 14px;
  color: #00291b;
  line-height: 1.6;
  white-space: pre-line;
}
.ai-response-note {
  font-size: 11px;
  color: #5d6c6b; /* mushroom-600 */
  font-style: italic;
}

/* Reflect card */
.reflect-question {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}
.reflect-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}
.reflect-btn {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #D9DEDE; /* mushroom-200 */
  border-radius: 10px;
  background: #ffffff;
  font-family: 'Rubik', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #00291b;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
}
.reflect-btn:hover {
  border-color: #158039;
  background: #F0FDF4; /* kangkong-50 */
}
.reflect-btn.active {
  border-color: #158039; /* kangkong-700 */
  background: #dcfce6; /* kangkong-100 */
  font-weight: 500;
}
.reflect-btn:focus-visible {
  outline: 3px solid #158039;
  outline-offset: 2px;
}

/* CTA */
.cta-area {
  padding: 12px 24px 48px;
  flex-shrink: 0;
}

/* Fade transition for AI response reveal */
.fade-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(8px); }
</style>
