import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchMyOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const res = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        const data = await res.json()

        if (res.ok) {
          setOrders(Array.isArray(data.userOrders) ? data.userOrders : [])
        } else {
          if (res.status === 401) {
            logout()
            navigate('/login')
          }

          setOrders([])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyOrders()
  }, [user, navigate, logout])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            My Profile<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your account and view your order history.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-[12px]">

          {/* Profile Header */}
          <div className="flex flex-col gap-6 border-b border-white/10 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-500 text-2xl font-black text-white shadow-lg shadow-orange-500/20">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {user.email}
                </p>

                <span className="mt-3 inline-block rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-400">
                  {user.role} Account
                </span>
              </div>

            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition duration-300 hover:bg-red-500 hover:text-white sm:w-auto"
            >
              Logout
            </button>

          </div>

          {/* Order History */}
          <div className="p-6 sm:p-8">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Order History<span className="text-orange-400">.</span>
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your recent orders and their status.
                </p>
              </div>

              {orders.length > 0 && (
                <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-400">
                  {orders.length} Orders
                </span>
              )}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-10 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-orange-400" />

                <p className="mt-4 text-sm text-gray-400">
                  Fetching your orders...
                </p>
              </div>
            ) : orders.length === 0 ? (

              /* Empty Orders */
              <div className="rounded-2xl border border-white/10 bg-[#09090b] px-6 py-12 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10 text-3xl">
                  🛍️
                </div>

                <h4 className="mt-5 text-xl font-bold text-white">
                  No Orders Yet
                </h4>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
                  You haven't placed any orders yet. Explore our products and
                  start shopping today.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
                >
                  Start Shopping
                </Link>

              </div>

            ) : (

              /* Orders */
              <div className="space-y-4">

                {orders.map((order) => (

                  <div
                    key={order._id}
                    className="rounded-2xl border border-white/10 bg-[#09090b] p-5 transition duration-300 hover:border-orange-400/20 hover:bg-white/[0.03] sm:p-6"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Order Information */}
                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Product
                          </span>

                          <span className="max-w-full truncate text-sm font-semibold text-white">
                            {order.items?.map((item)=> item.productId.name).filter(Boolean).join(', ')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Order ID
                          </span>

                          <span className="max-w-full truncate text-sm font-semibold text-white">
                            {order._id}
                          </span>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">

                          <div>
                            <p className="text-xs text-gray-500">
                              Placed On
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-300">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Total Amount
                            </p>

                            <p className="mt-1 text-lg font-bold text-orange-400">
                              Rs. {order.totalAmount.toFixed(2)}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Status */}
                      <div className="shrink-0">

                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${
                            order.status === 'delivered'
                              ? 'bg-green-500/10 text-green-400'
                              : order.status === 'shipped'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-yellow-500/10 text-yellow-400'
                          }`}
                        >
                          {order.status}
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  )
}

export default Profile

