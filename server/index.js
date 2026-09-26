const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/orders', require('./routes/orders.routes'))
app.use('/api/payment', require('./routes/payment.routes'))
app.use('/api/analytics', require('./routes/analytics.routes'))


if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../client/dist')
  const clientIndexPath = path.join(clientDistPath, 'index.html')

  if (fs.existsSync(clientIndexPath)) {
    app.use(express.static(clientDistPath))
    app.get(/(.*)/, (req, res) => {
      res.sendFile(clientIndexPath)
    })
  } else {
    app.get('/', (req, res) => {
      res.json({ message: 'ShopNest API is running. Frontend is served from a separate service.' })
    })
  }
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...')
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))