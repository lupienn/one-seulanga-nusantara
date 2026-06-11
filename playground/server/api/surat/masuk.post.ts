import { useDB } from '../../db/index'
import { suratMasuk } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const body = await readBody(event)

  if (!body?.noSurat || !body?.pengirim || !body?.penerima || !body?.isiSurat || !body?.tanggal) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tanggal, Nomor Surat, Pengirim, Penerima, dan Isi Surat wajib diisi.',
    })
  }

  const db = useDB()

  await db.insert(suratMasuk).values({
    tanggal: body.tanggal,
    noSurat: body.noSurat,
    pengirim: body.pengirim,
    penerima: body.penerima,
    isiSurat: body.isiSurat,
    jenisSurat: body.jenisSurat || 'SURAT MASUK',
    userPembuat: userLogin.namaLengkap || userLogin.username,
    ditandaTanganiOleh: body.ditandaTanganiOleh || null,
    approvalTime: body.ditandaTanganiOleh ? new Date() : null,
    ket: body.ditandaTanganiOleh ? 'DONE' : 'PENDING',
  })

  return {
    berhasil: true,
    pesan: 'Surat masuk berhasil ditambahkan.',
  }
})
