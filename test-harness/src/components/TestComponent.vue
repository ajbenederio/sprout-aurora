<template>
  <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">

    <!-- Variants -->
    <div style="display: flex; gap: 12px; align-items: center;">
      <spr-badge text="Brand" variant="brand" />
      <spr-badge text="Neutral" variant="neutral" />
      <spr-badge text="Danger" variant="danger" />
      <spr-badge text="Disabled" variant="disabled" />
      <spr-badge text="Info" variant="information" />
    </div>

    <!-- Sizes -->
    <div style="display: flex; gap: 12px; align-items: center;">
      <spr-badge text="Tiny" size="tiny" />
      <spr-badge text="Small" size="small" />
      <spr-badge text="Big" size="big" />
    </div>

    <!-- Position — wrapping a target element -->
    <div style="display: flex; gap: 32px; align-items: center;">
      <spr-badge text="5" position="top">
        <div style="width: 40px; height: 40px; background: #eee;" />
      </spr-badge>
      <spr-badge text="5" position="bottom">
        <div style="width: 40px; height: 40px; background: #eee;" />
      </spr-badge>
      <spr-badge text="5" position="default">
        <div style="width: 40px; height: 40px; background: #eee;" />
      </spr-badge>
    </div>

  </div>
</template>