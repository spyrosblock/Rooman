import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Button, Chip, TextField, InputAdornment, CircularProgress } from '@mui/material'
import { Add, Search, Visibility, Edit } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import type { Booking } from '../types'

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = bookings.filter((b) =>
    b.guestName.toLowerCase().includes(search.toLowerCase())
  )

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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '1px' }}>
            Bookings
          </Typography>
          <Button
            component={RouterLink}
            to="/bookings/new"
            variant="contained"
            startIcon={<Add />}
            sx={{ textTransform: 'none' }}
          >
            Add Booking
          </Button>
        </Box>

        <TextField
          placeholder="Search by guest name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              px: 3,
              py: 2,
              bgcolor: 'rgba(170, 59, 255, 0.04)',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              gap: 2,
              alignItems: 'center',
            }}
          >
            {['Guest', 'Room', 'Check-in', 'Check-out', 'Status', 'Total', ''].map((h) => (
              <Typography
                key={h}
                sx={{
                  flex: h === '' ? '0 0 100px' : 1,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {h}
              </Typography>
            ))}
          </Box>

          {/* Table rows */}
          {filtered.map((booking) => (
            <Box
              key={booking.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                px: 3,
                py: 2.5,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                gap: { xs: 1.5, md: 2 },
                alignItems: { md: 'center' },
                transition: 'background 0.15s',
                '&:hover': { bgcolor: 'rgba(170, 59, 255, 0.02)' },
                '&:last-of-type': { borderBottom: 'none' },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                  {booking.guestName}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', display: { md: 'none' } }}>
                  {booking.roomName ?? `Room #${booking.roomId}`}
                </Typography>
              </Box>

              <Typography sx={{ flex: 1, fontSize: '0.9rem', display: { xs: 'none', md: 'block' } }}>
                {booking.roomName ?? `Room #${booking.roomId}`}
              </Typography>

              <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
                {booking.checkIn}
              </Typography>

              <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
                {booking.checkOut}
              </Typography>

              <Box sx={{ flex: 1 }}>
                <Chip
                  label={booking.status}
                  size="small"
                  color={statusColors[booking.status] || 'default'}
                  sx={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'capitalize' }}
                />
              </Box>

              <Typography sx={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>
                €{booking.total}
              </Typography>

              <Box sx={{ display: 'flex', gap: 0.5, flex: '0 0 100px' }}>
                <Button
                  component={RouterLink}
                  to={`/bookings/${booking.id}`}
                  size="small"
                  sx={{ minWidth: 0, px: 1 }}
                >
                  <Visibility fontSize="small" />
                </Button>
                <Button
                  component={RouterLink}
                  to={`/bookings/${booking.id}/edit`}
                  size="small"
                  sx={{ minWidth: 0, px: 1 }}
                >
                  <Edit fontSize="small" />
                </Button>
              </Box>
            </Box>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>
                {search ? `No bookings found for "${search}"` : 'No bookings yet'}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}