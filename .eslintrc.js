module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': ['warn', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/comment-directive': ['warn', {
      reportUnusedDisableDirectives: false
    }]
  }
}
