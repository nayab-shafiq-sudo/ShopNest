const express = require('express')
const { createOrder } = require('../controllers/orders.controllers')
const { verifyPayment } = require('../controllers/payment.controller')




const paymentRouter = express.Router()


paymentRouter.post('/order', createOrder)
paymentRouter.post('/verify', verifyPayment)




module.exports = paymentRouter