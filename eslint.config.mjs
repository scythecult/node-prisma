import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // when 'files' is specified these plugins are only available to the matching files.
    plugins: {
      '@stylistic/js': stylisticJs,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      vitest: eslintPluginVitest,
    },
  },

  {
    languageOptions: {
      // additional objects to added to global scope
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { parser: tseslint.parser },
    },
  },

  {
    // files config applies to
    files: ['**/*.{js,mjs,cjs,ts}', 'tests/**'],

    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],

      // no-console statements
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      // no empty rules like: if (bla) {}
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],

      // semicolons ALWAYS, this is JS MOTHERFUCKER
      semi: ['error', 'always'],

      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],

      quotes: ['error', 'single', 'avoid-escape'],

      'max-lines': [
        'error',
        {
          max: 500,
        },
      ],

      'arrow-parens': ['error', 'always'],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          // Disable blank lines between import groups.
          groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
        },
      ],

      'unused-imports/no-unused-imports': 'error',
    },
  },
);
