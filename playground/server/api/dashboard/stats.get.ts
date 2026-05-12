import { useDB } from '../../db/index'
import { users, suratMasuk, suratKeluar, permohonanKaryawan } from '../../db/schema'
import { sql, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userLogin = event.context.user
  if (!userLogin) {
    throw createError({ statusCode: 401, statusMessage: 'Tidak terautentikasi.' })
  }

  const db = useDB()

  if (userLogin.role === 'admin') {
    // Statistik untuk admin
    const [totalKaryawan] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users)
      .where(eq(users.role, 'karyawan'))

    const [totalSuratMasuk] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(suratMasuk)

    const [totalSuratKeluar] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(suratKeluar)

    const [totalPermohonan] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(permohonanKaryawan)

    return {
      berhasil: true,
      data: {
        totalKaryawan: totalKaryawan.count,
        totalSuratMasuk: totalSuratMasuk.count,
        totalSuratKeluar: totalSuratKeluar.count,
        totalPermohonan: totalPermohonan.count,
      },
    }
  }
  else {
    // Statistik untuk karyawan
    const [totalPermohonan] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(permohonanKaryawan)
      .where(eq(permohonanKaryawan.userId, userLogin.id))

    return {
      berhasil: true,
      data: {
        totalPermohonan: totalPermohonan.count,
      },
    }
  }
})
