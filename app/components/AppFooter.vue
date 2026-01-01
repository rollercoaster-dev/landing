<script setup lang="ts">
// AppFooter - Static footer with links and sign-off
// Matches prototype-v6.html footer section
</script>

<template>
  <footer class="bg-black text-white px-8 py-16">
    <div class="max-w-6xl mx-auto">
      <!-- Top row: Links and Language Switcher -->
      <div class="flex justify-between items-start gap-8 mb-8 flex-col md:flex-row">
        <!-- Left: Links -->
        <div class="flex gap-10">
          <a
            href="https://github.com/rollercoaster-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-climb-bg)] focus-visible:outline-offset-2"
          >
            {{ $t('footer.links.github') }}
          </a>
          <a
            href="mailto:hello@rollercoaster.dev"
            class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-climb-bg)] focus-visible:outline-offset-2"
          >
            {{ $t('footer.links.contact') }}
          </a>
        </div>

        <!-- Right: Language Switcher -->
        <LanguageSwitcher />
      </div>

      <!-- Bottom row: Sign-off -->
      <div class="text-right">
        <p class="font-headline font-bold text-[1.3rem] uppercase text-white">
          {{ $t('footer.signOff') }}
        </p>
        <p class="font-mono text-[0.7rem] text-white/30 mt-2">
          {{ $t('footer.aside') }}
        </p>
      </div>
    </div>
  </footer>
</template>
