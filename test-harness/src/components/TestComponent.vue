<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">

    <!-- Test: activeTab as index string -->
    <div>
      <p>activeTab="1" (index)</p>
      <spr-tabs :list="tabs" activeTab="1" />
    </div>

    <!-- Test: activeTab as label text -->
    <div>
      <p>activeTab="Tab Two" (label text)</p>
      <spr-tabs :list="tabs" activeTab="Tab Two" />
    </div>

  </div>
</template>

<script setup lang="ts">
const tabs = [
  { label: 'Tab One', value: 'tab1' },
  { label: 'Tab Two', value: 'tab2' },
  { label: 'Tab Three', value: 'tab3' },
]
</script>