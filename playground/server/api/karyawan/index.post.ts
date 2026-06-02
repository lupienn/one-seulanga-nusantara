import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { useDB } from '../../db/index'
import { users } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin || userLogin.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak. Hanya admin yang bisa menambah karyawan.' })
  }

  const body = await readBody(event)

  if (!body?.namaLengkap || !body?.username || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nama Lengkap, Username, dan Password wajib diisi.',
    })
  }

  if (body.password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password minimal 6 karakter.',
    })
  }

  const db = useDB()

  // Cek apakah username sudah dipakai
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, body.username))
    .limit(1)

  if (existing.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Username sudah digunakan. Silakan pilih username lain.',
    })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(body.password, 10)

  await db.insert(users).values({
    namaLengkap: body.namaLengkap,
    username: body.username,
    password: hashedPassword,
    role: 'karyawan',
  })

  return {
    berhasil: true,
    pesan: 'Karyawan baru berhasil ditambahkan.',
  }
})
