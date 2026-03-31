<script setup>
// [DI-1] Anxiety Reframe Splash
// Resolves FP-1 (Intent-to-Action Chasm) + FP-4 (First Failure Moment)
// Research: edX 2025 — 61% intend to upskill due to anxiety; threat-appraisal reframe must
// precede any content. Human-at-work imagery only — no robot/sparkle/AI badge visual language.

const emit = defineEmits(['continue'])
</script>

<template>
  <div class="screen" role="main" aria-label="Welcome to AI learning">

    <!-- iOS Status Bar -->
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>■</span>
      </div>
    </div>

    <!-- [DI-1] Illustration: human at work — warm, non-technical, no AI badge/sparkle -->
    <!-- Replace inner content with actual human-at-work illustration asset URL -->
    <div class="illustration-area" aria-hidden="true">
      <div class="illustration-inner">
        <div class="illustration-icon-wrap">
          <div class="illustration-circle"></div>
          <div class="illustration-line long"></div>
          <div class="illustration-line medium"></div>
          <div class="illustration-line short"></div>
        </div>
        <p class="illustration-caption">People using AI well at work</p>
      </div>
    </div>

    <!-- [DI-1] Name the emotional state BEFORE making any product claim -->
    <div class="copy-area">
      <h1 class="headline">Feeling uncertain about AI at work?</h1>
      <p class="subhead">You're not alone — and you don't need to be technical to use AI well.</p>
      <p class="body-text">5 minutes a day. Real examples from your actual job. No jargon.</p>
    </div>

    <!-- [FP-1] Single CTA — no choices, no overwhelm, zero cognitive distance -->
    <div class="cta-area">
      <SprButton
        tone="success"
        size="large"
        :fullwidth="true"
        aria-label="Begin AI learning journey"
        @click="emit('continue')"
      >
        I'm ready to start
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

/* [DI-1] Illustration — kangkong-100 warm bg, human-centered placeholder */
.illustration-area {
  flex: 1;
  margin: 0 24px;
  background: #dcfce6; /* kangkong-100 */
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
}
.illustration-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
}
/* Geometric placeholder — replace with real asset */
.illustration-icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.illustration-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #158039; /* kangkong-700 */
}
.illustration-line {
  height: 10px;
  border-radius: 6px;
  background: #158039; /* kangkong-700 */
  opacity: 0.4;
}
.illustration-line.long  { width: 140px; }
.illustration-line.medium { width: 100px; }
.illustration-line.short  { width: 70px; }
.illustration-caption {
  font-size: 12px;
  color: #5d6c6b; /* mushroom-600 */
  text-align: center;
}

/* Copy */
.copy-area {
  padding: 32px 24px 12px;
  flex-shrink: 0;
}
.headline {
  font-size: 26px;
  font-weight: 700;
  color: #00291b; /* intentional: brand deep green — not in DS token set */
  line-height: 1.25;
  margin-bottom: 12px;
}
.subhead {
  font-size: 16px;
  font-weight: 400;
  color: #5d6c6b; /* mushroom-600 */
  line-height: 1.5;
  margin-bottom: 8px;
}
.body-text {
  font-size: 14px;
  color: #5d6c6b; /* mushroom-600 */
  line-height: 1.5;
}

/* CTA */
.cta-area {
  padding: 16px 24px 48px;
  flex-shrink: 0;
}
</style>
