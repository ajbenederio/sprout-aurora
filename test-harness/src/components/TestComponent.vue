<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">

    <!-- Basic with v-model -->
    <spr-input
      id="basic"
      v-model="value"
      label="Basic Input"
      placeholder="Type something..."
    />

    <!-- Supporting label -->
    <spr-input
      id="supporting"
      v-model="value"
      label="With Supporting Label"
      supportingLabel="This is a supporting label"
      placeholder="Type something..."
    />

    <!-- Char count -->
    <spr-input
      id="charcount"
      v-model="value"
      label="Char Count"
      :showCharCount="true"
      :maxLength="50"
      placeholder="Max 50 chars..."
    />

    <!-- Error state -->
    <spr-input
      id="error"
      v-model="value"
      label="Error State"
      :error="true"
      placeholder="Something went wrong..."
    />

    <!-- Disabled -->
    <spr-input
      id="disabled"
      v-model="value"
      label="Disabled"
      :disabled="true"
      placeholder="Disabled..."
    />

    <!-- Readonly -->
    <spr-input
      id="readonly"
      v-model="value"
      label="Readonly"
      :readonly="true"
      placeholder="Readonly..."
    />

    <!-- Helper text -->
    <spr-input
      id="helper"
      v-model="value"
      label="With Helper"
      :displayHelper="true"
      helperText="This is helper text"
      placeholder="Has helper..."
    />

    <!-- Prefix and trailing slots -->
    <spr-input
      id="slots"
      v-model="value"
      label="Prefix + Trailing Slots"
      placeholder="With slots..."
    >
      <template #prefix>PFX</template>
      <template #trailing>SFX</template>
    </spr-input>

    <!-- Active prop -->
    <spr-input
      id="active"
      v-model="value"
      label="Active prop"
      :active="true"
      placeholder="Active..."
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>