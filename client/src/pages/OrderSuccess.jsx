import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090901] px-5 py-10 sm:px-8">

      <div className="w-full max-w-2xl">

        {/* SUCCESS CARD */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-[12px] sm:p-12">

          {/* SUCCESS ICON */}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-green-400/20 bg-green-400/10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-lg shadow-green-500/20">
              ✓
            </div>
          </div>

          {/* TITLE */}

          <h1 className="mt-8 text-3xl font-black text-white sm:text-4xl">
            Order Placed Successfully<span className="text-orange-400">!</span>
          </h1>

          {/* MESSAGE */}

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
            Thank you for your purchase. Your order has been successfully
            placed and is now being processed.
          </p>

          {/* ORDER INFO */}

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/20 p-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-gray-500">
                Order Status
              </span>

              <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">
                Confirmed
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Payment
              </span>

              <span className="text-sm font-semibold text-white">
                Successful
              </span>
            </div>

          </div>

          {/* MESSAGE */}

          <div className="mt-6 rounded-xl border border-orange-400/10 bg-orange-400/5 px-5 py-4">
            <p className="text-sm text-gray-400">
              📦 Your order will be processed shortly. You can check your
              orders anytime from your account.
            </p>
          </div>

          {/* BUTTONS */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/profile"
              className="rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/20"
            >
              View My Orders
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-gray-300 transition duration-300 hover:border-orange-400/30 hover:bg-orange-400/10 hover:text-orange-400"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

        {/* FOOTER TEXT */}

        <p className="mt-6 text-center text-xs text-gray-600">
          Thank you for shopping with ShopNest.
        </p>

      </div>

    </main>
  )
}

export default OrderSuccess