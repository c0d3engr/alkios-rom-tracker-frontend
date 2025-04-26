import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import characterService from '../api/characters'
import accountService from '../api/accounts'
import CharacterList from '../components/characters/CharacterList'
import CharacterForm from '../components/characters/CharacterForm'
import { Box, Typography, Button, Modal, CircularProgress, Breadcrumbs, Link } from '@mui/material'

const Characters = () => {
  const { accountId } = useParams()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [characters, setCharacters] = useState([])
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState(null)

  useEffect(() => {
    if (isAuthenticated && accountId) {
      fetchData()
    }
  }, [isAuthenticated, accountId])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const [accountData, charactersData] = await Promise.all([
        accountService.getAccounts(token).then(accounts => 
          accounts.find(acc => acc.account_id === parseInt(accountId))
        ),
        characterService.getCharacters(accountId, token)
      ])
      
      if (!accountData) {
        navigate('/accounts')
        return
      }
      
      setAccount(accountData)
      setCharacters(charactersData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingCharacter(null)
    setOpenModal(true)
  }

  const handleEdit = (character) => {
    setEditingCharacter(character)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingCharacter(null)
  }

  const handleSubmit = async (characterData) => {
    try {
      const token = localStorage.getItem('token')
      if (editingCharacter) {
        await characterService.updateCharacter(
          editingCharacter.character_id,
          { ...characterData, account_id: parseInt(accountId) },
          token
        )
      } else {
        await characterService.createCharacter(
          { ...characterData, account_id: parseInt(accountId) },
          token
        )
      }
      fetchData()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving character:', error)
    }
  }

  const handleDelete = async (characterId) => {
    try {
      const token = localStorage.getItem('token')
      await characterService.deleteCharacter(characterId, token)
      fetchData()
    } catch (error) {
      console.error('Error deleting character:', error)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link color="inherit" href="/accounts">
          Accounts
        </Link>
        <Typography color="text.primary">
          {account?.account_name || 'Account'}
        </Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Characters</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Add Character
        </Button>
      </Box>

      <CharacterList
        characters={characters}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <CharacterForm
            character={editingCharacter}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default Characters