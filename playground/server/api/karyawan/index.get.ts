import { useDB } from '../../db/index'
import { users } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa mengakses.' })
  }

  const db = useDB()
  const data = await db
    .select({
      id: users.id,
      username: users.username,
      namaLengkap: users.namaLengkap,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, 'karyawan'))
    .orderBy(desc(users.id))

  return { berhasil: true, data }
})
