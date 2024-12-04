<template>
  <div class="glass p-6 rounded-xl hover:translate-y-[-2px] transition-all duration-200">
    <h3 class="text-sm font-medium text-white/70">{{ title }}</h3>
    <p class="text-2xl font-bold text-white mt-2">{{ value }}</p>
    <div class="flex items-center mt-4 text-sm">
      <span :class="[
        'flex items-center',
        trend > 0 ? 'text-emerald-400' : 'text-rose-400'
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                :d="trend > 0 
                    ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'" />
        </svg>
        {{ Math.abs(trend) }}%
      </span>
      <span class="text-white/50 ml-2">vs last month</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  trend: {
    type: Number,
    default: 0
  }
})
</script>