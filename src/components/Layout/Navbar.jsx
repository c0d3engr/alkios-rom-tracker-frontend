import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ROM Tracker
        </Typography>
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/accounts">
              Accounts
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar