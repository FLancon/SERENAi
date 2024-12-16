<template>
  <div class="min-h-screen flex">
    <!-- Left Panel -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
      <Logo />
      
      <div class="relative z-10">
        <h1 class="text-4xl font-bold text-white mb-4">
          Bienvenue sur SERENA
        </h1>
        <p class="text-blue-100 text-lg">
          Votre assistant intelligent pour la gestion locative
        </p>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl"></div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-8">
          <Logo />
        </div>

        <div class="glass p-8 rounded-xl">
          <h2 class="text-2xl font-bold text-white mb-6">Connexion</h2>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-white/70 mb-1">
                Email
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full bg-white/5 text-white rounded-lg pl-10 pr-4 py-2"
                  :class="{ 'border-red-500': errors.email }"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p v-if="errors.email" class="mt-1 text-sm text-red-400">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-white/70 mb-1">
                Mot de passe
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full bg-white/5 text-white rounded-lg pl-10 pr-12 py-2"
                  :class="{ 'border-red-500': errors.password }"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-2.5 text-white/50 hover:text-white/70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-400">
                {{ errors.password }}
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center text-white/70">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="form-checkbox rounded bg-white/5 border-none text-blue-500 mr-2"
                />
                Se souvenir de moi
              </label>
              <NuxtLink
                to="/auth/forgot-password"
                class="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Mot de passe oublié ?
              </NuxtLink>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>

            <!-- Google Sign In -->
            <button
              type="button"
              @click="handleGoogleSignIn"
              class="w-full bg-white/10 text-white rounded-lg px-4 py-2 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </button>
          </form>

          <!-- Register Link -->
          <p class="mt-6 text-center text-white/70">
            Pas encore de compte ?
            <NuxtLink
              to="/auth/register"
              class="text-blue-400 hover:text-blue-300 transition-colors"
            >
              S'inscrire
            </NuxtLink>
          </p>

          <!-- Error Message -->
          <p v-if="error" class="mt-4 text-sm text-center text-red-400">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { signIn, signInWithGoogle, error: authError, loading } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const errors = ref({})
const error = computed(() => authError.value)

const handleSubmit = async () => {
  try {
    errors.value = {}
    await signIn(email.value, password.value)
    navigateTo('/')
  } catch (e) {
    if (e.message.includes('email')) {
      errors.value.email = e.message
    } else if (e.message.includes('mot de passe')) {
      errors.value.password = e.message
    }
  }
}

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle()
  } catch (e) {
    // Error is handled by useAuth
  }
}
</script>