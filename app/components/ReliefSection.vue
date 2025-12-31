<script setup lang="ts">
// Relief section with platform explanation
</script>

<template>
  <section class="bg-[var(--color-relief-bg)] text-[var(--color-relief-text)] px-8 py-32 md:py-[8rem] md:pb-[6rem]">
    <div class="relief-content max-w-[650px] mx-auto">
      <h2 class="font-anybody font-black text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] uppercase tracking-[-0.03em] mb-10">
        What we're building
      </h2>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        A different kind of achievement tracker. You create badges for the things you accomplish — big or small, formal or personal. You decide what counts.
      </p>

      <div class="values font-dm-mono text-[0.95rem] my-10 text-[var(--color-relief-accent)]">
        <span class="value font-semibold after:content-['_·_'] after:font-normal after:opacity-50">Your pace</span>
        <span class="value font-semibold after:content-['_·_'] after:font-normal after:opacity-50">Your proof</span>
        <span class="value font-semibold last:after:content-['']">Your data</span>
      </div>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        Everything you create? Yours — to keep, to share, to use however you choose.
      </p>

      <p class="font-instrument-sans text-[1.15rem] leading-[1.85] text-[rgba(10,10,10,0.75)] mb-6">
        Built on <a
          href="https://openbadges.org"
          target="_blank"
          rel="noopener"
          class="text-[var(--color-relief-accent)] underline underline-offset-[4px] decoration-[var(--color-relief-accent)] decoration-[2px]"
        >Open Badges</a> — an open standard that means your credentials are portable, verifiable, and truly yours.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Using utility classes for all styling - no additional CSS needed */
</style>
