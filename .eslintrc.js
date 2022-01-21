module.exports = {
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unused-vars': 2,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
