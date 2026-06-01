import { useDB } from '../../db/index'
import { permohonanKaryawan, users } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()

  let data
  if (userLogin.role === 'admin') {
    // Admin melihat semua permohonan dan info pengaju
    const result = await db
      .select({
        id: permohonanKaryawan.id,
        jenisOpsi: permohonanKaryawan.jenisOpsi,
        tanggalMulai: permohonanKaryawan.tanggalMulai,
        tanggalSelesai: permohonanKaryawan.tanggalSelesai,
        keterangan: permohonanKaryawan.keterangan,
        status: permohonanKaryawan.status,
        createdAt: permohonanKaryawan.createdAt,
        pengguna: {
          namaLengkap: users.namaLengkap,
          username: users.username,
        }
      })
      .from(permohonanKaryawan)
      .leftJoin(users, eq(permohonanKaryawan.userId, users.id))
      .orderBy(desc(permohonanKaryawan.id))
    
    data = result
  } else {
    // Karyawan hanya bisa melihat permohonan miliknya sendiri
    data = await db
      .select()
      .from(permohonanKaryawan)
      .where(eq(permohonanKaryawan.userId, userLogin.id))
      .orderBy(desc(permohonanKaryawan.id))
  }

  return { berhasil: true, data }
})
