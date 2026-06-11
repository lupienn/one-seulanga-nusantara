import { useDB } from '../../db/index'
import { suratKeluar } from '../../db/schema'
import { generateNomorSuratKeluar } from '../../utils/suratKeluar'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const body = await readBody(event)

  if (!body?.penerima || !body?.isiSurat || !body?.tanggal) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tanggal, Penerima, dan Isi Surat wajib diisi.',
    })
  }

  const db = useDB()

  // Auto-generate nomor surat
  const noSurat = await generateNomorSuratKeluar()

  await db.insert(suratKeluar).values({
    tanggal: body.tanggal,
    noSurat,
    pengirim: body.pengirim || 'PT. ONE SEULANGA NUSANTARA',
    penerima: body.penerima,
    isiSurat: body.isiSurat,
    jenisSurat: body.jenisSurat || 'SURAT KELUAR',
    userPembuat: userLogin.namaLengkap || userLogin.username,
    ditandaTanganiOleh: body.ditandaTanganiOleh || null,
    approvalTime: body.ditandaTanganiOleh ? new Date() : null,
    ket: body.ditandaTanganiOleh ? 'DONE' : 'PENDING',
  })

  return {
    berhasil: true,
    pesan: 'Surat keluar berhasil ditambahkan.',
    data: { noSurat },
  }
})
