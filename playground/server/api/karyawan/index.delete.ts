import { useDB } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa menghapus karyawan.' })
  }

  const body = await readBody(event)
  const id = Number(body.id)
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID karyawan tidak valid.' })
  }

  // Tidak boleh menghapus diri sendiri
  if (id === userLogin.id) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak dapat menghapus akun Anda sendiri.' })
  }

  const db = useDB()

  await db
    .delete(users)
    .where(eq(users.id, id))

  return { berhasil: true, pesan: 'Karyawan berhasil dihapus.' }
})
