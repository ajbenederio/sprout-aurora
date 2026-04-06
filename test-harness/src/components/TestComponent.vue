<script setup lang="ts">
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('Pre-filled value')
const text3 = ref('')
const text4 = ref('')
const text5 = ref('')
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px; max-width: 600px;">

    <!-- 1. Basic usage — label, placeholder, v-model -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">1. Basic — label + placeholder + v-model</p>
      <spr-textarea
        id="textarea-basic"
        v-model="text1"
        label="Basic Textarea"
        placeholder="Type something..."
      />
      <p style="margin-top: 4px; font-size: 12px;">Bound value: "{{ text1 }}"</p>
    </div>

    <!-- 2. Supporting label -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">2. Supporting label</p>
      <spr-textarea
        id="textarea-supporting"
        v-model="text2"
        label="With Supporting Label"
        supporting-label="Optional"
      />
    </div>

    <!-- 3. Error state -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">3. Error state</p>
      <spr-textarea
        id="textarea-error"
        v-model="text3"
        label="Error Textarea"
        :error="true"
        placeholder="This has an error"
      />
    </div>

    <!-- 4. Disabled + readonly -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">4. Disabled</p>
      <spr-textarea
        id="textarea-disabled"
        v-model="text2"
        label="Disabled"
        :disabled="true"
      />
      <p style="margin-top: 16px; font-weight: bold;">4b. Readonly</p>
      <spr-textarea
        id="textarea-readonly"
        v-model="text2"
        label="Readonly"
        :readonly="true"
      />
    </div>

    <!-- 5. rows prop -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">5. rows=8 (default is 4)</p>
      <spr-textarea
        id="textarea-rows"
        v-model="text4"
        label="Tall Textarea"
        :rows="8"
        placeholder="Should be taller than default"
      />
    </div>

    <!-- 6. displayHelper + helperText + helperIcon -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">6. displayHelper + helperText + helperIcon</p>
      <spr-textarea
        id="textarea-helper"
        v-model="text5"
        label="With Helper"
        :display-helper="true"
        helper-text="This is the helper text"
        helper-icon="info"
      />
    </div>

    <!-- 7. helperMessage slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">7. helperMessage slot</p>
      <spr-textarea
        id="textarea-helper-slot"
        v-model="text5"
        label="Helper via Slot"
        :display-helper="true"
      >
        <template #helperMessage>
          <span style="color: purple;">Slot-rendered helper message</span>
        </template>
      </spr-textarea>
    </div>

    <!-- 8. hasCounter without maxLength -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">8. hasCounter — no maxLength</p>
      <spr-textarea
        id="textarea-counter-no-max"
        v-model="text5"
        label="Counter Without maxLength"
        :has-counter="true"
      />
    </div>

    <!-- 9. hasCounter with maxLength -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">9. hasCounter + maxLength=100</p>
      <spr-textarea
        id="textarea-counter-max"
        v-model="text5"
        label="Counter With maxLength"
        :has-counter="true"
        :max-length="100"
      />
    </div>

    <!-- 10. counter slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">10. counter slot</p>
      <spr-textarea
        id="textarea-counter-slot"
        v-model="text5"
        label="Counter via Slot"
      >
        <template #counter>
          <span style="color: green;">Custom counter: {{ text5.length }}/200</span>
        </template>
      </spr-textarea>
    </div>

  </div>
</template>