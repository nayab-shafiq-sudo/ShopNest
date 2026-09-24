import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {

  

  return (
    <div className="w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-100">
        <img
          src={product.imageURL}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="p-4">

        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-500">
            {product.category}
          </span>

          <span className="text-sm font-semibold text-gray-600">
            ⭐ {product.rating}
          </span>
        </div>

        <h2 className="mb-1 text-lg font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="mb-4 text-sm leading-5 text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            Rs. {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ProductCard