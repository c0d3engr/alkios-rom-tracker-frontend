import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import accountService from '../api/accounts'
import AccountList from '../components/accounts/AccountList'
import AccountForm from '../components/accounts/AccountForm'
import { Box, Typography, Button, Modal, CircularProgress } from '@mui/material'

const Accounts = () => {
  const { isAuthenticated } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccounts()
    }
  }, [isAuthenticated])

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await accountService.getAccounts(token)
      setAccounts(data)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingAccount(null)
    setOpenModal(true)
  }

  const handleEdit = (account) => {
    setEditingAccount(account)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingAccount(null)
  }

  const handleSubmit = async (accountData) => {
    try {
      const token = localStorage.getItem('token')
      if (editingAccount) {
        await accountService.updateAccount(editingAccount.account_id, accountData, token)
      } else {
        await accountService.createAccount(accountData, token)
      }
      fetchAccounts()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving account:', error)
    }
  }

  const handleDelete = async (accountId) => {
    try {
      const token = localStorage.getItem('token')
      await accountService.deleteAccount(accountId, token)
      fetchAccounts()
    } catch (error) {
      console.error('Error deleting account:', error)
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Accounts</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Add Account
        </Button>
      </Box>

      <AccountList
        accounts={accounts}
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
          <AccountForm
            account={editingAccount}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default Accounts