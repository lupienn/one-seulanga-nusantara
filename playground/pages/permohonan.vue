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
        <NuxtLink to="/permohonan" class="nav-item active"><LucideFileEdit :size="17" /><span>Buat Permohonan</span></NuxtLink>
        <NuxtLink to="/riwayat" class="nav-item"><LucideHistory :size="17" /><span>Riwayat Permohonan</span></NuxtLink>
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
          <h1 class="text-base font-bold text-slate-100">Buat Permohonan</h1>
          <p class="text-xs text-slate-500">Ajukan izin, sakit, atau cuti</p>
        </div>
      </header>

      <main class="flex flex-col gap-5 p-5">

        <!-- Form Permohonan -->
        <div class="glass-card p-6 max-w-2xl">
          <h3 class="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <LucideFileEdit :size="16" class="text-seulanga-400" />
            Formulir E-Permohonan
          </h3>

          <form class="flex flex-col gap-5" @submit.prevent="ajukanPermohonan">

            <!-- Jenis Permohonan -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-semibold text-slate-400">Jenis Permohonan</label>
              <div class="flex gap-3 flex-wrap">
                <button
                  v-for="opsi in jenisOpsiList"
                  :key="opsi.value"
                  type="button"
                  class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border"
                  :class="form.jenisOpsi === opsi.value
                    ? 'bg-osn-500/20 border-osn-500/40 text-osn-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'"
                  @click="form.jenisOpsi = opsi.value"
                >
                  <component :is="opsi.icon" :size="14" class="inline mr-1.5" />
                  {{ opsi.label }}
                </button>
              </div>
              <span v-if="errorJenis" class="text-xs text-red-400 flex items-center gap-1">
                <LucideAlertCircle :size="12" />{{ errorJenis }}
              </span>
            </div>

            <!-- Tanggal Mulai & Selesai -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400">Tanggal Mulai</label>
                <input v-model="form.tanggalMulai" type="date" class="form-input-base !pl-4" @change="cekRentang" />
                <span v-if="errorTanggalMulai" class="text-xs text-red-400 flex items-center gap-1">
                  <LucideAlertCircle :size="12" />{{ errorTanggalMulai }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-400">Tanggal Selesai</label>
                <input v-model="form.tanggalSelesai" type="date" class="form-input-base !pl-4" @change="cekRentang" />
                <span v-if="errorTanggalSelesai" class="text-xs text-red-400 flex items-center gap-1">
                  <LucideAlertCircle :size="12" />{{ errorTanggalSelesai }}
                </span>
              </div>
            </div>

            <!-- Feedback rentang hari -->
            <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
              <div v-if="rentangHari !== null" class="flex items-center gap-2 text-xs rounded-xl px-3.5 py-2.5 border"
                :class="rentangHari > 3
                  ? 'border-red-500/25 bg-red-500/10 text-red-300'
                  : 'border-osn-500/25 bg-osn-500/10 text-osn-300'"
              >
                <LucideCalendarDays :size="14" />
                <span>
                  Rentang: <strong>{{ rentangHari }} hari</strong>
                  <template v-if="rentangHari > 3"> — Maksimal 3 hari!</template>
                </span>
              </div>
            </Transition>

            <!-- Keterangan -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Keterangan <span class="text-red-400">*</span></label>
              <textarea
                v-model="form.keterangan"
                class="form-input-base !pl-4 min-h-[100px] resize-y"
                placeholder="Jelaskan alasan permohonan Anda..."
                @input="errorKeterangan = ''"
              />
              <span v-if="errorKeterangan" class="text-xs text-red-400 flex items-center gap-1">
                <LucideAlertCircle :size="12" />{{ errorKeterangan }}
              </span>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn-primary !w-auto self-end" :disabled="sedangSimpan">
              <LucideLoader v-if="sedangSimpan" :size="15" class="animate-spin" />
              <LucideSendHorizonal v-else :size="15" />
              {{ sedangSimpan ? 'Mengajukan...' : 'Ajukan Permohonan' }}
            </button>
          </form>

          <!-- Feedback -->
          <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 -translate-y-2" leave-active-class="transition duration-200" leave-to-class="opacity-0">
            <div v-if="pesanSukses" class="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300">
              <LucideCheckCircle2 :size="16" />{{ pesanSukses }}
            </div>
            <div v-else-if="pesanError" class="mt-5 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
              <LucideAlertCircle :size="16" />{{ pesanError }}
            </div>
          </Transition>
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
  errorJenis.value = ''; errorTanggalMulai.value = ''; errorTanggalSelesai.value = ''; errorKeterangan.value = ''

  if (!form.jenisOpsi) { errorJenis.value = 'Pilih jenis permohonan.'; valid = false }
  if (!form.tanggalMulai) { errorTanggalMulai.value = 'Tanggal mulai wajib diisi.'; valid = false }
  if (!form.tanggalSelesai) { errorTanggalSelesai.value = 'Tanggal selesai wajib diisi.'; valid = false }
  if (!form.keterangan.trim()) { errorKeterangan.value = 'Keterangan wajib diisi.'; valid = false }

  if (form.tanggalMulai && form.tanggalSelesai) {
    const mulai = new Date(form.tanggalMulai)
    const selesai = new Date(form.tanggalSelesai)
    const selisih = Math.ceil((selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24)) + 1

    if (selisih < 1) { errorTanggalSelesai.value = 'Tanggal selesai harus setelah tanggal mulai.'; valid = false }
    if (selisih > 3) { errorTanggalSelesai.value = 'Rentang permohonan tidak boleh melebihi 3 hari.'; valid = false }
  }

  return valid
}

async function ajukanPermohonan() {
  pesanSukses.value = ''; pesanError.value = ''
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
    form.jenisOpsi = ''; form.tanggalMulai = ''; form.tanggalSelesai = ''; form.keterangan = ''
    rentangHari.value = null
    setTimeout(() => { pesanSukses.value = '' }, 5000)
  }
  catch (err: any) {
    pesanError.value = err.data?.statusMessage || 'Gagal mengajukan permohonan.'
  }
  finally { sedangSimpan.value = false }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
})

useSeoMeta({ title: 'Buat Permohonan — One Seulanga Nusantara' })
</script>
