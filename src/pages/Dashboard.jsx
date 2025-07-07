import { useEffect, useState } from 'react';
import {
  Container, Typography, Card, Grid,
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, TableContainer, Box, Chip
} from '@mui/material';
import {
  MonetizationOn, EventAvailable,
  PendingActions, CalendarMonth
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

const getAppointments = () => JSON.parse(localStorage.getItem('appointments') || '[]');
const getPatients = () => JSON.parse(localStorage.getItem('patients') || '[]');

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
    setPatients(getPatients());
  }, []);

  const revenue = appointments.reduce((sum, a) => sum + Number(a.cost || 0), 0);

  const upcoming = [
    ...appointments
      .filter(a => new Date(a.appointmentDate) > new Date())
      .map(a => ({ ...a, when: 'Main', date: a.appointmentDate })),
    ...appointments
      .filter(a => a.nextDate && new Date(a.nextDate) > new Date())
      .map(a => ({ ...a, when: 'Next', date: a.nextDate }))
  ]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);

  const statusCounts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status,
    value
  }));

  const topPatients = Object.entries(
    appointments.reduce((acc, a) => {
      acc[a.patientId] = (acc[a.patientId] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const getPatientName = (id) => patients.find(p => p.id === id)?.name || id;

  const cardData = [
    { label: 'Revenue', value: `₹${revenue}`, icon: <MonetizationOn fontSize="large" color="success" /> },
    { label: 'Completed', value: statusCounts['Completed'] || 0, icon: <EventAvailable fontSize="large" color="primary" /> },
    { label: 'Pending', value: statusCounts['Pending'] || 0, icon: <PendingActions fontSize="large" color="warning" /> },
    { label: 'Total Appointments', value: appointments.length, icon: <CalendarMonth fontSize="large" color="info" /> }
  ];

  const getStatusChip = (status) => {
    const color = {
      Completed: 'success',
      Pending: 'warning',
      Cancelled: 'error'
    }[status] || 'default';
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>Welcome back, Admin 👋</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Here’s what’s happening at the dental center
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {cardData.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
                background: 'linear-gradient(135deg, #ffffff, #f9f9f9)'
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: '50%',
                  width: 50,
                  height: 50
                }}
              >
                {card.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">{card.label}</Typography>
                <Typography variant="h6">{card.value}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Full-width Chart */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Status Distribution</Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ width: '100%', height: { xs: 300, sm: 400 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Top Patients */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Top Patients</Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Appointments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} align="center">No data available.</TableCell>
                    </TableRow>
                  ) : topPatients.map(([id, count]) => (
                    <TableRow key={id}>
                      <TableCell>{getPatientName(id)}</TableCell>
                      <TableCell>{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Appointments */}
      <Typography variant="h6" sx={{ mt: 5, mb: 1 }}>Upcoming Appointments</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcoming.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">No upcoming appointments.</TableCell>
                </TableRow>
              ) : upcoming.map((a) => (
                <TableRow key={`${a.id}-${a.when}`}>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{getPatientName(a.patientId)}</TableCell>
                  <TableCell>{new Date(a.date).toLocaleString()}</TableCell>
                  <TableCell>{getStatusChip(a.status)}</TableCell>
                  <TableCell>{a.when}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
