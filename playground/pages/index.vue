<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0a1628]">
    <div class="text-center">
      <LucideLoader :size="32" class="animate-spin text-osn-500 mx-auto mb-4" />
      <p class="text-slate-400 text-sm">Mengalihkan...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const authStore = useAuthStore()

onMounted(() => {
  authStore.inisialisasiDariCookie()
  if (authStore.terautentikasi) {
    navigateTo('/dashboard')
  }
  else {
    navigateTo('/login')
  }
})
</script>
