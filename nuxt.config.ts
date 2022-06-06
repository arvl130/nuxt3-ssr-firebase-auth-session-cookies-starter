import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      firebaseSessionCookies: {
        lifetime: 60 * 60 * 24 * 7 * 1000, // specify in milliseconds
        name: "firebase-login",
        sameSite: "lax"
      }
    }
  }
})
