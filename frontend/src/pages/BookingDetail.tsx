import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Button, Chip, Divider, CircularProgress, Snackbar, Alert } from '@mui/material'
import { Edit, ArrowBack, Delete } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import type { Booking } from '../types'

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
}

export default function BookingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteError, setDeleteError] = useState(false)

  useEffect(() => {
    fetch(`/api/bookings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => setBooking(data))
      .catch(() => setBooking(null))
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

  if (!booking) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>
            Booking Not Found
          </Typography>
          <Button component={RouterLink} to="/bookings" startIcon={<ArrowBack />} sx={{ textTransform: 'none' }}>
            Back to Bookings
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
          to="/bookings"
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Bookings
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
                {booking.guestName}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                Booking #{booking.id}
              </Typography>
            </Box>
            <Chip
              label={booking.status}
              color={statusColors[booking.status] || 'default'}
              sx={{ fontWeight: 500, fontSize: '0.85rem', py: 1.5, textTransform: 'capitalize' }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  flex: '1 1 200px',
                  p: 2.5,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  bgcolor: 'rgba(170, 59, 255, 0.02)',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                  Check-in
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{booking.checkIn}</Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  flex: '1 1 200px',
                  p: 2.5,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  bgcolor: 'rgba(170, 59, 255, 0.02)',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                  Check-out
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{booking.checkOut}</Typography>
              </Paper>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  flex: '1 1 200px',
                  p: 2.5,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                  Room
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {booking.roomName ?? `Room #${booking.roomId}`}
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  flex: '1 1 200px',
                  p: 2.5,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                  Guests
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{booking.guests}</Typography>
              </Paper>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                Total
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 300 }}>
                €{booking.total}
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                Contact
              </Typography>
              <Typography sx={{ mb: 0.5 }}>{booking.email}</Typography>
              <Typography>{booking.phone}</Typography>
            </Paper>

            {booking.notes && (
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  bgcolor: 'rgba(170, 59, 255, 0.02)',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'text.secondary', mb: 0.5 }}>
                  Notes
                </Typography>
                <Typography>{booking.notes}</Typography>
              </Paper>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
            <Button
              component={RouterLink}
              to={`/bookings/${booking.id}/edit`}
              variant="contained"
              startIcon={<Edit />}
              sx={{ textTransform: 'none' }}
            >
              Edit Booking
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={async () => {
                if (!window.confirm('Are you sure you want to delete this booking?')) return
                try {
                  const res = await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' })
                  if (!res.ok) throw new Error('Failed to delete')
                  navigate('/bookings')
                } catch {
                  setDeleteError(true)
                }
              }}
              sx={{ textTransform: 'none', borderColor: 'error.main', color: 'error.main' }}
            >
              Delete Booking
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
          Failed to delete booking
        </Alert>
      </Snackbar>
    </Box>
  )
}