<script setup lang="ts">
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
  slideFrom: {
    type: String,
    required: true,
  },
  marginLeft: {
    type: String,
    default: '0',
  },
})

// State
const questionBlock = ref <HTMLElement | null> (null)
const inputElement = ref <HTMLInputElement | null> (null)
const inputValue = ref('')
const showSaved = ref(false)
const isInView = ref(false)

// Storage key
const STORAGE_PREFIX = 'rc-badge-'
const storageKey = STORAGE_PREFIX + props.badgeKey

// Compute accent color CSS variable
const accentColorVar = computed(() => `var(--color-stories-accent-${props.accentColor})`)

// Compute container style
const containerStyle = computed(() => ({
  'marginLeft': props.marginLeft,
  '--question-accent': accentColorVar.value,
  '--slide-from': props.slideFrom,
}))

// Debounce timeout (setTimeout ID)
// @ts-ignore - initialized as null, assigned setTimeout ID later
let saveTimeout = null

// Load saved answer on mount (client-only)
onMounted(() => {
  if (import.meta.client) {
    // Load from localStorage
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      inputValue.value = saved
    }

    // Setup IntersectionObserver (delay to ensure initial render completes)
    if (questionBlock.value) {
      const element = questionBlock.value
      setTimeout(() => {
        const observer = new IntersectionObserver(
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

        // Cleanup on unmount
        onUnmounted(() => {
          observer.disconnect()
        })
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
  // @ts-ignore - saveTimeout is setTimeout ID
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }

  // Hide "noted." text
  showSaved.value = false

  if (val) {
    // Debounce save for 500ms
    // @ts-ignore - saveTimeout stores setTimeout ID
    saveTimeout = setTimeout(() => {
      localStorage.setItem(storageKey, val)
      // Show "noted." confirmation after 300ms
      setTimeout(() => {
        showSaved.value = true
      }, 300)
    }, 500)
  }
  else {
    // Remove from localStorage if empty
    localStorage.removeItem(storageKey)
  }
}

// Cleanup timeout on unmount
onUnmounted(() => {
  // @ts-ignore - saveTimeout is setTimeout ID
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
})
</script>

<template>
  <div
    ref="questionBlock"
    class="question-block"
    :class="{ 'in-view': isInView }"
    :style="containerStyle"
  >
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
        placeholder="type here..."
        maxlength="200"
        :aria-label="text"
        @input="handleInput"
      >
      <p
        class="question-saved"
        :class="{ visible: showSaved }"
      >
        noted.
      </p>
    </div>
  </div>
</template>

<style scoped>
.question-block {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 5rem 0 4rem;
  max-width: 800px;
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

/* Input wrapper — slides in from side */
.question-input-wrap {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(20px);
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
  pointer-events: none;
}

/* Input on right side - slides in from left */
.question-block[style*="--slide-from:left"] .question-input-wrap {
  left: 100%;
  margin-left: 2rem;
  transform: translateY(-50%) translateX(-20px);
}

/* Input on left side - slides in from right */
.question-block[style*="--slide-from:right"] .question-input-wrap {
  right: 100%;
  left: auto;
  margin-right: 2rem;
  transform: translateY(-50%) translateX(20px);
  text-align: right;
}

.question-block.in-view .question-input-wrap {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
  pointer-events: auto;
}

/* Mobile: stack below instead of side */
@media (max-width: 768px) {
  .question-input-wrap {
    position: relative;
    top: auto;
    left: auto !important;
    right: auto !important;
    margin: 1.5rem 0 0 0 !important;
    transform: translateY(20px);
    text-align: left !important;
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .question-block.in-view .question-input-wrap {
    transform: translateY(0);
  }
}

.question-input {
  width: 280px;
  padding: 1rem 1.2rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--question-accent);
  color: var(--color-white);
  outline: none;
  transition: background 0.2s;
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
    transform: translateY(-50%) translateX(0);
  }

  @media (max-width: 768px) {
    .question-block.in-view .question-input-wrap {
      transform: translateY(0);
    }
  }
}
</style>
