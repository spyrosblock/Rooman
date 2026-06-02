import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, TextField, InputAdornment, Paper } from '@mui/material'
import { Add, Search } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PageLoading from '../components/PageLoading'
import { BookingTable, BookingMobileCard } from './booking-list'
import type { Booking } from '../types'

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = bookings.filter((b) =>
    b.guestName.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <PageLoading />
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: '1px' }}>
            Bookings
          </Typography>
          <Button
            component={RouterLink}
            to="/bookings/new"
            variant="contained"
            startIcon={<Add />}
            sx={{ textTransform: 'none' }}
          >
            Add Booking
          </Button>
        </Box>

        <TextField
          placeholder="Search by guest name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {filtered.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>
              {search ? `No bookings found for "${search}"` : 'No bookings yet'}
            </Typography>
          </Paper>
        ) : (
          <>
            <BookingTable bookings={filtered} />
            <BookingMobileCard bookings={filtered} />
          </>
        )}
      </Container>
    </Box>
  )
}