import { Box, Button } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import type { Booking } from '../../types'

interface Props {
  booking: Booking
  onDelete: () => void
}

export default function BookingActions({ booking, onDelete }: Props) {
  return (
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
        onClick={onDelete}
        sx={{ textTransform: 'none', borderColor: 'error.main', color: 'error.main' }}
      >
        Delete Booking
      </Button>
    </Box>
  )
}