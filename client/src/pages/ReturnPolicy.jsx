const ReturnPolicy = () => {
  return (
    <main className="min-h-screen bg-gray-100 px-5 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <section className="rounded-2xl bg-[rgba(9,9,1,0.95)] px-6 py-20 text-center shadow-xl">
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Return Policy
            <span className="text-orange-400">.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            We want you to shop with confidence. Here's everything you need
            to know about returns and refunds at ShopNest.
          </p>
        </section>

        {/* Policy Sections */}
        <section className="grid gap-6 py-12 md:grid-cols-2">

          {/* Eligibility */}
          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">📦</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Return Eligibility
            </h2>

            <p className="mb-4 leading-7 text-gray-600">
              Products may be eligible for return if they are damaged,
              defective, incorrect, or significantly different from their
              description.
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Product is damaged or defective.</li>
              <li>✓ Wrong product was delivered.</li>
              <li>✓ Product differs significantly from its description.</li>
              <li>✓ Product is unused and in original condition.</li>
            </ul>
          </div>

          {/* Return Period */}
          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">📅</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Return Period
            </h2>

            <p className="leading-7 text-gray-600">
              Return requests should be submitted within
              <span className="font-bold text-orange-500"> 7 days </span>
              of receiving your order. Requests submitted after this period
              may not be accepted.
            </p>
          </div>

          {/* Product Condition */}
          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">✨</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Product Condition
            </h2>

            <p className="mb-4 leading-7 text-gray-600">
              Returned products should be in their original condition.
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Product should be unused.</li>
              <li>✓ Original packaging should be included.</li>
              <li>✓ Accessories and tags should be included.</li>
              <li>✓ Product should not be damaged due to misuse.</li>
            </ul>
          </div>

          {/* Non Returnable */}
          <div className="rounded-2xl bg-white p-7 shadow-md">
            <div className="mb-4 text-3xl">🚫</div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Non-Returnable Items
            </h2>

            <ul className="space-y-2 text-sm leading-6 text-gray-600">
              <li>• Used or misused products.</li>
              <li>• Personalized or customized products.</li>
              <li>• Items marked as non-returnable.</li>
              <li>• Products without required accessories or packaging.</li>
            </ul>
          </div>

        </section>

        {/* How to Return */}
        <section className="mb-8 rounded-2xl bg-white p-8 shadow-md">

          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            How to Request a Return
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div>
              <span className="text-3xl font-black text-orange-400">01</span>
              <h3 className="mt-2 font-bold text-gray-900">
                Contact Us
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Contact our support team with your order details.
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-orange-400">02</span>
              <h3 className="mt-2 font-bold text-gray-900">
                Share Details
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Tell us the reason for your return and provide photos
                if required.
              </p>
            </div>

            <div>
              <span className="text-3xl font-black text-orange-400">03</span>
              <h3 className="mt-2 font-bold text-gray-900">
                Return Product
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Follow the instructions provided by our support team.
              </p>
            </div>

          </div>
        </section>

        {/* Refund */}
        <section className="mb-8 rounded-2xl bg-[rgba(9,9,1,0.95)] p-8 text-white shadow-xl">

          <h2 className="mb-4 text-2xl font-bold">
            Refunds<span className="text-orange-400">.</span>
          </h2>

          <p className="max-w-3xl leading-7 text-gray-300">
            Once the returned product has been received and inspected,
            we will review your request. If your return is approved,
            the refund will be processed using the applicable payment
            method. Processing time may vary depending on your payment
            provider.
          </p>

        </section>

        {/* Contact */}
        <section className="rounded-2xl bg-orange-500 px-6 py-12 text-center shadow-lg">

          <h2 className="text-3xl font-bold text-white">
            Need Help?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-orange-50">
            If you have any questions about returns or refunds,
            our support team is here to help.
          </p>

          <button className="mt-6 rounded-lg bg-white px-6 py-3 font-bold text-orange-500 transition hover:bg-gray-100">
            Contact Support
          </button>

        </section>

      </div>
    </main>
  )
}

export default ReturnPolicy