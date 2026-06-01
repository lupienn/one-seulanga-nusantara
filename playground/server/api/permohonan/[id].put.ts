import { useDB } from '../../db/index'
import { permohonanKaryawan } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Hanya admin yang dapat mengelola permohonan.' })
  }

  const id = Number(event.context.params?.id)
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Permohonan tidak valid.' })
  }

  const body = await readBody(event)
  const status = body.status

  if (!['pending', 'disetujui', 'ditolak'].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Status tidak valid.' })
  }

  const db = useDB()

  await db
    .update(permohonanKaryawan)
    .set({ status })
    .where(eq(permohonanKaryawan.id, id))

  return { berhasil: true, pesan: `Permohonan #${id} telah di${status}.` }
})
