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
        <NuxtLink
          to="/dashboard"
          class="nav-item"
        ><LucideLayoutDashboard :size="17" /><span>Dashboard</span></NuxtLink>
        <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Arsip Surat</span>
        <NuxtLink
          to="/surat-masuk"
          class="nav-item"
        ><LucideMailOpen :size="17" /><span>Surat Masuk</span></NuxtLink>
        <NuxtLink
          to="/surat-keluar"
          class="nav-item active"
        ><LucideSend :size="17" /><span>Surat Keluar</span></NuxtLink>
        <span class="mt-4 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Manajemen</span>
        <NuxtLink
          to="/karyawan"
          class="nav-item"
        ><LucideUsers :size="17" /><span>Karyawan</span></NuxtLink>
      </nav>
      <div class="border-t border-white/[0.07] px-3 py-4">
        <div class="flex items-center gap-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-400 text-xs font-bold text-white">
            {{ inisialNama }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-200">
              {{ pengguna?.namaLengkap || pengguna?.username }}
            </p>
            <p class="text-[11px] text-slate-500">
              Administrator
            </p>
          </div>
          <button
            class="flex shrink-0 items-center justify-center rounded-lg border border-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/10"
            title="Keluar"
            @click="authStore.logout()"
          >
            <LucideLogOut :size="16" />
          </button>
        </div>
      </div>
    </aside>

    <div
      v-if="sidebarTerbuka"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="sidebarTerbuka = false"
    />

    <!-- MAIN -->
    <div class="flex flex-1 flex-col lg:pl-64">
      <header class="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.07] bg-[#0a1628]/80 px-5 py-3.5 backdrop-blur-xl">
        <button
          class="flex items-center justify-center rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/5 lg:hidden transition"
          aria-label="Toggle menu"
          @click="sidebarTerbuka = !sidebarTerbuka"
        >
          <LucideMenu :size="20" />
        </button>
        <div class="flex-1">
          <h1 class="text-base font-bold text-slate-100">
            Arsip Surat Keluar
          </h1>
          <p class="text-xs text-slate-500">
            Nomor surat digenerate otomatis oleh sistem
          </p>
        </div>
      </header>

      <main class="flex flex-col gap-5 p-5">
        <!-- Form Tambah Surat Keluar -->
        <div class="glass-card p-6">
          <h3 class="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <LucidePlus
              :size="16"
              class="text-seulanga-400"
            />
            Tambah Surat Keluar
          </h3>
          <form
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            @submit.prevent="tambahSuratKeluar"
          >
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Tujuan Surat</label>
              <input
                v-model="form.tujuanSurat"
                type="text"
                class="form-input-base !pl-4"
                placeholder="Nama tujuan"
                :disabled="sedangSimpan"
              >
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Tanggal Kirim</label>
              <input
                v-model="form.tanggalKirim"
                type="date"
                class="form-input-base !pl-4"
                :disabled="sedangSimpan"
              >
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-slate-400">Keterangan</label>
              <input
                v-model="form.keterangan"
                type="text"
                class="form-input-base !pl-4"
                placeholder="Opsional"
                :disabled="sedangSimpan"
              >
            </div>
            <div class="sm:col-span-2 lg:col-span-3 flex items-center justify-between">
              <p class="text-xs text-slate-500 flex items-center gap-1.5">
                <LucideInfo
                  :size="14"
                  class="text-osn-400"
                />
                Nomor surat akan digenerate otomatis oleh sistem
              </p>
              <button
                type="submit"
                class="btn-accent !w-auto"
                :disabled="sedangSimpan"
              >
                <LucideLoader
                  v-if="sedangSimpan"
                  :size="15"
                  class="animate-spin"
                />
                <LucideSave
                  v-else
                  :size="15"
                />
                {{ sedangSimpan ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
          <Transition
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-200"
            leave-to-class="opacity-0"
          >
            <div
              v-if="pesanSukses"
              class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300"
            >
              <LucideCheckCircle2 :size="16" />{{ pesanSukses }}
            </div>
            <div
              v-else-if="pesanError"
              class="mt-4 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
            >
              <LucideAlertCircle :size="16" />{{ pesanError }}
            </div>
          </Transition>
        </div>

        <!-- Tabel Surat Keluar -->
        <div class="glass-card overflow-hidden">
          <div class="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-200">
              Daftar Surat Keluar
            </h3>
            <span class="text-xs text-slate-500">{{ daftarSurat.length }} data</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/[0.07] text-left">
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    No
                  </th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    No. Surat
                  </th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Tujuan Surat
                  </th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Tanggal Kirim
                  </th>
                  <th class="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="sedangMuat"
                  class="border-b border-white/[0.05]"
                >
                  <td
                    colspan="5"
                    class="px-5 py-8 text-center text-slate-500"
                  >
                    <LucideLoader
                      :size="20"
                      class="animate-spin mx-auto mb-2"
                    />Memuat data...
                  </td>
                </tr>
                <tr
                  v-else-if="daftarSurat.length === 0"
                  class="border-b border-white/[0.05]"
                >
                  <td
                    colspan="5"
                    class="px-5 py-8 text-center text-slate-500"
                  >
                    Belum ada surat keluar.
                  </td>
                </tr>
                <tr
                  v-for="(surat, i) in daftarSurat"
                  v-else
                  :key="surat.id"
                  class="border-b border-white/[0.05] hover:bg-white/[0.03] transition"
                >
                  <td class="px-5 py-3 text-slate-400">
                    {{ i + 1 }}
                  </td>
                  <td class="px-5 py-3 font-mono font-medium text-seulanga-400">
                    {{ surat.noSurat }}
                  </td>
                  <td class="px-5 py-3 text-slate-300">
                    {{ surat.tujuanSurat }}
                  </td>
                  <td class="px-5 py-3 text-slate-400">
                    {{ formatTanggal(surat.tanggalKirim) }}
                  </td>
                  <td class="px-5 py-3 text-slate-400">
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

const form = reactive({ tujuanSurat: '', tanggalKirim: '', keterangan: '' })
const sedangSimpan = ref(false)
const sedangMuat = ref(true)
const pesanSukses = ref('')
const pesanError = ref('')
interface SuratKeluarItem { id: number, noSurat: string, tujuanSurat: string, tanggalKirim: string, keterangan: string }
const daftarSurat = ref<SuratKeluarItem[]>([])

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<{ data: SuratKeluarItem[] }>('/api/surat/keluar', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarSurat.value = res.data
  }
  catch { /* silent */ }
  finally { sedangMuat.value = false }
}

async function tambahSuratKeluar() {
  pesanSukses.value = ''
  pesanError.value = ''
  if (!form.tujuanSurat || !form.tanggalKirim) {
    pesanError.value = 'Tujuan Surat dan Tanggal Kirim wajib diisi.'
    return
  }
  sedangSimpan.value = true
  try {
    const res = await $fetch<{ data: SuratKeluarItem }>('/api/surat/keluar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { tujuanSurat: form.tujuanSurat, tanggalKirim: form.tanggalKirim, keterangan: form.keterangan },
    })
    pesanSukses.value = `Surat keluar berhasil ditambahkan. No: ${res.data.noSurat}`
    form.tujuanSurat = ''
    form.tanggalKirim = ''
    form.keterangan = ''
    await fetchData()
    setTimeout(() => {
      pesanSukses.value = ''
    }, 5000)
  }
  catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string } }
    pesanError.value = fetchErr.data?.statusMessage || 'Gagal menyimpan data.'
  }
  finally {
    sedangSimpan.value = false
  }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Surat Keluar — One Seulanga Nusantara' })
</script>
