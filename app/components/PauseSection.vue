<script setup lang="ts">
// State
const inputValue = ref('')
const showBadge = ref(false)
const isReturning = ref(false)
const badgeText = ref('')
const badgeDate = ref('')

// Debounce timeout (setTimeout ID)
// @ts-ignore - initialized as null, assigned setTimeout ID later
let saveTimeout = null

// Load saved data on mount (client-only)
onMounted(() => {
  if (!import.meta.client)
    return

  const saved = localStorage.getItem('rc-win')
  const savedDate = localStorage.getItem('rc-date')

  if (saved) {
    isReturning.value = true
    inputValue.value = saved
    badgeText.value = saved
    badgeDate.value = savedDate || ''
    showBadge.value = true
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

  if (val) {
    // Debounce save for 400ms
    // @ts-ignore - saveTimeout stores setTimeout ID
    saveTimeout = setTimeout(() => {
      const now = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      badgeText.value = val
      badgeDate.value = now
      showBadge.value = true
      localStorage.setItem('rc-win', val)
      localStorage.setItem('rc-date', now)
    }, 400)
  }
  else {
    // Remove from localStorage if empty
    showBadge.value = false
    localStorage.removeItem('rc-win')
    localStorage.removeItem('rc-date')
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
  <section class="pause">
    <div class="pause-content">
      <!-- Returning user message -->
      <p
        class="returning"
        :class="{ visible: isReturning }"
      >
        // you came back
      </p>

      <!-- Question -->
      <p class="pause-question">
        What did you do today that mattered?
      </p>

      <!-- Input -->
      <input
        v-model="inputValue"
        type="text"
        class="pause-input"
        placeholder="even small things count..."
        maxlength="140"
        aria-label="What did you do today that mattered?"
        @input="handleInput"
      >

      <!-- Badge Preview -->
      <div
        class="badge-output"
        :class="{ visible: showBadge }"
      >
        <div class="badge-label">
          // you showed up
        </div>
        <div class="badge-text">
          {{ badgeText }}
        </div>
        <div class="badge-date">
          {{ badgeDate }}
        </div>
        <div class="badge-response">
          noted.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pause {
  background: var(--color-relief-bg);
  padding: 4rem 2rem 8rem;
  border-top: 2px solid var(--color-relief-accent);
}

.pause-content {
  max-width: 600px;
  margin: 0 auto;
}

.pause-question {
  font-family: var(--font-headline);
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 900;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.pause-input {
  width: 100%;
  padding: 1.2rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  background: var(--color-white);
  border: 3px solid var(--color-black);
  outline: none;
  transition: border-color 0.2s;
}

.pause-input:focus {
  border-color: var(--color-relief-accent);
  outline: 2px solid var(--color-relief-accent);
  outline-offset: 2px;
}

.pause-input::placeholder {
  color: rgba(0, 0, 0, 0.35);
}

.badge-output {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--color-white);
  border: 3px solid var(--color-relief-accent);
  display: none;
}

.badge-output.visible {
  display: block;
}

.badge-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-relief-accent);
  margin-bottom: 0.75rem;
}

.badge-text {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 500;
}

.badge-date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 0.75rem;
}

.badge-response {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-relief-accent);
  margin-top: 1rem;
}

.returning {
  font-family: var(--font-mono);
  color: var(--color-relief-accent);
  margin-bottom: 1.5rem;
  display: none;
}

.returning.visible {
  display: block;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .pause-input {
    transition: none;
  }
}
</style>
