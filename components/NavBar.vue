<template>
  <nav 
    class="fixed top-0 left-0 bottom-0 z-10 w-64 bg-white/5 backdrop-blur-xl transform transition-transform duration-300 ease-in-out flex flex-col"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
  >
    <!-- Logo -->
    <div class="p-6 flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <span class="text-lg font-semibold text-white">RentalHub</span>
    </div>

    <!-- Search -->
    <div class="px-4 mb-6">
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          class="w-full bg-white/5 text-white placeholder-white/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-white/10 focus:bg-white/10"
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-2.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="flex-1 px-2">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors relative group"
        :class="{ 'bg-white/10 text-white': $route.path === item.path }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-sm font-medium">{{ item.name }}</span>
        <span v-if="item.badge" class="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          {{ item.badge }}
        </span>
      </NuxtLink>

      <!-- Settings Section -->
      <div class="mt-6">
        <div class="px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
          Settings
        </div>
        <NuxtLink 
          v-for="item in settingsItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="text-sm font-medium">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t border-white/10">
      <div class="flex items-center gap-3 px-2 py-2">
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium text-white">John Doe</div>
          <div class="text-xs text-white/50">Administrator</div>
        </div>
        <button class="p-1 hover:bg-white/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile menu button -->
  <button 
    @click="isOpen = !isOpen" 
    class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path v-if="isOpen" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      <path v-else strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>

  <!-- Overlay -->
  <div 
    v-if="isOpen" 
    @click="isOpen = false"
    class="fixed inset-0 bg-black/50 lg:hidden z-0"
  ></div>
</template>

<script setup>
const isOpen = ref(false)

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>`
    })
  },
  { 
    name: 'Messages', 
    path: '/messages', 
    badge: '4',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>`
    })
  },
  { 
    name: 'Reservations', 
    path: '/reservations', 
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`
    })
  }
]

const settingsItems = [
  {
    name: 'General',
    path: '/settings/general',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>`
    })
  },
  {
    name: 'Members',
    path: '/settings/members',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`
    })
  },
  {
    name: 'Notifications',
    path: '/settings/notifications',
    icon: defineComponent({
      template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>`
    })
  }
]
</script>