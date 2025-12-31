/**
 * Composable for managing badge data in localStorage
 *
 * Storage key format: 'rc-badge-{badgeKey}'
 * Example: 'rc-badge-quiet-victory'
 *
 * Usage:
 * const { saveBadge, loadBadge, getAllBadges, removeBadge } = useBadges()
 */
export function useBadges() {
  const STORAGE_PREFIX = 'rc-badge-'

  /**
   * Save a badge answer to localStorage
   * @param key - Badge key (e.g., 'quiet-victory')
   * @param value - User's answer text
   */
  const saveBadge = (key: string, value: string): void => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_PREFIX + key, value)
  }

  /**
   * Load a badge answer from localStorage
   * @param key - Badge key (e.g., 'quiet-victory')
   * @returns The saved answer, or null if not found
   */
  const loadBadge = (key: string): string | null => {
    if (!import.meta.client) return null
    return localStorage.getItem(STORAGE_PREFIX + key)
  }

  /**
   * Get all saved badges from localStorage
   * @returns Record of badge keys to their saved answers
   */
  const getAllBadges = (): Record<string, string> => {
    if (!import.meta.client) return {}

    const badges: Record<string, string> = {}

    // Iterate through all localStorage keys
    Object.keys(localStorage).forEach((key) => {
      // Filter for badge-prefixed keys only
      if (key.startsWith(STORAGE_PREFIX)) {
        // Extract the badge key by removing prefix
        const badgeKey = key.replace(STORAGE_PREFIX, '')
        const value = localStorage.getItem(key)

        // Only add if value exists
        if (value) {
          badges[badgeKey] = value
        }
      }
    })

    return badges
  }

  /**
   * Remove a badge from localStorage
   * @param key - Badge key (e.g., 'quiet-victory')
   */
  const removeBadge = (key: string): void => {
    if (!import.meta.client) return
    localStorage.removeItem(STORAGE_PREFIX + key)
  }

  return {
    saveBadge,
    loadBadge,
    getAllBadges,
    removeBadge,
  }
}
