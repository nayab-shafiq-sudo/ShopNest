import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        const data = await res.json()

        if (res.ok) {
          setStats(data)
        } else {
          if (res.status === 401) {
            navigate('/login')
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchStats()
  }, [user, navigate])

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-orange-400/10 shadow-lg shadow-orange-500/10">
              <img
                src="/ShopNestLogo.png"
                alt="ShopNest Logo"
                className="h-9 w-9 object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                ShopNest
              </p>

              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Admin Dashboard
                <span className="text-orange-400">.</span>
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400 sm:text-base">
            Welcome back,{' '}
            <span className="font-semibold text-white">
              {user?.name}
            </span>
            . Here's what's happening with your store.
          </p>

        </div>

        {/* Stats */}
        {stats ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Orders */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] transition duration-300 hover:-translate-y-1 hover:border-orange-400/30">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-400">
                  Total Orders
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-xl">
                  🛒
                </div>
              </div>

              <p className="mt-5 text-4xl font-black text-orange-400">
                {stats.totalOrders}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Orders placed in your store
              </p>

            </div>

            {/* Products */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] transition duration-300 hover:-translate-y-1 hover:border-orange-400/30">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-400">
                  Total Products
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-xl">
                  📦
                </div>
              </div>

              <p className="mt-5 text-4xl font-black text-orange-400">
                {stats.totalProducts}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Products available in store
              </p>

            </div>

            {/* Users */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] transition duration-300 hover:-translate-y-1 hover:border-orange-400/30">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-400">
                  Total Users
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-xl">
                  👥
                </div>
              </div>

              <p className="mt-5 text-4xl font-black text-orange-400">
                {stats.totalUsers}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Registered customers
              </p>

            </div>

            {/* Revenue */}
            <div className="group rounded-2xl border border-orange-400/20 bg-orange-400/[0.04] p-6 shadow-xl shadow-orange-500/5 backdrop-blur-[12px] transition duration-300 hover:-translate-y-1 hover:border-orange-400/40">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-400">
                  Total Revenue
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-xl">
                  💰
                </div>
              </div>

              <p className="mt-5 text-3xl font-black text-orange-400 sm:text-4xl">
                Rs. {Number(stats.totalRevenue || 0).toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Total store revenue
              </p>

            </div>

          </div>
        ) : (

          /* Loading */
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-[12px]">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-orange-400" />

            <p className="mt-4 text-sm font-semibold text-orange-400">
              Loading metrics...
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Fetching your store statistics
            </p>

          </div>
        )}

        {/* Administrative Controls */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-[12px] sm:p-8">

          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Management
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Administrative Controls
              <span className="text-orange-400">.</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage your products, orders and customers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Add Product */}
            <button
              onClick={() => navigate('/admin-add-product')}
              className="group rounded-xl border border-orange-400/20 bg-orange-500/10 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-orange-500/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
                +
              </div>

              <h3 className="mt-4 font-bold text-white">
                Add Product
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Add a new product to your store.
              </p>
            </button>

            {/* Manage Products */}
            <button
              onClick={() => navigate('/admin-products')}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-orange-400/[0.06]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                📦
              </div>

              <h3 className="mt-4 font-bold text-white">
                Manage Products
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                View, edit or remove products.
              </p>
            </button>

            {/* Manage Orders */}
            <button
              onClick={() => navigate('/admin-orders')}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-orange-400/[0.06]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                🚚
              </div>

              <h3 className="mt-4 font-bold text-white">
                Manage Orders
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Check and update customer orders.
              </p>
            </button>

            {/* Users */}
            <button
              onClick={() => navigate('/admin-users')}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-orange-400/[0.06]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                👥
              </div>

              <h3 className="mt-4 font-bold text-white">
                Users Directory
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                View your registered customers.
              </p>
            </button>

          </div>
        </div>

      </div>
    </main>
  )
}

export default AdminDashboard
