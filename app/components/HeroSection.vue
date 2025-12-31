<script setup lang="ts">
// HeroSection - The Climb
// Full viewport with massive typography and neo-brutalist indentation
</script>

<template>
  <section
    class="hero min-h-screen bg-[var(--color-climb-bg)] p-8 flex flex-col justify-center relative overflow-hidden"
  >
    <h1
      class="font-[family-name:var(--font-headline)] text-[clamp(3rem,18vw,10rem)] md:text-[clamp(4rem,20vw,28rem)] font-[900] leading-[0.8] -tracking-[0.06em] uppercase text-[var(--color-climb-text)]"
    >
      <span class="block">The</span>
      <span class="block md:ml-[10vw]">Roller</span>
      <span class="block md:ml-[25vw]">Coaster</span>
      <span class="block">Is The</span>
      <span class="block md:mr-[-15vw] md:text-right">Path</span>
    </h1>
    <p
      class="tagline font-[family-name:var(--font-mono)] text-[clamp(0.8rem,1.5vw,1rem)] font-normal text-[var(--color-climb-text)] opacity-70 mt-12 md:mt-0 md:absolute md:bottom-12 md:right-12 text-left md:text-right max-w-[300px]"
    >
      progress tracking for minds that don't move in straight lines
    </p>
    <span
      class="scroll-hint font-[family-name:var(--font-mono)] hidden md:block absolute bottom-12 left-12 text-xs opacity-50"
    >
      (scroll)
    </span>
  </section>
</template>
