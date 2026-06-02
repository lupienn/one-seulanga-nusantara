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
            Kelola Permohonan
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block truncate">
            Tinjau dan proses pengajuan izin, cuti, atau sakit dari karyawan
          </p>
        </div>

        <!-- Animated Badge for Page -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-osn-500/10 border border-osn-500/20 text-osn-400">
          <LucideFileSignature :size="14" />
          <span class="text-xs font-bold tracking-widest uppercase">Admin</span>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        <!-- Tabel Permohonan -->
        <div class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-lg flex-1">
          <!-- Background abstract glow -->
          <div class="absolute -top-32 -right-32 p-48 bg-osn-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div class="relative z-10">
            <div class="px-6 py-5 border-b border-slate-700/50 bg-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-xl bg-osn-500/20 text-osn-400">
                  <LucideList :size="18" />
                </div>
                <h3 class="text-base font-bold text-white tracking-wide">
                  Daftar Pengajuan Karyawan
                </h3>
              </div>
              <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-300 tracking-widest shadow-inner">
                Total: <span class="text-osn-400 ml-1.5">{{ daftarPermohonan.length }}</span> Pengajuan
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
                      Karyawan
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Jenis
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Waktu
                    </th>
                    <th class="px-6 py-4 whitespace-nowrap">
                      Status
                    </th>
                    <th class="px-6 py-4 text-center whitespace-nowrap">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700/50">
                  <tr
                    v-if="sedangMuat"
                  >
                    <td
                      colspan="6"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3">
                        <LucideLoader
                          :size="28"
                          class="animate-spin text-osn-400"
                        />
                        <span class="font-medium tracking-wide">Memuat data permohonan...</span>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-else-if="daftarPermohonan.length === 0"
                  >
                    <td
                      colspan="6"
                      class="px-6 py-16 text-center text-slate-400"
                    >
                      <div class="flex flex-col items-center justify-center gap-3 opacity-60">
                        <LucideInbox
                          :size="48"
                          class="text-slate-500"
                        />
                        <span class="font-medium tracking-wide">Belum ada pengajuan permohonan.</span>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-for="(p, i) in daftarPermohonan"
                    v-else
                    :key="p.id"
                    class="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td class="px-6 py-4 text-center font-semibold text-slate-500 group-hover:text-slate-300">
                      {{ String(i + 1).padStart(2, '0') }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-osn-500 to-seulanga-500 text-xs font-bold text-white shadow-md">
                          {{ (p.pengguna?.namaLengkap || '?').slice(0, 2).toUpperCase() }}
                        </div>
                        <div class="flex flex-col">
                          <span class="font-bold text-slate-200">{{ p.pengguna?.namaLengkap }}</span>
                          <span class="text-xs text-slate-500 font-mono">@{{ p.pengguna?.username }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border"
                        :class="badgeJenis(p.jenisOpsi)"
                      >
                        <component
                          :is="iconJenis(p.jenisOpsi)"
                          :size="12"
                        />
                        {{ p.jenisOpsi }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-slate-300 whitespace-nowrap">
                      <div class="flex flex-col gap-1 text-xs font-semibold">
                        <span class="text-slate-400">Dari: <span class="text-slate-200">{{ formatTanggal(p.tanggalMulai) }}</span></span>
                        <span class="text-slate-400">S/d: <span class="text-slate-200">{{ formatTanggal(p.tanggalSelesai) }}</span></span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border"
                        :class="badgeStatus(p.status)"
                      >
                        {{ p.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors text-xs font-bold"
                          title="Tinjau Permohonan"
                          @click="bukaDetail(p)"
                        >
                          <LucideEye :size="14" />
                          Tinjau
                        </button>
                        <button
                          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors text-xs font-bold"
                          title="Cetak PDF"
                          @click="cetakPDF(p)"
                        >
                          <LucidePrinter :size="14" />
                          Cetak
                        </button>
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

    <!-- Modal Detail Permohonan -->
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
                  <LucideFileSignature :size="18" />
                </div>
                Tinjau Permohonan <span class="text-slate-400 ml-1 font-mono">#{{ permohonanTerpilih.id }}</span>
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
              <!-- Info Pengaju -->
              <div class="flex items-center gap-4 p-4 bg-black/20 rounded-2xl border border-slate-700/30">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-bold text-white shadow-md">
                  {{ (permohonanTerpilih.pengguna?.namaLengkap || '?').slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Diajukan Oleh
                  </p>
                  <p class="text-sm font-bold text-slate-200">
                    {{ permohonanTerpilih.pengguna?.namaLengkap }}
                  </p>
                  <p class="text-xs font-mono text-slate-500">
                    @{{ permohonanTerpilih.pengguna?.username }}
                  </p>
                </div>
              </div>

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
                  <LucideMessageSquareText :size="14" /> Keterangan Karyawan
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

            <!-- Footer Actions -->
            <div class="px-6 py-5 border-t border-slate-700/50 bg-[#0d1c33]/30">
              <div
                v-if="permohonanTerpilih.status === 'pending'"
                class="flex flex-col gap-3"
              >
                <div class="grid grid-cols-2 gap-4">
                  <button
                    class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-bold tracking-wide transition"
                    :disabled="sedangProses"
                    @click="updateStatus(permohonanTerpilih.id, 'ditolak')"
                  >
                    <LucideXCircle :size="18" />
                    Tolak
                  </button>
                  <button
                    class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-bold tracking-wide transition shadow-lg shadow-emerald-500/10"
                    :disabled="sedangProses"
                    @click="updateStatus(permohonanTerpilih.id, 'disetujui')"
                  >
                    <LucideCheckCircle2 :size="18" />
                    Setujui
                  </button>
                </div>
                <button
                  class="w-full px-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold tracking-wide transition flex items-center justify-center gap-1.5"
                  @click="cetakPDF(permohonanTerpilih)"
                >
                  <LucidePrinter :size="16" />
                  Cetak PDF Draft
                </button>
              </div>
              <div
                v-else
                class="flex flex-col gap-3"
              >
                <p class="text-xs text-center text-slate-400 font-medium">
                  Permohonan ini telah diproses dan tidak dapat diubah lagi.
                </p>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    class="px-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold tracking-wide transition flex items-center justify-center gap-1.5"
                    @click="cetakPDF(permohonanTerpilih)"
                  >
                    <LucidePrinter :size="16" />
                    Cetak Bukti PDF
                  </button>
                  <button
                    class="px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600 border border-slate-600/50 text-white text-sm font-bold tracking-wide transition"
                    @click="tutupDetail"
                  >
                    Tutup Jendela
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const inisialNama = computed(() => (pengguna.value?.namaLengkap || pengguna.value?.username || '?').slice(0, 2).toUpperCase())

interface PenggunaInfo { namaLengkap: string, username: string }
interface PermohonanItem { id: number, jenisOpsi: string, tanggalMulai: string, tanggalSelesai: string, keterangan: string, status: string, createdAt: string, pengguna?: PenggunaInfo }

const sedangMuat = ref(true)
const daftarPermohonan = ref<PermohonanItem[]>([])
const permohonanTerpilih = ref<PermohonanItem | null>(null)
const sedangProses = ref(false)

function formatTanggal(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function _formatTanggalLengkap(val: string) {
  return new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function badgeJenis(jenis: string) {
  const map: Record<string, string> = {
    izin: 'bg-osn-500/20 text-osn-300 border-osn-500/30',
    sakit: 'bg-red-500/20 text-red-300 border-red-500/30',
    cuti: 'bg-seulanga-400/20 text-seulanga-400 border-seulanga-400/30',
  }
  return map[jenis] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
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

function bukaDetail(item: PermohonanItem) {
  permohonanTerpilih.value = item
}

function tutupDetail() {
  permohonanTerpilih.value = null
}

async function fetchData() {
  sedangMuat.value = true
  try {
    const res = await $fetch<{ data: PermohonanItem[] }>('/api/permohonan', { headers: { Authorization: `Bearer ${authStore.token}` } })
    daftarPermohonan.value = res.data
  }
  catch { /* silent */ }
  finally { sedangMuat.value = false }
}

async function updateStatus(id: number, statusBaru: string) {
  const konfirmasi = await Swal.fire({
    title: statusBaru === 'disetujui' ? 'Setujui Permohonan?' : 'Tolak Permohonan?',
    text: `Anda yakin ingin ${statusBaru === 'disetujui' ? 'menyetujui' : 'menolak'} permohonan ini?`,
    icon: statusBaru === 'disetujui' ? 'question' : 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal',
    background: '#0d1c33',
    color: '#fff',
    confirmButtonColor: statusBaru === 'disetujui' ? '#10b981' : '#ef4444',
  })

  if (!konfirmasi.isConfirmed) return

  sedangProses.value = true
  try {
    await $fetch(`/api/permohonan/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { status: statusBaru },
    })

    Swal.fire({
      title: 'Berhasil!',
      text: `Permohonan telah ${statusBaru}.`,
      icon: 'success',
      background: '#0d1c33',
      color: '#fff',
      timer: 2000,
      showConfirmButton: false,
    })

    tutupDetail()
    await fetchData()
  }
  catch {
    Swal.fire({
      title: 'Gagal!',
      text: 'Terjadi kesalahan saat mengupdate status.',
      icon: 'error',
      background: '#0d1c33',
      color: '#fff',
    })
  }
  finally {
    sedangProses.value = false
  }
}

function cetakPDF(item: PermohonanItem | null) {
  if (!item) return
  const closeScript = '</' + 'script>'
  const tglMulai = formatTanggal(item.tanggalMulai)
  const tglSelesai = formatTanggal(item.tanggalSelesai)
  const tglDiajukan = new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const namaKaryawan = item.pengguna?.namaLengkap || 'Karyawan'
  const usernameKaryawan = item.pengguna?.username || ''

  const d1 = new Date(item.tanggalMulai)
  const d2 = new Date(item.tanggalSelesai)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>Bukti Permohonan #${item.id}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            padding: 40px;
            background: #fff;
            line-height: 1.6;
          }
          .kop-surat {
            display: flex;
            align-items: center;
            border-bottom: 3px double #0284c7;
            padding-bottom: 15px;
            margin-bottom: 30px;
          }
          .logo-company {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 20px;
            border-radius: 12px;
            margin-right: 20px;
          }
          .company-info h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 0.5px;
          }
          .company-info p {
            margin: 2px 0 0 0;
            font-size: 12px;
            color: #64748b;
          }
          .judul-surat {
            text-align: center;
            margin-bottom: 40px;
          }
          .judul-surat h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: underline;
          }
          .judul-surat p {
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #475569;
            font-family: monospace;
          }
          .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #0284c7;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
          }
          table.detail-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          table.detail-table td {
            padding: 8px 0;
            font-size: 14px;
            vertical-align: top;
          }
          table.detail-table td.label {
            width: 25%;
            color: #64748b;
            font-weight: 600;
          }
          table.detail-table td.value {
            color: #0f172a;
            font-weight: 500;
          }
          .badge-status {
            display: inline-block;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            border-radius: 6px;
            border: 1px solid;
          }
          .status-pending {
            background-color: #fef3c7;
            color: #d97706;
            border-color: #fde68a;
          }
          .status-disetujui {
            background-color: #dcfce7;
            color: #15803d;
            border-color: #bbf7d0;
          }
          .status-ditolak {
            background-color: #fee2e2;
            color: #b91c1c;
            border-color: #fecaca;
          }
          .keterangan-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 15px;
            font-size: 14px;
            color: #334155;
            margin-bottom: 40px;
            min-height: 80px;
            white-space: pre-wrap;
          }
          .ttd-container {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            page-break-inside: avoid;
          }
          .ttd-box {
            width: 200px;
            text-align: center;
          }
          .ttd-box p {
            margin: 0;
            font-size: 14px;
          }
          .ttd-space {
            height: 80px;
          }
          .ttd-line {
            border-bottom: 1px solid #475569;
            margin-bottom: 5px;
          }
          .ttd-role {
            font-size: 12px;
            color: #64748b;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="kop-surat">
          <div class="logo-company">OSN</div>
          <div class="company-info">
            <h1>ONE SEULANGA NUSANTARA</h1>
            <p>Sistem Informasi Manajemen Karyawan & Correspondence Portal</p>
            <p>Email: info@seulanganusantara.co.id | Website: www.seulanganusantara.co.id</p>
          </div>
        </div>

        <div class="judul-surat">
          <h2>SURAT KETERANGAN PERMOHONAN</h2>
          <p>Nomor: OSN-PERM-${String(item.id).padStart(6, '0')}</p>
        </div>

        <div class="section-title">Informasi Karyawan</div>
        <table class="detail-table">
          <tr>
            <td class="label">Nama Lengkap</td>
            <td class="value">: &nbsp;${namaKaryawan}</td>
          </tr>
          <tr>
            <td class="label">Username</td>
            <td class="value">: &nbsp;@${usernameKaryawan}</td>
          </tr>
          <tr>
            <td class="label">Jabatan / Peran</td>
            <td class="value">: &nbsp;Karyawan</td>
          </tr>
        </table>

        <div class="section-title">Detail Pengajuan</div>
        <table class="detail-table">
          <tr>
            <td class="label">Jenis Permohonan</td>
            <td class="value" style="text-transform: capitalize;">: &nbsp;${item.jenisOpsi}</td>
          </tr>
          <tr>
            <td class="label">Waktu Pelaksanaan</td>
            <td class="value">: &nbsp;${tglMulai} s/d ${tglSelesai} (${diffDays} Hari)</td>
          </tr>
          <tr>
            <td class="label">Tanggal Pengajuan</td>
            <td class="value">: &nbsp;${tglDiajukan}</td>
          </tr>
          <tr>
            <td class="label">Status Persetujuan</td>
            <td class="value">: &nbsp;
              <span class="badge-status status-${item.status}">${item.status}</span>
            </td>
          </tr>
        </table>

        <div class="section-title">Alasan / Keterangan</div>
        <div class="keterangan-box">${item.keterangan || 'Tidak ada keterangan tambahan.'}</div>

        <div class="ttd-container">
          <div class="ttd-box">
            <p>Hormat Kami,</p>
            <div class="ttd-space"></div>
            <div class="ttd-line"><strong>${namaKaryawan}</strong></div>
            <div class="ttd-role">Pemohon (Karyawan)</div>
          </div>
          <div class="ttd-box">
            <p>Mengetahui,</p>
            <div class="ttd-space"></div>
            <div class="ttd-line"><strong>Administrator</strong></div>
            <div class="ttd-role">One Seulanga Nusantara</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 500);
          }
        ${closeScript}
      </body>
    </html>
  `)
  printWindow.document.close()
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) await authStore.ambilProfil()
  await fetchData()
})

useSeoMeta({ title: 'Kelola Permohonan — Admin One Seulanga Nusantara' })
</script>
