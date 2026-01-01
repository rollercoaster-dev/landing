<script setup lang="ts">
const { t } = useI18n()

// Props
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  badgeKey: {
    type: String,
    required: true,
  },
  accentColor: {
    type: Number,
    required: true,
  },
})

// Badge store
const { saveBadge, loadBadge, removeBadge } = useBadges()

// State
const questionBlock = ref<HTMLElement | null>(null)
const inputElement = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const showSaved = ref(false)
const isInView = ref(false)

// Compute accent color CSS variable
const accentColorVar = computed(() => `var(--color-stories-accent-${props.accentColor})`)

// Compute container style with CSS custom properties
const containerStyle = computed(() => ({
  '--question-accent': accentColorVar.value,
}))

// Debounce timeout (setTimeout ID)
let saveTimeout: ReturnType<typeof setTimeout> | null = null

// Store observer for cleanup
let observer: IntersectionObserver | null = null

// Load saved answer on mount (client-only)
onMounted(() => {
  if (import.meta.client) {
    // Load from badge store
    const saved = loadBadge(props.badgeKey)
    if (saved) {
      inputValue.value = saved
    }

    // Setup IntersectionObserver (delay to ensure initial render completes)
    if (questionBlock.value) {
      const element = questionBlock.value
      setTimeout(() => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                isInView.value = true
              }
              else {
                // Only remove if scrolled well past (not just partially out)
                const rect = entry.boundingClientRect
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                  isInView.value = false
                }
              }
            })
          },
          {
            threshold: 0,
            rootMargin: '-40% 0px -40% 0px', // Only triggers in middle 20% of viewport
          },
        )

        observer.observe(element)
      }, 100) // Small delay to ensure initial render
    }
  }
})

// Handle input with debounce
// @ts-expect-error - Event type from native input handler
function handleInput(event) {
  if (!import.meta.client)
    return

  const target = event.target
  const val = target.value.trim()

  // Clear existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }

  // Hide "noted." text
  showSaved.value = false

  if (val) {
    // Debounce save for 500ms
    saveTimeout = setTimeout(() => {
      saveBadge(props.badgeKey, val)
      // Show "noted." confirmation after 300ms
      setTimeout(() => {
        showSaved.value = true
      }, 300)
    }, 500)
  }
  else {
    // Remove badge if empty
    removeBadge(props.badgeKey)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  observer?.disconnect()
})
</script>

<template>
  <div
       ref="questionBlock"
       class="question-block"
       :class="{ 'in-view': isInView }"
       :style="containerStyle">
    <!-- Question Text -->
    <p class="question-text">
      {{ text }}
    </p>

    <!-- Input Wrapper (slides in from side) -->
    <div class="question-input-wrap">
      <input
             ref="inputElement"
             v-model="inputValue"
             type="text"
             class="question-input"
             :placeholder="t('questions.placeholder')"
             maxlength="200"
             :aria-label="text"
             @input="handleInput">
      <p
         class="question-saved"
         :class="{ visible: showSaved }">
        {{ t('questions.noted') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.question-block {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 0 12rem auto;
  max-width: 800px;
  text-align: right;
}

.question-text {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  transition: color 0.3s;
}

.question-block.in-view .question-text {
  color: var(--question-accent);
}

/* Input wrapper — mobile-first: stacked below */
.question-input-wrap {
  position: relative;
  margin-top: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  pointer-events: none;
}

.question-block.in-view .question-input-wrap {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Desktop: side-by-side layout - input always on LEFT */
@media (min-width: 1024px) {
  .question-input-wrap {
    position: absolute;
    top: 50%;
    right: 100%;
    margin-right: 2rem;
    margin-top: 0;
    transform: translateY(-50%) translateX(20px);
    text-align: right;
  }

  .question-block.in-view .question-input-wrap {
    transform: translateY(-50%) translateX(0);
  }
}

.question-input {
  width: 100%;
  /* Mobile-first: full width */
  padding: 1rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--question-accent);
  color: var(--color-white);
  outline: none;
  transition: background 0.2s;
}

/* Desktop: fixed width */
@media (min-width: 1024px) {
  .question-input {
    width: 280px;
  }
}

.question-input:focus {
  background: rgba(255, 255, 255, 0.1);
}

.question-input:focus-visible {
  outline: 2px solid var(--question-accent);
  outline-offset: 2px;
}

.question-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.question-saved {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--question-accent);
  margin-top: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.question-saved.visible {
  opacity: 1;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  .question-text,
  .question-input-wrap,
  .question-saved {
    transition: none;
  }

  .question-block.in-view .question-text {
    color: var(--question-accent);
  }

  .question-block.in-view .question-input-wrap {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop reduced motion */
@media (min-width: 1024px) and (prefers-reduced-motion: reduce) {
  .question-block.in-view .question-input-wrap {
    transform: translateY(-50%) translateX(0);
  }
}
</style>
