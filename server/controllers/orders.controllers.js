const orderModel = require('../models/order.model')
const sendEmail = require('../utils/sendEmail')

const formatOrderItems = (items = []) => {
    if (!items.length) return 'No products selected.'

    return items.map((item, index) => {
        const productName = item.name || `Product ${index + 1}`
        const quantity = item.qty || 1
        const price = Number(item.price || 0)
        return `- ${productName} x${quantity} - $${price.toFixed(2)}`
    }).join('\n')
}

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body

        if (!items || !totalAmount || !address || !paymentId) {
            return res.status(400).json({
                message: 'invalid order data'
            })
        }

        const order = await orderModel.create({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        })

        const formattedAddress = `${address.fullName}\n${address.street}, ${address.city}\n${address.postalCode}, ${address.country}`

        const message = `Hello ${req.user.name},

Thank you for shopping with ShopNest!

Your order has been created successfully.

Order Details:
${formatOrderItems(items)}
Total Amount: $${Number(totalAmount).toFixed(2)}
Payment ID: ${paymentId}

Shipping Address:
${formattedAddress}

Your order is now being processed. We will keep you updated about your order status.

Thank you for choosing ShopNest!

Best Regards,
ShopNest Team`

        // Email should not block order creation
        sendEmail(req.user.email, 'Order Created - ShopNest', message)
            .catch((error) => {
                console.error('Order email failed:', error)
            })

        return res.status(201).json({
            message: 'order created succesfully',
            order
        })

    } catch (error) {
        console.error('Error creating order:', error)

        return res.status(500).json({
            message: 'Error creating order'
        })
    }
}
const getOrderById = async (req, res) => {
    try {
        const userOrders = await orderModel.find({user: req.user._id}).populate('items.productId', 'name price')
        if (userOrders.length === 0) {
            res.status(404).json({message: 'orders not found'})
            return
        }
        res.json({userOrders})
    } catch (error) {
        res.status(500).json({message: 'errors fetching orders'})
    }
}

const getOrder = async (req, res) => {
    try {
        const getAllOrders = await orderModel.find({}).populate('user', 'id name')
        res.json(getAllOrders)
    } catch (error) {
        res.status(500).json({message:'Error fetching orders'})
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const validStatus = ['pending', 'shipped', 'delivered']
        if (!status || !validStatus.includes(status)){
            return res.status(400).json({ message: 'Invalid status value' })
        }

        const order = await orderModel.findById(req.params.id)
        if (!order) {
            res.status(404).json({message: 'order not found'})
            return
        }
        order.status = status
        await order.save()
        res.json({message: 'order updated succesfully'})

    } catch (error) {
        res.status(500).json({message:'Error updating order status'})   
    }
}


module.exports = { createOrder, getOrder, getOrderById, updateOrderStatus }