import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const AdminProducts = () => {
  const { user } = useContext(AuthContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()

        setProducts(Array.isArray(data.allProducts) ? data.allProducts : [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this product?'
      )
    ) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        if (res.ok) {
          setProducts(
            products.filter((product) => product._id !== id)
          )
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Product Management
            </p>

            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Manage Products
              <span className="text-orange-400">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              View, edit and remove products from your store.
            </p>
          </div>

          <Link
            to="/admin-add-product"
            className="inline-flex w-fit items-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600"
          >
            + Add Product
          </Link>

        </div>

        {/* Products Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-[12px]">

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">

            <div>
              <h2 className="font-bold text-white">
                All Products
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {products.length} product
                {products.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <span className="rounded-full bg-orange-400/10 px-3 py-1.5 text-xs font-bold text-orange-400">
              Admin Panel
            </span>

          </div>

          {/* Loading */}
          {loading ? (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-orange-400" />

              <p className="mt-4 text-sm text-gray-400">
                Loading products...
              </p>

            </div>
          ) : products.length === 0 ? (

            /* Empty State */
            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10 text-3xl">
                📦
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                No Products Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Start by adding your first product.
              </p>

              <Link
                to="/admin/add-product"
                className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                + Add Product
              </Link>

            </div>
          ) : (

            /* Products Table */
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px] border-collapse">

                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr
                      key={product._id}
                      className="border-b border-white/5 transition duration-200 hover:bg-orange-400/[0.03]"
                    >

                      {/* ID */}
                      <td className="px-5 py-5">

                        <span className="rounded-lg bg-white/5 px-3 py-2 font-mono text-xs text-gray-400">
                          {product._id.substring(0, 8)}...
                        </span>

                      </td>

                      {/* Product */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/10">

                            {product.imageURL ? (
                              <img
                                src={product.imageURL}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xl">
                                📦
                              </div>
                            )}

                          </div>

                          <div className="min-w-0">

                            <p className="max-w-[220px] truncate font-semibold text-white">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Product
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Price */}
                      <td className="px-5 py-5">

                        <span className="font-bold text-orange-400">
                          Rs. {Number(product.price || 0).toFixed(2)}
                        </span>

                      </td>

                      {/* Category */}
                      <td className="px-5 py-5">

                        <span className="rounded-full bg-orange-400/10 px-3 py-1.5 text-xs font-semibold text-orange-400">
                          {product.category}
                        </span>

                      </td>

                      {/* Stock */}
                      <td className="px-5 py-5">

                        <span
                          className={`font-semibold ${
                            product.stock > 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {product.stock}
                        </span>

                        <span className="ml-1 text-xs text-gray-500">
                          units
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <Link
                            to={`/admin-edit-products/${product._id}`}
                            className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                          >
                            Delete
                          </button>

                        </div>

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

export default AdminProducts
