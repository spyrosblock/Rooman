import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navItems = [
    { label: 'Home', path: '/' },
    ...(user
      ? [
          { label: 'Rooms', path: '/rooms' },
          { label: 'Bookings', path: '/bookings' },
        ]
      : []),
  ]

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              letterSpacing: '1px',
              mr: 'auto',
              fontSize: '1rem',
            }}
          >
            LAKESIDE RETREAT
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {navItems.map((item) => {
              const active = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: active ? 'primary.main' : 'text.secondary',
                    background: active ? 'primary.main' : 'transparent',
                    '&:hover': {
                      background: active ? 'rgba(170, 59, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(170, 59, 255, 0.5)',
                    },
                    fontSize: '0.85rem',
                    px: 1.5,
                    py: 0.5,
                    minWidth: 0,
                    border: '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
            {user && (
              <Button
                onClick={handleLogout}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  px: 1.5,
                  py: 0.5,
                  minWidth: 0,
                  border: '2px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
