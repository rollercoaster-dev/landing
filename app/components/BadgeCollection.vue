<script setup lang="ts">
const { $t, $getLocale } = useI18n()

// Map locale codes to BCP 47 language tags for date formatting
const localeMap: Record<string, string> = {
  en: 'en-US',
  de: 'de-DE',
}

// State
const badgeSection = ref<HTMLElement | null>(null)
const badges = ref({})
const isInView = ref(false)
const hasBadges = computed(() => Object.keys(badges.value).length > 0)

// Load badges from useBadges composable
function refreshBadges() {
  const { getAllBadges } = useBadges()
  badges.value = getAllBadges()
}

// Load badges on mount and setup IntersectionObserver
onMounted(() => {
  // Initial load
  refreshBadges()

  // Setup IntersectionObserver (client-only)
  if (import.meta.client) {
    if (badgeSection.value) {
      const element = badgeSection.value
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                isInView.value = true
                refreshBadges()
              }
              else {
                const rect = entry.boundingClientRect
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                  isInView.value = false
                }
              }
            })
          },
          {
            threshold: 0,
            rootMargin: '-40% 0px -40% 0px',
          },
        )

        observer.observe(element)

        onUnmounted(() => {
          observer.disconnect()
        })
      }, 100)
    }
  }
})

// Get translated badge name
function getBadgeName(badgeKey: string): string {
  // Use the translation key from badges.names
  return $t(`badges.names.${badgeKey}`)
}

// Get badge accent color based on badge key
// @ts-ignore - badgeKey comes from v-for
function getBadgeAccent(badgeKey) {
  const key = String(badgeKey)

  // Map badge keys to accent numbers
  if (key === 'quiet-victory') return 'var(--color-stories-accent-1)'
  if (key === 'thread-finder') return 'var(--color-stories-accent-2)'
  if (key === 'skill-builder') return 'var(--color-stories-accent-3)'
  if (key === 'knowledge-sharer') return 'var(--color-stories-accent-4)'

  // Default fallback
  return 'var(--color-stories-accent-1)'
}

// Get current date in locale-aware format
const getCurrentDate = () => {
  const now = new Date()
  const locale = localeMap[$getLocale()] || 'en-US'
  return now.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <section
    v-if="hasBadges"
    ref="badgeSection"
    class="badges-section"
  >
    <div class="badges-content">
      <h2 class="badges-heading">
        {{ $t('badges.heading') }}
      </h2>
      <p class="badges-intro">
        {{ $t('badges.intro') }}
      </p>
      <div class="badges-grid">
        <div
          v-for="(answer, badgeKey) in badges"
          :key="badgeKey"
          class="badge-card"
          :data-badge="badgeKey"
          :style="{ '--badge-accent': getBadgeAccent(String(badgeKey)) }"
        >
          <p class="badge-name">
            {{ getBadgeName(String(badgeKey)) }}
          </p>
          <p class="badge-answer">
            {{ answer }}
          </p>
          <p class="badge-date">
            {{ getCurrentDate() }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Section container */
.badges-section {
  background: var(--color-stories-bg);
  color: var(--color-white);
  padding: 6rem 2rem;
}

/* Content container */
.badges-content {
  max-width: 900px;
  margin: 0 auto;
}

/* Heading */
.badges-heading {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}

/* Intro text */
.badges-intro {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 3rem;
}

/* Grid layout */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Badge card */
.badge-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  position: relative;
}

/* Colored left border */
.badge-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--badge-accent, var(--color-stories-accent-1));
}

/* Badge name */
.badge-name {
  font-family: var(--font-headline);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--badge-accent);
  margin-bottom: 0.75rem;
}

/* Badge answer */
.badge-answer {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--color-white);
}

/* Badge date */
.badge-date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 1rem;
}
</style>
