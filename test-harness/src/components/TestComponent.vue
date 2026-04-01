<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">

    <!-- Variants -->
    <spr-button variant="primary" tone="neutral">Primary Neutral</spr-button>
    <spr-button variant="secondary" tone="neutral">Secondary Neutral</spr-button>
    <spr-button variant="tertiary" tone="neutral">Tertiary Neutral</spr-button>

    <!-- Tones -->
    <spr-button tone="success">Success</spr-button>
    <spr-button tone="danger">Danger</spr-button>

    <!-- Sizes -->
    <spr-button size="small">Small</spr-button>
    <spr-button size="medium">Medium</spr-button>
    <spr-button size="large">Large</spr-button>

    <!-- States -->
    <spr-button :disabled="true">Disabled</spr-button>
    <spr-button :fullwidth="true">Full Width</spr-button>

    <!-- State prop -->
    <spr-button state="hover">State: hover</spr-button>

    <!-- hasIcon -->
    <spr-button :hasIcon="true">Has Icon</spr-button>

    <!-- Emit -->
    <spr-button @click="handleClick">Click me</spr-button>

  </div>
</template>

<script setup lang="ts">
const handleClick = (e: MouseEvent) => {
  console.log('clicked', e)
}
</script>