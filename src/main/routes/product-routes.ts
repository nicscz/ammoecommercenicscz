import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeProductController } from '../factories/product/product-factory'

export default (router: Router): void => {
  router.post('/product', adaptRoute(makeProductController()))
}
