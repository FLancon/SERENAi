<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="glass p-8 rounded-xl w-full max-w-md text-center">
      <div v-if="loading" class="space-y-4">
        <svg class="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-white">Authentification en cours...</p>
      </div>
      
      <div v-else-if="error" class="space-y-4">
        <svg class="h-12 w-12 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-xl font-semibold text-white">Erreur d'authentification</h2>
        <p class="text-white/70">{{ error }}</p>
        <NuxtLink to="/auth/login" class="text-blue-400 hover:text-blue-300 transition-colors">
          Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { hash } = window.location
    if (!hash) {
      throw new Error('No authentication data found')
    }

    const { data: { session }, error: authError } = await useSupabaseClient().auth.getSession()
    
    if (authError) throw authError
    if (!session) throw new Error('No session found')

    // Successfully authenticated
    await navigateTo('/')
  } catch (e) {
    console.error('Authentication callback error:', e)
    error.value = 'Une erreur est survenue lors de l\'authentification'
  } finally {
    loading.value = false
  }
})
</script>