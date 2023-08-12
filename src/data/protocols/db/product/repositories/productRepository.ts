import { ProductList } from '../../../../../domain/models/product'
import { DatabaseConnector } from '../../../../../infra/database/postgres/postgres'
import { Pool } from 'pg'

export class ProductRepository {
  private readonly databaseConnector: DatabaseConnector

  constructor () {
    this.databaseConnector = new DatabaseConnector()
  }

  async getProducts (): Promise<ProductList> {
    const connection: Pool = await this.databaseConnector.generateConnection()

    const queryResult = await connection.query('SELECT * FROM products')
    const productList: ProductList = queryResult.rows

    return productList
  }
}
