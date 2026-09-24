const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')


const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments({role: 'user'})
        const totalOrders = await orderModel.countDocuments({})
        const totalProducts = await productModel.countDocuments({})

        const orders = await orderModel.find({})
        const totalRevenueData = orders.reduce((acc, order)=> acc + order.totalAmount, 0)

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenueData
        })
    } catch (error) {
        res.status(500).json({message: 'Errro fetching stats'})
    }
}


module.exports = {getAdminStats}