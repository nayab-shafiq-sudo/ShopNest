const express = require('express')
const { protect } = require('../middleware/auth.middleware')
const { admin } = require('../middleware/admin.middleware')
const { getProducts, createProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const productRouter = express.Router()



productRouter.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProducts)
productRouter.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct)




module.exports = productRouter