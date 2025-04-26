import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
  } from '@mui/material'
  import { Edit, Delete } from '@mui/icons-material'
  
  const AccountList = ({ accounts, onEdit, onDelete }) => {
    if (accounts.length === 0) {
      return <Typography>No accounts found. Add your first account!</Typography>
    }
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell align="right">Total Zeny</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.account_id}>
                <TableCell>{account.account_name}</TableCell>
                <TableCell align="right">{account.total_zeny.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(account)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(account.account_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  export default AccountList