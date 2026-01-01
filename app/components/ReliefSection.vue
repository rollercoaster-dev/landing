<script setup lang="ts">
// Relief section with platform explanation

const { $t } = useI18n()
const values = computed(() => $t('relief.values', { returnObjects: true }) as Array<{ label: string, separator: string }>)
</script>

<template>
  <section class="bg-[var(--color-relief-bg)] text-[var(--color-relief-text)] px-8 py-32 md:py-[8rem] md:pb-[6rem]">
    <div class="relief-content max-w-[650px] mx-auto">
      <h2 class="font-anybody font-black text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] uppercase tracking-[-0.03em] mb-10">
        {{ $t('relief.headline') }}
      </h2>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        {{ $t('relief.paragraphs.0') }}
      </p>

      <div class="values font-dm-mono text-[0.95rem] my-10 text-[var(--color-relief-accent)]">
        <span
          v-for="(value, index) in values"
          :key="index"
          class="value font-semibold"
        >{{ value.label }}{{ value.separator ? ' · ' : '' }}</span>
      </div>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        {{ $t('relief.paragraphs.1') }}
      </p>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        Built on <a
          href="https://openbadges.org"
          target="_blank"
          rel="noopener"
          :aria-label="$t('relief.linkAria')"
          class="text-[var(--color-relief-accent)] underline underline-offset-[4px] decoration-[var(--color-relief-accent)] decoration-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-relief-accent)] focus-visible:outline-offset-2"
        >{{ $t('relief.linkText') }}</a> — {{ $t('relief.paragraphs.2') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Using utility classes for all styling - no additional CSS needed */
</style>
