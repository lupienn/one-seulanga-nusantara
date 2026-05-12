import { useDB } from '../../db/index'
import { suratMasuk } from '../../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const db = useDB()
  const data = await db
    .select()
    .from(suratMasuk)
    .orderBy(desc(suratMasuk.id))

  return { berhasil: true, data }
})
