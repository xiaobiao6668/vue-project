/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
  }
  },
  rules: {
    // 禁用vue/attribute-hyphenation规则
    'vue/attribute-hyphenation': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off'
}
}
