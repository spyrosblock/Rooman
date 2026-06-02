import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Button, Alert,
} from '@mui/material'
import { ArrowBack, Save } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import NavBar from '../components/NavBar'
import PageLoading from '../components/PageLoading'
import { BookingFormFields, BookingPriceSummary } from './booking-form'
import type { FormFieldValues, FormErrors } from './booking-form'
import type { Room } from '../types'

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(isEdit)
  const [roomsLoading, setRoomsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [values, setValues] = useState<FormFieldValues>({
    guestName: '',
    email: '',
    phone: '',
    roomId: '',
    guests: 2,
    checkIn: dayjs().add(1, 'day'),
    checkOut: dayjs().add(3, 'day'),
    status: 'pending',
    notes: '',
  })

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data)
        if (data.length > 0 && !isEdit) setValues((prev) => ({ ...prev, roomId: data[0].id }))
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
        setValues({
          guestName: booking.guestName,
          email: booking.email,
          phone: booking.phone ?? '',
          roomId: booking.roomId,
          guests: booking.guests,
          checkIn: dayjs(booking.checkIn),
          checkOut: dayjs(booking.checkOut),
          status: booking.status,
          notes: booking.notes ?? '',
        })
      })
      .catch(() => navigate('/bookings'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const selectedRoom = rooms.find((r) => r.id === values.roomId)
  const nights = values.checkIn && values.checkOut ? values.checkOut.diff(values.checkIn, 'day') : 0
  const total = selectedRoom ? selectedRoom.price * Math.max(0, nights) : 0

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!values.guestName.trim()) {
      errs.guestName = 'Guest name is required'
    } else if (values.guestName.trim().length < 2) {
      errs.guestName = 'Guest name must be at least 2 characters'
    }

    if (!values.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = 'Please enter a valid email address'
    }

    if (values.phone.trim() && !/^[+\d\s\-()]{7,20}$/.test(values.phone)) {
      errs.phone = 'Please enter a valid phone number'
    }

    if (values.roomId === '') {
      errs.roomId = 'Please select a room'
    }

    if (!values.guests || values.guests < 1) {
      errs.guests = 'At least 1 guest is required'
    } else if (selectedRoom && values.guests > selectedRoom.capacity) {
      errs.guests = `Maximum ${selectedRoom.capacity} guests allowed for this room`
    }

    if (!values.checkIn) {
      errs.checkIn = 'Check-in date is required'
    }

    if (!values.checkOut) {
      errs.checkOut = 'Check-out date is required'
    }

    if (values.checkIn && values.checkOut) {
      if (!values.checkOut.isAfter(values.checkIn)) {
        errs.checkOut = 'Check-out must be after check-in'
      }
      if (values.checkIn.isBefore(dayjs(), 'day') && !isEdit) {
        errs.checkIn = 'Check-in cannot be in the past'
      }
    }

    return errs
  }

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const handleChange = (field: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) setErrors(validate())
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
      guestName: values.guestName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      roomId: values.roomId,
      guests: values.guests,
      checkIn: values.checkIn!.format('YYYY-MM-DD'),
      checkOut: values.checkOut!.format('YYYY-MM-DD'),
      status: values.status,
      total,
      notes: values.notes,
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
    return <PageLoading />
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
            <BookingFormFields
              values={values}
              rooms={rooms}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <BookingPriceSummary nights={nights} room={selectedRoom} total={total} />

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