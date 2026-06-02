<template>
  <div class="flex min-h-screen bg-gradient-to-br from-[#040812] via-[#0a1628] to-[#050b14] selection:bg-osn-500/30 font-sans">
    <!-- Background Batik (Subtle Watermark Global) -->
    <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <img
        src="/batik.png"
        alt="Batik"
        class="absolute -top-64 -right-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert rotate-12"
      >
      <img
        src="/batik.png"
        alt="Batik"
        class="absolute -bottom-64 -left-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert -rotate-12"
      >
    </div>

    <!-- SIDEBAR -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-700/50 bg-[#070e1a]/80 backdrop-blur-2xl transition-transform duration-300 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
      :class="sidebarTerbuka ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 border-b border-slate-700/50 px-6 py-6">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-osn-500 to-osn-700 shadow-lg shadow-osn-500/20">
          <span class="text-xs font-extrabold text-white tracking-wider">OSN</span>
        </div>
        <div>
          <span class="block text-sm font-extrabold text-white tracking-wide">One Seulanga</span>
          <span class="block text-xs text-slate-400 font-medium tracking-widest">Nusantara</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-6">
        <span class="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Menu Utama</span>

        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/dashboard' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/dashboard' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideLayoutDashboard
            :size="18"
            :class="$route.path === '/dashboard' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Dashboard</span>
        </NuxtLink>

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">E-Permohonan</span>

        <NuxtLink
          to="/permohonan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/permohonan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/permohonan' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideFileEdit
            :size="18"
            :class="$route.path === '/permohonan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Buat Permohonan</span>
        </NuxtLink>

        <NuxtLink
          to="/riwayat"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/riwayat' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/riwayat' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideHistory
            :size="18"
            :class="$route.path === '/riwayat' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Riwayat Permohonan</span>
        </NuxtLink>
      </nav>

      <!-- User footer -->
      <div class="border-t border-slate-700/50 px-4 py-5 bg-[#050a14]/50">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-500 text-sm font-bold text-white shadow-md">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-white">
              {{ pengguna?.namaLengkap || pengguna?.username }}
            </p>
            <p class="text-[11px] font-medium text-slate-400 truncate">
              Karyawan
            </p>
          </div>
          <button
            class="flex shrink-0 items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
            title="Keluar"
            @click="authStore.logout()"
          >
            <LucideLogOut
              :size="18"
              class="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay mobile -->
    <div
      v-if="sidebarTerbuka"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
      @click="sidebarTerbuka = false"
    />

    <!-- ============ MAIN ============ -->
    <div class="relative z-10 flex flex-1 flex-col lg:pl-64 w-full">
      <!-- Topbar -->
      <header class="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-700/50 bg-[#070e1a]/80 px-6 py-4 backdrop-blur-2xl shadow-sm">
        <button
          class="flex items-center justify-center rounded-xl bg-slate-800/50 p-2 text-slate-300 hover:bg-slate-700 lg:hidden transition"
          aria-label="Toggle menu"
          @click="sidebarTerbuka = !sidebarTerbuka"
        >
          <LucideMenu :size="20" />
        </button>

        <div class="flex-1 min-w-0">
          <h1 class="text-lg font-bold text-white tracking-tight truncate">
            Riwayat Permohonan
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block truncate">
            Lihat riwayat permohonan yang pernah diajukan
          </p>
        </div>

        <!-- Animated Badge for Page -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-osn-500/10 border border-osn-500/20 text-osn-400">
          <LucideHistory :size="14" />
          <span class="text-xs font-bold tracking-widest uppercase">E-Permohonan</span>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        <!-- Loading State -->
        <div
          v-if="sedangMuat"
          class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 shadow-lg flex flex-col items-center justify-center"
        >
          <LucideLoader
            :size="32"
            class="animate-spin text-osn-400 mb-4"
          />
          <p class="font-medium text-slate-300 tracking-wide">
            Memuat riwayat permohonan...
          </p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="daftarPermohonan.length === 0"
          class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 shadow-lg flex flex-col items-center justify-center text-center group"
        >
          <div class="absolute top-0 right-0 p-32 bg-slate-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-slate-500/10 transition-colors duration-700" />
          <LucideInbox
            :size="48"
            class="text-slate-500 mb-4"
          />
          <h3 class="text-lg font-bold text-slate-200 mb-1">
            Belum ada riwayat permohonan
          </h3>
          <p class="text-sm text-slate-400 font-medium">
            Silakan buat permohonan baru melalui menu "Buat Permohonan".
          </p>
        </div>

        <!-- Tabel Riwayat Permohonan -->
        <div
          v-else
          class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-lg flex-1"
        >
          <div class="px-6 py-5 border-b border-slate-700/50 bg-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-osn-500/20 text-osn-400">
                <LucideList :size="18" />
              </div>
              <h3 class="text-base font-bold text-white tracking-wide">
                Daftar Permohonan Saya
              </h3>
            </div>
            <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-300 tracking-widest shadow-inner">
              Total: <span class="text-osn-400 ml-1.5">{{ daftarPermohonan.length }}</span> Riwayat
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="bg-black/10 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th class="px-6 py-4 w-20 text-center">
                    No. ID
                  </th>
                  <th class="px-6 py-4 whitespace-nowrap">
                    Jenis
                  </th>
                  <th class="px-6 py-4 whitespace-nowrap">
                    Tanggal Mulai
                  </th>
                  <th class="px-6 py-4 whitespace-nowrap">
                    Tanggal Selesai
                  </th>
                  <th class="px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                  <th class="px-6 py-4 whitespace-nowrap">
                    Diajukan
                  </th>
                  <th class="px-6 py-4 text-center whitespace-nowrap">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                <tr
                  v-for="(item, i) in daftarPermohonan"
                  :key="item.id"
                  class="hover:bg-white/5 transition-colors duration-200 group"
                >
                  <td class="px-6 py-4 text-center font-bold text-slate-200 whitespace-nowrap group-hover:text-slate-300">
                    {{ String(i + 1).padStart(2, '0') }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border"
                      :class="badgeJenis(item.jenisOpsi)"
                    >
                      <component
                        :is="iconJenis(item.jenisOpsi)"
                        :size="12"
                      />
                      {{ item.jenisOpsi }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-300 whitespace-nowrap">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-semibold">
                      <LucideCalendarDays
                        :size="12"
                        class="text-osn-400"
                      />
                      {{ formatTanggal(item.tanggalMulai) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-300 whitespace-nowrap">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-semibold">
                      <LucideCalendarDays
                        :size="12"
                        class="text-osn-400"
                      />
                      {{ formatTanggal(item.tanggalSelesai) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border"
                      :class="badgeStatus(item.status)"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-400 text-xs font-medium whitespace-nowrap">
                    {{ formatTanggalLengkap(item.createdAt) }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors text-xs font-bold"
                      title="Lihat Detail"
                      @click="bukaDetail(item)"
                    >
                      <LucideEye :size="14" />
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Detail -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="permohonanTerpilih"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="tutupDetail"
        />

        <!-- Modal Content -->
        <Transition
          enter-active-class="transition duration-300 ease-out delay-75"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="permohonanTerpilih"
            class="relative w-full max-w-lg bg-[#0a1628] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <!-- Header -->
            <div class="px-6 py-5 border-b border-slate-700/50 bg-[#0d1c33]/50 flex items-center justify-between">
              <h3 class="text-lg font-bold text-white flex items-center gap-3">
                <div class="p-2 rounded-xl bg-osn-500/20 text-osn-400">
                  <LucideFileText :size="18" />
                </div>
                Detail Permohonan <span class="text-slate-400 ml-1 font-mono">#{{ permohonanTerpilih.id }}</span>
              </h3>
              <button
                class="p-2 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition"
                @click="tutupDetail"
              >
                <LucideX :size="20" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6 flex flex-col gap-6">
              <div class="flex items-center gap-4">
                <div
                  class="p-3 rounded-2xl border"
                  :class="badgeJenis(permohonanTerpilih.jenisOpsi)"
                >
                  <component
                    :is="iconJenis(permohonanTerpilih.jenisOpsi)"
                    :size="24"
                  />
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Jenis Permohonan
                  </p>
                  <p class="text-base font-bold text-slate-200 uppercase tracking-widest">
                    {{ permohonanTerpilih.jenisOpsi }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-black/20 rounded-2xl border border-slate-700/30">
                  <div class="flex items-center gap-1.5 text-slate-500 mb-2">
                    <LucideCalendarDays :size="14" />
                    <p class="text-[10px] font-bold uppercase tracking-wider">
                      Tanggal Mulai
                    </p>
                  </div>
                  <p class="text-sm font-semibold text-slate-200">
                    {{ formatTanggal(permohonanTerpilih.tanggalMulai) }}
                  </p>
                </div>
                <div class="p-4 bg-black/20 rounded-2xl border border-slate-700/30">
                  <div class="flex items-center gap-1.5 text-slate-500 mb-2">
                    <LucideCalendarDays :size="14" />
                    <p class="text-[10px] font-bold uppercase tracking-wider">
                      Tanggal Selesai
                    </p>
                  </div>
                  <p class="text-sm font-semibold text-slate-200">
                    {{ formatTanggal(permohonanTerpilih.tanggalSelesai) }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <LucideMessageSquareText :size="14" /> Keterangan
                </p>
                <div class="p-4 bg-[#050a14]/40 rounded-xl border border-slate-700/50 text-sm text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {{ permohonanTerpilih.keterangan || 'Tidak ada keterangan.' }}
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-slate-700/30">
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Status Saat Ini
                </p>
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border"
                  :class="badgeStatus(permohonanTerpilih.status)"
                >
                  {{ permohonanTerpilih.status }}
                </span>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-700/50 bg-[#0d1c33]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-2 text-xs font-medium text-slate-400">
                <LucideClock
                  :size="14"
                  class="text-osn-400"
                />
                Diajukan pada: <span class="text-slate-300">{{ formatTanggalLengkap(permohonanTerpilih.createdAt) }}</span>
              </div>
              <button
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-600 border border-slate-600/50 text-white text-sm font-bold tracking-wide transition"
                @click="tutupDetail"
              >
                Tutup
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const inisialNama = computed(() => (pengguna.value?.namaLengkap || pengguna.value?.username || '?').slice(0, 2).toUpperCase())

interface PermohonanItem { id: number, jenisOpsi: string, tanggalMulai: string, tanggalSelesai: string, keterangan: string, status: string, createdAt: string }
const sedangMuat = ref(true)
const daftarPermohonan = ref<PermohonanItem[]>([])
const permohonanTerpilih = ref<PermohonanItem | null>(null)

function bukaDetail(item: PermohonanItem) {
  permohonanTerpilih.value = item
}

function tutupDetail() {
  permohonanTerpilih.value = null
}

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

function badgeStatus(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    disetujui: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    ditolak: 'bg-red-500/20 text-red-300 border-red-500/30',
  }
  return map[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<{ data: PermohonanItem[] }>('/api/permohonan', {
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
