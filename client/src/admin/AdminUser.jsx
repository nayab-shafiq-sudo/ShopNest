import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AdminUsers = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const res = await fetch(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      const data = await res.json()
      setUsers(Array.isArray(data.users) ? data.users : [])
      console.log('Users:', data.users)
    }

    fetchUsers()
  }, [user])

  return (
    <main className="min-h-screen bg-[#090901] px-5 py-10 sm:px-8 md:px-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-black text-white sm:text-4xl">
            User Directory<span className="text-orange-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and view all registered users.
          </p>
        </div>

        {/* TABLE CARD */}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-[12px]">

          {/* TABLE HEADER */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-white">
                Registered Users
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {users.length} {users.length === 1 ? 'user' : 'users'} found
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
              👥
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px] border-collapse">

              <thead>
                <tr className="border-b border-white/10 bg-black/20">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Joined
                  </th>

                </tr>
              </thead>

              <tbody>

                {users.map((u) => (

                  <tr
                    key={u._id}
                    className="border-b border-white/5 transition duration-200 hover:bg-orange-400/[0.03]"
                  >

                    {/* ID */}

                    <td className="px-6 py-5 text-sm font-mono text-gray-500">
                      {u._id.substring(0, 8)}...
                    </td>

                    {/* NAME */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-sm font-bold text-orange-400">
                          {u.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <span className="font-semibold text-white">
                          {u.name}
                        </span>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5 text-sm text-gray-400">
                      {u.email}
                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                          u.role === 'admin'
                            ? 'border border-orange-400/20 bg-orange-400/10 text-orange-400'
                            : 'border border-green-400/20 bg-green-400/10 text-green-400'
                        }`}
                      >
                        {u.role.toUpperCase()}
                      </span>

                    </td>

                    {/* JOINED */}

                    <td className="px-6 py-5 text-sm text-gray-400">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>

                  </tr>

                ))}

                {/* EMPTY STATE */}

                {users.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="px-6 py-16 text-center"
                    >

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/10 text-2xl">
                        👥
                      </div>

                      <h3 className="mt-4 font-semibold text-white">
                        No Users Found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        There are no registered users yet.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  )
}

export default AdminUsers
