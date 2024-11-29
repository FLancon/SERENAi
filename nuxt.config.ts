export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    token: process.env.token || '',
    openaiApiKey: process.env.OPENAI_API_KEY
  },
  app: {
    head: {
      title: 'Rental Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})