import knex from 'knex'
import { Model } from 'objection'
import dotenv from 'dotenv'

dotenv.config()

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  }
})

// Bind all models to the database connection
Model.knex(db)

export default db 