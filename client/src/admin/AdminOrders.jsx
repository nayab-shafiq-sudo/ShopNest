import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AdminOrders = () => {
  const { user } = useContext(AuthContext)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        const data = await res.json()

        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  // const updateStatus = async (id, status) => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ status }),
  //     })

  //     if (res.ok) {
  //       setOrders(
  //         orders.map((order) =>
  //           order._id === id
  //             ? { ...order, status }
  //             : order
  //         )
  //       )
  //     }
  //   } catch (error) {
  //     console.error('Error updating order status:', error)
  //   }
  // }

  const updateStatus = async (id, status) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const res = await fetch(
      `${API_URL}/api/orders/${id}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      }
    )

    const data = await res.json()

    console.log('Status update:', res.status, data)

    if (!res.ok) {
      console.error('Status update failed:', data)
      return
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id
          ? { ...order, status: status }
          : order
      )
    )
  } catch (error) {
    console.error('Error updating order status:', error)
  }
}

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
            Management
          </p>

          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Manage Orders
            <span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            View customer orders and update their delivery status.
          </p>
        </div>

        {/* Orders Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-[12px]">

          {/* Top bar */}
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <h2 className="font-bold text-white">
                All Orders
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {orders.length} order{orders.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="rounded-full bg-orange-400/10 px-3 py-1.5 text-xs font-bold text-orange-400">
              Admin Panel
            </div>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-orange-400" />

              <p className="mt-4 text-sm text-gray-400">
                Loading orders...
              </p>

            </div>
          ) : orders.length === 0 ? (

            /* Empty State */
            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10 text-3xl">
                📦
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                No Orders Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                There are currently no customer orders.
              </p>

            </div>
          ) : (

            /* Table */
            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px] border-collapse">

                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Order ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b border-white/5 transition duration-200 hover:bg-orange-400/[0.03]"
                    >

                      {/* Order ID */}
                      <td className="px-5 py-5">

                        <span className="rounded-lg bg-white/5 px-3 py-2 font-mono text-xs text-gray-300">
                          {order._id.substring(0, 8)}...
                        </span>

                      </td>

                      {/* User */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400/10 text-sm font-bold text-orange-400">
                            {order.user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || 'U'}
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {order.user?.name || 'Deleted User'}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Total */}
                      <td className="px-5 py-5">

                        <span className="font-bold text-orange-400">
                          Rs. {Number(order.totalAmount || 0).toFixed(2)}
                        </span>

                      </td>

                      {/* Date */}
                      <td className="px-5 py-5">

                        <span className="text-sm text-gray-400">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className={`cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold outline-none transition ${
                            order.status === 'delivered'
                              ? 'border-green-500/20 bg-green-500/10 text-green-400'
                              : order.status === 'shipped'
                                ? 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                                : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                          }`}
                        >
                          <option
                            value="pending"
                            className="bg-[#09090b] text-yellow-400"
                          >
                            Pending
                          </option>

                          <option
                            value="shipped"
                            className="bg-[#09090b] text-blue-400"
                          >
                            Shipped
                          </option>

                          <option
                            value="delivered"
                            className="bg-[#09090b] text-green-400"
                          >
                            Delivered
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  )
}

export default AdminOrders
