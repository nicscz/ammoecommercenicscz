import { Pool, PoolConfig } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

export class DatabaseConnector {
  async configureConnection (): Promise<Pool> {
    if (!global.databaseConnection) {
      const poolConfig: PoolConfig = {
        user: process.env.DATABASE_USER || '',
        host: process.env.DATABASE_HOST || '',
        database: process.env.DATABASE_NAME || '',
        password: process.env.DATABASE_PASSWORD || '',
        port: Number(process.env.DATABASE_PORT) || 5432,
        max: Number(process.env.DATABASE_CONNECTION_LIMIT) || 10
      }

      global.databaseConnection = new Pool(poolConfig)
    }
    return global.databaseConnection
  }

  async generateConnection (): Promise<Pool> {
    return Promise.resolve(this.configureConnection())
  }
}
