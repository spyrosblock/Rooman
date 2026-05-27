import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Button, Chip, Divider, CircularProgress, Snackbar, Alert } from '@mui/material'
import { Edit, ArrowBack, Delete } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import type { Room } from '../types'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteError, setDeleteError] = useState(false)

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => setRoom(data))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (!room) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>
            Room Not Found
          </Typography>
          <Button component={RouterLink} to="/rooms" startIcon={<ArrowBack />} sx={{ textTransform: 'none' }}>
            Back to Rooms
          </Button>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Button
          component={RouterLink}
          to="/rooms"
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Rooms
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '1px', mb: 1 }}>
                {room.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={room.type} size="small" variant="outlined" />
                <Chip label={`Floor ${room.floor}`} size="small" variant="outlined" />
                <Chip label={`Up to ${room.capacity} guests`} size="small" variant="outlined" />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {room.description}
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'rgba(170, 59, 255, 0.04)',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              mb: 3,
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 300 }}>
              €{room.price}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>/night</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to={`/rooms/${room.id}/edit`}
              variant="contained"
              startIcon={<Edit />}
              sx={{ textTransform: 'none' }}
            >
              Edit Room
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={async () => {
                if (!window.confirm('Are you sure you want to delete this room?')) return
                try {
                  const res = await fetch(`/api/rooms/${room.id}`, { method: 'DELETE' })
                  if (!res.ok) throw new Error('Failed to delete')
                  navigate('/rooms')
                } catch {
                  setDeleteError(true)
                }
              }}
              sx={{ textTransform: 'none', borderColor: 'error.main', color: 'error.main' }}
            >
              Delete Room
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={deleteError}
        autoHideDuration={4000}
        onClose={() => setDeleteError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setDeleteError(false)} sx={{ width: '100%' }}>
          Failed to delete room
        </Alert>
      </Snackbar>
    </Box>
  )
}