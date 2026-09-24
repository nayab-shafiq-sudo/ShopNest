import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  })

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`)
      const data = await res.json()

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      })
    }

    fetchProduct()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()

    data.append('name', formData.name)
    data.append('description', formData.description)
    data.append('price', formData.price)
    data.append('category', formData.category)
    data.append('stock', formData.stock)

    if (image) data.append('image', image)

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    })

    setLoading(false)

    if (res.ok) {
      alert('Product updated successfully!')
      navigate('/admin-products')
    }
  }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:py-14">

      <div className="mx-auto max-w-2xl">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-black text-white sm:text-4xl">
            Edit Product<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your product information and inventory.
          </p>

        </div>

        {/* FORM CARD */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-[12px] sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* PRODUCT NAME */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/20"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Description
              </label>

              <textarea
                placeholder="Enter product description"
                required
                rows="5"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/20"
              />

            </div>

            {/* PRICE + STOCK */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-orange-400">
                    Rs.
                  </span>

                  <input
                    type="number"
                    placeholder="0"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/20"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="0"
                  required
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/20"
                />

              </div>

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Category
              </label>

              <input
                type="text"
                placeholder="e.g. Electronics"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/20"
              />

            </div>

            {/* IMAGE */}

            <div className="rounded-2xl border border-dashed border-orange-400/40 bg-orange-400/[0.03] p-5">

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-lg text-orange-400">
                  🖼️
                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    Replace Product Image
                  </p>

                  <p className="text-xs text-gray-500">
                    Optional — choose a new image
                  </p>

                </div>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:font-semibold file:text-white file:transition hover:file:bg-orange-600"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate('/admin-dashboard')}
                className="order-2 flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-gray-400 transition hover:border-orange-400/30 hover:bg-orange-400/10 hover:text-orange-400 sm:order-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="order-1 flex-1 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:shadow-none sm:order-2"
              >
                {loading ? 'Updating...' : 'Update Product'}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  )
}

export default EditProduct
