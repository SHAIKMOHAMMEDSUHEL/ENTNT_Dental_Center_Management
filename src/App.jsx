import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Appointments from './pages/Appointments';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import AdminPatientDashboard from './pages/AdminPatientDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MenuBar from './components/MenuBar'; 

export default function App() {
  return (
    <Router>
      <MenuBar /> 
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/appointments" element={
          <ProtectedRoute role="Admin">
            <Appointments />
          </ProtectedRoute>
        } />

        <Route path="/admin/calendar" element={
          <ProtectedRoute role="Admin">
            <Calendar />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="Admin">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/patients" element={
          <ProtectedRoute role="Admin">
            <AdminPatientDashboard />
          </ProtectedRoute>
        } />

        <Route path="/patient" element={
          <ProtectedRoute role="Patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
