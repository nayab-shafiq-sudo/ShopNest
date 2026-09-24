import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, addToCart } from '../redux/CartSlice'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }))
    }
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Shopping Cart<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Review your selected products before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-center backdrop-blur-[12px]">
            
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-400/10 text-4xl">
              🛒
            </div>

            <h2 className="text-2xl font-bold text-white">
              Your Cart is Empty
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              You haven't added any products to your cart yet.
            </p>

            <Link
              to="/"
              className="mt-6 rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* LEFT SIDE - CART ITEMS */}
            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur-[12px] transition duration-300 hover:border-orange-400/20 sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Product Image */}
                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">

                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xl font-bold text-orange-400">
                          Rs. {item.price}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                        {/* Quantity */}
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Quantity
                          </p>

                          <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-black/20">

                            <button
                              onClick={() =>
                                handleUpdateQty(item, item.qty - 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-xl font-semibold text-gray-300 transition hover:bg-orange-400/10 hover:text-orange-400"
                            >
                              −
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-white/10 text-sm font-bold text-white">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQty(item, item.qty + 1)
                              }
                              className="flex h-9 w-9 items-center justify-center text-xl font-semibold text-gray-300 transition hover:bg-orange-400/10 hover:text-orange-400"
                            >
                              +
                            </button>

                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Subtotal
                          </p>

                          <p className="mt-1 text-lg font-bold text-white">
                            Rs. {(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-sm font-semibold text-red-400 transition duration-300 hover:text-red-300"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* RIGHT SIDE - SUMMARY */}
            <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-white">
                Order Summary
              </h2>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Items
                </span>

                <span className="font-semibold text-white">
                  {cartItems.length}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Subtotal
                </span>

                <span className="font-semibold text-white">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Shipping
                </span>

                <span className="font-semibold text-green-400">
                  Free
                </span>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  Total
                </span>

                <span className="text-2xl font-black text-orange-400">
                  Rs. {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-7 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/20"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="mt-4 block text-center text-sm font-semibold text-gray-400 transition duration-300 hover:text-orange-400"
              >
                ← Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  )
}

export default Cart