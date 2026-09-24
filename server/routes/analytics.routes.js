const express = require('express')
const { protect } = require('../middleware/auth.middleware')
const { admin } = require('../middleware/admin.middleware')
const { getAdminStats } = require('../controllers/analytics.controller')


const analyticsRouter = express.Router()



analyticsRouter.get('/', protect, admin, getAdminStats)




module.exports = analyticsRouter;