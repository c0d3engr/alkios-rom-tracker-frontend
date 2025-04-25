import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken, setToken } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        try {
          // Here you would typically verify the token with your backend
          setIsAuthenticated(true)
          // You might want to fetch user data here
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (token) => {
    setToken(token)
    setIsAuthenticated(true)
    navigate('/')
  }

  const logout = () => {
    removeToken()
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)