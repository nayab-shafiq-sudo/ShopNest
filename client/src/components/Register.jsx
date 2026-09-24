import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Register = () => {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
  
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, email, password})
            });
            const data = await res.json()
            if (res.ok) {
                login(data)
                navigate('/')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }

    }

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-12 sm:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-[12px] sm:p-8">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              Create Account<span className="text-orange-400">.</span>
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Join ShopNest and start shopping today.
            </p>
          </div>

          
          {/* Form */}
          <form onSubmit={handelForm}  className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                name="name"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                placeholder="Create a password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
            </div>

            

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-orange-400 transition hover:text-orange-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Register