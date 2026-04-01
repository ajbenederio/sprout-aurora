<template>
  <div style="padding: 48px; display: flex; gap: 48px; flex-wrap: wrap;">

    <!-- Text prop -->
    <spr-tooltip text="Tooltip via text prop" placement="top">
      <spr-button>Hover me (text prop)</spr-button>
    </spr-tooltip>

    <!-- popper-content slot -->
    <spr-tooltip placement="top">
      <spr-button>Hover me (slot)</spr-button>
      <template #popper-content>
        <strong>Custom</strong> tooltip content
      </template>
    </spr-tooltip>

    <!-- Placement variants -->
    <spr-tooltip text="Bottom tooltip" placement="bottom">
      <spr-button>Bottom</spr-button>
    </spr-tooltip>

    <spr-tooltip text="Right tooltip" placement="right">
      <spr-button>Right</spr-button>
    </spr-tooltip>

    <spr-tooltip text="Left tooltip" placement="left">
      <spr-button>Left</spr-button>
    </spr-tooltip>

    <!-- Click trigger -->
    <spr-tooltip text="Click tooltip" showTriggers="click" hideTriggers="click">
      <spr-button>Click me</spr-button>
    </spr-tooltip>

  </div>
</template>