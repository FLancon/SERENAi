<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="glass p-8 rounded-xl w-full max-w-md">
      <h1 class="text-2xl font-bold text-white mb-6">Créer un compte</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
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
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-white/70 mb-1">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full bg-white/5 text-white rounded-lg px-4 py-2"
            :class="{ 'border-red-500': errors.password }"
          />
          <div class="mt-1">
            <p
              v-for="(rule, index) in passwordRules"
              :key="index"
              class="text-xs"
              :class="rule.valid ? 'text-green-400' : 'text-white/50'"
            >
              {{ rule.message }}
            </p>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-white/70 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full bg-white/5 text-white rounded-lg px-4 py-2"
            :class="{ 'border-red-500': errors.confirmPassword }"
          />
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          :disabled="loading || !isFormValid"
        >
          {{ loading ? 'Création...' : 'Créer un compte' }}
        </button>

        <!-- Login Link -->
        <p class="text-center text-sm text-white/70">
          Déjà un compte ?
          <NuxtLink
            to="/auth/login"
            class="text-white hover:text-blue-400 transition-colors"
          >
            Se connecter
          </NuxtLink>
        </p>
      </form>

      <!-- Error Message -->
      <p v-if="error" class="mt-4 text-sm text-red-400">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { signUp, error: authError, loading } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const error = computed(() => authError.value)

const passwordRules = computed(() => [
  {
    valid: password.value.length >= 8,
    message: '✓ Au moins 8 caractères'
  },
  {
    valid: /[A-Z]/.test(password.value),
    message: '✓ Au moins une majuscule'
  },
  {
    valid: /[0-9]/.test(password.value),
    message: '✓ Au moins un chiffre'
  },
  {
    valid: /[^A-Za-z0-9]/.test(password.value),
    message: '✓ Au moins un caractère spécial'
  }
])

const isFormValid = computed(() => 
  passwordRules.value.every(rule => rule.valid) &&
  password.value === confirmPassword.value &&
  email.value
)

const handleSubmit = async () => {
  try {
    errors.value = {}
    
    if (password.value !== confirmPassword.value) {
      errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
      return
    }

    await signUp(email.value, password.value, confirmPassword.value)
    navigateTo('/auth/verify-email')
  } catch (e) {
    if (e.message.includes('email')) {
      errors.value.email = e.message
    } else if (e.message.includes('mot de passe')) {
      errors.value.password = e.message
    }
  }
}
</script>