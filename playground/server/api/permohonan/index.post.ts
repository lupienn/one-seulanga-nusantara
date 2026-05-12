import { useDB } from '../../db/index'
import { permohonanKaryawan } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  // Hanya karyawan yang boleh membuat permohonan
  if (userLogin.role !== 'karyawan') {
    throw createError({ statusCode: 403, statusMessage: 'Hanya karyawan yang dapat membuat permohonan.' })
  }

  const body = await readBody(event)

  // Validasi field wajib
  if (!body?.jenisOpsi || !body?.tanggalMulai || !body?.tanggalSelesai || !body?.keterangan?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Jenis permohonan, tanggal mulai, tanggal selesai, dan keterangan wajib diisi.',
    })
  }

  // Validasi jenis opsi
  const validOpsi = ['izin', 'sakit', 'cuti']
  if (!validOpsi.includes(body.jenisOpsi)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Jenis permohonan tidak valid. Pilih: izin, sakit, atau cuti.',
    })
  }

  // Validasi rentang tanggal maksimal 3 hari
  const mulai = new Date(body.tanggalMulai)
  const selesai = new Date(body.tanggalSelesai)
  const selisihHari = Math.ceil((selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24)) + 1

  if (selisihHari < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tanggal selesai harus setelah atau sama dengan tanggal mulai.',
    })
  }

  if (selisihHari > 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Rentang permohonan tidak boleh melebihi 3 hari.',
    })
  }

  const db = useDB()

  await db.insert(permohonanKaryawan).values({
    userId: userLogin.id,
    jenisOpsi: body.jenisOpsi,
    tanggalMulai: body.tanggalMulai,
    tanggalSelesai: body.tanggalSelesai,
    keterangan: body.keterangan.trim(),
  })

  return {
    berhasil: true,
    pesan: 'Permohonan berhasil diajukan.',
  }
})
