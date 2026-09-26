const crypto = require('crypto')
const Razorpay = require('razorpay')
require('dotenv').config()

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const amount = Number(req.body.amount)

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: 'Invalid payment amount',
      })
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'PKR',
      receipt: crypto.randomBytes(10).toString('hex'),
    }

    const order = await instance.orders.create(options)

    return res.status(200).json(order)
  } catch (error) {
    console.error('Razorpay create order error:', error)

    return res.status(500).json({
      message: 'Unable to create payment order',
    })
  }
}

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex')

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({
        message: 'Payment verified successfully',
      })
    }

    return res.status(400).json({
      message: 'Invalid signature sent!',
    })
  } catch (error) {
    console.error('Payment verification error:', error)

    return res.status(500).json({
      message: 'Payment verification failed',
    })
  }
}

module.exports = {
  createOrder,
  verifyPayment,
}