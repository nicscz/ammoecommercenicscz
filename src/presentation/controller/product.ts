import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, ok, serverError } from '../helpers/http/http-helper'
import { Validation } from '../protocols/validation'

export class ProductController {
  constructor (
    readonly productRepository: any,
    private readonly validation: Validation) {}

  async getProducts (): Promise<HttpResponse> {
    try {
      const result = await this.productRepository.getProducts()

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }

  async getProductById (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.body

      const result = await this.productRepository.getProductById(id)

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export default ProductController
