import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Admin login
    if (email === 'admin' && password === 'admin123') {
      const adminUser = { role: 'Admin', name: 'Admin', email };
      setUser(adminUser);
      return adminUser;
    }

    // Patient login (from localStorage)
    const credentials = JSON.parse(localStorage.getItem('patientCredentials') || '{}');
    const patientId = Object.keys(credentials).find(
      id =>
        credentials[id].username === email &&
        credentials[id].password === password
    );

    if (patientId) {
      const patients = JSON.parse(localStorage.getItem('patients') || '[]');
      const patient = patients.find(p => p.id === patientId);
      if (patient) {
        const patientUser = {
          role: 'Patient',
          id: patient.id,
          name: patient.name,
          email: credentials[patientId].username
        };
        setUser(patientUser);
        return patientUser;
      }
    }

    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
