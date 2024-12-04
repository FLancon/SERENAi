<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-white">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueChart />
      <div class="glass p-6 rounded-xl">
        <h3 class="text-white/80 text-sm mb-4">Recent Bookings</h3>
        <div class="space-y-4">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="flex justify-between items-center p-3 bg-white/10 rounded-lg"
          >
            <div>
              <p class="text-white font-medium">{{ booking.guest }}</p>
              <p class="text-white/70 text-sm">{{ booking.dates }}</p>
            </div>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs',
                booking.status === 'Confirmed'
                  ? 'bg-green-500/20 text-green-200'
                  : 'bg-yellow-500/20 text-yellow-200',
              ]"
            >
              {{ booking.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = ref([
  { title: 'Active Bookings', value: '12' },
  { title: 'Pending Messages', value: '5' },
  { title: 'Monthly Revenue', value: '$8,540' },
]);

const recentBookings = ref([
  {
    id: 1,
    guest: 'Sophie Martin',
    dates: 'Apr 15 - Apr 20',
    status: 'Confirmed',
  },
  {
    id: 2,
    guest: 'Lucas Bernard',
    dates: 'Apr 22 - Apr 25',
    status: 'Pending',
  },
  { id: 3, guest: 'Emma Dubois', dates: 'Apr 28 - May 2', status: 'Confirmed' },
]);
</script>
