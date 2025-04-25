import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth' // Update with your backend URL

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('token')
}

const authService = {
  register,
  login,
  logout,
}

export default authService