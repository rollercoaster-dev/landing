<script setup lang="ts">
// OG Image template following brand design direction
// Uses neo-brutalist style with electric yellow background

defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div style="position: relative; width: 1200px; height: 630px; padding: 60px; background-color: #ffe50c; font-family: Anybody, sans-serif;">
    <!-- Logo - absolute positioned top right -->
    <img
      src="http://localhost:3002/logo.svg"
      style="position: absolute; top: 50px; right: 50px; width: 120px; height: 120px;"
    />

    <!-- Stacked headline -->
    <div style="display: flex; flex-direction: column; line-height: 0.9; font-weight: 900; color: #0a0a0a; text-transform: uppercase;">
      <span style="font-size: 72px;">The</span>
      <span style="font-size: 96px; margin-left: 20px;">Roller</span>
      <span style="font-size: 96px; margin-left: 40px;">Coaster</span>
      <span style="font-size: 72px; margin-left: 60px;">Is The</span>
      <span style="font-size: 96px; margin-left: 80px;">Path</span>
    </div>

    <!-- Tagline at bottom -->
    <div style="position: absolute; bottom: 60px; left: 60px; right: 60px; display: flex; justify-content: space-between; align-items: flex-end;">
      <span style="font-family: DM Mono, monospace; font-size: 24px; color: #0a0a0a;">
        progress tracking for minds that don't move in straight lines
      </span>
      <span style="font-family: Anybody, sans-serif; font-size: 32px; font-weight: 700; color: #0a0a0a;">
        rollercoaster.dev
      </span>
    </div>
  </div>
</template>
