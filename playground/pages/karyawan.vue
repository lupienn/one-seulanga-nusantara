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

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Arsip Surat</span>

        <NuxtLink
          to="/surat-masuk"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/surat-masuk' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/surat-masuk' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideMailOpen
            :size="18"
            :class="$route.path === '/surat-masuk' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Surat Masuk</span>
        </NuxtLink>

        <NuxtLink
          to="/surat-keluar"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/surat-keluar' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/surat-keluar' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideSend
            :size="18"
            :class="$route.path === '/surat-keluar' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Surat Keluar</span>
        </NuxtLink>

        <span class="mt-6 mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Manajemen</span>

        <NuxtLink
          to="/karyawan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/karyawan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/karyawan' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideUsers
            :size="18"
            :class="$route.path === '/karyawan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
          <span>Karyawan</span>
        </NuxtLink>

        <NuxtLink
          to="/kelola-permohonan"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative"
          :class="$route.path === '/kelola-permohonan' ? 'bg-osn-500/10 text-osn-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'"
        >
          <div
            class="absolute inset-y-0 left-0 w-1 rounded-r-full bg-osn-500 transition-all duration-300"
            :class="$route.path === '/kelola-permohonan' ? 'opacity-100' : 'opacity-0 scale-y-0'"
          />
          <LucideFileSignature
            :size="18"
            :class="$route.path === '/kelola-permohonan' ? 'text-osn-400' : 'text-slate-500 group-hover:text-slate-300'"
          />
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
        <!-- Form Tambah Karyawan -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-lg group">
          <div class="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
          <div class="relative z-10">
            <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div class="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-inner">
                <LucideUserPlus :size="18" />
              </div>
              Tambah Karyawan Baru
            </h3>
            <form
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              @submit.prevent="tambahKaryawan"
            >
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Nama Lengkap</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideUser
                      :size="16"
                      class="text-slate-500"
                    />
                  </div>
                  <input
                    v-model="form.namaLengkap"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Nama lengkap karyawan"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideAtSign
                      :size="16"
                      class="text-slate-500"
                    />
                  </div>
                  <input
                    v-model="form.username"
                    type="text"
                    class="w-full pl-10 pr-4 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Username untuk login"
                    :disabled="sedangSimpan"
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LucideLock
                      :size="16"
                      class="text-slate-500"
                    />
                  </div>
                  <input
                    v-model="form.password"
                    :type="tampilPassword ? 'text' : 'password'"
                    class="w-full pl-10 pr-12 py-3 text-sm bg-[#050a14]/50 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all outline-none"
                    placeholder="Minimal 6 karakter"
                    :disabled="sedangSimpan"
                  >
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    @click="tampilPassword = !tampilPassword"
                  >
                    <LucideEye
                      v-if="!tampilPassword"
                      :size="16"
                    />
                    <LucideEyeOff
                      v-else
                      :size="16"
                    />
                  </button>
                </div>
              </div>
              <div class="sm:col-span-2 lg:col-span-3 flex justify-end mt-2">
                <button
                  type="submit"
                  class="relative overflow-hidden px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  :disabled="sedangSimpan"
                >
                  <LucideLoader
                    v-if="sedangSimpan"
                    :size="18"
                    class="animate-spin"
                  />
                  <LucideSave
                    v-else
                    :size="18"
                  />
                  <span>{{ sedangSimpan ? 'Menyimpan...' : 'Simpan Karyawan' }}</span>
                </button>
              </div>
            </form>
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

        <!-- Tabel Karyawan -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-lg flex-1">
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
                    <th class="px-6 py-4 w-16 text-center">
                      No
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap min-w-[200px]">
                      Nama Lengkap
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Username
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Role
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Bergabung
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700/50">
                  <tr v-if="sedangMuat">
                    <td
                      colspan="6"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3">
                        <LucideLoader
                          :size="28"
                          class="animate-spin text-osn-400"
                        />
                        <span class="font-medium tracking-wide">Memuat data karyawan...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="daftarKaryawan.length === 0">
                    <td
                      colspan="6"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3 opacity-60">
                        <LucideUsers
                          :size="48"
                          class="text-slate-500"
                        />
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
                        <LucideShield
                          v-if="k.role === 'admin'"
                          :size="12"
                        />
                        <LucideUser
                          v-else
                          :size="12"
                        />
                        Karyawan
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-400 text-sm">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-semibold text-slate-300">
                        <LucideCalendarDays
                          :size="12"
                          class="text-osn-400"
                        />
                        {{ formatTanggal(k.createdAt) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <button
                        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                        @click="hapusKaryawan(k)"
                      >
                        <LucideTrash2 :size="14" />
                        <span class="hidden sm:inline">Hapus</span>
                      </button>
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
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const inisialNama = computed(() => (pengguna.value?.namaLengkap || pengguna.value?.username || '?').slice(0, 2).toUpperCase())

interface KaryawanItem { id: number, namaLengkap: string, username: string, role: string, createdAt: string }
const sedangMuat = ref(true)
const daftarKaryawan = ref<KaryawanItem[]>([])

const form = reactive({ namaLengkap: '', username: '', password: '' })
const sedangSimpan = ref(false)
const pesanSukses = ref('')
const pesanError = ref('')
const tampilPassword = ref(false)

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

async function tambahKaryawan() {
  pesanSukses.value = ''
  pesanError.value = ''
  if (!form.namaLengkap || !form.username || !form.password) {
    pesanError.value = 'Nama Lengkap, Username, dan Password wajib diisi.'
    return
  }
  if (form.password.length < 6) {
    pesanError.value = 'Password minimal 6 karakter.'
    return
  }
  sedangSimpan.value = true
  try {
    await $fetch('/api/karyawan', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { namaLengkap: form.namaLengkap, username: form.username, password: form.password },
    })
    pesanSukses.value = 'Karyawan baru berhasil ditambahkan.'
    form.namaLengkap = ''
    form.username = ''
    form.password = ''
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

async function hapusKaryawan(k: KaryawanItem) {
  const result = await Swal.fire({
    title: 'Hapus Karyawan?',
    html: `Anda yakin ingin menghapus <strong>${k.namaLengkap}</strong>?<br><small class="text-gray-400">Tindakan ini tidak dapat dibatalkan.</small>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#475569',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal',
    background: '#0f172a',
    color: '#e2e8f0',
  })
  if (!result.isConfirmed) return
  try {
    await $fetch('/api/karyawan', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { id: k.id },
    })
    await Swal.fire({ title: 'Berhasil!', text: 'Karyawan telah dihapus.', icon: 'success', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#22c55e' })
    await fetchData()
  }
  catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string } }
    await Swal.fire({ title: 'Gagal!', text: fetchErr.data?.statusMessage || 'Gagal menghapus karyawan.', icon: 'error', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#ef4444' })
  }
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Karyawan — One Seulanga Nusantara' })
</script>
