import { Box, Typography, Paper } from '@mui/material'
import type { Booking } from '../../types'

interface Props {
  booking: Booking
}

export default function BookingInfoCards({ booking }: Props) {
  return (
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
  )
}