import { DbProductRepository } from '../../../data/usecases/add-product/db-product-repository'
import { ProductController } from '../../../presentation/controller/product'
import { makeProductValidation } from './product-validation-factory'

export const makeProductController = (): ProductController => {
  const productRepository = new DbProductRepository()
  const productController = new ProductController(productRepository, makeProductValidation())
  return productController
}
