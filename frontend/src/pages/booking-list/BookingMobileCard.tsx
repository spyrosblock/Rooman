import { Box, Typography, Paper, Button, Divider } from '@mui/material'
import { Visibility, Edit } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import StatusChip from '../../components/StatusChip'
import type { Booking } from '../../types'

interface Props {
  bookings: Booking[]
}

export default function BookingMobileCard({ bookings }: Props) {
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      {bookings.map((booking) => (
        <Paper
          key={booking.id}
          elevation={0}
          sx={{
            p: 2.5,
            mb: 2,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            transition: 'background 0.15s',
            '&:hover': { bgcolor: 'rgba(170, 59, 255, 0.02)' },
            '&:last-of-type': { mb: 0 },
          }}
        >
          {/* Header: Guest + Room name (left) / Status (right) */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '1rem', wordBreak: 'break-word' }}
              >
                {booking.guestName}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                {booking.roomName ?? `Room #${booking.roomId}`}
              </Typography>
            </Box>
            <StatusChip status={booking.status} size="small" />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Dates */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <Typography sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
              {booking.checkIn}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>→</Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
              {booking.checkOut}
            </Typography>
          </Box>

          {/* Footer: Total + Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
              €{booking.total}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button
                component={RouterLink}
                to={`/bookings/${booking.id}`}
                size="small"
                startIcon={<Visibility fontSize="small" />}
                sx={{ minWidth: 0, px: 1.5, textTransform: 'none' }}
              >
                View
              </Button>
              <Button
                component={RouterLink}
                to={`/bookings/${booking.id}/edit`}
                size="small"
                startIcon={<Edit fontSize="small" />}
                sx={{ minWidth: 0, px: 1.5, textTransform: 'none' }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}