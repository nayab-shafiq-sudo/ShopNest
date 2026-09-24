import React, { createContext, useState } from 'react'


export const AuthContext = createContext()


const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('userInfo', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('userInfo')
    }

  return (
    <div>
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            { children }
        </AuthContext.Provider>
      
    </div>
  )
}

export default ContextProvider
