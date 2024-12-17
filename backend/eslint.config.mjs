import globals from "globals";

export default [
  {
    files: ['./src/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-console': 'warn',
      'no-debugger': 'error',
      
      'eqeqeq': 'error',
      'no-duplicate-imports': 'error',
      
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2]
    }
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/'
    ]
  }
];