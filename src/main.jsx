import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; 
import {
  seedPatients,
  seedCredentials,
  seedAppointments
} from './utils/seedData'; 

const preloadData = () => {
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(seedPatients));
  }
  if (!localStorage.getItem('patientCredentials')) {
    localStorage.setItem('patientCredentials', JSON.stringify(seedCredentials));
  }
  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify(seedAppointments));
  }
};

preloadData(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>       
      <CssBaseline />                   
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
