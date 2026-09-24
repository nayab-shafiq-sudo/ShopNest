import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {

  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const formHandle = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json()
      if (res.ok) {
        login(data)
        navigate('/')
      } else {
        alert(data.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#090901] px-5 py-12">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Login to your ShopNest account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formHandle} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-300">
                Password
              </label>

              <Link
                className="text-sm text-orange-400 transition hover:text-orange-300"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login