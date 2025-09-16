import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', '.nuxt', 'dist', '.eslintrc.cjs', 'nuxt.config.ts'], // 👈 ignore auto-generated stuff
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        URL: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  prettier,
]
