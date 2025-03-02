export enum UserRole {
  ADMIN = 'admin',
  SECRETARY = 'secretary',
  USER = 'user',
  PATIENT = 'patient'
}

export enum Permission {
  VIEW_PATIENTS = 'view_patients',
  EDIT_PATIENTS = 'edit_patients',
  DELETE_PATIENTS = 'delete_patients',
  VIEW_APPOINTMENTS = 'view_appointments',
  SCHEDULE_APPOINTMENTS = 'schedule_appointments',
  CANCEL_APPOINTMENTS = 'cancel_appointments',
  VIEW_PAYMENTS = 'view_payments',
  PROCESS_PAYMENTS = 'process_payments',
  VIEW_REPORTS = 'view_reports',
  MANAGE_USERS = 'manage_users',
  MANAGE_PERMISSIONS = 'manage_permissions',
  MANAGE_STOCK = 'manage_stock',
  DATA_ENTRY = 'data_entry'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PermissionUpdate {
  userId: string;
  permissions: Permission[];
}
