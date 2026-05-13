/**
 * Script seed untuk mengisi data awal database OSN.
 * Jalankan dengan: npx tsx server/db/seed.ts
 */

import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

// Load .env dari root project
dotenv.config({ path: '../../.env' })

async function seed() {
  console.log('🌱 Memulai proses seed database One Seulanga Nusantara...\n')

  const dbName = process.env.NUXT_DB_DATABASE || 'one_seulanga_nusantara'

  // Koneksi tanpa database dulu untuk membuat database jika belum ada
  const initConn = await mysql.createConnection({
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
  })
  console.log(`🗄️  Memastikan database '${dbName}' tersedia...`)
  await initConn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  console.log(`✅ Database '${dbName}' siap.\n`)
  await initConn.end()

  // Koneksi ke database target
  const connection = await mysql.createConnection({
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 3306,
    database: dbName,
    user: process.env.NUXT_DB_USERNAME || 'root',
    password: process.env.NUXT_DB_PASSWORD || '',
    multipleStatements: true,
  })

  try {
    // ===== BUAT TABEL USERS =====
    console.log('📋 Membuat tabel users...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        nama_lengkap VARCHAR(255) NOT NULL,
        role ENUM('admin', 'karyawan') NOT NULL DEFAULT 'karyawan',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ Tabel users siap.\n')

    // ===== BUAT TABEL SURAT MASUK =====
    console.log('📋 Membuat tabel surat_masuk...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS surat_masuk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        no_surat VARCHAR(100) NOT NULL,
        asal_surat VARCHAR(255) NOT NULL,
        tanggal_terima DATE NOT NULL,
        keterangan TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ Tabel surat_masuk siap.\n')

    // ===== BUAT TABEL SURAT KELUAR =====
    console.log('📋 Membuat tabel surat_keluar...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS surat_keluar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        no_surat VARCHAR(100) NOT NULL UNIQUE,
        tujuan_surat VARCHAR(255) NOT NULL,
        tanggal_kirim DATE NOT NULL,
        keterangan TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ Tabel surat_keluar siap.\n')

    // ===== BUAT TABEL PERMOHONAN KARYAWAN =====
    console.log('📋 Membuat tabel permohonan_karyawan...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS permohonan_karyawan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        jenis_opsi ENUM('izin', 'sakit', 'cuti') NOT NULL,
        tanggal_mulai DATE NOT NULL,
        tanggal_selesai DATE NOT NULL,
        keterangan TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)
    console.log('✅ Tabel permohonan_karyawan siap.\n')

    // ===== SEED DATA ADMIN =====
    const [adminRows] = await connection.execute(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      ['admin'],
    ) as mysql.RowDataPacket[][]

    if (adminRows.length > 0) {
      console.log('ℹ️  Admin sudah ada, melewati seed admin.')
    }
    else {
      const passwordHash = await bcrypt.hash('admin123', 12)
      await connection.execute(
        'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
        ['admin', passwordHash, 'Administrator OSN', 'admin'],
      )
      console.log('✅ Pengguna admin berhasil dibuat.')
      console.log('   Username : admin')
      console.log('   Password : admin123')
      console.log('   ⚠️  Segera ganti password setelah login pertama!\n')
    }

    // ===== SEED DATA 3 KARYAWAN =====
    const karyawanData = [
      { username: 'karyawan1', nama: 'Karyawan Satu', password: 'karyawan123' },
      { username: 'karyawan2', nama: 'Karyawan Dua', password: 'karyawan123' },
      { username: 'karyawan3', nama: 'Karyawan Tiga', password: 'karyawan123' },
    ]

    for (const k of karyawanData) {
      const [existRows] = await connection.execute(
        'SELECT id FROM users WHERE username = ? LIMIT 1',
        [k.username],
      ) as mysql.RowDataPacket[][]

      if (existRows.length > 0) {
        console.log(`ℹ️  ${k.username} sudah ada, melewati.`)
      }
      else {
        const hash = await bcrypt.hash(k.password, 12)
        await connection.execute(
          'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
          [k.username, hash, k.nama, 'karyawan'],
        )
        console.log(`✅ ${k.username} berhasil dibuat. (Password: ${k.password})`)
      }
    }

    console.log('\n🎉 Seed database One Seulanga Nusantara selesai!')
  }
  finally {
    await connection.end()
  }
}

seed().catch((err) => {
  console.error('❌ Seed gagal:', err)
  process.exit(1)
})
