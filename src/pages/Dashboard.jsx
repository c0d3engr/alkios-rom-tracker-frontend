import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import accountService from '../api/accounts'
import { Box, Typography, Card, CardContent, CircularProgress, Grid } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const { isAuthenticated } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalZeny, setTotalZeny] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAccounts = async () => {
        try {
          const token = localStorage.getItem('token')
          const data = await accountService.getAccounts(token)
          setAccounts(data)
          const zenySum = data.reduce((sum, account) => sum + account.total_zeny, 0)
          setTotalZeny(zenySum)
        } catch (error) {
          console.error('Error fetching accounts:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchAccounts()
    }
  }, [isAuthenticated])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  const chartData = {
    labels: accounts.map((account) => account.account_name),
    datasets: [
      {
        data: accounts.map((account) => account.total_zeny),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Zeny Across All Accounts
              </Typography>
              <Typography variant="h3">{totalZeny.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Number of Accounts
              </Typography>
              <Typography variant="h3">{accounts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Zeny Distribution
              </Typography>
              <Box height={300}>
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard