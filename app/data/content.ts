/**
 * Centralized content data for landing page
 * Now using i18n for translations
 */

export interface Story {
  name: string
  title: string
  text: string
  accentColor: 1 | 2 | 3 | 4
}

export interface Question {
  text: string
  badgeKey: string
  accentColor: 1 | 2 | 3 | 4
}

/**
 * Get translated stories
 */
export function useStories() {
  const { $t } = useI18n()

  return computed<Story[]>(() =>
    ($t('stories.list', { returnObjects: true }) as any[]).map((story, i) => ({
      ...story,
      accentColor: (i % 4 + 1) as 1 | 2 | 3 | 4,
    })),
  )
}

/**
 * Get translated questions
 */
export function useQuestions() {
  const { $t } = useI18n()

  const questionTexts = computed(() =>
    $t('questions.list', { returnObjects: true }) as string[],
  )

  const badgeKeys = ['quiet-victory', 'thread-finder', 'skill-builder', 'knowledge-sharer']

  return computed<Question[]>(() =>
    questionTexts.value.map((text, i) => ({
      text,
      badgeKey: badgeKeys[i],
      accentColor: (i % 4 + 1) as 1 | 2 | 3 | 4,
    })),
  )
}

/**
 * Badge names (language-agnostic keys)
 */
export const BADGE_KEYS = {
  quietVictory: 'quiet-victory',
  threadFinder: 'thread-finder',
  skillBuilder: 'skill-builder',
  knowledgeSharer: 'knowledge-sharer',
} as const

/**
 * Get translated badge names
 */
export function useBadgeNames() {
  const { $t } = useI18n()

  return computed(() => ({
    [BADGE_KEYS.quietVictory]: $t('badges.names.quiet-victory'),
    [BADGE_KEYS.threadFinder]: $t('badges.names.thread-finder'),
    [BADGE_KEYS.skillBuilder]: $t('badges.names.skill-builder'),
    [BADGE_KEYS.knowledgeSharer]: $t('badges.names.knowledge-sharer'),
  }))
}
