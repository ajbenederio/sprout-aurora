<script setup lang="ts">
function onRemove(e: MouseEvent) {
  console.log('[onRemove] clicked', e)
}
</script>

<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">

    <!-- Row 1: All 7 tones, default fill=false -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">1. All tones — fill=false (default)</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <spr-lozenge label="Plain" tone="plain" />
        <spr-lozenge label="Pending" tone="pending" />
        <spr-lozenge label="Information" tone="information" />
        <spr-lozenge label="Success" tone="success" />
        <spr-lozenge label="Danger" tone="danger" />
        <spr-lozenge label="Neutral" tone="neutral" />
        <spr-lozenge label="Caution" tone="caution" />
      </div>
    </div>

    <!-- Row 2: All 7 tones, fill=true -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">2. All tones — fill=true</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <spr-lozenge label="Plain" tone="plain" :fill="true" />
        <spr-lozenge label="Pending" tone="pending" :fill="true" />
        <spr-lozenge label="Information" tone="information" :fill="true" />
        <spr-lozenge label="Success" tone="success" :fill="true" />
        <spr-lozenge label="Danger" tone="danger" :fill="true" />
        <spr-lozenge label="Neutral" tone="neutral" :fill="true" />
        <spr-lozenge label="Caution" tone="caution" :fill="true" />
      </div>
    </div>

    <!-- Row 3: removable -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">3. removable=true — check console on click</p>
      <div style="display: flex; gap: 8px;">
        <spr-lozenge label="Removable" tone="information" :removable="true" @onRemove="onRemove" />
        <spr-lozenge label="Removable filled" tone="success" :removable="true" :fill="true" @onRemove="onRemove" />
      </div>
    </div>

    <!-- Row 4: url -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">4. url — renders as link?</p>
      <spr-lozenge label="Visit Link" tone="information" url="https://example.com" />
    </div>

    <!-- Row 5: visible=false -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">5. visible=false — should be hidden</p>
      <spr-lozenge label="Hidden lozenge" tone="danger" :visible="false" />
      <span style="font-size: 12px; color: gray;">(nothing should appear above)</span>
    </div>

    <!-- Row 6: loading=true -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">6. loading=true</p>
      <spr-lozenge label="Loading" tone="neutral" :loading="true" />
    </div>

    <!-- Row 7: interactive, dropdown -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">7. interactive=true, dropdown=true</p>
      <div style="display: flex; gap: 8px;">
        <spr-lozenge label="Interactive" tone="plain" :interactive="true" />
        <spr-lozenge label="Dropdown" tone="plain" :dropdown="true" />
        <spr-lozenge label="Both" tone="plain" :interactive="true" :dropdown="true" />
      </div>
    </div>

    <!-- Row 8: icon prop, postfixIcon prop -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">8. icon + postfixIcon props (format unknown)</p>
      <div style="display: flex; gap: 8px;">
        <spr-lozenge label="With icon" tone="information" icon="star" />
        <spr-lozenge label="With postfix" tone="information" postfixIcon="star" />
      </div>
    </div>

    <!-- Row 9: #avatar slot -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">9. #avatar slot</p>
      <spr-lozenge label="Jane Doe" tone="plain">
        <template #avatar>
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #999; display: inline-block;" />
        </template>
      </spr-lozenge>
    </div>

    <!-- Row 10: maxWidth -->
    <div>
      <p style="margin-bottom: 8px; font-weight: bold;">10. maxWidth="100px" — truncation?</p>
      <spr-lozenge label="This is a very long label that should truncate" tone="neutral" maxWidth="100px" />
    </div>

  </div>
</template>