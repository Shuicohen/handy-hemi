import { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
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
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './src/seeds',
      extension: 'ts'
    }
  }
}

export default config 