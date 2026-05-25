import { useState, useEffect } from 'react'
import { Box, Container, Typography, Paper, Fade, CircularProgress } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { motion, AnimatePresence } from 'motion/react'
import banner from '../assets/lake.png'  // TODO

function getAvailableRooms(_date: Dayjs): number {
  return 5
}

export default function Home() {
  const [date, setDate] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [rooms, setRooms] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) return
    setLoading(true)
    setRooms(null)
    const timer = setTimeout(() => {
      setRooms(getAvailableRooms(date))
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [date])

  // Trigger initial load
  useEffect(() => {
    if (date && rooms === null && !loading) {
      setLoading(true)
      const timer = setTimeout(() => {
        setRooms(getAvailableRooms(date))
        setLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Hero Banner */}
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '40vh', md: '55vh' }, overflow: 'hidden' }}>
          <Box
            component="img"
            src={banner}
            alt="Serene Lakeside Hotel"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.65)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: 3,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#fff',
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
                  fontWeight: 300,
                  letterSpacing: '2px',
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                  mb: 1,
                }}
              >
                LAKESIDE RETREAT
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 300,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                }}
              >
                Check Availability
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Content */}
        <Container maxWidth="sm" sx={{ py: { xs: 5, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
                bgcolor: 'background.paper',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  mb: 3,
                  color: 'text.primary',
                  letterSpacing: '0.5px',
                }}
              >
                Select Your Stay Date
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <DatePicker
                  label="Arrival Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  minDate={dayjs()}
                  slotProps={{
                    textField: {
                      sx: { minWidth: 260 },
                    },
                  }}
                />
              </Box>

              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CircularProgress size={28} sx={{ color: 'primary.main', my: 2 }} />
                  </motion.div>
                )}

                {!loading && rooms !== null && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <Box
                      sx={{
                        py: 3,
                        px: 4,
                        borderRadius: 2,
                        bgcolor: rooms > 0 ? 'rgba(170, 59, 255, 0.06)' : 'rgba(239, 68, 68, 0.06)',
                        border: (theme) =>
                          `1px solid ${rooms > 0 ? theme.palette.primary.main + '30' : '#ef444430'}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          mb: 1,
                        }}
                      >
                        Rooms Available
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '3.5rem',
                          fontWeight: 300,
                          color: rooms > 0 ? 'primary.main' : 'error.main',
                          lineHeight: 1,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {rooms}
                      </Typography>
                      <Typography sx={{ mt: 1.5, color: 'text.secondary', fontSize: '0.95rem' }}>
                        {rooms > 0
                          ? `on ${date?.format('MMMM D, YYYY')}`
                          : 'No rooms available for this date'}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              <Box sx={{ mt: 3, pt: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    letterSpacing: '0.3px',
                  }}
                >
                  To book a room, call us at{' '}
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    (+30) 6912345678
                  </Box>
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          {/* Footer */}
          <Fade in timeout={1200}>
            <Typography
              sx={{
                textAlign: 'center',
                mt: 5,
                color: 'text.secondary',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                opacity: 0.6,
              }}
            >
              LAKESIDE RETREAT &mdash; WHERE TRANQUILITY MEETS LUXURY
            </Typography>
          </Fade>
        </Container>
    </Box>
  )
}
