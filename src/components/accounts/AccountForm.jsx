import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputAdornment,
} from '@mui/material'

const AccountForm = ({ account, onSubmit, onCancel }) => {
  const validationSchema = Yup.object({
    account_name: Yup.string().required('Account name is required'),
    total_zeny: Yup.number().min(0, 'Zeny must be positive').required('Zeny is required'),
  })

  const formik = useFormik({
    initialValues: {
      account_name: account?.account_name || '',
      total_zeny: account?.total_zeny || 0,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      onSubmit(values)
      setSubmitting(false)
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {account ? 'Edit Account' : 'Add New Account'}
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Account Name"
          name="account_name"
          value={formik.values.account_name}
          onChange={formik.handleChange}
          error={formik.touched.account_name && Boolean(formik.errors.account_name)}
          helperText={formik.touched.account_name && formik.errors.account_name}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Total Zeny"
          name="total_zeny"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">Z</InputAdornment>,
          }}
          value={formik.values.total_zeny}
          onChange={formik.handleChange}
          error={formik.touched.total_zeny && Boolean(formik.errors.total_zeny)}
          helperText={formik.touched.total_zeny && formik.errors.total_zeny}
        />
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onCancel} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {account ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  )
}

export default AccountForm