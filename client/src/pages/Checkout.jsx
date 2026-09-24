import { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { clearCart } from '../redux/CartSlice'

const Checkout = () => {
  const { user } = useContext(AuthContext)

  const cartItems = useSelector((state) => state.cart.cartItems)
  const [loading, setLoading] = useState(false)
  const bypassIdRef = useRef('bypass_txn_' + Date.now())

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [error, setError] = useState('')

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const orderItems = cartItems.map(item => ({
    productId: item._id,
    name: item.name,
    qty: item.qty,
    price: item.price,
  }))

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // ================= PAYMENT =================

  



  const handlePayment = async () => {
  try {
    const orderRes = await fetch('http://localhost:5000/api/payment/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice }),
    })
    const orderData = await orderRes.json()

    if (!orderRes.ok) {
      const fallback = window.confirm(
        'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?'
      )
      if (fallback) return bypassPayment()   // loading iske andar sambhalti hai

      setLoading(false)
      return alert('Payment failed to initialize')
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'ShopNest',
      description: 'Test Transaction',
      order_id: orderData.id,

      handler: async function (response) {
        try {
          const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          })

          if (!verifyRes.ok) {
            setLoading(false)
            return alert('Payment verification failed')
          }

          const saveOrderRes = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              items: orderItems,
              totalAmount: totalPrice,
              address: formData,
              paymentId: response.razorpay_payment_id,
            }),
          })

          if (saveOrderRes.ok) {
            dispatch(clearCart())
            navigate('/ordersuccess')      // response aate hi success page
          } else {
            setLoading(false)
            alert('Order saving failed')
          }
        } catch (error) {
          console.error('Payment verification/order error:', error)
          setLoading(false)
          alert('Something went wrong while processing your order')
        }
      },

      // user popup band kar de to button wapas enable ho jaye
      modal: { ondismiss: () => setLoading(false) },

      prefill: { name: formData.fullName, email: user?.email, contact: '9999999999' },
      theme: { color: '#f97316' },
    }

    new window.Razorpay(options).open()
  } catch (error) {
    console.error('Payment error:', error)
    setLoading(false)
    alert('Something went wrong while starting payment')
  }
}

const bypassPayment = async () => {
  try {
    const saveOrderRes = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: totalPrice,
        address: formData,
        paymentId: bypassIdRef.current,
      }),
    })

    if (saveOrderRes.ok) {
      dispatch(clearCart())
      navigate('/ordersuccess')
    } else {
      alert('Order saving failed')
      setLoading(false)
    }
  } catch (error) {
    console.error('Bypass payment error:', error)
    alert('Something went wrong while placing your order')
    setLoading(false)
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (loading) return

  setError('')

  if (!user) {
    alert('Please login first')
    navigate('/login')
    return
  }

  if (!formData.fullName || !formData.street || !formData.city || !formData.postalCode || !formData.country) {
    setError('Please fill in all shipping details.')
    return
  }

  setLoading(true)
  handlePayment()
}




  // ================= EMPTY CART =================

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090901] px-5">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-[12px]">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-400/10 text-4xl">
            🛒
          </div>

          <h1 className="text-2xl font-bold text-white">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Go Shopping
          </Link>

        </div>
      </main>
    )
  }

  // ================= CHECKOUT UI =================

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">

      <div className="mx-auto max-w-7xl">

        {/* HEADING */}

        <div className="mb-10">
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Checkout<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Enter your shipping details to complete your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT - SHIPPING FORM */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] sm:p-8">

            <h2 className="text-xl font-bold text-white">
              Shipping Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Where should we deliver your order?
            </p>

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* FULL NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* STREET */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Street Address
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="House no, street, area"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* CITY + POSTAL */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g. 74000"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>

              </div>

              {/* COUNTRY */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              {/* PAY NOW */}

              <button
                type="submit"
                className="mt-3 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/20"
              >
                Pay Now
              </button>

            </form>

          </div>

          {/* RIGHT - ORDER SUMMARY */}

          <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] lg:sticky lg:top-24">

            <h2 className="text-xl font-bold text-white">
              Order Summary
            </h2>

            <div className="my-6 h-px bg-white/10" />

            {/* PRODUCTS */}

            <div className="checkout-products max-h-80 space-y-4 overflow-y-auto pr-2">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-white">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.qty}
                      </p>

                    </div>

                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-300">
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            <div className="my-6 h-px bg-white/10" />

            {/* ORDER TOTAL */}

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-400">
                Order Total
              </span>

              <span className="font-semibold text-white">
                Rs. {totalPrice.toFixed(2)}
              </span>

            </div>

            {/* SHIPPING */}

            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm text-gray-400">
                Shipping
              </span>

              <span className="font-semibold text-green-400">
                Free
              </span>

            </div>

            <div className="my-6 h-px bg-white/10" />

            {/* TOTAL TO PAY */}

            <div className="flex items-center justify-between">

              <span className="text-lg font-bold text-white">
                Total to Pay
              </span>

              <span className="text-2xl font-black text-orange-400">
                Rs. {totalPrice.toFixed(2)}
              </span>

            </div>

            {/* BACK TO CART */}

            <Link
              to="/cart"
              className="mt-5 block text-center text-sm font-semibold text-gray-400 transition hover:text-orange-400"
            >
              ← Back to Cart
            </Link>

          </div>

        </div>
      </div>
    </main>
  )
}

export default Checkout


