<template>
  <div class="flex min-h-screen bg-[#0a1628]">

    <!-- SIDEBAR -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.07] bg-[#0c1528]/80 backdrop-blur-xl transition-transform duration-300"
      :class="sidebarTerbuka ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-osn-500 to-osn-700">
          <span class="text-[10px] font-extrabold text-white">OSN</span>
        </div>
        <div>
          <span class="block text-sm font-extrabold text-white">One Seulanga</span>
          <span class="block text-[11px] text-slate-500">Nusantara</span>
        </div>
      </div>
      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <span class="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Menu Utama</span>
        <NuxtLink to="/dashboard" class="nav-item"><LucideLayoutDashboard :size="17" /><span>Dashboard</span></NuxtLink>
        <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">E-Permohonan</span>
        <NuxtLink to="/permohonan" class="nav-item"><LucideFileEdit :size="17" /><span>Buat Permohonan</span></NuxtLink>
        <NuxtLink to="/riwayat" class="nav-item active"><LucideHistory :size="17" /><span>Riwayat Permohonan</span></NuxtLink>
      </nav>
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-400 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">{{ pengguna?.namaLengkap || pengguna?.username }}</p>
            <p class="text-[11px] text-slate-500">Karyawan</p>
          </div>
          <button class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/10" @click="authStore.logout()" title="Keluar">
            <LucideLogOut :size="16" />
          </button>
        </div>
      </div>
    </aside>

    <div v-if="sidebarTerbuka" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" @click="sidebarTerbuka = false" />

    <!-- MAIN -->
    <div class="flex flex-1 flex-col lg:pl-64">
      <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.07] bg-[#0a1628]/80 px-5 py-3.5 backdrop-blur-xl">
        <button class="flex items-center justify-center rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 lg:hidden transition" @click="sidebarTerbuka = !sidebarTerbuka" aria-label="Toggle menu">
          <LucideMenu :size="20" />
        </button>
        <div class="flex-1">
          <h1 class="text-base font-bold text-slate-100">Riwayat Permohonan</h1>
          <p class="text-xs text-slate-500">Lihat riwayat permohonan yang pernah diajukan</p>
        </div>
      </header>

      <main class="flex flex-col gap-5 p-5">

        <!-- Card List -->
        <div v-if="sedangMuat" class="flex items-center justify-center py-16">
          <div class="text-center">
            <LucideLoader :size="24" class="animate-spin text-osn-500 mx-auto mb-3" />
            <p class="text-sm text-slate-500">Memuat riwayat...</p>
          </div>
        </div>

        <div v-else-if="daftarPermohonan.length === 0" class="glass-card p-10 text-center">
          <LucideInbox :size="40" class="mx-auto mb-3 text-slate-600" />
          <p class="text-slate-400 font-medium">Belum ada riwayat permohonan.</p>
          <p class="text-xs text-slate-500 mt-1">Silakan buat permohonan baru melalui menu "Buat Permohonan".</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in daftarPermohonan"
            :key="item.id"
            class="glass-card p-5 hover:bg-white/[0.06] transition-all hover:-translate-y-0.5"
          >
            <div class="flex items-start justify-between mb-4">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                :class="badgeJenis(item.jenisOpsi)"
              >
                <component :is="iconJenis(item.jenisOpsi)" :size="12" />
                {{ item.jenisOpsi }}
              </span>
              <span class="text-[10px] text-slate-600 font-mono">#{{ item.id }}</span>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">Tanggal Mulai</p>
                <p class="text-sm text-slate-300">{{ formatTanggal(item.tanggalMulai) }}</p>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">Tanggal Selesai</p>
                <p class="text-sm text-slate-300">{{ formatTanggal(item.tanggalSelesai) }}</p>
              </div>
            </div>

            <div>
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">Keterangan</p>
              <p class="text-sm text-slate-400 leading-relaxed">{{ item.keterangan }}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-white/[0.07] flex items-center gap-1.5 text-[10px] text-slate-600">
              <LucideClock :size="12" />
              Diajukan: {{ formatTanggalLengkap(item.createdAt) }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const inisialNama = computed(() => (pengguna.value?.namaLengkap || pengguna.value?.username || '?').slice(0, 2).toUpperCase())

const sedangMuat = ref(true)
const daftarPermohonan = ref<any[]>([])

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTanggalLengkap(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function badgeJenis(jenis: string) {
  const map: Record<string, string> = {
    izin: 'bg-osn-500/20 text-osn-300 border border-osn-500/30',
    sakit: 'bg-red-500/20 text-red-300 border border-red-500/30',
    cuti: 'bg-seulanga-400/20 text-seulanga-400 border border-seulanga-400/30',
  }
  return map[jenis] || 'bg-slate-500/20 text-slate-400'
}

function iconJenis(jenis: string) {
  const map: Record<string, string> = {
    izin: 'LucideCalendarCheck',
    sakit: 'LucideHeart',
    cuti: 'LucidePalmtree',
  }
  return map[jenis] || 'LucideFile'
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<any>('/api/permohonan', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    daftarPermohonan.value = res.data
  }
  catch { /* silent */ }
  finally { sedangMuat.value = false }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Riwayat Permohonan — One Seulanga Nusantara' })
</script>
