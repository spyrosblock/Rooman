import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface FormErrors {
  email?: string
  password?: string
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }

    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 5) {
      errs.password = 'Password must be at least 5 characters'
    }

    return errs
  }

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    const validationErrors = validate()
    setErrors(validationErrors)
    setTouched({ email: true, password: true })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)

    try {
      const success = await login(email.trim(), password)
      if (success) {
        navigate('/rooms')
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            '@keyframes fadeSlideIn': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            animation: 'fadeSlideIn 0.6s ease-out',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  letterSpacing: '2px',
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                LAKESIDE RETREAT
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.95rem',
                  letterSpacing: '1px',
                }}
              >
                Staff Login
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

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
                autoFocus
                slotProps={{
                  input: {
                    sx: { borderRadius: 2 },
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password ? errors.password : ' '}
                fullWidth
                required
                slotProps={{
                  input: {
                    sx: { borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to="/"
                underline="hover"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  letterSpacing: '0.3px',
                }}
              >
                Back to Home
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}