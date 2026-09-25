import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
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

  if (!user || user.role !== 'admin') {
    navigate('/')
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert('Please select an image')
      return
    }

    setLoading(true)

    const data = new FormData()

    data.append('name', formData.name)
    data.append('description', formData.description)
    data.append('price', formData.price)
    data.append('category', formData.category)
    data.append('stock', formData.stock)
    data.append('image', image)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      })

      const responseData = await res.json()

      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!')
        navigate('/admin-products')
      } else {
        alert(responseData.message || 'Error creating product')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong while creating the product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
            Product Management
          </p>

          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Add New Product
            <span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Add a new product to your ShopNest store.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-[12px] sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter product name"
                required
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                placeholder="Enter product description"
                required
                rows="5"
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* Price + Stock */}
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
                    name="price"
                    value={formData.price}
                    placeholder="0"
                    min="0"
                    required
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  placeholder="0"
                  min="0"
                  required
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                placeholder="e.g. Electronics, Fashion, Sports"
                required
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* Image Upload */}
            <div className="rounded-2xl border border-dashed border-orange-400/40 bg-orange-400/[0.03] p-5">

              <div className="mb-4">
                <h3 className="font-semibold text-white">
                  Product Image
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Upload an image that will be stored through Cloudinary.
                </p>
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center transition hover:border-orange-400/40 hover:bg-orange-400/[0.04]">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400/10 text-2xl">
                  📷
                </div>

                <p className="mt-3 text-sm font-semibold text-white">
                  {image
                    ? image.name
                    : 'Choose Product Image'}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG or JPEG
                </p>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    setImage(e.target.files[0])
                  }
                  className="hidden"
                />

              </label>

              {image && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-300">
                      {image.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="ml-4 shrink-0 text-sm font-semibold text-red-400 transition hover:text-red-300"
                  >
                    Remove
                  </button>

                </div>
              )}

            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate('/admin-dashboard')}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-gray-300 transition duration-300 hover:border-orange-400/30 hover:text-white sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:bg-orange-600 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:bg-gray-600 sm:flex-1"
              >
                {loading
                  ? 'Uploading & Creating...'
                  : 'Publish Product'}
              </button>

            </div>

          </form>

        </div>

      </div>
    </main>
  )
}

export default AddProduct
