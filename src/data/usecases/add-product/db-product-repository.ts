import { ProductList, ProductModel } from '../../../domain/models/product'
import { DatabaseConnector } from '../../../infra/database/postgres/postgres'
import { Pool } from 'pg'
import { ProductRepository } from './db-product-protocols'

export class DbProductRepository implements ProductRepository {
  private readonly databaseConnector: DatabaseConnector

  constructor () {
    this.databaseConnector = new DatabaseConnector()
  }

  async getProductByName (name: string): Promise<ProductModel> {
    const connection: Pool = await this.databaseConnector.generateConnection()

    const queryResult = await connection.query(`
      select 
          id, 
          nome, 
          descricao, 
          preco_promocional, 
          preco_original, 
          imagens, 
          categoria, 
          created_at 
      from products
      where nome = $1 
    `, [name])
    const productList: ProductList = queryResult.rows

    return productList
  }

  async getProductsPaginated (skip: number, pageSize: number): Promise<ProductList[]> {
    const connection: Pool = await this.databaseConnector.generateConnection()

    const result = await connection.query(`
        SELECT * FROM products
        ORDER BY id
        LIMIT $1 OFFSET $2;
    `, [pageSize, skip])

    return result.rows
  }

  async getTotalProductCount (): Promise<number> {
    const connection: Pool = await this.databaseConnector.generateConnection()

    const result = await connection.query(`
        SELECT COUNT(*) as total_count FROM products;
    `)

    return result.rows[0].total_count
  }

  async deleteProductById (id: number): Promise<boolean> {
    const connection: Pool = await this.databaseConnector.generateConnection()

    const result = await connection.query(
        `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    )

    return result.rowCount > 0
  }
}
