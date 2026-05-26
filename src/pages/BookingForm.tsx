import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Button, TextField, MenuItem,
} from '@mui/material'
import { ArrowBack, Save } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import NavBar from '../components/NavBar'

const bookings = [
  { id: 1, guestName: 'John Smith', roomName: 'Deluxe Sea View', roomId: 1, checkIn: '2026-06-10', checkOut: '2026-06-14', status: 'confirmed', total: 720, guests: 2, email: 'john.smith@email.com', phone: '+30 6912345678', notes: 'Requests extra pillows and a sea-view balcony.' },
  { id: 2, guestName: 'Maria Papadopoulou', roomName: 'Standard Garden Room', roomId: 2, checkIn: '2026-06-15', checkOut: '2026-06-17', status: 'confirmed', total: 240, guests: 2, email: 'maria.p@email.com', phone: '+30 6912345679', notes: '' },
  { id: 3, guestName: 'Alex Johnson', roomName: 'Presidential Suite', roomId: 3, checkIn: '2026-07-01', checkOut: '2026-07-05', status: 'pending', total: 1400, guests: 3, email: 'alex.j@email.com', phone: '+44 7700123456', notes: 'Requires airport transfer.' },
  { id: 4, guestName: 'Elena Karabatos', roomName: 'Family Room', roomId: 4, checkIn: '2026-06-20', checkOut: '2026-06-25', status: 'confirmed', total: 1000, guests: 4, email: 'elena.k@email.com', phone: '+30 6912345680', notes: 'Has two children aged 4 and 7. Needs a baby cot.' },
  { id: 5, guestName: 'George Miller', roomName: 'Cozy Single', roomId: 5, checkIn: '2026-06-11', checkOut: '2026-06-12', status: 'cancelled', total: 80, guests: 1, email: 'george.m@email.com', phone: '+30 6912345681', notes: 'Cancelled due to flight change.' },
  { id: 6, guestName: 'Sophia Williams', roomName: 'Deluxe Sea View', roomId: 1, checkIn: '2026-07-10', checkOut: '2026-07-15', status: 'pending', total: 900, guests: 2, email: 'sophia.w@email.com', phone: '+30 6912345682', notes: '' },
]

const rooms = [
  { id: 1, name: 'Deluxe Sea View', price: 180 },
  { id: 2, name: 'Standard Garden Room', price: 120 },
  { id: 3, name: 'Presidential Suite', price: 350 },
  { id: 4, name: 'Family Room', price: 200 },
  { id: 5, name: 'Cozy Single', price: 80 },
]

const statuses = ['confirmed', 'pending', 'cancelled', 'completed']

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const existingBooking = bookings.find((b) => b.id === Number(id))

  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roomId, setRoomId] = useState(rooms[0].id)
  const [guests, setGuests] = useState(2)
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(3, 'day'))
  const [status, setStatus] = useState('pending')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (existingBooking) {
      setGuestName(existingBooking.guestName)
      setEmail(existingBooking.email)
      setPhone(existingBooking.phone)
      setRoomId(existingBooking.roomId)
      setGuests(existingBooking.guests)
      setCheckIn(dayjs(existingBooking.checkIn))
      setCheckOut(dayjs(existingBooking.checkOut))
      setStatus(existingBooking.status)
      setNotes(existingBooking.notes)
    }
  }, [existingBooking])

  const selectedRoom = rooms.find((r) => r.id === roomId)
  const nights = checkIn && checkOut ? checkOut.diff(checkIn, 'day') : 0
  const total = selectedRoom ? selectedRoom.price * Math.max(0, nights) : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: implement actual save
    navigate(isEdit ? `/bookings/${id}` : '/bookings')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Button
          component={RouterLink}
          to={isEdit ? `/bookings/${id}` : '/bookings'}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          {isEdit ? 'Back to Booking' : 'Back to Bookings'}
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
            {isEdit ? 'Edit Booking' : 'New Booking'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              fullWidth
              required
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
              />
            </Box>

            <TextField
              label="Room"
              value={roomId}
              onChange={(e) => setRoomId(Number(e.target.value))}
              select
              fullWidth
              required
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name} — €{room.price}/night
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Number of Guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={(d) => setCheckIn(d)}
                minDate={dayjs()}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={(d) => setCheckOut(d)}
                minDate={checkIn ? checkIn.add(1, 'day') : dayjs().add(1, 'day')}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </Box>

            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              select
              fullWidth
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />

            {nights > 0 && (
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
                  {nights} night{nights > 1 ? 's' : ''} × €{selectedRoom?.price}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  €{total}
                </Typography>
              </Paper>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                sx={{ textTransform: 'none', flex: 1 }}
              >
                {isEdit ? 'Save Changes' : 'Create Booking'}
              </Button>
              <Button
                component={RouterLink}
                to={isEdit ? `/bookings/${id}` : '/bookings'}
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