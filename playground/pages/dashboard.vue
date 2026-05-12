<template>
  <div class="flex min-h-screen bg-[#0a1628]">

    <!-- ============ SIDEBAR ============ -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.07] bg-[#0c1528]/80 backdrop-blur-xl transition-transform duration-300"
      :class="sidebarTerbuka ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-osn-500 to-osn-700">
          <span class="text-[10px] font-extrabold text-white">OSN</span>
        </div>
        <div>
          <span class="block text-sm font-extrabold text-white">One Seulanga</span>
          <span class="block text-[11px] text-slate-500">Nusantara</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <span class="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Menu Utama</span>

        <NuxtLink to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
          <LucideLayoutDashboard :size="17" />
          <span>Dashboard</span>
        </NuxtLink>

        <!-- Menu Admin -->
        <template v-if="pengguna?.role === 'admin'">
          <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Arsip Surat</span>

          <NuxtLink to="/surat-masuk" class="nav-item" :class="{ active: $route.path === '/surat-masuk' }">
            <LucideMailOpen :size="17" />
            <span>Surat Masuk</span>
          </NuxtLink>

          <NuxtLink to="/surat-keluar" class="nav-item" :class="{ active: $route.path === '/surat-keluar' }">
            <LucideSend :size="17" />
            <span>Surat Keluar</span>
          </NuxtLink>

          <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Manajemen</span>

          <NuxtLink to="/karyawan" class="nav-item" :class="{ active: $route.path === '/karyawan' }">
            <LucideUsers :size="17" />
            <span>Karyawan</span>
          </NuxtLink>
        </template>

        <!-- Menu Karyawan -->
        <template v-if="pengguna?.role === 'karyawan'">
          <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">E-Permohonan</span>

          <NuxtLink to="/permohonan" class="nav-item" :class="{ active: $route.path === '/permohonan' }">
            <LucideFileEdit :size="17" />
            <span>Buat Permohonan</span>
          </NuxtLink>

          <NuxtLink to="/riwayat" class="nav-item" :class="{ active: $route.path === '/riwayat' }">
            <LucideHistory :size="17" />
            <span>Riwayat Permohonan</span>
          </NuxtLink>
        </template>
      </nav>

      <!-- User footer -->
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-400 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">{{ pengguna?.namaLengkap || pengguna?.username }}</p>
            <p class="text-[11px] text-slate-500">{{ labelRole }}</p>
          </div>
          <button
            id="btn-logout"
            class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/10"
            @click="modalLogout = true"
            :disabled="sedangLogout"
            title="Keluar"
          >
            <LucideLogOut :size="16" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div
      v-if="sidebarTerbuka"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="sidebarTerbuka = false"
    />

    <!-- ============ MAIN ============ -->
    <div class="flex flex-1 flex-col lg:pl-64">

      <!-- Topbar -->
      <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.07] bg-[#0a1628]/80 px-5 py-3.5 backdrop-blur-xl">
        <button
          class="flex items-center justify-center rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 lg:hidden transition"
          @click="sidebarTerbuka = !sidebarTerbuka"
          aria-label="Toggle menu"
        >
          <LucideMenu :size="20" />
        </button>

        <div class="flex-1">
          <h1 class="text-base font-bold text-slate-100">Dashboard</h1>
          <p class="text-xs text-slate-500">Selamat datang di Sistem Informasi OSN</p>
        </div>

        <span class="hidden text-xs text-slate-600 sm:block">{{ tanggalSekarang }}</span>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-5 p-5">

        <!-- Welcome Banner -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-osn-700 via-osn-500 to-osn-700 p-6 shadow-osn">
          <!-- Dekorasi lingkaran -->
          <div class="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-seulanga-400/15" />
          <div class="pointer-events-none absolute -bottom-8 right-20 h-32 w-32 rounded-full bg-seulanga-400/10" />
          <div class="pointer-events-none absolute bottom-4 right-8 h-16 w-16 rounded-full bg-white/10" />

          <div class="relative">
            <p class="text-sm text-osn-200">{{ sapaanWaktu }},</p>
            <h2 class="mt-0.5 text-2xl font-extrabold text-white">
              {{ pengguna?.namaLengkap || pengguna?.username || '...' }} 👋
            </h2>
            <p class="mt-1.5 max-w-md text-sm leading-relaxed text-osn-100/80">
              Selamat datang di Sistem Informasi One Seulanga Nusantara. Semoga hari Anda menyenangkan dan produktif.
            </p>
          </div>
        </div>

        <!-- Stats Cards — Admin -->
        <div v-if="pengguna?.role === 'admin'" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stat in statistikAdmin"
            :key="stat.label"
            class="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="stat.ikonBg">
              <component :is="stat.ikon" :size="22" class="text-white" />
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
              <p class="mt-0.5 text-2xl font-extrabold text-slate-100">{{ stat.nilai }}</p>
            </div>
          </div>
        </div>

        <!-- Stats Cards — Karyawan -->
        <div v-if="pengguna?.role === 'karyawan'" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="stat in statistikKaryawan"
            :key="stat.label"
            class="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="stat.ikonBg">
              <component :is="stat.ikon" :size="22" class="text-white" />
            </div>
            <div>
              <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
              <p class="mt-0.5 text-2xl font-extrabold text-slate-100">{{ stat.nilai }}</p>
            </div>
          </div>
        </div>

        <!-- Info Akun -->
        <div>
          <h3 class="mb-3 text-xs font-bold uppercase tracking-widest text-slate-600">Informasi Akun</h3>
          <div class="glass-card p-5">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div v-for="item in infoAkun" :key="item.label" class="flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-600">{{ item.label }}</span>
                <span v-if="item.isBadge" class="mt-0.5">
                  <span class="badge" :class="`badge-${pengguna?.role}`">{{ item.nilai }}</span>
                </span>
                <span v-else class="text-sm font-medium text-slate-300">{{ item.nilai || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ============ MODAL LOGOUT ============ -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalLogout"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="modalLogout = false"
      >
        <div class="glass-card w-full max-w-sm p-7 text-center shadow-2xl">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10 text-red-400">
            <LucideLogOut :size="28" />
          </div>
          <h3 class="text-base font-bold text-slate-100">Keluar dari Sistem?</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Anda akan keluar dari sesi ini. Pastikan semua pekerjaan sudah tersimpan sebelum melanjutkan.
          </p>
          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              @click="modalLogout = false"
            >
              Batal
            </button>
            <button
              id="btn-konfirmasi-logout"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              @click="handleLogout"
              :disabled="sedangLogout"
            >
              <LucideLoader v-if="sedangLogout" :size="15" class="animate-spin" />
              {{ sedangLogout ? 'Keluar...' : 'Ya, Keluar' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const modalLogout = ref(false)
const sedangLogout = ref(false)

// Dashboard stats
const statsData = ref<any>(null)

const inisialNama = computed(() => {
  const nama = pengguna.value?.namaLengkap || pengguna.value?.username || '?'
  return nama.slice(0, 2).toUpperCase()
})

const labelRole = computed(() => {
  const map: Record<string, string> = {
    admin: 'Administrator',
    karyawan: 'Karyawan',
  }
  return map[pengguna.value?.role || ''] || pengguna.value?.role || '—'
})

const tanggalBergabung = computed(() => {
  if (!pengguna.value?.createdAt) return '—'
  return new Date(pengguna.value.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const tanggalSekarang = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})

const sapaanWaktu = computed(() => {
  const jam = new Date().getHours()
  if (jam < 12) return 'Selamat Pagi'
  if (jam < 15) return 'Selamat Siang'
  if (jam < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const statistikAdmin = computed(() => [
  { label: 'Total Karyawan', nilai: statsData.value?.totalKaryawan ?? '—', ikon: 'LucideUsers', ikonBg: 'bg-gradient-to-br from-osn-700 to-osn-500' },
  { label: 'Surat Masuk', nilai: statsData.value?.totalSuratMasuk ?? '—', ikon: 'LucideMailOpen', ikonBg: 'bg-gradient-to-br from-emerald-700 to-emerald-500' },
  { label: 'Surat Keluar', nilai: statsData.value?.totalSuratKeluar ?? '—', ikon: 'LucideSend', ikonBg: 'bg-gradient-to-br from-seulanga-500 to-seulanga-400' },
  { label: 'Permohonan', nilai: statsData.value?.totalPermohonan ?? '—', ikon: 'LucideFileEdit', ikonBg: 'bg-gradient-to-br from-violet-700 to-violet-500' },
])

const statistikKaryawan = computed(() => [
  { label: 'Total Permohonan Saya', nilai: statsData.value?.totalPermohonan ?? '—', ikon: 'LucideFileEdit', ikonBg: 'bg-gradient-to-br from-osn-700 to-osn-500' },
])

const infoAkun = computed(() => [
  { label: 'Nama Lengkap', nilai: pengguna.value?.namaLengkap, isBadge: false },
  { label: 'Username', nilai: pengguna.value?.username, isBadge: false },
  { label: 'Role', nilai: labelRole.value, isBadge: true },
  { label: 'Bergabung Sejak', nilai: tanggalBergabung.value, isBadge: false },
])

async function fetchStats() {
  if (!authStore.token) return
  try {
    const res = await $fetch<any>('/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    statsData.value = res.data
  }
  catch {
    // silent fail
  }
}

async function handleLogout() {
  sedangLogout.value = true
  await $fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => {})
  authStore.logout()
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
  await fetchStats()
})

useSeoMeta({
  title: 'Dashboard — One Seulanga Nusantara',
  description: 'Dashboard Sistem Informasi One Seulanga Nusantara.',
})
</script>
