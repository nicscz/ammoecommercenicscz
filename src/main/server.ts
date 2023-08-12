import express from 'express'
const app = express()

const PORT = 5050

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:${PORT}!!! 🚀 `)
})
