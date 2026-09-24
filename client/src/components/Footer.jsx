import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[rgba(9,9,1,0.95)] px-5 py-8 text-gray-300 sm:px-8 md:px-12 md:py-10">

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 text-center md:flex-row md:items-center md:justify-between md:text-left">

        {/* App Name */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white transition hover:text-orange-400 sm:text-3xl"
          >
            ShopNest<span className="text-orange-400">.</span>
          </Link>

          <p className="mt-2 text-sm text-gray-400">
            Premium E-Commerce Platform.
          </p>
        </div>

        {/* Policies */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold sm:gap-x-7">
          <Link
            to="/aboutus"
            className="transition duration-300 hover:text-orange-400"
          >
            About Us
          </Link>

          <Link
            to="/returnpolicy"
            className="transition duration-300 hover:text-orange-400"
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            className="transition duration-300 hover:text-orange-400"
          >
            Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 sm:text-sm">
          © 2026 ShopNest. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer