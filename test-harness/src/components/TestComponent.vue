<template>
  <div style="padding: 24px;">
    <spr-accordion
      :accordionItems="items"
      :isDefaultOpen="false"
      :alwaysOpen="false"
      :bordered="true"
      accordionTrigger="button"
    >
      <template v-for="item in items" #[item.collapseId] :key="item.collapseId">
        Content for {{ item.title }}
      </template>
    </spr-accordion>
  </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from 'design-system-next'

const items: AccordionItem[] = [
  { title: 'Section 1', collapseId: 'section-1' },
  { title: 'Section 2', subtitle: 'Optional subtitle', collapseId: 'section-2' },
]
</script>