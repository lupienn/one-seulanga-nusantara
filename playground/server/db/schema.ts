import { mysqlTable, varchar, int, timestamp, mysqlEnum, date, text } from 'drizzle-orm/mysql-core'

// ===== TABEL USERS =====
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  namaLengkap: varchar('nama_lengkap', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'karyawan']).notNull().default('karyawan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type User = typeof users.$inferSelect
export type UserBaru = typeof users.$inferInsert

// ===== TABEL SURAT MASUK =====
export const suratMasuk = mysqlTable('surat_masuk', {
  id: int('id').primaryKey().autoincrement(),
  noSurat: varchar('no_surat', { length: 100 }).notNull(),
  asalSurat: varchar('asal_surat', { length: 255 }).notNull(),
  tanggalTerima: date('tanggal_terima').notNull(),
  keterangan: text('keterangan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type SuratMasuk = typeof suratMasuk.$inferSelect
export type SuratMasukBaru = typeof suratMasuk.$inferInsert

// ===== TABEL SURAT KELUAR =====
export const suratKeluar = mysqlTable('surat_keluar', {
  id: int('id').primaryKey().autoincrement(),
  noSurat: varchar('no_surat', { length: 100 }).notNull().unique(),
  tujuanSurat: varchar('tujuan_surat', { length: 255 }).notNull(),
  tanggalKirim: date('tanggal_kirim').notNull(),
  keterangan: text('keterangan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type SuratKeluar = typeof suratKeluar.$inferSelect
export type SuratKeluarBaru = typeof suratKeluar.$inferInsert

// ===== TABEL PERMOHONAN KARYAWAN =====
export const permohonanKaryawan = mysqlTable('permohonan_karyawan', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().references(() => users.id),
  jenisOpsi: mysqlEnum('jenis_opsi', ['izin', 'sakit', 'cuti']).notNull(),
  tanggalMulai: date('tanggal_mulai').notNull(),
  tanggalSelesai: date('tanggal_selesai').notNull(),
  keterangan: text('keterangan').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type PermohonanKaryawan = typeof permohonanKaryawan.$inferSelect
export type PermohonanKaryawanBaru = typeof permohonanKaryawan.$inferInsert
