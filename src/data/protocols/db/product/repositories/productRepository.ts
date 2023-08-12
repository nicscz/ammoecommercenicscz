import { ProductList, ProductModel } from '../../../../../domain/models/product'

export interface ProductRepository {
  getProductByName: (name: string) => Promise<ProductModel>
  getProductsPaginated: (skip: number, pageSize: number) => Promise<ProductList[]>
  getTotalProductCount: () => Promise<number>
  deleteProductById: (id: number) => Promise<void>
}
