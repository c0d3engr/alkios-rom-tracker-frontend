import axios from 'axios'

const API_URL = 'http://localhost:8080/api/accounts' // Update with your backend URL

const getAccounts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const createAccount = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, accountData, config)
  return response.data
}

const updateAccount = async (accountId, accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${accountId}`, accountData, config)
  return response.data
}

const deleteAccount = async (accountId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${accountId}`, config)
  return response.data
}

const accountService = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
}

export default accountService