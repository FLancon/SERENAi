<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-white">Reservations</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="glass p-6 rounded-xl lg:col-span-2">
        <ClientOnly>
          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="date in calendarDates"
              :key="date.day"
              class="aspect-square p-2 rounded-lg relative"
              :class="getDateClass(date)"
            >
              <span class="text-sm text-white">{{ date.day }}</span>
              <div
                v-if="date.booking"
                class="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-400"
              ></div>
            </div>
          </div>
        </ClientOnly>
      </div>
      <div class="glass p-6 rounded-xl">
        <h3 class="text-white/80 text-sm mb-4">Upcoming Reservations</h3>
        <div class="space-y-4">
          <div
            v-for="booking in upcomingBookings"
            :key="booking.id"
            class="p-3 bg-white/10 rounded-lg"
          >
            <p class="text-white font-medium">{{ booking.guest }}</p>
            <p class="text-white/70 text-sm">{{ booking.dates }}</p>
            <div class="flex gap-2 mt-2">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="
                  booking.status === 'Confirmed'
                    ? 'bg-green-500/20 text-green-200'
                    : 'bg-yellow-500/20 text-yellow-200'
                "
              >
                {{ booking.status }}
              </span>
              <span
                class="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full"
              >
                {{ booking.nights }} nights
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const calendarDates = ref(
  Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    booking: false,
  }))
);

onMounted(() => {
  calendarDates.value = calendarDates.value.map((date) => ({
    ...date,
    booking: Math.random() > 0.7,
  }));
});

const upcomingBookings = ref([
  {
    id: 1,
    guest: 'Sophie Martin',
    dates: 'Apr 15 - Apr 20',
    status: 'Confirmed',
    nights: 5,
  },
  {
    id: 2,
    guest: 'Lucas Bernard',
    dates: 'Apr 22 - Apr 25',
    status: 'Pending',
    nights: 3,
  },
  {
    id: 3,
    guest: 'Emma Dubois',
    dates: 'Apr 28 - May 2',
    status: 'Confirmed',
    nights: 4,
  },
]);

const getDateClass = (date) => ({
  'bg-white/10': !date.booking,
  'bg-white/20': date.booking,
});
</script>
