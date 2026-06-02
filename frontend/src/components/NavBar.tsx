import { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    setMobileOpen(false)
    await logout()
    navigate('/')
  }

  const handleNavClick = () => {
    setMobileOpen(false)
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

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path))

  const drawer = (
    <Box sx={{ width: 260, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Menu
        </Typography>
        <IconButton
          onClick={() => setMobileOpen(false)}
          aria-label="close menu"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.path)
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={handleNavClick}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    background: 'rgba(170, 59, 255, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: active ? 600 : 400,
                        color: active ? 'primary.main' : 'text.primary',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      {user && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    background: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  )

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 56, md: 64 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                letterSpacing: '1px',
                mr: 'auto',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              LAKESIDE RETREAT
            </Typography>

            {isDesktop ? (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {navItems.map((item) => {
                  const active = isActive(item.path)
                  return (
                    <Button
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: active ? 'primary.main' : 'text.secondary',
                        background: active ? 'primary.main' : 'transparent',
                        '&:hover': {
                          background: active
                            ? 'rgba(170, 59, 255, 0.2)'
                            : 'rgba(255,255,255,0.05)',
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
                      background: 'transparent',
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
            ) : (
              <IconButton
                onClick={() => setMobileOpen(true)}
                edge="end"
                aria-label="open navigation menu"
                sx={{
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  ml: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
