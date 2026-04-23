<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">

    <!-- Test 1: { text, value } shape — expected to work -->
    <div>
      <p style="margin-bottom: 8px;">Test 1: menuList with { text, value } shape</p>
      <spr-button-dropdown
        dropdown-id="test-text-value"
        v-model="selected1"
        :menu-list="menuListText"
        width="160px"
        popper-width="160px"
        @click="() => console.log('main button clicked')"
        @update:model-value="(val) => console.log('update:modelValue', val)"
      >
        Text Shape
      </spr-button-dropdown>
      <p style="margin-top: 8px; font-size: 12px;">Selected: {{ selected1 }}</p>
    </div>

    <!-- Test 2: { label, value } shape — expected to fail or render blank items -->
    <div>
      <p style="margin-bottom: 8px;">Test 2: menuList with { label, value } shape</p>
      <spr-button-dropdown
        dropdown-id="test-label-value"
        v-model="selected2"
        :menu-list="menuListLabel"
        width="160px"
        popper-width="160px"
        @update:model-value="(val) => console.log('label shape update:modelValue', val)"
      >
        Label Shape
      </spr-button-dropdown>
      <p style="margin-top: 8px; font-size: 12px;">Selected: {{ selected2 }}</p>
    </div>

    <!-- Test 3: standalone use (no spr-button wrapper) — does it render? -->
    <div>
      <p style="margin-bottom: 8px;">Test 3: standalone (no spr-button wrapper)</p>
      <spr-button-dropdown
        dropdown-id="test-standalone"
        v-model="selected3"
        :menu-list="menuListText"
        width="160px"
        popper-width="160px"
      >
        Standalone
      </spr-button-dropdown>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected1 = ref([])
const selected2 = ref([])
const selected3 = ref([])

const menuListText = [
  { text: 'Add', value: 'add' },
  { text: 'Edit', value: 'edit' },
  { text: 'Delete', value: 'delete' },
]

const menuListLabel = [
  { label: 'Add', value: 'add' },
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' },
]
</script>