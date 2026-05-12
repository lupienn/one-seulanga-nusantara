<template>
  <div class="flex min-h-screen bg-[#0a1628]">

    <!-- SIDEBAR (reusable pattern) -->
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
        <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Arsip Surat</span>
        <NuxtLink to="/surat-masuk" class="nav-item active"><LucideMailOpen :size="17" /><span>Surat Masuk</span></NuxtLink>
        <NuxtLink to="/surat-keluar" class="nav-item"><LucideSend :size="17" /><span>Surat Keluar</span></NuxtLink>
        <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Manajemen</span>
        <NuxtLink to="/karyawan" class="nav-item"><LucideUsers :size="17" /><span>Karyawan</span></NuxtLink>
      </nav>
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-400 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">{{ pengguna?.namaLengkap || pengguna?.username }}</p>
            <p class="text-[11px] text-slate-500">Administrator</p>
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
          <h1 class="text-base font-bold text-slate-100">Arsip Surat Masuk</h1>
          <p class="text-xs text-slate-500">Kelola surat masuk perusahaan</p>
        </div>
      </header>

      <main class="flex flex-col gap-5 p-5">

        <!-- Form Tambah Surat Masuk -->
        <div class="glass-card p-6">
          <h3 class="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <LucidePlus :size="16" class="text-seulanga-400" />
            Tambah Surat Masuk
          </h3>
          <form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" @submit.prevent="tambahSuratMasuk">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Nomor Surat</label>
              <input v-model="form.noSurat" type="text" class="form-input-base !pl-4" placeholder="No. Surat" :disabled="sedangSimpan" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Asal Surat</label>
              <input v-model="form.asalSurat" type="text" class="form-input-base !pl-4" placeholder="Asal pengirim" :disabled="sedangSimpan" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Tanggal Terima</label>
              <input v-model="form.tanggalTerima" type="date" class="form-input-base !pl-4" :disabled="sedangSimpan" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Keterangan</label>
              <input v-model="form.keterangan" type="text" class="form-input-base !pl-4" placeholder="Opsional" :disabled="sedangSimpan" />
            </div>
            <div class="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button type="submit" class="btn-accent !w-auto" :disabled="sedangSimpan">
                <LucideLoader v-if="sedangSimpan" :size="15" class="animate-spin" />
                <LucideSave v-else :size="15" />
                {{ sedangSimpan ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
          <!-- Feedback -->
          <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 -translate-y-2" leave-active-class="transition duration-200" leave-to-class="opacity-0">
            <div v-if="pesanSukses" class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300">
              <LucideCheckCircle2 :size="16" />{{ pesanSukses }}
            </div>
            <div v-else-if="pesanError" class="mt-4 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
              <LucideAlertCircle :size="16" />{{ pesanError }}
            </div>
          </Transition>
        </div>

        <!-- Tabel Surat Masuk -->
        <div class="glass-card overflow-hidden">
          <div class="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-200">Daftar Surat Masuk</h3>
            <span class="text-xs text-slate-500">{{ daftarSurat.length }} data</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/[0.07] text-left">
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">No</th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">No. Surat</th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Asal Surat</th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Tanggal Terima</th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="sedangMuat" class="border-b border-white/[0.05]">
                  <td colspan="5" class="px-5 py-8 text-center text-slate-500">
                    <LucideLoader :size="20" class="animate-spin mx-auto mb-2" />
                    Memuat data...
                  </td>
                </tr>
                <tr v-else-if="daftarSurat.length === 0" class="border-b border-white/[0.05]">
                  <td colspan="5" class="px-5 py-8 text-center text-slate-500">Belum ada surat masuk.</td>
                </tr>
                <tr v-else v-for="(surat, i) in daftarSurat" :key="surat.id" class="border-b border-white/[0.05] hover:bg-white/[0.03] transition">
                  <td class="px-5 py-3 text-slate-400">{{ i + 1 }}</td>
                  <td class="px-5 py-3 font-medium text-slate-200">{{ surat.noSurat }}</td>
                  <td class="px-5 py-3 text-slate-300">{{ surat.asalSurat }}</td>
                  <td class="px-5 py-3 text-slate-400">{{ formatTanggal(surat.tanggalTerima) }}</td>
                  <td class="px-5 py-3 text-slate-400">{{ surat.keterangan || '—' }}</td>
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
const daftarSurat = ref<any[]>([])

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<any>('/api/surat/masuk', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    daftarSurat.value = res.data
  } catch { /* silent */ }
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
    form.noSurat = ''; form.asalSurat = ''; form.tanggalTerima = ''; form.keterangan = ''
    await fetchData()
    setTimeout(() => { pesanSukses.value = '' }, 3000)
  }
  catch (err: any) {
    pesanError.value = err.data?.statusMessage || 'Gagal menyimpan data.'
  }
  finally { sedangSimpan.value = false }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Surat Masuk — One Seulanga Nusantara' })
</script>
