<script setup lang="ts">
// AppFooter - Static footer with links and sign-off
// Matches prototype-v6.html footer section
</script>

<template>
  <footer class="bg-black text-white px-8 py-16">
    <div class="max-w-6xl mx-auto flex justify-between items-end flex-wrap gap-8">
      <!-- Left: Links -->
      <div class="flex gap-10">
        <a
          href="https://github.com/rollercoaster-dev"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)]"
        >
          GitHub
        </a>
        <a
          href="mailto:hello@rollercoaster.dev"
          class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)]"
        >
          Contact
        </a>
      </div>

      <!-- Right: Sign-off -->
      <div class="text-right">
        <p class="font-headline font-bold text-[1.3rem] uppercase text-white">
          See you next ride.
        </p>
        <p class="font-mono text-[0.7rem] text-white/30 mt-2">
          (or don't — we'll be here)
        </p>
      </div>
    </div>
  </footer>
</template>
