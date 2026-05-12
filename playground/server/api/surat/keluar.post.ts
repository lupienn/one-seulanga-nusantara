import { useDB } from '../../db/index'
import { suratKeluar } from '../../db/schema'
import { generateNomorSuratKeluar } from '../../utils/suratKeluar'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const body = await readBody(event)

  if (!body?.tujuanSurat || !body?.tanggalKirim) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tujuan Surat dan Tanggal Kirim wajib diisi.',
    })
  }

  const db = useDB()

  // Auto-generate nomor surat
  const noSurat = await generateNomorSuratKeluar()

  await db.insert(suratKeluar).values({
    noSurat,
    tujuanSurat: body.tujuanSurat,
    tanggalKirim: body.tanggalKirim,
    keterangan: body.keterangan || null,
  })

  return {
    berhasil: true,
    pesan: 'Surat keluar berhasil ditambahkan.',
    data: { noSurat },
  }
})
