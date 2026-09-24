import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const Home = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products')
        const data = await res.json()
        setProducts(data.allProducts.slice(0,12))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct();
  },[])


  return (
    <main className="min-h-screen bg-gray-100 px-5 py-8">

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,#f9731633,#0000_60%),linear-gradient(135deg,#18181b,#09090b)] px-5 py-24 text-center shadow-xl backdrop-blur-[12px]">

          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Welcome to ShopNest
            <span className="text-orange-400">.</span>
          </h1>

          <p className="max-w-2xl text-lg font-medium text-gray-300 md:text-xl">
            Discover the best products at unbeatable prices.
          </p>

          <button className="mt-3 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600">
            Shop Now
          </button>

        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-7xl py-12">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>

            <p className="mt-1 text-gray-500">
              Explore our popular products
            </p>
          </div>
        </div>
        {loading ? 
          <>Loading...</>
        :
        <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product)=>{
            return <ProductCard key={product._id} product={product} />
          })}
        </div>
        }
      </section>

    </main>
  )
}

export default Home