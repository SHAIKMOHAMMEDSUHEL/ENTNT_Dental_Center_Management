import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import { useState } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  
  export default function MenuBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    if (!user) return null;
  
    const links = user.role === 'Admin'
      ? [
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Appointments', path: '/admin/appointments' },
          { label: 'Calendar', path: '/admin/calendar' },
          { label: 'Patients', path: '/admin/patients' },
        ]
      : [
          { label: 'My Appointments', path: '/patient' }
        ];
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };
  
    const drawerLinks = (
      <Box role="presentation" sx={{ width: 250 }}>
        <List>
          {links.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton onClick={() => { setDrawerOpen(false); navigate(link.path); }}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  
    return (
      <>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              ENTNT Dental Center
            </Typography>
  
            {isMobile ? (
              <>
                <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  {drawerLinks}
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {links.map((link) => (
                  <Button
                    key={link.label}
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{
                      fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                      textDecoration: location.pathname === link.path ? 'underline' : 'none'
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
  