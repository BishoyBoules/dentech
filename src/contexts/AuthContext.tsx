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
        // Mock user data
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
          permissions: Object.values(Permission),
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

      // Mock admin login for admin@example.com/admin
      if (email === 'admin@example.com' && password === 'admin') {
        const mockUser: User = {
          id: '2',
          email: 'admin@example.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
          permissions: Object.values(Permission),
          createdAt: '2025-02-23T21:08:17+02:00',
          updatedAt: '2025-02-23T21:08:17+02:00'
        };

        localStorage.setItem('token', 'mock-jwt-token-admin');
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return;
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      localStorage.removeItem('token');
      setAuthState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid credentials'
      }));
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const register = async (email: string, _password: string, name: string, role: UserRole = UserRole.USER) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Mock registration
      const mockUser: User = {
        id: Math.random().toString(),
        email,
        name,
        role,
        permissions: role === UserRole.ADMIN ? Object.values(Permission) : [Permission.VIEW_APPOINTMENTS],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('token', 'mock-jwt-token');
      setAuthState({
        user: mockUser,
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
      throw error;
    }
  };

  const updateUserPermissions = async (userId: string, permissions: Permission[]) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));

      if (authState.user && authState.user.id === userId) {
        setAuthState(prev => ({
          ...prev,
          user: prev.user ? { ...prev.user, permissions } : null,
          isLoading: false,
        }));
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update permissions',
      }));
      throw error;
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: UserRole.ADMIN,
        permissions: Object.values(Permission),
        createdAt: '2025-02-23T21:08:17+02:00',
        updatedAt: '2025-02-23T21:08:17+02:00',
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: UserRole.USER,
        permissions: [Permission.VIEW_APPOINTMENTS],
        createdAt: '2025-02-23T21:08:17+02:00',
        updatedAt: '2025-02-23T21:08:17+02:00',
      },
    ];
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
