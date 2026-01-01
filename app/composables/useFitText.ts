/**
 * useFitText - Dynamically scales text to fit container width
 * Adapted from joeczar-v2 glitch concept
 */
export function useFitText(lines: string[], baseFontVW = 15) {
  const containerRef = ref<HTMLElement>()

  // SSR safety: ensure lines is an array (i18n may return string key during SSR)
  const safeLines = Array.isArray(lines) ? lines : []

  // Create refs for each line
  const lineRefs = safeLines.map(() => ref<HTMLElement>())
  const fontSizes = safeLines.map(() => ref(`${baseFontVW}vw`))

  function fitText() {
    if (!containerRef.value) return

    const containerWidth = containerRef.value.offsetWidth
    const viewportWidth = window.innerWidth
    const baseFontPx = (baseFontVW / 100) * viewportWidth
    const padding = 32 // Account for container padding

    lineRefs.forEach((lineRef, index) => {
      if (lineRef.value && fontSizes[index]) {
        // Reset to measure at base size
        lineRef.value.style.fontSize = `${baseFontPx}px`
      }
    })

    // Use double rAF to ensure styles are applied and layout calculated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lineRefs.forEach((lineRef, index) => {
          if (!lineRef.value || !fontSizes[index]) return

          const textWidth = lineRef.value.scrollWidth
          const computedStyle = window.getComputedStyle(lineRef.value)
          const marginLeft = Number.parseFloat(computedStyle.marginLeft) || 0

          // Available width accounts for padding and the element's own margin
          const availableWidth = containerWidth - padding - marginLeft

          if (textWidth > 0 && availableWidth > 0) {
            // Calculate scale needed to fit
            const scale = availableWidth / textWidth
            // Apply scale but don't exceed base size
            const newSize = Math.min(baseFontPx * scale, baseFontPx)
            fontSizes[index].value = `${newSize}px`
          }
        })
      })
    })
  }

  async function init() {
    // Wait for fonts to load
    if (typeof document !== 'undefined') {
      await document.fonts.ready
      fitText()
    }
  }

  onMounted(() => {
    init()

    // Fallback for fonts
    setTimeout(fitText, 500)

    // Refit on resize
    window.addEventListener('resize', fitText)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fitText)
  })

  return {
    containerRef,
    lineRefs,
    fontSizes,
    fitText,
  }
}
