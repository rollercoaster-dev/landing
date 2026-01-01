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

// Raw story from translation (without accentColor)
interface RawStory {
  name: string
  title: string
  text: string
}

// Badge keys mapped to question indices
const QUESTION_BADGE_KEYS = [
  'quiet-victory',
  'thread-finder',
  'skill-builder',
  'knowledge-sharer',
] as const

/**
 * Get translated stories with runtime validation
 */
export function useStories() {
  const { tm, rt } = useI18n()

  return computed<Story[]>(() => {
    const messages = tm('stories.list') as unknown[]
    if (!Array.isArray(messages)) {
      console.warn('stories.list translation is not an array')
      return []
    }
    return messages.map((msg: { name: string; title: string; text: string }, i) => ({
      name: rt(msg.name),
      title: rt(msg.title),
      text: rt(msg.text),
      accentColor: ((i % 4) + 1) as 1 | 2 | 3 | 4,
    }))
  })
}

/**
 * Get translated questions with runtime validation
 */
export function useQuestions() {
  const { tm, rt } = useI18n()

  return computed<Question[]>(() => {
    const messages = tm('questions.list') as unknown[]
    if (!Array.isArray(messages)) {
      console.warn('questions.list translation is not an array')
      return []
    }
    // Only map questions that have corresponding badge keys
    return messages.slice(0, QUESTION_BADGE_KEYS.length).map((msg: unknown, i) => ({
      text: rt(msg as string),
      badgeKey: QUESTION_BADGE_KEYS[i],
      accentColor: ((i % 4) + 1) as 1 | 2 | 3 | 4,
    }))
  })
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
  const { t } = useI18n()

  return computed(() => ({
    [BADGE_KEYS.quietVictory]: t('badges.names.quiet-victory'),
    [BADGE_KEYS.threadFinder]: t('badges.names.thread-finder'),
    [BADGE_KEYS.skillBuilder]: t('badges.names.skill-builder'),
    [BADGE_KEYS.knowledgeSharer]: t('badges.names.knowledge-sharer'),
  }))
}
