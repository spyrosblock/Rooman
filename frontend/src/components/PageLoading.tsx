import { Box, CircularProgress } from '@mui/material'
import NavBar from './NavBar'

export default function PageLoading() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    </Box>
  )
}