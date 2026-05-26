import { Box, Container, Typography, Paper, Button, Chip, Divider } from '@mui/material'
import { Edit, ArrowBack, Delete } from '@mui/icons-material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

const bookings = [
  { id: 1, guestName: 'John Smith', roomName: 'Deluxe Sea View', roomId: 1, checkIn: '2026-06-10', checkOut: '2026-06-14', status: 'confirmed', total: 720, guests: 2, email: 'john.smith@email.com', phone: '+30 6912345678', notes: 'Requests extra pillows and a sea-view balcony.' },
  { id: 2, guestName: 'Maria Papadopoulou', roomName: 'Standard Garden Room', roomId: 2, checkIn: '2026-06-15', checkOut: '2026-06-17', status: 'confirmed', total: 240, guests: 2, email: 'maria.p@email.com', phone: '+30 6912345679', notes: '' },
  { id: 3, guestName: 'Alex Johnson', roomName: 'Presidential Suite', roomId: 3, checkIn: '2026-07-01', checkOut: '2026-07-05', status: 'pending', total: 1400, guests: 3, email: 'alex.j@email.com', phone: '+44 7700123456', notes: 'Requires airport transfer.' },
  { id: 4, guestName: 'Elena Karabatos', roomName: 'Family Room', roomId: 4, checkIn: '2026-06-20', checkOut: '2026-06-25', status: 'confirmed', total: 1000, guests: 4, email: 'elena.k@email.com', phone: '+30 6912345680', notes: 'Has two children aged 4 and 7. Needs a baby cot.' },
  { id: 5, guestName: 'George Miller', roomName: 'Cozy Single', roomId: 5, checkIn: '2026-06-11', checkOut: '2026-06-12', status: 'cancelled', total: 80, guests: 1, email: 'george.m@email.com', phone: '+30 6912345681', notes: 'Cancelled due to flight change.' },
  { id: 6, guestName: 'Sophia Williams', roomName: 'Deluxe Sea View', roomId: 1, checkIn: '2026-07-10', checkOut: '2026-07-15', status: 'pending', total: 900, guests: 2, email: 'sophia.w@email.com', phone: '+30 6912345682', notes: '' },
]

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
}

export default function BookingDetail() {
  const { id } = useParams()
  const booking = bookings.find((b) => b.id === Number(id))

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
                <Typography sx={{ fontWeight: 500 }}>{booking.roomName}</Typography>
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
              sx={{ textTransform: 'none', borderColor: 'error.main', color: 'error.main' }}
            >
              Delete Booking
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}