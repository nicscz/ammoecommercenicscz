import { ProductList, ProductModel } from '../../../domain/models/product'
import { DatabaseConnector } from '../../../infra/database/postgres/postgres'
import { Pool } from 'pg'
import { ProductRepository } from './db-product-protocols'
import { getAsync, setAsync } from '../../../infra/database/redis'

export class DbProductRepository implements ProductRepository {
  private readonly databaseConnector: DatabaseConnector

  constructor () {
    this.databaseConnector = new DatabaseConnector()
  }

  async getProductByName (name: string): Promise<ProductModel> {
    const cachedProduct = await getAsync(`product:${name}`)
    if (cachedProduct) {
      return JSON.parse(cachedProduct)
    }

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

    await setAsync(`product:${name}`, JSON.stringify(productList), 'EX', 3600)

    return productList
  }

  async getProductsPaginated (skip: number, pageSize: number): Promise<ProductList[]> {
    const cacheKey = `productsPaginated:${skip}:${pageSize}`
    const cachedProducts = await getAsync(cacheKey)

    if (cachedProducts) {
      return JSON.parse(cachedProducts)
    }

    const connection: Pool = await this.databaseConnector.generateConnection()
    const result = await connection.query(`
    SELECT * FROM products
    ORDER BY id
    LIMIT $1 OFFSET $2;
`, [pageSize, skip])

    const productList: ProductList[] = result.rows

    await setAsync(cacheKey, JSON.stringify(productList), 'EX', 3600)

    return productList
  }

  async getTotalProductCount (): Promise<number> {
    const cacheKey = 'totalProductCount'
    const cachedCount = await getAsync(cacheKey)

    if (cachedCount !== null) {
      return parseInt(cachedCount, 10)
    }

    const connection: Pool = await this.databaseConnector.generateConnection()
    const result = await connection.query(`
    SELECT COUNT(*) as total_count FROM products;
`)

    const totalCount: number = result.rows[0].total_count

    await setAsync(cacheKey, totalCount.toString(), 'EX', 3600)

    return totalCount
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
