const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const {protect} = require('../middleware/auth.middleware')
const {admin} = require('../middleware/admin.middleware')

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/users', protect, admin, authController.getUsers)


module.exports = authRouter