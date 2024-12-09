export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    token: process.env.BEDS24_TOKEN,
    public: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
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
