<script setup lang="ts">
// LanguageSwitcher - Neo-brutalist language toggle
// Shows available locales (not current one) with bold mono styling

const { t, locale, locales, setLocale } = useI18n()

// Filter to get locales other than current
const otherLocales = computed(() =>
  locales.value.filter((l: { code: string }) => l.code !== locale.value)
)
</script>

<template>
  <nav
       class="language-switcher"
       :aria-label="t('footer.languageSwitcher.label')">
    <button
            v-for="loc in otherLocales"
            :key="loc.code"
            class="lang-button"
            :aria-label="t('footer.languageSwitcher.switchTo', { language: loc.name })"
            @click="setLocale(loc.code)">
      {{ loc.code.toUpperCase() }}
    </button>
  </nav>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-button {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: 2px solid currentColor;
  color: var(--color-white);
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}

.lang-button:hover,
.lang-button:focus-visible {
  background: var(--color-white);
  color: #000;
  outline: 2px solid #000;
  outline-offset: 2px;
}

.lang-button:active {
  transform: translateY(2px);
}

@media (prefers-reduced-motion: reduce) {
  .lang-button {
    transition: none;
  }

  .lang-button:active {
    transform: none;
  }
}
</style>
