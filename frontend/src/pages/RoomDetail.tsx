import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Button, Chip, Divider, CircularProgress, Snackbar, Alert } from '@mui/material'
import { Edit, ArrowBack, Delete, Visibility } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PageLoading from '../components/PageLoading'
import type { Room, Booking } from '../types'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
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

  useEffect(() => {
    fetch(`/api/rooms/${id}/bookings`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bookings')
        return res.json()
      })
      .then((data) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false))
  }, [id])

  if (loading) {
    return <PageLoading />
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

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 300, mb: 3 }}>
            Bookings
          </Typography>

          {bookingsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : bookings.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>
                No bookings for this room yet.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {bookings.map((booking) => (
                <Paper
                  key={booking.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {booking.guestName}
                    </Typography>
                    <Chip
                      label={booking.status}
                      size="small"
                      color={
                        booking.status === 'confirmed' ? 'success' :
                        booking.status === 'pending' ? 'warning' :
                        booking.status === 'cancelled' ? 'error' :
                        'info'
                      }
                      sx={{ fontWeight: 500, textTransform: 'capitalize', fontSize: '0.75rem' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 2 }, mb: 1.5 }}>
                    <Box sx={{ flex: '1 1 100px' }}>
                      <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary' }}>
                        Check-in
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem' }}>{booking.checkIn}</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 100px' }}>
                      <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary' }}>
                        Check-out
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem' }}>{booking.checkOut}</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 80px' }}>
                      <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary' }}>
                        Total
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>€{booking.total}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      component={RouterLink}
                      to={`/bookings/${booking.id}`}
                      size="small"
                      startIcon={<Visibility />}
                      sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
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