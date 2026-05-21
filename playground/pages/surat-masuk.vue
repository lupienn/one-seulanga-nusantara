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

        <!-- Menu Admin -->
        <template v-if="pengguna?.role === 'admin'">
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
        </template>
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
            Arsip Surat Masuk
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block truncate">
            Kelola dan pantau seluruh surat masuk perusahaan
          </p>
        </div>
        
        <!-- Animated Badge for Page -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-osn-500/10 border border-osn-500/20 text-osn-400">
          <LucideMailOpen :size="14" />
          <span class="text-xs font-bold tracking-widest uppercase">Arsip</span>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        
        <!-- Form Tambah Surat Masuk -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-lg group">
          <!-- Background abstract glow -->
          <div class="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
          
          <div class="relative z-10">
            <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div class="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-inner">
                <LucidePlus :size="18" />
              </div>
              Tambah Surat Masuk Baru
            </h3>
            
            <form
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              @submit.prevent="tambahSuratMasuk"
            >
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Nomor Surat</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideHash :size="16" class="text-slate-500" />
                  </div>
                  <input
                    v-model="form.noSurat"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Contoh: 001/OSN/2026"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Asal Surat</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideBuilding2 :size="16" class="text-slate-500" />
                  </div>
                  <input
                    v-model="form.asalSurat"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Instansi Pengirim"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Tanggal Terima</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideCalendar :size="16" class="text-slate-500" />
                  </div>
                  <input
                    v-model="form.tanggalTerima"
                    type="date"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none [color-scheme:dark]"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Keterangan</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideMessageSquareText :size="16" class="text-slate-500" />
                  </div>
                  <input
                    v-model="form.keterangan"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Opsional"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              
              <div class="sm:col-span-2 lg:col-span-4 flex justify-end mt-2">
                <button
                  type="submit"
                  class="relative overflow-hidden px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  :disabled="sedangSimpan"
                >
                  <LucideLoader v-if="sedangSimpan" :size="18" class="animate-spin" />
                  <LucideSave v-else :size="18" />
                  <span>{{ sedangSimpan ? 'Menyimpan...' : 'Simpan Surat Masuk' }}</span>
                </button>
              </div>
            </form>
            
            <!-- Feedback Messages -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="pesanSukses"
                class="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-inner"
              >
                <div class="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  <LucideCheckCircle2 :size="16" />
                </div>
                <span class="font-medium">{{ pesanSukses }}</span>
              </div>
              <div
                v-else-if="pesanError"
                class="mt-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-inner"
              >
                <div class="p-1 rounded-full bg-red-500/20 text-red-400">
                  <LucideAlertCircle :size="16" />
                </div>
                <span class="font-medium">{{ pesanError }}</span>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Tabel Surat Masuk -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-lg flex-1">
          <div class="px-6 py-5 border-b border-slate-700/50 bg-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-osn-500/20 text-osn-400">
                <LucideList :size="18" />
              </div>
              <h3 class="text-base font-bold text-white tracking-wide">
                Daftar Surat Masuk
              </h3>
            </div>
            <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-300 tracking-widest shadow-inner">
              Total: <span class="text-osn-400 ml-1.5">{{ daftarSurat.length }}</span> Data
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="bg-black/10 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th class="px-6 py-4 w-16 text-center">No</th>
                  <th class="px-6 py-4 whitespace-nowrap">No. Surat</th>
                  <th class="px-6 py-4 whitespace-nowrap min-w-[200px]">Asal Surat</th>
                  <th class="px-6 py-4 whitespace-nowrap">Tanggal Terima</th>
                  <th class="px-6 py-4 whitespace-nowrap min-w-[250px]">Keterangan</th>
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
                      <span class="font-medium tracking-wide">Memuat data surat...</span>
                    </div>
                  </td>
                </tr>
                <tr
                  v-else-if="daftarSurat.length === 0"
                >
                  <td
                    colspan="5"
                    class="px-6 py-16 text-center text-slate-400"
                  >
                    <div class="flex flex-col items-center justify-center gap-3 opacity-60">
                      <LucideInbox :size="48" class="text-slate-500" />
                      <span class="font-medium tracking-wide">Belum ada surat masuk.</span>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(surat, i) in daftarSurat"
                  v-else
                  :key="surat.id"
                  class="hover:bg-white/5 transition-colors duration-200 group"
                >
                  <td class="px-6 py-4 text-center font-semibold text-slate-500 group-hover:text-slate-300">
                    {{ i + 1 }}
                  </td>
                  <td class="px-6 py-4 font-bold text-slate-200 whitespace-nowrap">
                    {{ surat.noSurat }}
                  </td>
                  <td class="px-6 py-4 text-slate-300 font-medium">
                    <div class="flex items-center gap-2">
                      <LucideBuilding2 :size="14" class="text-slate-500" />
                      {{ surat.asalSurat }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-300 whitespace-nowrap">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-semibold">
                      <LucideCalendarDays :size="12" class="text-osn-400" />
                      {{ formatTanggal(surat.tanggalTerima) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-400 text-sm">
                    {{ surat.keterangan || '—' }}
                  </td>
                </tr>
              </tbody>
            </table>
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

const form = reactive({ noSurat: '', asalSurat: '', tanggalTerima: '', keterangan: '' })
const sedangSimpan = ref(false)
const sedangMuat = ref(true)
const pesanSukses = ref('')
const pesanError = ref('')
interface SuratMasukItem { id: number, noSurat: string, asalSurat: string, tanggalTerima: string, keterangan: string }
const daftarSurat = ref<SuratMasukItem[]>([])

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<{ data: SuratMasukItem[] }>('/api/surat/masuk', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    daftarSurat.value = res.data
  }
  catch { /* silent */ }
  finally { sedangMuat.value = false }
}

async function tambahSuratMasuk() {
  pesanSukses.value = ''
  pesanError.value = ''

  if (!form.noSurat || !form.asalSurat || !form.tanggalTerima) {
    pesanError.value = 'Nomor Surat, Asal Surat, dan Tanggal Terima wajib diisi.'
    return
  }

  sedangSimpan.value = true
  try {
    await $fetch('/api/surat/masuk', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { noSurat: form.noSurat, asalSurat: form.asalSurat, tanggalTerima: form.tanggalTerima, keterangan: form.keterangan },
    })
    pesanSukses.value = 'Surat masuk berhasil ditambahkan.'
    form.noSurat = ''
    form.asalSurat = ''
    form.tanggalTerima = ''
    form.keterangan = ''
    await fetchData()
    setTimeout(() => {
      pesanSukses.value = ''
    }, 3000)
  }
  catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string } }
    pesanError.value = fetchErr.data?.statusMessage || 'Gagal menyimpan data.'
  }
  finally { sedangSimpan.value = false }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Surat Masuk — One Seulanga Nusantara' })
</script>
