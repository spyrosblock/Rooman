import { TextField, MenuItem, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import type { Room } from '../../types'

const statuses = ['confirmed', 'pending', 'cancelled', 'completed']

export interface FormFieldValues {
  guestName: string
  email: string
  phone: string
  roomId: number | ''
  guests: number
  checkIn: Dayjs | null
  checkOut: Dayjs | null
  status: string
  notes: string
}

export interface FormErrors {
  guestName?: string
  email?: string
  phone?: string
  roomId?: string
  guests?: string
  checkIn?: string
  checkOut?: string
}

export interface FormTouched {
  [field: string]: boolean
}

interface Props {
  values: FormFieldValues
  rooms: Room[]
  errors: FormErrors
  touched: FormTouched
  onChange: (field: string, value: unknown) => void
  onBlur: (field: keyof FormErrors) => void
}

export default function BookingFormFields({ values, rooms, errors, touched, onChange, onBlur }: Props) {
  const selectedRoom = rooms.find((r) => r.id === values.roomId)

  return (
    <>
      <TextField
        label="Guest Name"
        value={values.guestName}
        onChange={(e) => onChange('guestName', e.target.value)}
        onBlur={() => onBlur('guestName')}
        error={touched.guestName && Boolean(errors.guestName)}
        helperText={touched.guestName && errors.guestName ? errors.guestName : ' '}
        fullWidth
        required
      />

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email ? errors.email : ' '}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          value={values.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          onBlur={() => onBlur('phone')}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone ? errors.phone : ' '}
          fullWidth
        />
      </Box>

      <TextField
        label="Room"
        value={values.roomId}
        onChange={(e) => onChange('roomId', Number(e.target.value))}
        onBlur={() => onBlur('roomId')}
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
        value={values.guests}
        onChange={(e) => onChange('guests', Number(e.target.value))}
        onBlur={() => onBlur('guests')}
        error={touched.guests && Boolean(errors.guests)}
        helperText={touched.guests && errors.guests ? errors.guests : ' '}
        fullWidth
        required
        slotProps={{
          htmlInput: {
            min: 1,
            max: selectedRoom?.capacity ?? 10,
          },
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <DatePicker
          label="Check-in"
          value={values.checkIn}
          onChange={(d) => {
            onChange('checkIn', d)
          }}
          minDate={dayjs()}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              error: touched.checkIn && Boolean(errors.checkIn),
              helperText: touched.checkIn && errors.checkIn ? errors.checkIn : ' ',
              onBlur: () => onBlur('checkIn'),
            },
          }}
        />
        <DatePicker
          label="Check-out"
          value={values.checkOut}
          onChange={(d) => {
            onChange('checkOut', d)
          }}
          minDate={values.checkIn ? values.checkIn.add(1, 'day') : dayjs().add(1, 'day')}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              error: touched.checkOut && Boolean(errors.checkOut),
              helperText: touched.checkOut && errors.checkOut ? errors.checkOut : ' ',
              onBlur: () => onBlur('checkOut'),
            },
          }}
        />
      </Box>

      <TextField
        label="Status"
        value={values.status}
        onChange={(e) => onChange('status', e.target.value)}
        select
        fullWidth
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Notes"
        value={values.notes}
        onChange={(e) => onChange('notes', e.target.value)}
        multiline
        rows={2}
        fullWidth
      />
    </>
  )
}