import { useDB } from '../../db/index'
import { suratKeluar } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa menghapus surat.' })
  }

  const body = await readBody(event)
  const id = Number(body.id)
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID surat tidak valid.' })
  }

  const db = useDB()

  await db
    .delete(suratKeluar)
    .where(eq(suratKeluar.id, id))

  return { berhasil: true, pesan: 'Surat keluar berhasil dihapus.' }
})
