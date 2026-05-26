import { Box, Container, Typography, Paper, Button, Chip, Divider } from '@mui/material'
import { Edit, ArrowBack, Delete } from '@mui/icons-material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

const rooms = [
  { id: 1, name: 'Deluxe Sea View', type: 'Double', floor: 2, price: 180, capacity: 2, description: 'Spacious double room with panoramic sea views. Features a king-size bed, private balcony, and en-suite bathroom with rainfall shower.' },
  { id: 2, name: 'Standard Garden Room', type: 'Twin', floor: 1, price: 120, capacity: 2, description: 'Comfortable twin room overlooking our lush gardens. Includes two single beds, work desk, and garden access.' },
  { id: 3, name: 'Presidential Suite', type: 'Suite', floor: 3, price: 350, capacity: 4, description: 'Our finest suite with separate living area, master bedroom, and guest bathroom. Features a jacuzzi and panoramic views.' },
  { id: 4, name: 'Family Room', type: 'Quad', floor: 1, price: 200, capacity: 4, description: 'Perfect for families. Features one double bed and two single beds, plus a small kitchenette.' },
  { id: 5, name: 'Cozy Single', type: 'Single', floor: 2, price: 80, capacity: 1, description: 'Compact and cozy single room ideal for solo travelers. Includes a comfortable single bed and en-suite bathroom.' },
]

export default function RoomDetail() {
  const { id } = useParams()
  const room = rooms.find((r) => r.id === Number(id))

  if (!room) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>
            Room Not Found
          </Typography>
          <Button component={RouterLink} to="/rooms" startIcon={<ArrowBack />} sx={{ textTransform: 'none' }}>
            Back to Rooms
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
          to="/rooms"
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Rooms
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
                {room.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={room.type} size="small" variant="outlined" />
                <Chip label={`Floor ${room.floor}`} size="small" variant="outlined" />
                <Chip label={`Up to ${room.capacity} guests`} size="small" variant="outlined" />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            {room.description}
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'rgba(170, 59, 255, 0.04)',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              mb: 3,
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 300 }}>
              €{room.price}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>/night</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to={`/rooms/${room.id}/edit`}
              variant="contained"
              startIcon={<Edit />}
              sx={{ textTransform: 'none' }}
            >
              Edit Room
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              sx={{ textTransform: 'none', borderColor: 'error.main', color: 'error.main' }}
            >
              Delete Room
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}