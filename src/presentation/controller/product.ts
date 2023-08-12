import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, ok, serverError } from '../helpers/http/http-helper'
import { Validation } from '../protocols/validation'

export class ProductController {
  constructor (
    private readonly productRepository: any,
    private readonly validation: Validation
  ) {}

  async getProducts (page: number = 1, pageSize: number = 10): Promise<HttpResponse> {
    try {
      const skip = (page - 1) * pageSize
      const products = await this.productRepository.getProductsPaginated(skip, pageSize)
      const totalCount = await this.productRepository.getTotalProductCount()

      const totalPages = Math.ceil(totalCount / pageSize)

      const response = {
        products,
        currentPage: page,
        totalPages,
        totalProducts: totalCount
      }

      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }

  async getProductByName (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name } = httpRequest.body

      const result = await this.productRepository.getProductByName(name)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }

  async deleteProductById (httpRequest: HttpRequest): Promise<HttpRequest> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const result = await this.productRepository.deleteProductById(httpRequest.body.id)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export default ProductController
