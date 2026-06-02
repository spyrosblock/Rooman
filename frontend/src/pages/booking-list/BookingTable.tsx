import { Box, Typography, Paper, Button } from '@mui/material'
import { Visibility, Edit } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import StatusChip from '../../components/StatusChip'
import type { Booking } from '../../types'

interface Props {
  bookings: Booking[]
}

export default function BookingTable({ bookings }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' },
      }}
    >
      {/* Table header */}
      <Box
        sx={{
          display: 'flex',
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
      {bookings.map((booking) => (
        <Box
          key={booking.id}
          sx={{
            display: 'flex',
            px: 3,
            py: 2.5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            gap: 2,
            alignItems: 'center',
            transition: 'background 0.15s',
            '&:hover': { bgcolor: 'rgba(170, 59, 255, 0.02)' },
            '&:last-of-type': { borderBottom: 'none' },
          }}
        >
          <Typography sx={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>
            {booking.guestName}
          </Typography>

          <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
            {booking.roomName ?? `Room #${booking.roomId}`}
          </Typography>

          <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
            {booking.checkIn}
          </Typography>

          <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
            {booking.checkOut}
          </Typography>

          <Box sx={{ flex: 1 }}>
            <StatusChip status={booking.status} size="small" />
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
    </Paper>
  )
}