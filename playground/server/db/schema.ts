import { mysqlTable, varchar, int, timestamp, mysqlEnum, date, text, datetime } from 'drizzle-orm/mysql-core'

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
  tanggal: date('tanggal').notNull(),
  noSurat: varchar('no_surat', { length: 100 }).notNull(),
  pengirim: varchar('pengirim', { length: 255 }).notNull(),
  penerima: varchar('penerima', { length: 255 }).notNull(),
  isiSurat: text('isi_surat').notNull(),
  jenisSurat: varchar('jenis_surat', { length: 50 }).notNull().default('SURAT MASUK'),
  userPembuat: varchar('user_pembuat', { length: 255 }).notNull(),
  ditandaTanganiOleh: varchar('ditanda_tangani_oleh', { length: 255 }),
  approvalTime: datetime('approval_time'),
  ket: varchar('ket', { length: 50 }).default('DONE'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type SuratMasuk = typeof suratMasuk.$inferSelect
export type SuratMasukBaru = typeof suratMasuk.$inferInsert

// ===== TABEL SURAT KELUAR =====
export const suratKeluar = mysqlTable('surat_keluar', {
  id: int('id').primaryKey().autoincrement(),
  tanggal: date('tanggal').notNull(),
  noSurat: varchar('no_surat', { length: 100 }).notNull().unique(),
  pengirim: varchar('pengirim', { length: 255 }).notNull(),
  penerima: varchar('penerima', { length: 255 }).notNull(),
  isiSurat: text('isi_surat').notNull(),
  jenisSurat: varchar('jenis_surat', { length: 50 }).notNull().default('SURAT KELUAR'),
  userPembuat: varchar('user_pembuat', { length: 255 }).notNull(),
  ditandaTanganiOleh: varchar('ditanda_tangani_oleh', { length: 255 }),
  approvalTime: datetime('approval_time'),
  ket: varchar('ket', { length: 50 }).default('DONE'),
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
  status: mysqlEnum('status', ['pending', 'disetujui', 'ditolak']).notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export type PermohonanKaryawan = typeof permohonanKaryawan.$inferSelect
export type PermohonanKaryawanBaru = typeof permohonanKaryawan.$inferInsert
