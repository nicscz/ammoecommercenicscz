import { Pool, PoolConfig } from 'pg'

class DatabaseConnector {
  private static instance: DatabaseConnector
  private databaseConnection: Pool | null = null

  private constructor () {}

  static getInstance (): DatabaseConnector {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector()
    }
    return DatabaseConnector.instance
  }

  async configureConnection (): Promise<Pool> {
    if (!this.databaseConnection) {
      const poolConfig: PoolConfig = {
        user: process.env.DATABASE_USER || '',
        host: process.env.DATABASE_HOST || '',
        database: process.env.DATABASE_NAME || '',
        password: process.env.DATABASE_PASSWORD || '',
        port: Number(process.env.DATABASE_PORT) || 5432,
        max: Number(process.env.DATABASE_CONNECTION_LIMIT) || 10
      }

      this.databaseConnection = new Pool(poolConfig)
    }
    return this.databaseConnection
  }

  async generateConnection (): Promise<Pool> {
    return this.configureConnection()
  }
}

export default DatabaseConnector.getInstance()
