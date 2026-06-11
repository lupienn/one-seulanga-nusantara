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
    // ===== SEED DATA ADMIN =====
    const [adminRows] = await connection.execute(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      ['admin'],
    ) as mysql.RowDataPacket[][]

    if (adminRows && adminRows.length > 0) {
      console.log('ℹ️  Admin sudah ada, melakukan update data dan password admin...')
      const passwordHash = await bcrypt.hash('admin', 12)
      await connection.execute(
        'UPDATE users SET password = ?, nama_lengkap = ? WHERE username = ?',
        [passwordHash, 'Administrator OSN', 'admin'],
      )
      console.log('✅ Data admin berhasil diperbarui (Password: admin).')
    }
    else {
      const passwordHash = await bcrypt.hash('admin', 12)
      await connection.execute(
        'INSERT INTO users (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)',
        ['admin', passwordHash, 'Administrator OSN', 'admin'],
      )
      console.log('✅ Pengguna admin berhasil dibuat.')
      console.log('   Username : admin')
      console.log('   Password : admin')
      console.log('   ⚠️  Segera ganti password setelah login pertama!\n')
    }

    // ===== SEED DATA 3 KARYAWAN =====
    const karyawanData = [
      { username: 'karyawan1', nama: 'Karyawan Satu', password: 'password' },
      { username: 'karyawan2', nama: 'Karyawan Dua', password: 'password' },
      { username: 'karyawan3', nama: 'Karyawan Tiga', password: 'password' },
    ]

    for (const k of karyawanData) {
      const [existRows] = await connection.execute(
        'SELECT id FROM users WHERE username = ? LIMIT 1',
        [k.username],
      ) as mysql.RowDataPacket[][]

      if (existRows && existRows.length > 0) {
        console.log(`ℹ️  ${k.username} sudah ada, melakukan update data dan password...`)
        const hash = await bcrypt.hash(k.password, 12)
        await connection.execute(
          'UPDATE users SET password = ?, nama_lengkap = ? WHERE username = ?',
          [hash, k.nama, k.username],
        )
        console.log(`✅ ${k.username} berhasil diperbarui. (Password baru: ${k.password})`)
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
