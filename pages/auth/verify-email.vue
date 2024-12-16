<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="glass p-8 rounded-xl w-full max-w-md text-center">
      <svg class="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
      </svg>
      
      <h2 class="text-xl font-semibold text-white mb-2">Vérifiez votre email</h2>
      <p class="text-white/70 mb-6">
        Un email de confirmation a été envoyé à votre adresse email.
        Veuillez cliquer sur le lien dans l'email pour activer votre compte.
      </p>
      
      <div class="space-y-4">
        <button
          @click="handleResendEmail"
          class="w-full bg-white/10 text-white rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
          :disabled="loading"
        >
          {{ loading ? 'Envoi...' : 'Renvoyer l\'email' }}
        </button>
        
        <NuxtLink
          to="/auth/login"
          class="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          Retour à la connexion
        </NuxtLink>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-400">
        {{ error }}
      </p>
      
      <p v-if="success" class="mt-4 text-sm text-green-400">
        Email de vérification renvoyé avec succès !
      </p>
    </div>
  </div>
</template>

<script setup>
const { error: authError, loading } = useAuth()
const error = computed(() => authError.value)
const success = ref(false)

const handleResendEmail = async () => {
  try {
    const { error } = await useSupabaseClient().auth.resend({
      type: 'signup'
    })
    if (error) throw error
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (e) {
    console.error('Error resending verification email:', e)
  }
}
</script>