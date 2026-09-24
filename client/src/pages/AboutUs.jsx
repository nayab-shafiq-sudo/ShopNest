const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <section className="rounded-2xl bg-[rgba(9,9,1,0.95)] px-6 py-20 text-center shadow-xl">
          <h1 className="text-4xl font-black text-white md:text-5xl">
            About ShopNest
            <span className="text-orange-400">.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Your trusted destination for quality products, great prices,
            and a simple online shopping experience.
          </p>
        </section>

        {/* About */}
        <section className="grid gap-8 py-12 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Who We Are
            </h2>

            <p className="leading-7 text-gray-600">
              ShopNest is a modern e-commerce platform designed to make
              online shopping simple, convenient, and enjoyable. We bring
              a wide range of products together in one place so customers
              can easily discover and purchase what they need.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              What We Offer
            </h2>

            <p className="leading-7 text-gray-600">
              From electronics and fashion to home essentials and everyday
              accessories, ShopNest offers carefully selected products at
              competitive prices with a smooth shopping experience.
            </p>
          </div>

        </section>

        {/* Features */}
        <section className="pb-12">

          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Why ShopNest<span className="text-orange-400">?</span>
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-3xl">🛍️</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Wide Selection
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                Discover products across multiple categories.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-3xl">💰</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Great Prices
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                Quality products at competitive prices.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-3xl">🚚</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Easy Shopping
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                A simple and convenient shopping experience.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-3xl">🔒</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Secure Experience
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                We focus on providing a safe shopping environment.
              </p>
            </div>

          </div>
        </section>

        {/* Mission */}
        <section className="rounded-2xl bg-orange-500 px-6 py-14 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white">
            Our Mission
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-orange-50">
            Our mission is to create a reliable and enjoyable online
            shopping platform where customers can find quality products
            without unnecessary complexity.
          </p>
        </section>

      </div>
    </main>
  )
}

export default AboutUs