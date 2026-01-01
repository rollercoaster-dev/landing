/**
 * Composable for managing badge data with reactive state and localStorage persistence
 *
 * Storage key format: 'rc-badge-{badgeKey}'
 * Example: 'rc-badge-quiet-victory'
 *
 * Usage:
 * const { badges, saveBadge, loadBadge, removeBadge } = useBadges()
 */

const STORAGE_PREFIX = 'rc-badge-'

// Shared reactive state across all component instances
const badges = ref<Record<string, string>>({})
let initialized = false

/**
 * Initialize badges from localStorage (client-side only)
 */
function initializeBadges() {
  if (!import.meta.client || initialized) return

  const stored: Record<string, string> = {}
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      const badgeKey = key.replace(STORAGE_PREFIX, '')
      const value = localStorage.getItem(key)
      if (value) {
        stored[badgeKey] = value
      }
    }
  })
  badges.value = stored
  initialized = true
}

export function useBadges() {
  // Initialize on first use (client-side)
  if (import.meta.client && !initialized) {
    initializeBadges()
  }

  /**
   * Save a badge answer to localStorage and reactive state
   * @param key - Badge key (e.g., 'quiet-victory')
   * @param value - User's answer text
   */
  const saveBadge = (key: string, value: string): void => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_PREFIX + key, value)
    badges.value = { ...badges.value, [key]: value }
  }

  /**
   * Load a badge answer from reactive state
   * @param key - Badge key (e.g., 'quiet-victory')
   * @returns The saved answer, or null if not found
   */
  const loadBadge = (key: string): string | null => {
    return badges.value[key] ?? null
  }

  /**
   * Remove a badge from localStorage and reactive state
   * @param key - Badge key (e.g., 'quiet-victory')
   */
  const removeBadge = (key: string): void => {
    if (!import.meta.client) return
    localStorage.removeItem(STORAGE_PREFIX + key)
    const { [key]: _, ...rest } = badges.value
    badges.value = rest
  }

  return {
    badges: readonly(badges),
    saveBadge,
    loadBadge,
    removeBadge,
  }
}
