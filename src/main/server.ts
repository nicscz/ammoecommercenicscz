import app from './config/app'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 🚀`)
})

// app.get('/posts', async (req: Request, res: Response) => {
//   console.log('Passei aqui')
//   const productController = makeProductController()
//   const result = productController.getProducts()
//   return res.json(result)
// })
