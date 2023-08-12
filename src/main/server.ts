import app from './config/app'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}!!! 🚀 `)
})
