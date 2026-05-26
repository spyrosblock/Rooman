import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Button, TextField, MenuItem, FormControlLabel, Switch
} from '@mui/material'
import { ArrowBack, Save } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const rooms = [
  { id: 1, name: 'Deluxe Sea View', type: 'Double', floor: 2, price: 180, capacity: 2, available: true, description: 'Spacious double room with panoramic sea views. Features a king-size bed, private balcony, and en-suite bathroom with rainfall shower.' },
  { id: 2, name: 'Standard Garden Room', type: 'Twin', floor: 1, price: 120, capacity: 2, available: true, description: 'Comfortable twin room overlooking our lush gardens. Includes two single beds, work desk, and garden access.' },
  { id: 3, name: 'Presidential Suite', type: 'Suite', floor: 3, price: 350, capacity: 4, available: false, description: 'Our finest suite with separate living area, master bedroom, and guest bathroom. Features a jacuzzi and panoramic views.' },
  { id: 4, name: 'Family Room', type: 'Quad', floor: 1, price: 200, capacity: 4, available: true, description: 'Perfect for families. Features one double bed and two single beds, plus a small kitchenette.' },
  { id: 5, name: 'Cozy Single', type: 'Single', floor: 2, price: 80, capacity: 1, available: true, description: 'Compact and cozy single room ideal for solo travelers. Includes a comfortable single bed and en-suite bathroom.' },
]

const roomTypes = ['Single', 'Double', 'Twin', 'Suite', 'Quad']

export default function RoomForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const existingRoom = rooms.find((r) => r.id === Number(id))

  const [name, setName] = useState('')
  const [type, setType] = useState('Double')
  const [floor, setFloor] = useState(1)
  const [price, setPrice] = useState(100)
  const [capacity, setCapacity] = useState(2)
  const [available, setAvailable] = useState(true)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (existingRoom) {
      setName(existingRoom.name)
      setType(existingRoom.type)
      setFloor(existingRoom.floor)
      setPrice(existingRoom.price)
      setCapacity(existingRoom.capacity)
      setAvailable(existingRoom.available)
      setDescription(existingRoom.description)
    }
  }, [existingRoom])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: implement actual save
    navigate(isEdit ? `/rooms/${id}` : '/rooms')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Button
          component={RouterLink}
          to={isEdit ? `/rooms/${id}` : '/rooms'}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          {isEdit ? 'Back to Room' : 'Back to Rooms'}
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '1px', mb: 4 }}>
            {isEdit ? 'Edit Room' : 'New Room'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Room Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Room Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              select
              fullWidth
              required
            >
              {roomTypes.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Floor"
              type="number"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <TextField
              label="Capacity (guests)"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <TextField
              label="Price per night (€)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 0 } }}
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <FormControlLabel
              control={
                <Switch
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />
              }
              label="Available for booking"
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                sx={{ textTransform: 'none', flex: 1 }}
              >
                {isEdit ? 'Save Changes' : 'Create Room'}
              </Button>
              <Button
                component={RouterLink}
                to={isEdit ? `/rooms/${id}` : '/rooms'}
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}