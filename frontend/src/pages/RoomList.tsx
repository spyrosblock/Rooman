import { Box, Container, Typography, Paper, Button, Chip } from '@mui/material'
import { Add, Edit, Visibility } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import NavBar from '../components/NavBar'

const rooms = [
  { id: 1, name: 'Deluxe Sea View', type: 'Double', floor: 2, price: 180, capacity: 2 },
  { id: 2, name: 'Standard Garden Room', type: 'Twin', floor: 1, price: 120, capacity: 2 },
  { id: 3, name: 'Presidential Suite', type: 'Suite', floor: 3, price: 350, capacity: 4 },
  { id: 4, name: 'Family Room', type: 'Quad', floor: 1, price: 200, capacity: 4 },
  { id: 5, name: 'Cozy Single', type: 'Single', floor: 2, price: 80, capacity: 1 },
]

export default function RoomList() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '1px' }}>
            Rooms
          </Typography>
          <Button
            component={RouterLink}
            to="/rooms/new"
            variant="contained"
            startIcon={<Add />}
            sx={{ textTransform: 'none' }}
          >
            Add Room
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {rooms.map((room) => (
            <Box key={room.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, p: 1.5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                    {room.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip label={room.type} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                  <Chip label={`Floor ${room.floor}`} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                  <Chip label={`${room.capacity} guests`} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 300, mb: 2 }}>
                  €{room.price}
                  <Typography component="span" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    /night
                  </Typography>
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to={`/rooms/${room.id}`}
                    size="small"
                    startIcon={<Visibility />}
                    sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                  >
                    View
                  </Button>
                  <Button
                    component={RouterLink}
                    to={`/rooms/${room.id}/edit`}
                    size="small"
                    startIcon={<Edit />}
                    sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                  >
                    Edit
                  </Button>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}