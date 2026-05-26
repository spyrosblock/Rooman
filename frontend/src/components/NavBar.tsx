import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Bookings', path: '/bookings' },
]

export default function NavBar() {
  const location = useLocation()

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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}