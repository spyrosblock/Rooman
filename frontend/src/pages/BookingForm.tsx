import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Button, TextField, MenuItem, CircularProgress, Alert,
} from '@mui/material'
import { ArrowBack, Save } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import NavBar from '../components/NavBar'
import type { Room } from '../types'

const statuses = ['confirmed', 'pending', 'cancelled', 'completed']

interface FormErrors {
  guestName?: string
  email?: string
  phone?: string
  roomId?: string
  guests?: string
  checkIn?: string
  checkOut?: string
}

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [rooms, setRooms] = useState<Room[]>([])
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roomId, setRoomId] = useState<number | ''>('')
  const [guests, setGuests] = useState(2)
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(3, 'day'))
  const [status, setStatus] = useState('pending')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data)
        if (data.length > 0 && !isEdit) setRoomId(data[0].id)
      })
      .catch(() => setError('Failed to load rooms'))
      .finally(() => setRoomsLoading(false))
  }, [isEdit])

  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/bookings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Booking not found')
        return res.json()
      })
      .then((booking) => {
        setGuestName(booking.guestName)
        setEmail(booking.email)
        setPhone(booking.phone ?? '')
        setRoomId(booking.roomId)
        setGuests(booking.guests)
        setCheckIn(dayjs(booking.checkIn))
        setCheckOut(dayjs(booking.checkOut))
        setStatus(booking.status)
        setNotes(booking.notes ?? '')
      })
      .catch(() => navigate('/bookings'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const selectedRoom = rooms.find((r) => r.id === roomId)
  const nights = checkIn && checkOut ? checkOut.diff(checkIn, 'day') : 0
  const total = selectedRoom ? selectedRoom.price * Math.max(0, nights) : 0

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!guestName.trim()) {
      errs.guestName = 'Guest name is required'
    } else if (guestName.trim().length < 2) {
      errs.guestName = 'Guest name must be at least 2 characters'
    }

    if (!email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }

    if (phone.trim() && !/^[+\d\s\-()]{7,20}$/.test(phone)) {
      errs.phone = 'Please enter a valid phone number'
    }

    if (roomId === '') {
      errs.roomId = 'Please select a room'
    }

    if (!guests || guests < 1) {
      errs.guests = 'At least 1 guest is required'
    } else if (guests > 10) {
      errs.guests = 'Maximum 10 guests allowed'
    }

    if (!checkIn) {
      errs.checkIn = 'Check-in date is required'
    }

    if (!checkOut) {
      errs.checkOut = 'Check-out date is required'
    }

    if (checkIn && checkOut) {
      if (!checkOut.isAfter(checkIn)) {
        errs.checkOut = 'Check-out must be after check-in'
      }
      if (checkIn.isBefore(dayjs(), 'day') && !isEdit) {
        errs.checkIn = 'Check-in cannot be in the past'
      }
    }

    return errs
  }

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const validationErrors = validate()
    setErrors(validationErrors)
    setTouched({
      guestName: true,
      email: true,
      phone: true,
      roomId: true,
      guests: true,
      checkIn: true,
      checkOut: true,
    })

    if (Object.keys(validationErrors).length > 0) {
      setSaving(false)
      return
    }

    const body = {
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      roomId,
      guests,
      checkIn: checkIn!.format('YYYY-MM-DD'),
      checkOut: checkOut!.format('YYYY-MM-DD'),
      status,
      total,
      notes,
    }

    try {
      const url = isEdit ? `/api/bookings/${id}` : '/api/bookings'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const msg = data?.message ?? (data?.errors
          ? Object.values(data.errors).join(', ')
          : 'Failed to save booking')
        throw new Error(msg || 'Failed to save booking')
      }

      const saved = await res.json()
      navigate(isEdit ? `/bookings/${saved.id}` : '/bookings')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save booking')
    } finally {
      setSaving(false)
    }
  }

  if (loading || roomsLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              onBlur={() => handleBlur('guestName')}
              error={touched.guestName && Boolean(errors.guestName)}
              helperText={touched.guestName && errors.guestName ? errors.guestName : ' '}
              fullWidth
              required
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email ? errors.email : ' '}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone ? errors.phone : ' '}
                fullWidth
              />
            </Box>

            <TextField
              label="Room"
              value={roomId}
              onChange={(e) => setRoomId(Number(e.target.value))}
              onBlur={() => handleBlur('roomId')}
              error={touched.roomId && Boolean(errors.roomId)}
              helperText={touched.roomId && errors.roomId ? errors.roomId : ' '}
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
              onBlur={() => handleBlur('guests')}
              error={touched.guests && Boolean(errors.guests)}
              helperText={touched.guests && errors.guests ? errors.guests : ' '}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={(d) => {
                  setCheckIn(d)
                  if (touched.checkIn) setErrors(validate())
                }}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: touched.checkIn && Boolean(errors.checkIn),
                    helperText: touched.checkIn && errors.checkIn ? errors.checkIn : ' ',
                    onBlur: () => handleBlur('checkIn'),
                  },
                }}
              />
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={(d) => {
                  setCheckOut(d)
                  if (touched.checkOut) setErrors(validate())
                }}
                minDate={checkIn ? checkIn.add(1, 'day') : dayjs().add(1, 'day')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: touched.checkOut && Boolean(errors.checkOut),
                    helperText: touched.checkOut && errors.checkOut ? errors.checkOut : ' ',
                    onBlur: () => handleBlur('checkOut'),
                  },
                }}
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
                disabled={saving}
                sx={{ textTransform: 'none', flex: 1 }}
              >
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Booking'}
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