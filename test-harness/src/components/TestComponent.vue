<template>
  <div style="padding: 48px;">
    <spr-button variant="primary">
      Actions
      <spr-button-dropdown
        :model-value="selected"
        dropdown-id="dropdown-1"
        :menu-list="menuItems"
        @update:model-value="onSelect"
      />
    </spr-button>
    <div style="margin-top: 16px;">Selected: {{ JSON.stringify(selected) }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref([])
const menuItems = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

const onSelect = (item) => {
  const exists = selected.value.findIndex(i => i.value === item.value)
  if (exists >= 0) {
    selected.value.splice(exists, 1)
  } else {
    selected.value.push(item)
  }
}
</script>