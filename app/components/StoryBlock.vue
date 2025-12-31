<script setup lang="ts">
// Props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  accentColor: {
    type: Number,
    required: true,
  },
  marginLeft: {
    type: String,
    default: '0',
  },
})

// Compute accent color CSS variable
const accentColorVar = computed(() => `var(--color-stories-accent-${props.accentColor})`)

// Compute margin-left style
const containerStyle = computed(() => ({
  'marginLeft': props.marginLeft,
  '--story-accent': accentColorVar.value,
}))
</script>

<template>
  <div
    class="story-block"
    :style="containerStyle"
  >
    <!-- Giant faded name background -->
    <span class="story-name">{{ name }}</span>

    <!-- Story content overlay -->
    <div class="story-content">
      <p class="story-title">
        {{ title }}
      </p>
      <!-- Render text with strong tags preserved (v-html is safe here - content controlled by developers) -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p
        class="story-text"
        v-html="text"
      />
    </div>
  </div>
</template>

<style scoped>
.story-block {
  position: relative;
  margin-bottom: 2rem;
  padding: 4rem 0;
}

/* Giant faded name background */
.story-name {
  font-family: var(--font-headline);
  font-size: clamp(6rem, 20vw, 16rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 0.75;
  color: var(--story-accent);
  opacity: 0.15;
  position: absolute;
  top: 0;
  left: -5%;
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
}

/* Story content overlay */
.story-content {
  position: relative;
  z-index: 2;
  max-width: 550px;
}

/* Story title */
.story-title {
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--story-accent);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* Story text */
.story-text {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.75);
}

/* Strong tags in white */
.story-text :deep(strong) {
  color: var(--color-white);
  font-weight: 600;
}

/* Mobile: remove margin-left override */
@media (max-width: 768px) {
  .story-block {
    margin-left: 0 !important;
  }
}
</style>
