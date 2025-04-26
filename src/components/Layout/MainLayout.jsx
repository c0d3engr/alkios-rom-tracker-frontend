import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Box, Container } from '@mui/material'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ pt: 8 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default MainLayout