import { useDB } from '../../db/index'
import { suratMasuk } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const body = await readBody(event)

  if (!body?.noSurat || !body?.asalSurat || !body?.tanggalTerima) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nomor Surat, Asal Surat, dan Tanggal Terima wajib diisi.',
    })
  }

  const db = useDB()

  await db.insert(suratMasuk).values({
    noSurat: body.noSurat,
    asalSurat: body.asalSurat,
    tanggalTerima: body.tanggalTerima,
    keterangan: body.keterangan || null,
  })

  return {
    berhasil: true,
    pesan: 'Surat masuk berhasil ditambahkan.',
  }
})
