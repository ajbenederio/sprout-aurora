<script setup lang="ts">
// No imports needed
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 48px;">

    <!-- Instance 1: All defaults (no props set) -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">1. All defaults — no props set</p>
      <spr-empty-state />
    </div>

    <!-- Instance 2: size="large", different image -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">2. size="large", image="dashboard"</p>
      <spr-empty-state
        size="large"
        image="dashboard"
        description="No dashboard data"
        subDescription="Connect an integration to get started."
      />
    </div>

    <!-- Instance 3: hasButton=false, #button slot — does slot render without hasButton=true? -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">3. #button slot, hasButton=false (default)</p>
      <spr-empty-state
        description="Slot test — hasButton=false"
        subDescription="Does the button slot appear below?"
      >
        <template #button>
          <spr-button label="Add Item" />
        </template>
      </spr-empty-state>
    </div>

    <!-- Instance 4: hasButton=true, #button slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">4. #button slot, hasButton=true</p>
      <spr-empty-state
        description="Slot test — hasButton=true"
        subDescription="Does the button slot appear below?"
        :hasButton="true"
      >
        <template #button>
          <spr-button label="Add Item" />
        </template>
      </spr-empty-state>
    </div>

    <!-- Instance 5: #default slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">5. #default slot</p>
      <spr-empty-state
        description="Default slot test"
        subDescription="Custom content below?"
      >
        <template #default>
          <p style="color: red; font-size: 12px;">I am default slot content</p>
        </template>
      </spr-empty-state>
    </div>

    <!-- Instance 6: emptyStateCustomClasses -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">6. emptyStateCustomClasses passthrough</p>
      <spr-empty-state
        description="Custom class test"
        emptyStateCustomClasses="my-custom-class"
        image="bug"
      />
    </div>

    <!-- Instance 7: Sample of other image values -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">7. image="work-in-progress"</p>
      <spr-empty-state
        image="work-in-progress"
        description="Work in progress"
        subDescription="Check back soon."
      />
    </div>

  </div>
</template>