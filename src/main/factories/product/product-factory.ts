import { DbProductRepository } from '../../../data/usecases/add-product/db-product-repository'
import { ProductController } from '../../../presentation/controller/product'
import { makeProductValidationId } from './validation-id'
import { makeProductValidationName } from './validation-name'

export const makeProductController = (): ProductController => {
  const productRepository = new DbProductRepository()
  const productController = new ProductController(productRepository, makeProductValidationId(), makeProductValidationName())
  return productController
}
