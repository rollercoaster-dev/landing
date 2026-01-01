<script setup lang="ts">
// HeroSection - The Climb
// Full viewport with massive typography and neo-brutalist indentation
// Uses useFitText for dynamic responsive scaling

const { t } = useI18n()
const lines = computed(() => t('hero.lines', { returnObjects: true }) as string[])
const { containerRef, lineRefs, fontSizes } = useFitText(lines.value, 20)

// Line-specific styles for neo-brutalist staggered effect
const lineStyles = [
  '', // "The" - left
  'md:text-center', // "Roller" - center
  'md:text-right', // "Coaster" - right
  '', // "Is The" - left
  'md:text-right', // "Path" - right
]

// Template ref setter for v-for items
function setLineRef(el: HTMLElement | null, index: number) {
  if (el && lineRefs[index]) {
    lineRefs[index].value = el
  }
}

// Safe accessor for font sizes
function getFontSize(index: number) {
  return fontSizes[index]?.value ?? '20vw'
}
</script>

<template>
  <section
    ref="containerRef"
    class="hero min-h-screen bg-[var(--color-climb-bg)] p-4 md:p-8 flex flex-col justify-center relative"
  >
    <img
      src="~/assets/RibbonRoller.svg"
      :alt="$t('hero.logoAlt')"
      class="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-[200px] md:h-[200px]"
    >
    <h1
      class="font-[family-name:var(--font-headline)] font-[900] leading-[0.85] -tracking-[0.04em] uppercase text-[var(--color-climb-text)]"
    >
      <span
        v-for="(line, index) in lines"
        :key="line"
        :ref="(el) => setLineRef(el, index)"
        class="block whitespace-nowrap"
        :class="lineStyles[index]"
        :style="{ fontSize: getFontSize(index) }"
      >
        {{ line }}
      </span>
    </h1>
    <p
      class="tagline font-[family-name:var(--font-mono)] text-[clamp(0.8rem,1.5vw,1rem)] font-normal text-[var(--color-climb-text)] opacity-70 mt-8 text-left md:text-right max-w-[300px] md:ml-auto"
    >
      {{ $t('hero.tagline') }}
    </p>
  </section>
</template>
