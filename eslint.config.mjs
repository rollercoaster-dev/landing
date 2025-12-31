// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import tseslint from 'typescript-eslint'

export default withNuxt(
  // Ensure all .ts files use TypeScript parser (including custom directories like app/data/)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  // Prettier compatibility: allow double quotes when string contains apostrophes
  {
    rules: {
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    },
  },
)
