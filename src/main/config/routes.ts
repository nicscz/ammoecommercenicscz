import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesDirectory = path.join(__dirname, '../routes')
  readdirSync(routesDirectory).map(async file => {
    if (!file.includes('.test.')) {
      const filePath = path.join(routesDirectory, file);
      (await import(filePath)).default(router)
    }
  })
}
