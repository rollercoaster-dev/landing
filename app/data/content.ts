/**
 * Centralized content data for landing page
 * Extracted from prototype-v6.html
 */

export interface Story {
  name: string
  title: string
  text: string
  accentColor: 1 | 2 | 3 | 4
  marginLeft: string
}

export interface Question {
  text: string
  badgeKey: string
  accentColor: 1 | 2 | 3 | 4
  slideFrom: 'left' | 'right'
  marginLeft: string
}

export const stories: Story[] = [
  {
    name: 'Lina',
    title: 'The quiet victory',
    text: 'She reorganized the library\'s entire local history section while volunteering — months of quiet work she chose because she knew it mattered. When she finished, she made a badge for herself: <strong>"Local History Archivist."</strong> No approval queue. No external validation. Just a private way to honor something only she understood the weight of.',
    accentColor: 1,
    marginLeft: '0',
  },
  {
    name: 'Eva',
    title: 'The big map',
    text: "In a manic surge, she planned a massive urban farm — site surveys, greenhouse designs, compost networks. Dozens of badges for dozens of ideas, branching everywhere at once. Then the crash hit. She stopped. Months passed. Two years later, she reopened her account. The platform had kept everything. It showed her what she couldn't see before: the composting badge was always the strongest — and others had already earned it.",
    accentColor: 2,
    marginLeft: '15%',
  },
  {
    name: 'Malik',
    title: 'The midnight model',
    text: "He'd been teaching himself 3D modelling at night — weeks of on-off learning between everything else. When he finished his first complete scene, he uploaded the evidence: screenshots, a timelapse, a short reflection. The platform verified it. Not because anyone demanded proof — but because he wanted that checkmark for himself. It became the nudge he needed to start the next one.",
    accentColor: 3,
    marginLeft: '5%',
  },
  {
    name: 'Carmen & Kayla',
    title: 'Passing it on',
    text: "After a full season of raised beds, Carmen made herself a badge — her own record of what she'd learned. Then she mentored Kayla, a 16-year-old who wanted to grow vegetables for her family. When Kayla finished her first bed, she made her own badge. Carmen verified it. Two other gardeners in the network approved it. Now Kayla has proof of something she built — and Carmen sees her knowledge rippling forward.",
    accentColor: 4,
    marginLeft: '20%',
  },
]

export const questions: Question[] = [
  {
    text: 'Do you have a quiet victory that deserves a mark?',
    badgeKey: 'quiet-victory',
    accentColor: 1,
    slideFrom: 'left',
    marginLeft: '0',
  },
  {
    text: "What's one thread you could pull from something you started?",
    badgeKey: 'thread-finder',
    accentColor: 2,
    slideFrom: 'right',
    marginLeft: 'auto',
  },
  {
    text: 'What skill have you been quietly building?',
    badgeKey: 'skill-builder',
    accentColor: 3,
    slideFrom: 'left',
    marginLeft: '5%',
  },
  {
    text: "Who could you teach what you've learned?",
    badgeKey: 'knowledge-sharer',
    accentColor: 4,
    slideFrom: 'left', // Changed: input on right side (more room since question is at 15% from left)
    marginLeft: '15%',
  },
]

export const BADGE_NAMES: Record<string, string> = {
  'quiet-victory': 'Quiet Victory',
  'thread-finder': 'Thread Finder',
  'skill-builder': 'Skill Builder',
  'knowledge-sharer': 'Knowledge Sharer',
}
