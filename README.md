# ENTNT_Dental_Center_Management
# 🦷 Dental Center Management Dashboard

A modern **Frontend-only Dental Management System** built with **React** and **Material UI (MUI)**. This project simulates a real dental clinic's internal dashboard for **Admins (Dentists)** and **Patients**, handling patient records, appointments, reports, and file uploads using `localStorage`.

---

## 🚀 Features

✅ Role-based login for Admin and Patients  
✅ Patient Management (Create, View, Update, Delete)  
✅ Appointment Management with file attachments (Base64)  
✅ Calendar View for Appointments  
✅ KPI Dashboard for Admins (e.g., Total Patients, Revenue, etc.)  
✅ Simulated login credentials stored in `localStorage`  
✅ Fully responsive and mobile-friendly UI  
✅ Persistent state using Context + `sessionStorage`  
✅ Dark Mode toggle

---

## 📁 Folder Structure

```
├── public/
├── src/
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable components (MenuBar, ProtectedRoute, etc.)
│   ├── context/          # AuthContext to handle login sessions
│   ├── pages/            # Role-based pages: Login, Dashboard, Patients, etc.
│   ├── theme/            # MUI custom theme setup
│   ├── utils/            # seedData.js for localStorage simulation
│   ├── App.jsx           # Routes and role-based rendering
│   └── main.jsx          # App root with ThemeProvider and AuthProvider
├── README.md
└── package.json
```

---

## 🛠️ Setup Instructions

> ⚠️ Prerequisite: Node.js ≥ 16, npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dental-dashboard.git
cd dental-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Login Credentials

### 👩‍⚕️ Admin Login

| Username | Password | Role  |
|----------|----------|-------|
| admin    | admin123 | Admin |

---

### 👨‍💼 Patient Logins

| Email               | Password   | ID  |
|---------------------|------------|-----|
| suhel@demo.com      | suhel123   | p1  |
| hiddu@demo.com      | hiddu123   | p2  |
| ravi@demo.com       | ravi123    | p3  |
| ayesha@demo.com     | ayesha123  | p4  |
| vikram@demo.com     | vikram123  | p5  |

> All data is seeded to `localStorage` automatically on first load.

---

## 🧠 Technical Decisions

| Area           | Choice Made                                                          |
|----------------|----------------------------------------------------------------------|
| Framework      | React 18 with Vite for fast build and HMR                           |
| Styling        | Material UI (MUI v5) with light/dark themes                         |
| State Mgmt     | React Context API for Auth + sessionStorage for persistence         |
| Routing        | `react-router-dom` v6 with protected routes                         |
| Data Storage   | `localStorage` simulates backend storage for patients, appointments |
| Auth           | Role-based: Admin (hardcoded) and Patients (seeded credentials)     |
| File Uploads   | Base64 encoding of files stored in localStorage                     |

---

## 🧱 Architecture Overview

```
User ➝ Login ➝ Role-based Redirect ➝ Dashboard
                       ├── Admin Dashboard
                       │    ├── KPI Summary (Total Patients, Revenue)
                       │    ├── Patient Management (CRUD)
                       │    ├── Appointments + Calendar
                       │    └── Upload/View Base64 files
                       └── Patient Dashboard
                            └── View Personal Appointments + Files Only
```

---

## ⚙️ State & Storage

- 🔐 **AuthContext** – Manages session and role
- 🗄️ **localStorage** – For patient, appointment, and credential data
- 💾 **sessionStorage** – Persists login state across refreshes

---

## 🐛 Known Limitations

- ❌ No real backend — all data is local to the browser
- ❌ File uploads are stored as Base64 (not optimized)
- ❌ No advanced input validations (e.g., future DOB, email regex)
- ❌ No pagination or filters for large lists

> These trade-offs were made due to the **frontend-only constraint** of the assignment.

---

## 🔄 Reset Seed Data (Developer Tip)

If you want to reset everything (patients, appointments, credentials):

1. Open DevTools → Console  
2. Paste and run:

```js
localStorage.clear();
sessionStorage.clear();
window.location.reload();
```

---

## 📦 Deployment

To deploy on Netlify, Vercel, or GitHub Pages:

```bash
npm run build
```

- Netlify: drag `dist/` to deploy
- Vercel: connect repo and deploy
- GitHub Pages: configure `vite.config.js` with `base` option

---

## 📄 License

This project is open-sourced for evaluation and academic purposes only.  
© 2025 Mohammed Suhel

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)

---

## 📬 Contact

- 📧 Email: suhelshaik.official@gmail.com  
- 🔗 LinkedIn: [linkedin.com/in/shaik-mohammed-suhel-448443281](https://www.linkedin.com/in/shaik-mohammed-suhel-448443281)
>>>>>>> b45e282 (Final project files and documentation added)
