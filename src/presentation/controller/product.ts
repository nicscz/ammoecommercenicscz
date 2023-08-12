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
}

export default ProductController
