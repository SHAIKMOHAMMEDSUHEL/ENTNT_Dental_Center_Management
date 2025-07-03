import { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Dialog,
  DialogTitle, DialogContent, List, ListItem, ListItemText,
  IconButton, Badge, useTheme
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

const getAppointments = () => JSON.parse(localStorage.getItem('appointments') || '[]');

export default function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const theme = useTheme();

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day(); // Sunday = 0
  const todayStr = dayjs().format('YYYY-MM-DD');

  const handleClick = (dateStr) => {
    setSelectedDate(dateStr);
    setOpen(true);
  };

  const appointmentsForDate = (dateStr) =>
    appointments.filter(a =>
      dayjs(a.appointmentDate).format('YYYY-MM-DD') === dateStr ||
      (a.nextDate && dayjs(a.nextDate).format('YYYY-MM-DD') === dateStr)
    );

  const calendarCells = [
    ...Array(startDay).fill(null),
    ...[...Array(daysInMonth).keys()].map(i => startOfMonth.add(i, 'day'))
  ];

  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  const isToday = (dateStr) => dateStr === todayStr;

  const getCellBgColor = (count, isTodayFlag) => {
    if (isTodayFlag) return theme.palette.mode === 'dark' ? '#1976d2' : '#0288d1';
    if (count > 0) return theme.palette.mode === 'dark' ? '#33691e' : '#c8e6c9';
    return theme.palette.background.paper;
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Month Navigation */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <IconButton onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
          {currentMonth.format('MMMM YYYY')}
        </Typography>
        <IconButton onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Weekday Headers */}
      <Box display="flex">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Box
            key={day}
            flexBasis="14.28%"
            textAlign="center"
            sx={{
              py: 1,
              fontWeight: 'bold',
              color: index === 0 || index === 6 ? 'error.main' : 'text.primary',
            }}
          >
            {day}
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      {weeks.map((week, i) => (
        <Box display="flex" key={i}>
          {week.map((date, index) => {
            const isDate = date !== null;
            const dateStr = isDate ? dayjs(date).format('YYYY-MM-DD') : '';
            const isTodayFlag = isDate && isToday(dateStr);
            const count = isDate ? appointmentsForDate(dateStr).length : 0;

            return (
              <Box
                key={index}
                flexBasis="14.28%"
                p={0.5}
                sx={{ height: { xs: 80, sm: 90, md: 100 } }}
              >
                {isDate ? (
                  <Paper
                    elevation={2}
                    onClick={() => handleClick(dateStr)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      bgcolor: getCellBgColor(count, isTodayFlag),
                      border: isTodayFlag ? '2px solid #fff' : '1px solid',
                      borderColor: theme.palette.divider,
                      '&:hover': {
                        boxShadow: 6,
                        bgcolor: theme.palette.mode === 'dark' ? '#424242' : '#b2dfdb'
                      },
                      color: isTodayFlag ? '#fff' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2" fontWeight={isTodayFlag ? 'bold' : 'normal'}>
                      {dayjs(date).date()}
                    </Typography>
                    {count > 0 && (
                      <Badge
                        color="primary"
                        badgeContent={count}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Paper>
                ) : (
                  <Box sx={{ height: '100%', opacity: 0.2 }} />
                )}
              </Box>
            );
          })}
        </Box>
      ))}

      {/* Appointment Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Appointments for {selectedDate}</DialogTitle>
        <DialogContent dividers>
          {appointmentsForDate(selectedDate).length > 0 ? (
            <List>
              {appointmentsForDate(selectedDate).map((a) => (
                <ListItem key={a.id} sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {a.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" component="div">
                        <strong>Patient ID:</strong> {a.patientId}<br />
                        <strong>Main:</strong> {dayjs(a.appointmentDate).format('YYYY-MM-DD HH:mm')}
                        {a.nextDate && dayjs(a.nextDate).format('YYYY-MM-DD') === selectedDate && (
                          <>
                            <br />
                            <strong>Next:</strong> {dayjs(a.nextDate).format('YYYY-MM-DD')}
                          </>
                        )}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No appointments scheduled for this day.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
