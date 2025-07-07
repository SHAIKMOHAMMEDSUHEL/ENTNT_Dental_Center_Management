import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import login1 from '../assets/Login1.png';
import login2 from '../assets/Login2.png';
import login3 from '../assets/Login3.png';

const imageUrls = [login1, login2, login3];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      navigate(user.role === 'Admin' ? '/admin/dashboard' : '/patient');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff', 
        px: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' },
          height: { xs: 'auto', md: 580 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          backgroundColor: 'white'
        }}
      >
        <Box
          sx={{
            flex: 1.2,
            backgroundImage: `url(${imageUrls[imageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 300
          }}
        />

        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            ENTNT Dental Hospital
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
