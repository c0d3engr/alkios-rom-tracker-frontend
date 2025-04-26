import axios from 'axios'

const API_URL = 'http://localhost:8080/api/characters' // Update with your backend URL

const getCharacters = async (accountId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/account/${accountId}`, config)
  return response.data
}

const createCharacter = async (characterData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, characterData, config)
  return response.data
}

const updateCharacter = async (characterId, characterData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${characterId}`, characterData, config)
  return response.data
}

const deleteCharacter = async (characterId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${characterId}`, config)
  return response.data
}

const characterService = {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
}

export default characterService