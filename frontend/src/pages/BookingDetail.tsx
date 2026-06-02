import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Button, Divider, Snackbar, Alert } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PageLoading from '../components/PageLoading'
import StatusChip from '../components/StatusChip'
import { BookingInfoCards, BookingActions } from './booking-detail'
import type { Booking } from '../types'

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

  const handleDelete = async () => {
    if (!booking) return
    if (!window.confirm('Are you sure you want to delete this booking?')) return
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      navigate('/bookings')
    } catch {
      setDeleteError(true)
    }
  }

  if (loading) {
    return <PageLoading />
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
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back
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
            <StatusChip
              status={booking.status}
              size="medium"
              sx={{ py: 1.5, fontSize: '0.85rem' }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <BookingInfoCards booking={booking} />
          <BookingActions booking={booking} onDelete={handleDelete} />
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