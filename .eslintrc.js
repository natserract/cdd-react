module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    'import/no-extraneous-dependencies': 'warn',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'no-case-declarations': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-else-return': 'warn',
    'no-param-reassign': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: 'class',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'for',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'switch',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'try',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'while',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: ['let', 'const'],
      },
    ],
    'prefer-const': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    'react/no-array-index-key': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/self-closing-comp': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': 'off',
    'linebreak-style': 'off',
  },
};