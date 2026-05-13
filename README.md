# Sistem Informasi One Seulanga Nusantara

Sistem informasi internal untuk manajemen arsip surat dan permohonan karyawan di perusahaan One Seulanga Nusantara.

## Teknologi

- **Framework**: Nuxt 4 (Vue 3)
- **Database**: MySQL + Drizzle ORM
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: Pinia
- **Auth**: JWT (jose) + bcryptjs
- **Icons**: Lucide Icons

## Fitur

### Admin
- Dashboard statistik (surat masuk/keluar, jumlah karyawan)
- Manajemen Arsip Surat Masuk (input & tabel)
- Manajemen Arsip Surat Keluar (auto-numbering: 001/OSN/OUT/V/2026)
- Daftar Karyawan terdaftar

### Karyawan
- E-Permohonan (izin, sakit, cuti) dengan validasi maks. 3 hari
- Riwayat permohonan

## Instalasi

```bash
# Install dependencies
npm install

# Siapkan module dan Nuxt
npm run dev:prepare

# Seed database (buat database, tabel, dan data awal)
cd playground
npx tsx server/db/seed.ts

# Push schema Drizzle ke database
npx drizzle-kit push

# Jalankan development server
cd ..
npm run dev
```