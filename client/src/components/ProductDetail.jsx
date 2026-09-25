// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import { addToCart } from '../redux/CartSlice'

// const ProductDetail = () => {
//   const { id } = useParams()
//   const dispach = useDispatch()

//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')


//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true)
//         const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
//         const res = await fetch(`${API_URL}/api/products/${id}`)

//         if (!res.ok) {
//           throw new Error('Product not found')
//         }

//         const data = await res.json()
//         setProduct(data)
//       } catch (error) {
//         setError(error.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   const handleAddToCart = () => {
//     if (product) {
//         dispach(addToCart({
//             _id: product._id,
//             name: product.name,
//             price: product.price,
//             imageURL: product.imageURL,
//             qty: 1
//         }));
//         alert('Succesfully added to cart!')
//     }

//   }

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#090901]">
//         <p className="text-lg text-orange-400">Loading product...</p>
//       </main>
//     )
//   }

//   if (error || !product) {
//     return (
//       <main className="flex min-h-screen flex-col items-center justify-center bg-[#090901] px-5 text-center">
//         <h1 className="text-3xl font-bold text-white">
//           Product Not Found<span className="text-orange-400">.</span>
//         </h1>

//         <p className="mt-3 text-gray-400">
//           The product you're looking for does not exist.
//         </p>

//         <Link
//           to="/"
//           className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//         >
//           Back to Shop
//         </Link>
//       </main>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-[#090901] px-5 py-12 sm:px-8 md:px-12">
//       <div className="mx-auto max-w-7xl">

//         {/* Back */}
//         <Link
//           to="/"
//           className="mb-8 inline-block text-sm font-semibold text-gray-400 transition hover:text-orange-400"
//         >
//           ← Back to Shop
//         </Link>

//         {/* Product */}
//         <div className="grid gap-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-[12px] md:grid-cols-2 md:p-8">

//           {/* Image */}
//           <div className="overflow-hidden rounded-2xl bg-gray-100">
//             <img
//               src={product.imageURL}
//               alt={product.name}
//               className="h-full min-h-[350px] w-full object-cover transition duration-500 hover:scale-105"
//             />
//           </div>

//           {/* Details */}
//           <div className="flex flex-col justify-center">

//             {/* Category */}
//             <span className="w-fit rounded-full bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-400">
//               {product.category}
//             </span>

//             {/* Name */}
//             <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
//               {product.name}
//               <span className="text-orange-400">.</span>
//             </h1>

//             {/* Rating */}
//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-lg text-orange-400">
//                 ★
//               </span>

//               <span className="font-semibold text-white">
//                 {product.rating}
//               </span>

//               <span className="text-sm text-gray-500">
//                 ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <p className="mt-6 text-3xl font-bold text-orange-400">
//               Rs. {product.price}
//             </p>

//             {/* Description */}
//             <p className="mt-6 leading-7 text-gray-400">
//               {product.description}
//             </p>

//             {/* Stock */}
//             <div className="mt-6">
//               {product.stock > 0 ? (
//                 <p className="font-semibold text-green-400">
//                   ✓ In Stock ({product.stock} available)
//                 </p>
//               ) : (
//                 <p className="font-semibold text-red-400">
//                   ✕ Out of Stock
//                 </p>
//               )}
//             </div>

//             {/* Buttons */}
//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <button
//                 disabled={product.stock <= 0}
//                 onClick={handleAddToCart}
//                 className="flex-1 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
//               >
//                 Add to Cart
//               </button>

//               <button
//                 disabled={product.stock <= 0}
//                 className="flex-1 rounded-xl border border-orange-400 px-6 py-3 font-semibold text-orange-400 transition hover:bg-orange-400 hover:text-white disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600"
//               >
//                 Buy Now
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

// export default ProductDetail


import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../redux/CartSlice'
import { AuthContext } from '../context/AuthContext'

const ProductDetail = () => {
  const { id } = useParams()
  const dispach = useDispatch()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  console.log('CURRENT USER:', user)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        const API_URL =
          import.meta.env.VITE_API_URL || 'http://localhost:5000'

        const res = await fetch(`${API_URL}/api/products/${id}`)

        if (!res.ok) {
          throw new Error('Product not found')
        }

        const data = await res.json()
        setProduct(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    // User login nahi hai
    if (!user) {
      alert('Please login first')
      navigate('/login')
      return
    }

    // Product available hai
    if (product) {
      dispach(
        addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
          qty: 1,
        })
      )

      alert('Successfully added to cart!')
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090901]">
        <p className="text-lg text-orange-400">Loading product...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#090901] px-5 text-center">
        <h1 className="text-3xl font-bold text-white">
          Product Not Found<span className="text-orange-400">.</span>
        </h1>

        <p className="mt-3 text-gray-400">
          The product you're looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Shop
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-12 sm:px-8 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-block text-sm font-semibold text-gray-400 transition hover:text-orange-400"
        >
          ← Back to Shop
        </Link>

        {/* Product */}
        <div className="grid gap-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-[12px] md:grid-cols-2 md:p-8">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.imageURL}
              alt={product.name}
              className="h-full min-h-[350px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <span className="w-fit rounded-full bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-400">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              {product.name}
              <span className="text-orange-400">.</span>
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-lg text-orange-400">
                ★
              </span>

              <span className="font-semibold text-white">
                {product.rating}
              </span>

              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold text-orange-400">
              Rs. {product.price}
            </p>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-400">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="font-semibold text-green-400">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="font-semibold text-red-400">
                  ✕ Out of Stock
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="flex-1 cursor-pointer rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                Add to Cart
              </button>

              <button
                disabled={product.stock <= 0}
                className="flex-1 rounded-xl border border-orange-400 px-6 py-3 font-semibold text-orange-400 transition hover:bg-orange-400 hover:text-white disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail