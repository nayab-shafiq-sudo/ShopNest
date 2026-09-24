const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Hero Section */}
        <section className="rounded-2xl bg-[rgba(9,9,1,0.95)] px-6 py-20 text-center shadow-xl">
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Disclaimer
            <span className="text-orange-400">.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Please read the following information carefully before using
            the ShopNest website and services.
          </p>
        </section>

        {/* Disclaimer Cards */}
        <section className="grid gap-6 py-12 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">🛍️</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Product Information
            </h2>

            <p className="leading-7 text-gray-600">
              We make reasonable efforts to ensure that product names,
              descriptions, images, prices, and other information displayed
              on ShopNest are accurate. However, minor differences or
              errors may occasionally occur.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">💰</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Pricing Information
            </h2>

            <p className="leading-7 text-gray-600">
              Product prices and availability may change without prior
              notice. ShopNest reserves the right to correct pricing,
              availability, or product information errors when necessary.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">📦</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Orders & Availability
            </h2>

            <p className="leading-7 text-gray-600">
              Placing an order does not always guarantee product availability.
              Orders may be cancelled or modified if a product is unavailable,
              incorrectly listed, or affected by technical or inventory issues.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">🔗</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Third-Party Links
            </h2>

            <p className="leading-7 text-gray-600">
              ShopNest may contain links to third-party websites or services.
              We are not responsible for the content, privacy practices,
              availability, or policies of external websites.
            </p>
          </div>

        </section>

        {/* Website Usage */}
        <section className="mb-8 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Website Usage
          </h2>

          <p className="leading-7 text-gray-600">
            ShopNest is provided for general e-commerce and informational
            purposes. While we aim to keep the website available and
            functional, we do not guarantee that the website will always
            operate without interruptions, errors, or technical issues.
          </p>
        </section>

        {/* Limitation */}
        <section className="mb-8 rounded-2xl bg-[rgba(9,9,1,0.95)] p-8 text-white shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">
            Limitation of Liability
            <span className="text-orange-400">.</span>
          </h2>

          <p className="max-w-4xl leading-7 text-gray-300">
            To the extent permitted by applicable law, ShopNest will not be
            responsible for losses or damages resulting from the use of the
            website, temporary service interruptions, inaccurate information,
            third-party services, or circumstances beyond our reasonable
            control.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Changes to This Disclaimer
          </h2>

          <p className="leading-7 text-gray-600">
            ShopNest may update or modify this Disclaimer from time to time.
            Any changes will become effective when the updated version is
            published on this page.
          </p>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-orange-500 px-6 py-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white">
            Have Questions?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-orange-50">
            If you have any questions regarding this Disclaimer or our
            services, please contact the ShopNest support team.
          </p>

          <button className="mt-6 rounded-lg bg-white px-6 py-3 font-bold text-orange-500 transition hover:bg-gray-100">
            Contact Support
          </button>
        </section>

      </div>
    </main>
  )
}

export default Disclaimer