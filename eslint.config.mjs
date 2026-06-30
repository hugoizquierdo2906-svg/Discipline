import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:jsx-a11y/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // Strict typing posture for the whole project.
      '@typescript-eslint/no-explicit-any': 'error',
      // Design-system discipline (Phase 02): no raw color literals in code.
      // Colors must come from design tokens (src/styles/tokens.css) consumed
      // via Tailwind utilities or CSS vars. Token files are whitelisted below.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
          message:
            'Raw hex color is forbidden. Use a design token (see docs/DISCIPLINE_CANONICAL_TOKENS.md) via a Tailwind utility or CSS var.',
        },
        {
          selector: 'Literal[value=/^(?:rgb|rgba|hsl|hsla)\\(/]',
          message:
            'Raw color function is forbidden. Use a design token via a Tailwind utility or CSS var.',
        },
        {
          selector: 'Literal[value=/^-?[0-9]+(?:\\.[0-9]+)?(?:px|ms)$/]',
          message:
            'Raw px/ms value is forbidden. Use a spacing/radius/motion design token via a Tailwind utility or CSS var (see docs/DISCIPLINE_CANONICAL_TOKENS.md).',
        },
      ],
      // Import hygiene: consistent, grouped, alphabetized imports.
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  }),
  {
    // Token files are the single allowed home for literal design values.
    files: ['tailwind.config.ts', 'src/lib/tokens.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'next-env.d.ts',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
]

export default eslintConfig
