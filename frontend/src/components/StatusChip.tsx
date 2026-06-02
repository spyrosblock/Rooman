import { Chip } from '@mui/material'

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'error',
  completed: 'info',
}

interface Props {
  status: string
  size?: 'small' | 'medium'
  sx?: Record<string, unknown>
}

export default function StatusChip({ status, size = 'small', sx = {} }: Props) {
  return (
    <Chip
      label={status}
      size={size}
      color={statusColors[status] || 'default'}
      sx={{ fontWeight: 500, textTransform: 'capitalize', ...sx }}
    />
  )
}