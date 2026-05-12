/**
 * Utilitas untuk auto-generate nomor surat keluar OSN.
 * Format: 001/OSN/OUT/{BULAN_ROMAWI}/{TAHUN}
 */

import { useDB } from '../db/index'
import { suratKeluar } from '../db/schema'
import { sql } from 'drizzle-orm'

const bulanRomawi: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV',
  5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII',
  9: 'IX', 10: 'X', 11: 'XI', 12: 'XII',
}

export async function generateNomorSuratKeluar(): Promise<string> {
  const db = useDB()
  const now = new Date()
  const tahun = now.getFullYear()
  const bulan = now.getMonth() + 1

  // Hitung jumlah surat keluar yang sudah ada di tahun ini
  const result = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(suratKeluar)
    .where(sql`YEAR(tanggal_kirim) = ${tahun}`)

  const counter = (result[0]?.count || 0) + 1
  const nomorUrut = String(counter).padStart(3, '0')
  const romawi = bulanRomawi[bulan]

  return `${nomorUrut}/OSN/OUT/${romawi}/${tahun}`
}
