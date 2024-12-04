<template>
  <div class="glass p-6 rounded-xl">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-medium text-white/90">Revenue Overview</h3>
      <div class="text-3xl font-bold text-white">$89,668</div>
    </div>
    <ClientOnly>
      <div class="h-[300px] chart-container">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData = reactive({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: [65000, 59000, 80000, 81000, 56000, 75000, 89668, 85000, 91000, 88000, 89668, 87000],
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    fill: true,
    tension: 0.4,
    pointRadius: 0,
    pointHitRadius: 30,
    borderWidth: 2
  }]
})

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: {
          size: 12
        },
        callback: (value) => `$${value.toLocaleString()}`
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.6)',
        font: {
          size: 12
        }
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1e293b',
      bodyColor: '#1e293b',
      padding: 12,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        label: (context) => `$${context.raw.toLocaleString()}`
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
})
</script>