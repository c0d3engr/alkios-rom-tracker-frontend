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
  
  const CharacterList = ({ characters, onEdit, onDelete }) => {
    if (characters.length === 0) {
      return <Typography>No characters found. Add your first character!</Typography>
    }
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Character Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((character) => (
              <TableRow key={character.character_id}>
                <TableCell>{character.character_name}</TableCell>
                <TableCell>{character.character_class || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(character)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(character.character_id)}>
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
  
  export default CharacterList