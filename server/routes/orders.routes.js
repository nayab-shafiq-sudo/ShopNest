const express = require('express')
const { createOrder, getOrder, getOrderById, updateOrderStatus } = require('../controllers/orders.controllers')
const { protect } = require('../middleware/auth.middleware')
const { admin } = require('../middleware/admin.middleware')



const orderRouter = express.Router()



orderRouter.route('/').post(protect, createOrder).get(protect, admin, getOrder)
orderRouter.route('/myorders').get(protect, getOrderById)
orderRouter.route('/:id/status').put(protect, admin, updateOrderStatus)




module.exports = orderRouter