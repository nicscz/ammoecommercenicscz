import { Request, Response, Router } from 'express'
import { makeProductController } from '../factories/product/product-factory'
import { HttpResponse } from '../../presentation/protocols/http'

function applyResult (result: HttpResponse, res: Response, successStatusCode: number): void {
  if (result.statusCode === 500 || result.statusCode === 400) {
    if (result.statusCode === 500) {
      res.status(500)
    } else {
      res.status(400)
    }
    res.send(result)
  } else if (result.body === undefined) {
    res.status(204)
    res.send([])
  } else {
    res.status(successStatusCode)
    res.send(result)
  }
} // Certifique-se de importar as classes corretas

export default (router: Router): void => {
  router.get('/products', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const productController = makeProductController()
    const result = await productController.getProducts(page, pageSize)
    applyResult(result, res, result.statusCode)
  })
}
