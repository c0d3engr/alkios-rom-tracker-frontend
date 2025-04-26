import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  MenuItem,
} from '@mui/material'

const characterClasses = [
  'Novice',
  'Swordsman',
  'Mage',
  'Archer',
  'Acolyte',
  'Merchant',
  'Thief',
  'Knight',
  'Priest',
  'Wizard',
  'Blacksmith',
  'Hunter',
  'Assassin',
  'Crusader',
  'Monk',
  'Sage',
  'Rogue',
  'Alchemist',
  'Bard',
  'Dancer',
  'Other',
]

const CharacterForm = ({ character, onSubmit, onCancel }) => {
  const validationSchema = Yup.object({
    character_name: Yup.string().required('Character name is required'),
    character_class: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      character_name: character?.character_name || '',
      character_class: character?.character_class || '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {character ? 'Edit Character' : 'Add New Character'}
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Character Name"
          name="character_name"
          value={formik.values.character_name}
          onChange={formik.handleChange}
          error={formik.touched.character_name && Boolean(formik.errors.character_name)}
          helperText={formik.touched.character_name && formik.errors.character_name}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          select
          label="Class"
          name="character_class"
          value={formik.values.character_class}
          onChange={formik.handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {characterClasses.map((cls) => (
            <MenuItem key={cls} value={cls}>
              {cls}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onCancel} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {character ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  )
}

export default CharacterForm