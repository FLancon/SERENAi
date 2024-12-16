import process from "process";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    token: process.env.token,
    BEDS24_WEBHOOK_SECRET: process.env.BEDS24_WEBHOOK_SECRET,
    whatsappToken: process.env.whatsappToken,
    public: {
      url: process.env.url,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
  app: {
    head: {
      title: "SERENA Ai Assistant",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
