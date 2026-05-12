import { useDB } from '../../db/index'
import { permohonanKaryawan } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()

  // Karyawan hanya bisa melihat permohonan miliknya sendiri
  const data = await db
    .select()
    .from(permohonanKaryawan)
    .where(eq(permohonanKaryawan.userId, userLogin.id))
    .orderBy(desc(permohonanKaryawan.id))

  return { berhasil: true, data }
})
