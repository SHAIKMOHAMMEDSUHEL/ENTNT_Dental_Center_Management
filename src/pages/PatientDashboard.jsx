import { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableBody, TableRow,
  TableCell, Paper, TableContainer
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    const personal = all.filter(a => a.patientId === user?.id);
    setAppointments(personal);
  }, [user]);

  const upcoming = appointments.filter(a => new Date(a.appointmentDate) > new Date());
  const past = appointments.filter(a => new Date(a.appointmentDate) <= new Date());

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome, {user?.name}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>Upcoming Appointments</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead><TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Next</TableCell>
          </TableRow></TableHead>
          <TableBody>
            {upcoming.map(a => (
              <TableRow key={a.id}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.appointmentDate}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>{a.cost}</TableCell>
                <TableCell>{a.nextDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">Past Appointments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead><TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Files</TableCell>
          </TableRow></TableHead>
          <TableBody>
            {past.map(a => (
              <TableRow key={a.id}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.appointmentDate}</TableCell>
                <TableCell>{a.comments}</TableCell>
                <TableCell>
                  {a.files?.map(f => (
                    <a key={f.name} href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
