<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">

    <!-- String array options -->
    <spr-select
      id="basic"
      v-model="selected1"
      :options="stringOptions"
      label="String Options"
      placeholder="Select one..."
    />

    <!-- Object options with textField/valueField -->
    <spr-select
      id="object"
      v-model="selected2"
      :options="objectOptions"
      textField="label"
      valueField="id"
      label="Object Options"
      placeholder="Select one..."
    />

    <!-- Searchable -->
    <spr-select
      id="searchable"
      v-model="selected3"
      :options="stringOptions"
      label="Searchable"
      placeholder="Search and select..."
      :searchable="true"
    />

    <!-- Clearable -->
    <spr-select
      id="clearable"
      v-model="selected4"
      :options="stringOptions"
      label="Clearable"
      placeholder="Select then clear..."
      :clearable="true"
    />

    <!-- Error state -->
    <spr-select
      id="error"
      v-model="selected5"
      :options="stringOptions"
      label="Error State"
      :error="true"
      placeholder="Error..."
    />

    <!-- Disabled -->
    <spr-select
      id="disabled"
      v-model="selected6"
      :options="stringOptions"
      label="Disabled"
      :disabled="true"
      placeholder="Disabled..."
    />

    <!-- Helper text -->
    <spr-select
      id="helper"
      v-model="selected7"
      :options="stringOptions"
      label="With Helper"
      :displayHelper="true"
      helperText="Choose wisely"
      placeholder="Has helper..."
    />

    <!-- groupItemsBy -->
    <spr-select
      id="grouped"
      v-model="selected8"
      :options="stringOptions"
      label="Grouped A-Z"
      groupItemsBy="A-Z"
      placeholder="Grouped..."
    />

    <div>Selected values: {{ { selected1, selected2, selected3, selected4 } }}</div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected1 = ref('')
const selected2 = ref('')
const selected3 = ref('')
const selected4 = ref('')
const selected5 = ref('')
const selected6 = ref('')
const selected7 = ref('')
const selected8 = ref('')

const stringOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

const objectOptions = [
  { id: 1, label: 'Option A' },
  { id: 2, label: 'Option B' },
  { id: 3, label: 'Option C' },
]
</script>