import { Typography, Paper } from '@mui/material'
import type { Room } from '../../types'

interface Props {
  nights: number
  room: Room | undefined
  total: number
}

export default function BookingPriceSummary({ nights, room, total }: Props) {
  if (nights <= 0) return null

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: 'rgba(170, 59, 255, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '0.9rem' }}>
        {nights} night{nights > 1 ? 's' : ''} × €{room?.price}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 400 }}>
        €{total}
      </Typography>
    </Paper>
  )
}