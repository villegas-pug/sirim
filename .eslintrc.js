const RULES = {
   OFF: 'off',
   WARN: 'warn',
   ERROR: 'error'
}

module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: [
      'plugin:react/recommended',
      'standard'
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: [
      'react',
      '@typescript-eslint'
   ],
   rules: {
      indent: ['error', 3],
      'react/react-in-jsx-scope': RULES.OFF,
      'no-return-assign': RULES.OFF,
      'no-sequences': RULES.OFF,
      'react/display-name': RULES.OFF
   }
}
