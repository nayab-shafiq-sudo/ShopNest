import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Invalid userInfo in localStorage:', error)
        localStorage.removeItem('userInfo')
      }
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default ContextProvider