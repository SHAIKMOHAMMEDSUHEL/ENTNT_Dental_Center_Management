import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const getStoredPatients = () => JSON.parse(localStorage.getItem('patients') || '[]');
const getStoredCredentials = () => JSON.parse(localStorage.getItem('patientCredentials') || '{}');

export default function PatientDashboard() {
  const [patients, setPatients] = useState(getStoredPatients);
  const [credentials, setCredentials] = useState(getStoredCredentials);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', dob: '', contact: '', healthInfo: '',
    username: '', password: ''
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('patientCredentials', JSON.stringify(credentials));
  }, [patients, credentials]);

  const handleOpen = (patient = null) => {
    if (patient) {
      const cred = credentials[patient.id] || { username: '', password: '' };
      setFormData({ ...patient, ...cred });
    } else {
      setFormData({
        id: '', name: '', dob: '', contact: '', healthInfo: '',
        username: '', password: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!formData.username || !formData.password) {
      alert("Username and password are required.");
      return;
    }

    if (!formData.id && Object.values(credentials).some(c => c.username === formData.username)) {
      alert("Username already exists. Choose another.");
      return;
    }

    const updatedPatient = {
      id: formData.id || uuidv4(),
      name: formData.name,
      dob: formData.dob,
      contact: formData.contact,
      healthInfo: formData.healthInfo
    };

    const updatedCredentials = {
      ...credentials,
      [updatedPatient.id]: {
        username: formData.username,
        password: formData.password
      }
    };

    if (formData.id) {
      setPatients(patients.map(p => p.id === formData.id ? updatedPatient : p));
    } else {
      setPatients([...patients, updatedPatient]);
    }

    setCredentials(updatedCredentials);
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
      const newCreds = { ...credentials };
      delete newCreds[id];
      setCredentials(newCreds);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>Patient Management</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>+ Add Patient</Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>DOB</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Health Info</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, idx) => (
              <TableRow key={patient.id} sx={{ backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white' }}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.healthInfo}</TableCell>
                <TableCell>{credentials[patient.id]?.username || '-'}</TableCell>
                <TableCell align="center">
                  <Button size="small" onClick={() => handleOpen(patient)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(patient.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{formData.id ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="date" label="DOB" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Contact" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Health Info" value={formData.healthInfo} onChange={e => setFormData({ ...formData, healthInfo: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="password" label="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
