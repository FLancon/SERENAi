<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="glass p-8 rounded-xl w-full max-w-md">
      <h1 class="text-2xl font-bold text-white mb-6">Réinitialiser le mot de passe</h1>

      <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-white/70 mb-1">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full bg-white/5 text-white rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation' }}
        </button>

        <NuxtLink
          to="/auth/login"
          class="block text-center text-sm text-white/70 hover:text-white transition-colors"
        >
          Retour à la connexion
        </NuxtLink>
      </form>

      <div v-else class="text-center">
        <svg
          class="w-16 h-16 mx-auto text-green-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-xl font-semibold text-white mb-2">Email envoyé !</h2>
        <p class="text-white/70 mb-4">
          Consultez votre boîte mail pour réinitialiser votre mot de passe.
        </p>
        <NuxtLink
          to="/auth/login"
          class="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Retour à la connexion
        </NuxtLink>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-400">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { resetPassword, error: authError, loading } = useAuth()

const email = ref('')
const emailSent = ref(false)
const error = computed(() => authError.value)

const handleSubmit = async () => {
  try {
    await resetPassword(email.value)
    emailSent.value = true
  } catch (e) {
    // Error is handled by useAuth
  }
}
</script>