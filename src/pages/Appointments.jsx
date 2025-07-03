import { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, InputLabel, Select, FormControl, Table,
  TableHead, TableBody, TableRow, TableCell, TableContainer, Paper
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const getStoredAppointments = () => JSON.parse(localStorage.getItem('appointments') || '[]');
const getStoredPatients = () => JSON.parse(localStorage.getItem('patients') || '[]');

export default function Appointments() {
  const [appointments, setAppointments] = useState(getStoredAppointments);
  const [patients, setPatients] = useState(getStoredPatients);
  const [open, setOpen] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    id: '', patientId: '', title: '', description: '', comments: '',
    appointmentDate: '', cost: '', status: '', nextDate: '', files: []
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleOpen = () => {
    setFormData({
      id: '', patientId: '', title: '', description: '', comments: '',
      appointmentDate: '', cost: '', status: '', nextDate: '', files: []
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(results => {
      setFormData({ ...formData, files: results });
    });
  };

  const handleSave = () => {
    if (formData.id) {
      setAppointments(appointments.map(a => a.id === formData.id ? formData : a));
    } else {
      setAppointments([...appointments, { ...formData, id: uuidv4() }]);
    }
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Appointment Management</Typography>
      <Button variant="contained" onClick={handleOpen}>Add Appointment</Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appt => (
              <TableRow key={appt.id}>
                <TableCell>{patients.find(p => p.id === appt.patientId)?.name || 'Unknown'}</TableCell>
                <TableCell>{appt.title}</TableCell>
                <TableCell>{appt.appointmentDate}</TableCell>
                <TableCell>{appt.status}</TableCell>
                <TableCell>{appt.cost}</TableCell>
                <TableCell>
                  {appt.files?.map(file => (
                    <Button
                      key={file.name}
                      variant="text"
                      size="small"
                      onClick={() => {
                        if (file.url.startsWith('data:image')) {
                          setImagePreviewUrl(file.url);
                          setImagePreviewOpen(true);
                        } else {
                          const link = document.createElement('a');
                          link.href = file.url;
                          link.download = file.name;
                          link.click();
                        }
                      }}
                    >
                      {file.name}
                    </Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Appointment Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Appointment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Patient</InputLabel>
            <Select
              value={formData.patientId}
              onChange={e => setFormData({ ...formData, patientId: e.target.value })}
              label="Patient"
            >
              {patients.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth margin="dense" label="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <TextField fullWidth margin="dense" label="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          <TextField fullWidth margin="dense" label="Comments" value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} />
          <TextField fullWidth type="datetime-local" margin="dense" label="Appointment Date" InputLabelProps={{ shrink: true }} value={formData.appointmentDate} onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })} />
          <TextField fullWidth margin="dense" label="Cost" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth type="date" margin="dense" label="Next Appointment Date" InputLabelProps={{ shrink: true }} value={formData.nextDate} onChange={e => setFormData({ ...formData, nextDate: e.target.value })} />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
            Upload Files
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          {formData.files?.map(f => (
            <Typography key={f.name} variant="body2">{f.name}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={imagePreviewOpen} onClose={() => setImagePreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 500 }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
