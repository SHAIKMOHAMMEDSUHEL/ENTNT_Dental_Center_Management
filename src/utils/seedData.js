export const seedPatients = [
    {
      id: 'p1',
      name: 'Suhel Shaik',
      dob: '2003-12-16',
      contact: '9876543210',
      healthInfo: 'Sensitive teeth, Type 1 Diabetic'
    },
    {
      id: 'p2',
      name: 'Hiddu Kumar',
      dob: '1979-09-25',
      contact: '9123456780',
      healthInfo: 'Hypertension, Regular smoker'
    }
  ];
  
  export const seedCredentials = {
    p1: { username: 'suhel@demo.com', password: 'suhel123' },
    p2: { username: 'hiddu@demo.com', password: 'hiddu123' }
  };
  
  export const seedAppointments = [
    {
      id: 'a1',
      patientId: 'p1',
      title: 'Teeth Scaling and Polishing',
      description: 'Routine dental cleaning to remove plaque',
      comments: 'Minor bleeding during scaling. Advised sensitive toothpaste.',
      appointmentDate: '2025-07-04T10:00',
      cost: '1200',
      status: 'Pending',
      nextDate: '2025-10-04',
      files: []
    },
    {
      id: 'a2',
      patientId: 'p1',
      title: 'Dental X-Ray Review',
      description: 'Reviewing wisdom tooth X-ray',
      comments: 'Impacted third molar. Extraction advised next month.',
      appointmentDate: '2025-06-01T09:30',
      cost: '800',
      status: 'Completed',
      nextDate: '',
      files: [
        { name: 'wisdom-xray.png', url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...' }
      ]
    },
    {
      id: 'a3',
      patientId: 'p2',
      title: 'Root Canal Treatment - Lower Molar',
      description: 'Stage 1 of 3: Cleaning and temporary filling',
      comments: 'Patient experienced slight swelling. Prescribed antibiotics.',
      appointmentDate: '2025-06-20T11:15',
      cost: '3500',
      status: 'Completed',
      nextDate: '2025-07-01',
      files: []
    },
    {
      id: 'a4',
      patientId: 'p2',
      title: 'Dental Bridge Consultation',
      description: 'Discussing bridge placement after extraction',
      comments: 'Bridge plan finalized. Scheduled for next week.',
      appointmentDate: '2025-07-03T15:00',
      cost: '500',
      status: 'Pending',
      nextDate: '2025-07-10',
      files: []
    }
  ];
  