<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#070f1e] overflow-hidden px-4 py-12">
    <!-- Background Batik (Subtle Watermark) -->
    <div class="absolute inset-0 z-0 pointer-events-none select-none">
      <img 
        src="/batik.png" 
        alt="Batik Background" 
        class="w-full h-full object-cover opacity-[0.04] mix-blend-overlay"
      />
    </div>

    <!-- Decorative Glow Orbs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-osn-500/10 blur-[120px] pointer-events-none select-none" />
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-seulanga-500/10 blur-[120px] pointer-events-none select-none" />

    <!-- Decorative Seulanga Flowers (Floating behind the card) -->
    <div class="absolute z-0 pointer-events-none select-none w-[320px] h-[320px] -top-12 -left-12 opacity-20 blur-[1px] animate-float">
      <img src="/seulanga.png" alt="Seulanga Decorative" class="w-full h-full object-contain rotate-45" />
    </div>
    <div class="absolute z-0 pointer-events-none select-none w-[380px] h-[380px] -bottom-16 -right-16 opacity-15 blur-[2px] animate-float-slow">
      <img src="/seulanga.png" alt="Seulanga Decorative" class="w-full h-full object-contain -rotate-12" />
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-[420px]">
      <!-- Card Login -->
      <div class="bg-[#0b1528]/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <!-- Logo & Header -->
        <div class="flex flex-col items-center text-center mb-8">
          <div class="h-20 w-44 bg-white rounded-2xl p-2 shadow-md flex items-center justify-center mb-5 border border-slate-200/10">
            <img 
              src="/osnlogo.jpeg" 
              alt="Logo OSN" 
              class="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <h1 class="text-xl font-bold text-white tracking-tight">Sistem Informasi</h1>
          <p class="text-xs text-slate-400 mt-1">One Seulanga Nusantara</p>
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
              class="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-inner"
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
              class="text-xs font-semibold tracking-wide text-slate-300"
            >Username</label>
            <div class="relative group">
              <LucideUser
                :size="18"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-osn-400 transition-colors pointer-events-none"
              />
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="w-full pl-11 pr-4 py-3 text-sm bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:bg-slate-900/80 focus:border-osn-500 focus:ring-1 focus:ring-osn-500 rounded-xl transition-all"
                :class="errorUsername ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20' : ''"
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
              class="text-xs font-semibold tracking-wide text-slate-300"
            >Password</label>
            <div class="relative group">
              <LucideLock
                :size="18"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-osn-400 transition-colors pointer-events-none"
              />
              <input
                id="password"
                v-model="form.password"
                :type="tampilPassword ? 'text' : 'password'"
                class="w-full pl-11 pr-12 py-3 text-sm bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:bg-slate-900/80 focus:border-osn-500 focus:ring-1 focus:ring-osn-500 rounded-xl transition-all"
                :class="errorPassword ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20' : ''"
                placeholder="Masukkan password"
                autocomplete="current-password"
                :disabled="sedangMemuat"
                @input="errorPassword = ''"
              >
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
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
            class="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-osn-600 to-osn-500 hover:from-osn-500 hover:to-osn-400 text-white rounded-xl font-semibold tracking-wide shadow-lg shadow-osn-500/20 hover:shadow-osn-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            :disabled="sedangMemuat"
          >
            <template v-if="!sedangMemuat">
              <LucideLogIn :size="18" />
              <span>Masuk Ke Sistem</span>
            </template>
            <template v-else>
              <LucideLoader
                :size="18"
                class="animate-spin"
              />
              <span>Memproses...</span>
            </template>
          </button>
        </form>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-slate-500 font-medium mt-8">
        &copy; {{ tahunSekarang }} One Seulanga Nusantara.
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
