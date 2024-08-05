import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import _import from 'eslint-plugin-import'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/postcss.config.cts',
      '**/vite.config.ts',
      '**/tailwind.config.js',
      '**/eslint.config.mjs',
      '**/stats.html',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/jsx-runtime',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
      'no-relative-import-paths': noRelativeImportPaths,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: false,
        },
      ],

      '@typescript-eslint/no-floating-promises': 'error',
      'require-await': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: false,
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],

      'import/prefer-default-export': 'error',
    },
  },
]
