<script setup lang="ts">
// LanguageSwitcher - Neo-brutalist language toggle
// Shows available locales (not current one) with bold mono styling

const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value),
)

function switchLocale(code: string) {
  setLocale(code)
}
</script>

<template>
  <nav
    class="language-switcher"
    aria-label="Language switcher"
  >
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      class="lang-button"
      :aria-label="`Switch to ${loc.name}`"
      @click="switchLocale(loc.code)"
    >
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
