// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://rollercoaster.dev',
    name: 'Rollercoaster.dev',
    description: 'Progress tracking for minds that don\'t move in straight lines',
    defaultLocale: 'en',
  },

  vite: {
    plugins: [tailwindcss()],
  },
})