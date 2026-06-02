<template>
  <div class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#040812] via-[#0a1628] to-[#050b14] overflow-hidden px-4 py-12">
    <!-- Decorative Batik Top Left -->
    <div class="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none select-none animate-float-slow">
      <img
        src="/batik.png"
        alt="Batik Decoration"
        class="w-full h-full object-contain opacity-[0.06] invert"
      >
      <div class="absolute inset-0 bg-osn-500/20 blur-[120px] rounded-full mix-blend-screen" />
    </div>

    <!-- Decorative Batik Bottom Right -->
    <div class="absolute -bottom-32 -right-32 w-[500px] h-[500px] pointer-events-none select-none animate-float">
      <img
        src="/batik.png"
        alt="Batik Decoration"
        class="w-full h-full object-contain opacity-[0.06] invert -rotate-180"
      >
      <div class="absolute inset-0 bg-seulanga-500/20 blur-[120px] rounded-full mix-blend-screen" />
    </div>

    <!-- Decorative Seulanga Top Right -->
    <div class="absolute -top-12 -right-12 w-[320px] h-[320px] opacity-90 pointer-events-none select-none animate-float-slow z-0">
      <img
        src="/seulanga.png"
        alt="Seulanga Decoration"
        class="w-full h-full object-contain rotate-12 drop-shadow-2xl"
      >
    </div>

    <!-- Card Container -->
    <div class="relative z-10 w-full max-w-[420px]">
      <!-- Card -->
      <div class="relative bg-[#0d1c33]/70 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
        <!-- Subtle inner highlight for glassmorphism -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <!-- Logo & Header -->
        <div class="flex flex-col items-center text-center mb-8">
          <div class="h-24 w-auto min-w-[150px] px-5 bg-white rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center mb-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/osnlogo.jpeg"
              alt="Logo OSN"
              class="h-16 w-auto object-contain"
            >
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">
            One Seulanga Nusantara
          </h1>
          <p class="text-sm text-slate-400 mt-1.5">
            Sistem Informasi Perusahaan
          </p>
        </div>

        <!-- Form -->
        <form
          class="flex flex-col gap-5"
          novalidate
          @submit.prevent="handleLogin"
        >
          <!-- Alert Error -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-200 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="pesanError"
              class="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-inner"
              role="alert"
            >
              <LucideAlertCircle
                :size="18"
                class="shrink-0 text-red-400"
              />
              <span>{{ pesanError }}</span>
            </div>
          </Transition>

          <!-- Username -->
          <div class="flex flex-col gap-2">
            <label
              for="username"
              class="text-xs font-semibold tracking-wide text-slate-300 uppercase"
            >Username</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LucideUser
                  :size="18"
                  class="text-slate-500 group-focus-within:text-osn-400 transition-colors"
                />
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="w-full pl-11 pr-4 py-3.5 text-sm bg-[#070f1e]/60 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-osn-500 focus:ring-1 focus:ring-osn-500 rounded-xl transition-all outline-none"
                :class="errorUsername ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20 bg-red-500/5' : ''"
                placeholder="Masukkan username"
                autocomplete="username"
                :disabled="sedangMemuat"
                @input="errorUsername = ''"
              >
            </div>
            <span
              v-if="errorUsername"
              class="flex items-center gap-1.5 text-xs text-red-400 mt-1"
            >
              <LucideAlertCircle :size="14" />{{ errorUsername }}
            </span>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2">
            <label
              for="password"
              class="text-xs font-semibold tracking-wide text-slate-300 uppercase"
            >Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LucideLock
                  :size="18"
                  class="text-slate-500 group-focus-within:text-osn-400 transition-colors"
                />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="tampilPassword ? 'text' : 'password'"
                class="w-full pl-11 pr-12 py-3.5 text-sm bg-[#070f1e]/60 border border-slate-700/60 text-white placeholder-slate-500 focus:bg-[#070f1e] focus:border-osn-500 focus:ring-1 focus:ring-osn-500 rounded-xl transition-all outline-none"
                :class="errorPassword ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20 bg-red-500/5' : ''"
                placeholder="Masukkan password"
                autocomplete="current-password"
                :disabled="sedangMemuat"
                @input="errorPassword = ''"
              >
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
                :aria-label="tampilPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                @click="tampilPassword = !tampilPassword"
              >
                <LucideEyeOff
                  v-if="tampilPassword"
                  :size="18"
                />
                <LucideEye
                  v-else
                  :size="18"
                />
              </button>
            </div>
            <span
              v-if="errorPassword"
              class="flex items-center gap-1.5 text-xs text-red-400 mt-1"
            >
              <LucideAlertCircle :size="14" />{{ errorPassword }}
            </span>
          </div>

          <!-- Submit Button -->
          <button
            id="btn-login"
            type="submit"
            class="relative overflow-hidden w-full py-3.5 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-osn-600 to-osn-500 hover:from-osn-500 hover:to-osn-400 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-osn-500/25 hover:shadow-osn-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
            :disabled="sedangMemuat"
          >
            <!-- Button shine effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <template v-if="!sedangMemuat">
              <LucideLogIn
                :size="18"
                class="relative z-10"
              />
              <span class="relative z-10">Masuk Ke Sistem</span>
            </template>
            <template v-else>
              <LucideLoader
                :size="18"
                class="animate-spin relative z-10"
              />
              <span class="relative z-10">Memproses...</span>
            </template>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-slate-500 font-medium mt-8">
        &copy; {{ tahunSekarang }} One Seulanga Nusantara.<br>Hak cipta dilindungi.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({ username: '', password: '' })
const sedangMemuat = ref(false)
const pesanError = ref('')
const errorUsername = ref('')
const errorPassword = ref('')
const tampilPassword = ref(false)
const tahunSekarang = new Date().getFullYear()

function validasiForm(): boolean {
  let valid = true
  if (!form.username.trim()) {
    errorUsername.value = 'Username wajib diisi.'
    valid = false
  }
  if (!form.password.trim()) {
    errorPassword.value = 'Password wajib diisi.'
    valid = false
  }
  return valid
}

async function handleLogin() {
  pesanError.value = ''
  if (!validasiForm()) return

  sedangMemuat.value = true
  try {
    await authStore.login(form.username.trim(), form.password)
    await router.push('/dashboard')
  }
  catch (err: unknown) {
    pesanError.value = err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.'
  }
  finally {
    sedangMemuat.value = false
  }
}

useSeoMeta({
  title: 'One Seulanga Nusantara',
  description: 'Halaman login Sistem Informasi One Seulanga Nusantara.',
})
</script>
