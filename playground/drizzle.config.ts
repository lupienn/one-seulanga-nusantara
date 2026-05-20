import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

// Load .env dari root project (satu level di atas playground)
dotenv.config({ path: '../.env' })

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: `mysql://${process.env.NUXT_DB_USERNAME || 'root'}:${process.env.NUXT_DB_PASSWORD || ''}@${process.env.NUXT_DB_HOST || '127.0.0.1'}:${process.env.NUXT_DB_PORT || 3306}/${process.env.NUXT_DB_DATABASE || 'one_seulanga_nusantara'}`,
  },
})
