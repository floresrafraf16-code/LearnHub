
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module'],

  vuetify: {
    moduleOptions: {
      prefixComposables: ['useLayout']
    },

    vuetifyOptions: {
      theme: {
        defaultTheme: 'light'
      }
    }
  },

  runtimeConfig: {
    public: {
      googleClientId: ''
    }
  },

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  }
})
