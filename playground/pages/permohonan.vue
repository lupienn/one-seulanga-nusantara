<template>
  <div class="flex min-h-screen bg-gradient-to-br from-[#040812] via-[#0a1628] to-[#050b14] selection:bg-osn-500/30 font-sans">
    
    <!-- Background Batik (Subtle Watermark Global) -->
    <div class="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <img src="/batik.png" alt="Batik" class="absolute -top-64 -right-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert rotate-12" />
      <img src="/batik.png" alt="Batik" class="absolute -bottom-64 -left-64 w-[800px] h-[800px] object-contain opacity-[0.02] invert -rotate-12" />
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
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/dashboard' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideLayoutDashboard :size="18" :class="$route.path === '/dashboard' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Dashboard</span>
        </NuxtLink>

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">E-Permohonan</span>

        <NuxtLink
          to="/permohonan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/permohonan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/permohonan' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideFileEdit :size="18" :class="$route.path === '/permohonan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
          <span>Buat Permohonan</span>
        </NuxtLink>

        <NuxtLink
          to="/riwayat"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/riwayat' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300" :class="$route.path === '/riwayat' ? 'opacity-100' : 'opacity-0 scale-y-0'"></div>
          <LucideHistory :size="18" :class="$route.path === '/riwayat' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'" />
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
            Buat Permohonan
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block truncate">
            Ajukan izin, sakit, atau cuti
          </p>
        </div>
        
        <!-- Animated Badge for Page -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-osn-500/10 border border-osn-500/20 text-osn-400">
          <LucideFileEdit :size="14" />
          <span class="text-xs font-bold tracking-widest uppercase">E-Permohonan</span>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        <!-- Form Permohonan -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-lg group">
          <!-- Background abstract glow -->
          <div class="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
          
          <div class="relative z-10">
            <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div class="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-inner">
                <LucideFileEdit :size="18" />
              </div>
              Formulir E-Permohonan
            </h3>

            <form
              class="flex flex-col gap-6"
              @submit.prevent="ajukanPermohonan"
            >
              <!-- Jenis Permohonan -->
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Jenis Permohonan</label>
                <div class="flex gap-3 flex-wrap">
                  <button
                    v-for="opsi in jenisOpsiList"
                    :key="opsi.value"
                    type="button"
                    class="px-5 py-3 rounded-xl text-sm font-semibold transition-all border shadow-sm flex items-center gap-2"
                    :class="form.jenisOpsi === opsi.value
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-500/25'
                      : 'bg-[#050a14]/50 border-slate-700/60 text-slate-400 hover:bg-[#070f1e] hover:border-slate-600'"
                    @click="form.jenisOpsi = opsi.value"
                  >
                    <component
                      :is="opsi.icon"
                      :size="16"
                    />
                    {{ opsi.label }}
                  </button>
                </div>
                <span
                  v-if="errorJenis"
                  class="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium"
                >
                  <LucideAlertCircle :size="14" />{{ errorJenis }}
                </span>
              </div>

              <!-- Tanggal Mulai & Selesai -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Tanggal Mulai</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <LucideCalendarDays :size="16" class="text-slate-500" />
                    </div>
                    <input
                      v-model="form.tanggalMulai"
                      type="date"
                      class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none [color-scheme:dark]"
                      @change="cekRentang"
                    >
                  </div>
                  <span
                    v-if="errorTanggalMulai"
                    class="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium"
                  >
                    <LucideAlertCircle :size="14" />{{ errorTanggalMulai }}
                  </span>
                </div>
                
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Tanggal Selesai</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <LucideCalendarDays :size="16" class="text-slate-500" />
                    </div>
                    <input
                      v-model="form.tanggalSelesai"
                      type="date"
                      class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none [color-scheme:dark]"
                      @change="cekRentang"
                    >
                  </div>
                  <span
                    v-if="errorTanggalSelesai"
                    class="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium"
                  >
                    <LucideAlertCircle :size="14" />{{ errorTanggalSelesai }}
                  </span>
                </div>
              </div>

              <!-- Feedback rentang hari -->
              <Transition
                enter-active-class="transition duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                leave-active-class="transition duration-200"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="rentangHari !== null"
                  class="flex items-center gap-3 text-sm rounded-xl px-4 py-3 border shadow-inner font-medium"
                  :class="rentangHari > 3
                    ? 'border-red-500/30 bg-red-500/10 text-red-300'
                    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'"
                >
                  <div class="p-1 rounded-full" :class="rentangHari > 3 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'">
                    <LucideCalendarDays :size="16" />
                  </div>
                  <span>
                    Rentang: <strong>{{ rentangHari }} hari</strong>
                    <template v-if="rentangHari > 3"> — Maksimal 3 hari!</template>
                  </span>
                </div>
              </Transition>

              <!-- Keterangan -->
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Keterangan <span class="text-red-400">*</span></label>
                <textarea
                  v-model="form.keterangan"
                  class="w-full p-4 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none min-h-[120px] resize-y"
                  placeholder="Jelaskan alasan permohonan Anda..."
                  @input="errorKeterangan = ''"
                />
                <span
                  v-if="errorKeterangan"
                  class="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium"
                >
                  <LucideAlertCircle :size="14" />{{ errorKeterangan }}
                </span>
              </div>

              <!-- Submit -->
              <div class="flex justify-end mt-2">
                <button
                  type="submit"
                  class="relative overflow-hidden w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  :disabled="sedangSimpan"
                >
                  <LucideLoader v-if="sedangSimpan" :size="18" class="animate-spin" />
                  <LucideSendHorizonal v-else :size="18" />
                  <span>{{ sedangSimpan ? 'Mengajukan...' : 'Ajukan Permohonan' }}</span>
                </button>
              </div>
            </form>

            <!-- Feedback -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="pesanSukses"
                class="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-inner"
              >
                <div class="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                  <LucideCheckCircle2 :size="16" />
                </div>
                <span class="font-medium">{{ pesanSukses }}</span>
              </div>
              <div
                v-else-if="pesanError"
                class="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-inner"
              >
                <div class="p-1 rounded-full bg-red-500/20 text-red-400">
                  <LucideAlertCircle :size="16" />
                </div>
                <span class="font-medium">{{ pesanError }}</span>
              </div>
            </Transition>
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

const jenisOpsiList = [
  { value: 'izin', label: 'Izin', icon: 'LucideCalendarCheck' },
  { value: 'sakit', label: 'Sakit', icon: 'LucideHeart' },
  { value: 'cuti', label: 'Cuti', icon: 'LucidePalmtree' },
]

const form = reactive({
  jenisOpsi: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  keterangan: '',
})

const sedangSimpan = ref(false)
const pesanSukses = ref('')
const pesanError = ref('')
const errorJenis = ref('')
const errorTanggalMulai = ref('')
const errorTanggalSelesai = ref('')
const errorKeterangan = ref('')
const rentangHari = ref<number | null>(null)

function cekRentang() {
  if (form.tanggalMulai && form.tanggalSelesai) {
    const mulai = new Date(form.tanggalMulai)
    const selesai = new Date(form.tanggalSelesai)
    const selisih = Math.ceil((selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24)) + 1
    rentangHari.value = selisih >= 1 ? selisih : null
    errorTanggalSelesai.value = ''
  }
  else {
    rentangHari.value = null
  }
}

function validasiForm(): boolean {
  let valid = true
  errorJenis.value = ''
  errorTanggalMulai.value = ''
  errorTanggalSelesai.value = ''
  errorKeterangan.value = ''

  if (!form.jenisOpsi) {
    errorJenis.value = 'Pilih jenis permohonan.'
    valid = false
  }
  if (!form.tanggalMulai) {
    errorTanggalMulai.value = 'Tanggal mulai wajib diisi.'
    valid = false
  }
  if (!form.tanggalSelesai) {
    errorTanggalSelesai.value = 'Tanggal selesai wajib diisi.'
    valid = false
  }
  if (!form.keterangan.trim()) {
    errorKeterangan.value = 'Keterangan wajib diisi.'
    valid = false
  }

  if (form.tanggalMulai && form.tanggalSelesai) {
    const mulai = new Date(form.tanggalMulai)
    const selesai = new Date(form.tanggalSelesai)
    const selisih = Math.ceil((selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24)) + 1

    if (selisih < 1) {
      errorTanggalSelesai.value = 'Tanggal selesai harus setelah tanggal mulai.'
      valid = false
    }
    if (selisih > 3) {
      errorTanggalSelesai.value = 'Rentang permohonan tidak boleh melebihi 3 hari.'
      valid = false
    }
  }

  return valid
}

async function ajukanPermohonan() {
  pesanSukses.value = ''
  pesanError.value = ''
  if (!validasiForm()) return

  sedangSimpan.value = true
  try {
    await $fetch('/api/permohonan', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: {
        jenisOpsi: form.jenisOpsi,
        tanggalMulai: form.tanggalMulai,
        tanggalSelesai: form.tanggalSelesai,
        keterangan: form.keterangan.trim(),
      },
    })
    pesanSukses.value = 'Permohonan berhasil diajukan!'
    form.jenisOpsi = ''
    form.tanggalMulai = ''
    form.tanggalSelesai = ''
    form.keterangan = ''
    rentangHari.value = null
    setTimeout(() => {
      pesanSukses.value = ''
    }, 5000)
  }
  catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string } }
    pesanError.value = fetchErr.data?.statusMessage || 'Gagal mengajukan permohonan.'
  }
  finally {
    sedangSimpan.value = false
  }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
})

useSeoMeta({ title: 'Buat Permohonan — One Seulanga Nusantara' })
</script>
