import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Button, TextField, MenuItem, CircularProgress, Alert
} from '@mui/material'
import { ArrowBack, Save } from '@mui/icons-material'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const roomTypes = ['Single', 'Double', 'Twin', 'Suite', 'Quad']

interface FormErrors {
  name?: string
  type?: string
  floor?: string
  price?: string
  capacity?: string
}

export default function RoomForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [name, setName] = useState('')
  const [type, setType] = useState('Double')
  const [floor, setFloor] = useState(1)
  const [price, setPrice] = useState(100)
  const [capacity, setCapacity] = useState(2)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isEdit) return
    fetch(`/api/rooms/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Room not found')
        return res.json()
      })
      .then((room) => {
        setName(room.name)
        setType(room.type)
        setFloor(room.floor)
        setPrice(room.price)
        setCapacity(room.capacity)
        setDescription(room.description ?? '')
      })
      .catch(() => navigate('/rooms'))
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!name.trim()) {
      errs.name = 'Room name is required'
    } else if (name.trim().length < 2) {
      errs.name = 'Room name must be at least 2 characters'
    }

    if (!type) {
      errs.type = 'Room type is required'
    }

    if (!floor || floor < 1) {
      errs.floor = 'Floor must be at least 1'
    }

    if (!capacity || capacity < 1) {
      errs.capacity = 'Capacity must be at least 1'
    } else if (capacity > 20) {
      errs.capacity = 'Maximum capacity is 20'
    }

    if (!price || price <= 0) {
      errs.price = 'Price must be greater than 0'
    } else if (price > 100000) {
      errs.price = 'Price cannot exceed €100,000'
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
      name: true,
      type: true,
      floor: true,
      price: true,
      capacity: true,
    })

    if (Object.keys(validationErrors).length > 0) {
      setSaving(false)
      return
    }

    const body = { name: name.trim(), type, floor, price, capacity, description }

    try {
      const url = isEdit ? `/api/rooms/${id}` : '/api/rooms'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        const msg = data?.message || data?.errors
          ? Object.values(data.errors).join(', ')
          : 'Failed to save room'
        throw new Error(msg || 'Failed to save room')
      }

      const saved = await res.json()
      navigate(isEdit ? `/rooms/${saved.id}` : '/rooms')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save room')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Room Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name ? errors.name : ' '}
              fullWidth
              required
            />

            <TextField
              label="Room Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              onBlur={() => handleBlur('type')}
              error={touched.type && Boolean(errors.type)}
              helperText={touched.type && errors.type ? errors.type : ' '}
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
              onBlur={() => handleBlur('floor')}
              error={touched.floor && Boolean(errors.floor)}
              helperText={touched.floor && errors.floor ? errors.floor : ' '}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <TextField
              label="Capacity (guests)"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              onBlur={() => handleBlur('capacity')}
              error={touched.capacity && Boolean(errors.capacity)}
              helperText={touched.capacity && errors.capacity ? errors.capacity : ' '}
              fullWidth
              required
              slotProps={{ htmlInput: { min: 1, max: 10 } }}
            />

            <TextField
              label="Price per night (€)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              onBlur={() => handleBlur('price')}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price ? errors.price : ' '}
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

            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={saving}
                sx={{ textTransform: 'none', flex: 1 }}
              >
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Room'}
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