import js from '@eslint/js';
import globals from 'globals';
// named import: a default import of the plugin trips import-x/no-named-as-default
import { flatConfigs as importX } from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier/flat';

export default [
  js.configs.recommended,
  importX.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      // pure ESM: relative specifiers must carry their extension
      'import-x/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/__tests__/**', 'eslint.config.js'] },
      ],
    },
  },
  // the flat presets carry no `files` key, so scope them here
  { files: ['**/__tests__/**/*.js'], ...jest.configs['flat/recommended'] },
  prettier, // last: it only turns rules off
];
