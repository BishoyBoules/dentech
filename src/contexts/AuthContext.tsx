import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, UserRole, Permission } from '../types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  updateUserPermissions: (userId: string, permissions: Permission[]) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // TODO: Replace with actual API call
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          role: UserRole.USER,
          permissions: [Permission.VIEW_APPOINTMENTS, Permission.VIEW_PATIENTS],
          createdAt: '2025-02-23T20:56:21+02:00',
          updatedAt: '2025-02-23T20:56:21+02:00',
        };

        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to check auth status',
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      // Mock successful login for test@example.com/password
      if (email === 'test@example.com' && password === 'password') {
        const mockData = {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: UserRole.USER,
            permissions: [Permission.VIEW_APPOINTMENTS, Permission.VIEW_PATIENTS],
            createdAt: '2025-02-23T21:08:17+02:00',
            updatedAt: '2025-02-23T21:08:17+02:00'
          }
        };

        localStorage.setItem('token', mockData.token);
        setAuthState({
          user: mockData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return;
      }

      // Mock admin login for admin@example.com/admin
      if (email === 'admin@example.com' && password === 'admin') {
        const mockData = {
          token: 'mock-jwt-token-admin',
          user: {
            id: '2',
            email: 'admin@example.com',
            name: 'Admin User',
            role: UserRole.ADMIN,
            permissions: Object.values(Permission),
            createdAt: '2025-02-23T21:08:17+02:00',
            updatedAt: '2025-02-23T21:08:17+02:00'
          }
        };

        localStorage.setItem('token', mockData.token);
        setAuthState({
          user: mockData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return;
      }

      // Mock secretary login for secretary@example.com/secretary
      if (email === 'secretary@example.com' && password === 'secretary') {
        const mockData = {
          token: 'mock-jwt-token-secretary',
          user: {
            id: '3',
            email: 'secretary@example.com',
            name: 'Secretary User',
            role: UserRole.SECRETARY,
            permissions: [
              Permission.VIEW_PATIENTS,
              Permission.EDIT_PATIENTS,
              Permission.VIEW_APPOINTMENTS,
              Permission.SCHEDULE_APPOINTMENTS,
              Permission.VIEW_PAYMENTS
            ],
            createdAt: '2025-02-23T21:08:17+02:00',
            updatedAt: '2025-02-23T21:08:17+02:00'
          }
        };

        localStorage.setItem('token', mockData.token);
        setAuthState({
          user: mockData.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return;
      }

      // If no matching credentials, throw error
      throw new Error('Invalid credentials');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed',
      }));
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Logout failed',
      }));
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = UserRole.USER) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // TODO: Replace with actual API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      const user: User = data.user;
      localStorage.setItem('token', data.token);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed',
      }));
    }
  };

  // Add these mock users for testing
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
      permissions: [Permission.VIEW_APPOINTMENTS, Permission.VIEW_PATIENTS],
      createdAt: '2025-02-23T21:16:17+02:00',
      updatedAt: '2025-02-23T21:16:17+02:00'
    },
    {
      id: '2',
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
      permissions: Object.values(Permission),
      createdAt: '2025-02-23T21:16:17+02:00',
      updatedAt: '2025-02-23T21:16:17+02:00'
    },
    {
      id: '3',
      email: 'secretary@example.com',
      name: 'Secretary User',
      role: UserRole.SECRETARY,
      permissions: [
        Permission.VIEW_PATIENTS,
        Permission.EDIT_PATIENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.SCHEDULE_APPOINTMENTS,
        Permission.VIEW_PAYMENTS
      ],
      createdAt: '2025-02-23T21:16:17+02:00',
      updatedAt: '2025-02-23T21:16:17+02:00'
    }
  ];

  const getAllUsers = async (): Promise<User[]> => {
    // In a real app, this would be an API call
    return mockUsers;
  };

  const updateUserPermissions = async (userId: string, permissions: Permission[]) => {
    try {
      // In a real app, this would be an API call
      const userToUpdate = mockUsers.find(u => u.id === userId);
      if (!userToUpdate) {
        throw new Error('User not found');
      }

      // Update the mock user's permissions
      userToUpdate.permissions = permissions;
      userToUpdate.updatedAt = new Date().toISOString();

      // If the current user is being updated, update the auth state
      if (authState.user?.id === userId) {
        setAuthState(prev => ({
          ...prev,
          user: {
            ...prev.user!,
            permissions,
            updatedAt: new Date().toISOString()
          }
        }));
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to update permissions'
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
        updateUserPermissions,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
