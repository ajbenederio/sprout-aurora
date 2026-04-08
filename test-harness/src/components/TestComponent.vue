<script setup lang="ts">
import { ref } from 'vue'

const snackbar = ref()

function triggerSuccess() {
  snackbar.value.showSuccess({ text: 'Changes saved successfully', showIcon: true })
}
function triggerDanger() {
  snackbar.value.showDanger({ text: 'Something went wrong', showIcon: true })
}
function triggerInfo() {
  snackbar.value.showInformation({ text: 'Your session will expire soon', showIcon: true })
}
function triggerCaution() {
  snackbar.value.showCaution({ text: 'This action cannot be undone', showIcon: true })
}
function triggerWithAction() {
  snackbar.value.showSnackbar({
    text: 'Employee record updated',
    tone: 'success',
    showAction: true,
    actionText: 'Undo',
    action: () => console.log('[snack] undo clicked'),
    showIcon: true,
    duration: 6000,
  })
}
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
    <h2>spr-snackbar Verification</h2>

    <spr-snackbar ref="snackbar" />

    <button @click="triggerSuccess">1. Success</button>
    <button @click="triggerDanger">2. Danger</button>
    <button @click="triggerInfo">3. Information</button>
    <button @click="triggerCaution">4. Caution</button>
    <button @click="triggerWithAction">5. With Undo action (6s duration)</button>
  </div>
</template>