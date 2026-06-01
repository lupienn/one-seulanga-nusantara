<template>
  <div class="flex min-h-screen bg-gradient-to-br from-[#040812] via-[#0a1628] to-[#050b14] selection:bg-osn-500/30 font-sans">
    
    <!-- Background Batik (Subtle Watermark Global) -->
    <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <img src="/batik.png" alt="Batik" class="absolute -top-64 -right-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert rotate-12" />
      <img src="/batik.png" alt="Batik" class="absolute -bottom-64 -left-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert -rotate-12" />
    </div>

    <!-- ============ SIDEBAR ============ -->
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
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/dashboard' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideLayoutDashboard :size="18" :class="$route.path === '/dashboard' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Dashboard</span>
        </NuxtLink>

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Arsip Surat</span>

        <NuxtLink
          to="/surat-masuk"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/surat-masuk' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/surat-masuk' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideMailOpen :size="18" :class="$route.path === '/surat-masuk' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Surat Masuk</span>
        </NuxtLink>

        <NuxtLink
          to="/surat-keluar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/surat-keluar' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/surat-keluar' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideSend :size="18" :class="$route.path === '/surat-keluar' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Surat Keluar</span>
        </NuxtLink>

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Manajemen</span>

        <NuxtLink
          to="/karyawan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/karyawan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/karyawan' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideUsers :size="18" :class="$route.path === '/karyawan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Karyawan</span>
        </NuxtLink>

        <NuxtLink
          to="/kelola-permohonan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/kelola-permohonan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/kelola-permohonan' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideFileSignature :size="18" :class="$route.path === '/kelola-permohonan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Permohonan</span>
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
              Administrator
            </p>
          </div>
          <button
            class="flex shrink-0 items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
            title="Keluar"
            @click="authStore.logout()"
          >
            <LucideLogOut :size="18" class="group-hover:-translate-x-0.5 transition-transform" />
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
            Manajemen Karyawan
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block truncate">
            Kelola daftar karyawan yang terdaftar di sistem
          </p>
        </div>
        
        <!-- Animated Badge for Page -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-osn-500/10 border border-osn-500/20 text-osn-400">
          <LucideUsers :size="14" />
          <span class="text-xs font-bold tracking-widest uppercase">Admin</span>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        
        <!-- Tabel Karyawan -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-lg flex-1">
          <!-- Background abstract glow -->
          <div class="absolute -top-32 -right-32 p-48 bg-osn-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div class="relative z-10">
            <div class="px-6 py-5 border-b border-slate-700/50 bg-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-xl bg-osn-500/20 text-osn-400">
                  <LucideUsers :size="18" />
                </div>
                <h3 class="text-base font-bold text-white tracking-wide">
                  Daftar Karyawan
                </h3>
              </div>
              <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-300 tracking-widest shadow-inner">
                Total: <span class="text-osn-400 ml-1.5">{{ daftarKaryawan.length }}</span> Karyawan
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-black/10 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/50">
                  <tr>
                    <th class="px-6 py-4 w-16 text-center">No</th>
                    <th class="px-6 py-4 whitespace-nowrap min-w-[200px]">Nama Lengkap</th>
                    <th class="px-6 py-4 whitespace-nowrap">Username</th>
                    <th class="px-6 py-4 whitespace-nowrap">Role</th>
                    <th class="px-6 py-4 whitespace-nowrap">Bergabung</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700/50">
                  <tr
                    v-if="sedangMuat"
                  >
                    <td
                      colspan="5"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3">
                        <LucideLoader :size="28" class="animate-spin text-osn-400" />
                        <span class="font-medium tracking-wide">Memuat data karyawan...</span>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-else-if="daftarKaryawan.length === 0"
                  >
                    <td
                      colspan="5"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3 opacity-60">
                        <LucideUsers :size="48" class="text-slate-500" />
                        <span class="font-medium tracking-wide">Belum ada karyawan terdaftar.</span>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-for="(k, i) in daftarKaryawan"
                    v-else
                    :key="k.id"
                    class="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td class="px-6 py-4 text-center font-semibold text-slate-500 group-hover:text-slate-300">
                      {{ String(i + 1).padStart(2, '0') }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-osn-500 to-seulanga-500 text-xs font-bold text-white shadow-md">
                          {{ (k.namaLengkap || k.username).slice(0, 2).toUpperCase() }}
                        </div>
                        <span class="font-bold text-slate-200">{{ k.namaLengkap }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-slate-300 font-mono text-sm">
                      @{{ k.username }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <LucideShield :size="12" v-if="k.role === 'admin'" />
                        <LucideUser :size="12" v-else />
                        Karyawan
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-400 text-sm">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-semibold text-slate-300">
                        <LucideCalendarDays :size="12" class="text-osn-400" />
                        {{ formatTanggal(k.createdAt) }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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

interface KaryawanItem { id: number, namaLengkap: string, username: string, role: string, createdAt: string }
const sedangMuat = ref(true)
const daftarKaryawan = ref<KaryawanItem[]>([])

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<{ data: KaryawanItem[] }>('/api/karyawan', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarKaryawan.value = res.data
  }
  catch { /* silent */ }
  finally { sedangMuat.value = false }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Karyawan — One Seulanga Nusantara' })
</script>
