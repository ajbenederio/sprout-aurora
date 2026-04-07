<script setup lang="ts">
import { ref } from 'vue'
const sel = ref([])
</script>

<template>
  <div style="padding: 24px; max-width: 500px; display: flex; flex-direction: column; gap: 32px;">

    <div>
      <p style="font-weight: bold; margin-bottom: 8px;">#empty slot</p>
      <spr-filter id="fe1" v-model="sel" :options="[]" label="Empty slot test">
        <template #empty>
          <span style="color: purple; padding: 8px; display: block;">EMPTY SLOT</span>
        </template>
      </spr-filter>
    </div>

    <div>
      <p style="font-weight: bold; margin-bottom: 8px;">#empty-state slot</p>
      <spr-filter id="fe2" v-model="sel" :options="[]" label="Empty-state slot test">
        <template #empty-state>
          <span style="color: green; padding: 8px; display: block;">EMPTY-STATE SLOT</span>
        </template>
      </spr-filter>
    </div>

  </div>
</template>