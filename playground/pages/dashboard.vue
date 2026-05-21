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

        <!-- Menu Karyawan -->
        <template v-if="pengguna?.role === 'karyawan'">
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
              {{ labelRole }}
            </p>
          </div>
          <button
            id="btn-logout"
            class="flex shrink-0 items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
            :disabled="sedangLogout"
            title="Keluar"
            @click="modalLogout = true"
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

        <div class="flex-1">
          <h1 class="text-lg font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p class="text-xs font-medium text-slate-400 hidden sm:block">
            Sistem Manajemen & Informasi Terpadu
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
            <LucideCalendar :size="14" class="text-osn-400" />
            <span class="text-xs font-semibold text-slate-300">{{ tanggalSekarang }}</span>
          </div>
        </div>
      </header>

      <!-- Konten Halaman -->
      <main class="flex flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
        <!-- Welcome Banner -->
        <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-osn-800 via-osn-600 to-osn-900 p-8 lg:p-10 shadow-xl shadow-osn-900/20 group">
          <!-- Decorative Background Patterns -->
          <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none transition-transform duration-700 group-hover:scale-105">
            <img src="/batik.png" alt="Pattern" class="w-full h-full object-cover invert" />
          </div>
          
          <div class="absolute -right-20 -top-20 w-80 h-80 opacity-20 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110 drop-shadow-2xl">
            <img src="/seulanga.png" alt="Seulanga" class="w-full h-full object-contain" />
          </div>
          
          <!-- Subtle glow orbs -->
          <div class="absolute -bottom-20 right-10 w-48 h-48 bg-white/20 blur-[60px] rounded-full pointer-events-none" />
          <div class="absolute top-10 left-1/4 w-64 h-64 bg-osn-400/30 blur-[80px] rounded-full pointer-events-none" />

          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 text-[11px] font-bold tracking-widest text-white uppercase shadow-sm">
                <LucideSparkles :size="14" class="text-amber-300" />
                <span>{{ sapaanWaktu }}</span>
              </div>
              <h2 class="text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                {{ pengguna?.namaLengkap || pengguna?.username || '...' }}
              </h2>
            </div>
            
            <!-- Quick Status -->
            <div class="hidden md:flex flex-col items-end text-right">
               <div class="text-[10px] font-bold uppercase tracking-widest text-osn-200/70 mb-2">Status Sistem</div>
               <div class="flex items-center gap-2.5 text-sm font-bold text-white bg-black/20 px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
                 <span class="relative flex h-2.5 w-2.5">
                   <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                 </span>
                 Sistem Online
               </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards — Admin -->
        <div
          v-if="pengguna?.role === 'admin'"
          class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-2"
        >
          <div
            v-for="stat in statistikAdmin"
            :key="stat.label"
            class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] hover:border-slate-500/50 group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div class="relative flex items-center justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {{ stat.label }}
                </p>
                <p class="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {{ stat.nilai }}
                </p>
              </div>
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ring-1 ring-white/10"
                :class="stat.ikonBg"
              >
                <component
                  :is="stat.ikon"
                  :size="26"
                  class="text-white drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards — Karyawan -->
        <div
          v-if="pengguna?.role === 'karyawan'"
          class="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-2"
        >
          <div
            v-for="stat in statistikKaryawan"
            :key="stat.label"
            class="relative overflow-hidden bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] hover:border-slate-500/50 group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div class="relative flex items-center justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  {{ stat.label }}
                </p>
                <p class="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {{ stat.nilai }}
                </p>
              </div>
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ring-1 ring-white/10"
                :class="stat.ikonBg"
              >
                <component
                  :is="stat.ikon"
                  :size="26"
                  class="text-white drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Profil & Info Akun -->
        <div class="mt-2 grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <!-- Kolom Info Akun Utama -->
          <div class="xl:col-span-2 flex flex-col">
            <div class="flex items-center gap-2.5 mb-4 px-1">
               <LucideUserCircle class="text-osn-400" :size="20" />
               <h3 class="text-xs font-bold uppercase tracking-widest text-slate-300">Profil Saya</h3>
            </div>
            
            <div class="relative flex-1 bg-[#0d1c33]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-lg overflow-hidden group">
              <!-- Background abstract -->
              <div class="absolute top-0 right-0 p-32 bg-osn-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-osn-500/10 transition-colors duration-700" />
              
              <div class="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                <!-- Avatar Besar -->
                <div class="relative shrink-0">
                  <div class="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-osn-500 to-seulanga-500 text-3xl sm:text-4xl font-extrabold text-white shadow-xl shadow-osn-500/20 ring-4 ring-[#0a1628] hover:scale-105 transition-transform duration-300 cursor-default">
                    {{ inisialNama }}
                  </div>
                  <div class="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[#0a1628] rounded-full p-1.5">
                    <div class="bg-emerald-500 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ring-2 ring-[#0a1628]" title="Online" />
                  </div>
                </div>
                
                <!-- Detail Info -->
                <div class="flex-1 w-full text-center sm:text-left flex flex-col justify-center">
                  <h4 class="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">{{ pengguna?.namaLengkap || pengguna?.username || 'Pengguna' }}</h4>
                  <p class="text-sm text-osn-400 mb-6 font-semibold tracking-wide">@{{ pengguna?.username }}</p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 bg-black/20 p-5 rounded-2xl border border-white/5">
                    <div v-for="item in infoAkun.slice(2)" :key="item.label" class="flex flex-col gap-1.5">
                      <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
                        <component :is="item.ikon" :size="14" class="text-slate-500" />
                        {{ item.label }}
                      </span>
                      <div class="mt-0.5">
                        <span v-if="item.isBadge" class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm" :class="pengguna?.role === 'admin' ? 'bg-osn-500/10 text-osn-300 border-osn-500/30' : 'bg-seulanga-500/10 text-seulanga-300 border-seulanga-500/30'">
                          {{ item.nilai }}
                        </span>
                        <span v-else class="text-sm font-bold text-slate-200">
                          {{ item.nilai || '—' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Kolom Tambahan / Quick Links -->
          <div class="flex flex-col">
            <div class="flex items-center gap-2.5 mb-4 px-1">
               <LucideZap class="text-amber-400" :size="20" />
               <h3 class="text-xs font-bold uppercase tracking-widest text-slate-300">Aksi Cepat</h3>
            </div>
            
            <div class="flex-1 bg-gradient-to-b from-[#0d1c33]/60 to-[#070f1e]/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-lg flex flex-col gap-4">
              <template v-if="pengguna?.role === 'admin'">
                <NuxtLink to="/surat-masuk" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-osn-500/30 hover:shadow-lg transition-all group">
                  <div class="p-3 rounded-xl bg-osn-500/20 text-osn-400 group-hover:scale-110 group-hover:bg-osn-500 group-hover:text-white transition-all shadow-inner">
                    <LucideMailOpen :size="22" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white group-hover:text-osn-200 transition-colors">Arsip Surat Masuk</p>
                    <p class="text-xs text-slate-400 mt-0.5 font-medium">Cek & kelola surat terbaru</p>
                  </div>
                  <LucideChevronRight :size="18" class="ml-auto text-slate-500 group-hover:text-osn-400 group-hover:translate-x-1 transition-all" />
                </NuxtLink>
                <NuxtLink to="/karyawan" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-seulanga-500/30 hover:shadow-lg transition-all group">
                  <div class="p-3 rounded-xl bg-seulanga-500/20 text-seulanga-400 group-hover:scale-110 group-hover:bg-seulanga-500 group-hover:text-white transition-all shadow-inner">
                    <LucideUsers :size="22" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white group-hover:text-seulanga-200 transition-colors">Manajemen Karyawan</p>
                    <p class="text-xs text-slate-400 mt-0.5 font-medium">Kelola data pegawai OSN</p>
                  </div>
                  <LucideChevronRight :size="18" class="ml-auto text-slate-500 group-hover:text-seulanga-400 group-hover:translate-x-1 transition-all" />
                </NuxtLink>
              </template>
              
              <template v-if="pengguna?.role === 'karyawan'">
                <NuxtLink to="/permohonan" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-osn-500/30 hover:shadow-lg transition-all group">
                  <div class="p-3 rounded-xl bg-osn-500/20 text-osn-400 group-hover:scale-110 group-hover:bg-osn-500 group-hover:text-white transition-all shadow-inner">
                    <LucideFilePlus :size="22" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white group-hover:text-osn-200 transition-colors">Buat Permohonan Baru</p>
                    <p class="text-xs text-slate-400 mt-0.5 font-medium">Ajukan permintaan cuti dll</p>
                  </div>
                  <LucideChevronRight :size="18" class="ml-auto text-slate-500 group-hover:text-osn-400 group-hover:translate-x-1 transition-all" />
                </NuxtLink>
                <NuxtLink to="/riwayat" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-seulanga-500/30 hover:shadow-lg transition-all group">
                  <div class="p-3 rounded-xl bg-seulanga-500/20 text-seulanga-400 group-hover:scale-110 group-hover:bg-seulanga-500 group-hover:text-white transition-all shadow-inner">
                    <LucideHistory :size="22" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-white group-hover:text-seulanga-200 transition-colors">Cek Riwayat Saya</p>
                    <p class="text-xs text-slate-400 mt-0.5 font-medium">Pantau status pengajuan</p>
                  </div>
                  <LucideChevronRight :size="18" class="ml-auto text-slate-500 group-hover:text-seulanga-400 group-hover:translate-x-1 transition-all" />
                </NuxtLink>
              </template>
              
              <!-- Placeholder for layout balance -->
              <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-center">
                <span class="text-[10px] uppercase tracking-widest font-bold text-slate-600">Quick Menu v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ============ MODAL LOGOUT ============ -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 backdrop-blur-none"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 backdrop-blur-none"
    >
      <div
        v-if="modalLogout"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        @click.self="modalLogout = false"
      >
        <div class="relative bg-[#0d1c33] border border-slate-700/50 w-full max-w-md rounded-3xl p-8 text-center shadow-2xl transform transition-all scale-100 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400" />
          
          <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-500/20 bg-red-500/10 text-red-500 shadow-inner">
            <LucideLogOut :size="32" class="animate-pulse" />
          </div>
          <h3 class="text-xl font-extrabold text-white tracking-tight">
            Konfirmasi Keluar
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-400 font-medium px-4">
            Apakah Anda yakin ingin keluar dari sistem? Pastikan semua pekerjaan yang sedang berjalan telah disimpan.
          </p>
          <div class="mt-8 flex gap-4">
            <button
              class="flex-1 rounded-xl border border-slate-600 bg-slate-800/50 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white hover:border-slate-500"
              @click="modalLogout = false"
            >
              Batal
            </button>
            <button
              id="btn-konfirmasi-logout"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
              :disabled="sedangLogout"
              @click="handleLogout"
            >
              <LucideLoader
                v-if="sedangLogout"
                :size="18"
                class="animate-spin"
              />
              <span>{{ sedangLogout ? 'Keluar...' : 'Ya, Keluar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const pengguna = computed(() => authStore.penggunaLogin)
const sidebarTerbuka = ref(false)
const modalLogout = ref(false)
const sedangLogout = ref(false)

// Dashboard stats
const statsData = ref<Record<string, number> | null>(null)

const inisialNama = computed(() => {
  const nama = pengguna.value?.namaLengkap || pengguna.value?.username || '?'
  return nama.slice(0, 2).toUpperCase()
})

const labelRole = computed(() => {
  const map: Record<string, string> = {
    admin: 'Administrator',
    karyawan: 'Karyawan',
  }
  return map[pengguna.value?.role || ''] || pengguna.value?.role || '—'
})

const tanggalBergabung = computed(() => {
  if (!pengguna.value?.createdAt) return '—'
  return new Date(pengguna.value.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
})

const tanggalSekarang = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})

const sapaanWaktu = computed(() => {
  const jam = new Date().getHours()
  if (jam < 12) return 'Selamat Pagi'
  if (jam < 15) return 'Selamat Siang'
  if (jam < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const statistikAdmin = computed(() => [
  { label: 'Total Karyawan', nilai: statsData.value?.totalKaryawan ?? '—', ikon: 'LucideUsers', ikonBg: 'bg-gradient-to-br from-osn-700 to-osn-500' },
  { label: 'Surat Masuk', nilai: statsData.value?.totalSuratMasuk ?? '—', ikon: 'LucideMailOpen', ikonBg: 'bg-gradient-to-br from-emerald-700 to-emerald-500' },
  { label: 'Surat Keluar', nilai: statsData.value?.totalSuratKeluar ?? '—', ikon: 'LucideSend', ikonBg: 'bg-gradient-to-br from-seulanga-500 to-seulanga-400' },
  { label: 'Permohonan', nilai: statsData.value?.totalPermohonan ?? '—', ikon: 'LucideFileEdit', ikonBg: 'bg-gradient-to-br from-violet-700 to-violet-500' },
])

const statistikKaryawan = computed(() => [
  { label: 'Total Permohonan Saya', nilai: statsData.value?.totalPermohonan ?? '—', ikon: 'LucideFileEdit', ikonBg: 'bg-gradient-to-br from-osn-700 to-osn-500' },
])

const infoAkun = computed(() => [
  { label: 'Nama Lengkap', nilai: pengguna.value?.namaLengkap, isBadge: false, ikon: 'LucideUser' },
  { label: 'Username', nilai: pengguna.value?.username, isBadge: false, ikon: 'LucideAtSign' },
  { label: 'Role / Posisi', nilai: labelRole.value, isBadge: true, ikon: 'LucideShieldCheck' },
  { label: 'Bergabung Sejak', nilai: tanggalBergabung.value, isBadge: false, ikon: 'LucideCalendarClock' },
])

async function fetchStats() {
  if (!authStore.token) return
  try {
    const res = await $fetch<{ data: Record<string, number> }>('/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    statsData.value = res.data
  }
  catch {
    // silent fail
  }
}

async function handleLogout() {
  sedangLogout.value = true
  await $fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authStore.token}` },
  }).catch(() => {})
  authStore.logout()
}

onMounted(async () => {
  if (authStore.terautentikasi && !authStore.penggunaLogin) {
    await authStore.ambilProfil()
  }
  await fetchStats()
})

useSeoMeta({
  title: 'Dashboard — One Seulanga Nusantara',
  description: 'Dashboard Sistem Informasi One Seulanga Nusantara.',
})
</script>
