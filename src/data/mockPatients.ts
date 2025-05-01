export interface Treatment {
  id: number;
  date: Date;
  procedure: string;
  tooth: string;
  notes: string;
  cost: number;
  status: 'completed' | 'scheduled' | 'in-progress';
}

export interface PatientDetails {
  id: number;
  name: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  address: string;
  medicalHistory: {
    allergies: string[];
    conditions: string[];
    medications: string[];
  };
  lastVisit: Date;
  nextAppointment: Date | null;
  isActive: boolean;
  treatments: Treatment[];
}

export const mockPatients: PatientDetails[] = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: new Date("1990-05-15"),
    phone: "+1 234 567 8900",
    email: "john.doe@email.com",
    address: "123 Main St, City, Country",
    medicalHistory: {
      allergies: ["Penicillin", "Latex"],
      conditions: ["Hypertension"],
      medications: ["Lisinopril"]
    },
    lastVisit: new Date("2025-04-30"),
    nextAppointment: new Date("2025-05-15"),
    isActive: true,
    treatments: [
      {
        id: 1,
        date: new Date("2025-04-30"),
        procedure: "Root Canal",
        tooth: "16",
        notes: "Upper right first molar",
        cost: 800,
        status: "completed"
      },
      {
        id: 2,
        date: new Date("2025-05-15"),
        procedure: "Crown Placement",
        tooth: "16",
        notes: "Following root canal treatment",
        cost: 1000,
        status: "scheduled"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    dateOfBirth: new Date("1985-08-22"),
    phone: "+1 234 567 8901",
    email: "jane.smith@email.com",
    address: "456 Oak St, City, Country",
    medicalHistory: {
      allergies: ["None"],
      conditions: ["Diabetes Type 2"],
      medications: ["Metformin"]
    },
    lastVisit: new Date("2025-04-28"),
    nextAppointment: new Date("2025-05-20"),
    isActive: true,
    treatments: [
      {
        id: 3,
        date: new Date("2025-04-28"),
        procedure: "Dental Cleaning",
        tooth: "All",
        notes: "Regular checkup and cleaning",
        cost: 150,
        status: "completed"
      },
      {
        id: 4,
        date: new Date("2025-05-20"),
        procedure: "Cavity Filling",
        tooth: "24",
        notes: "Small cavity on upper left first premolar",
        cost: 200,
        status: "scheduled"
      }
    ]
  },
  {
    id: 3,
    name: "Robert Johnson",
    dateOfBirth: new Date("1978-12-03"),
    phone: "+1 234 567 8902",
    email: "robert.johnson@email.com",
    address: "789 Pine St, City, Country",
    medicalHistory: {
      allergies: ["Aspirin"],
      conditions: ["None"],
      medications: ["None"]
    },
    lastVisit: new Date("2025-03-15"),
    nextAppointment: null,
    isActive: false,
    treatments: [
      {
        id: 5,
        date: new Date("2025-03-15"),
        procedure: "Tooth Extraction",
        tooth: "48",
        notes: "Impacted wisdom tooth",
        cost: 350,
        status: "completed"
      }
    ]
  }
];
