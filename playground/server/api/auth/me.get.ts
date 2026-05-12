import { eq } from 'drizzle-orm'
import { useDB } from '../../db/index'
import { users } from '../../db/schema'

export default defineEventHandler(async (event) => {
  // Payload sudah diisi oleh middleware auth
  const userLogin = event.context.user

  if (!userLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()
  const hasil = await db
    .select({
      id: users.id,
      namaLengkap: users.namaLengkap,
      username: users.username,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userLogin.id))
    .limit(1)

  const user = hasil[0]
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Pengguna tidak ditemukan.' })
  }

  return {
    berhasil: true,
    data: { pengguna: user },
  }
})
