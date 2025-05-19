import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { User, AuthState, UserRole, Permission } from '../types/user';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<{ token: string, user: User }>;
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

  // Check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is already logged in
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Set the token in axios headers
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        
        // Since we don't have a verify-token endpoint, we'll create a basic user object
        // In a real app, you might want to validate the token with the server
        const username = localStorage.getItem('username') || 'User';
        const userId = localStorage.getItem('userId') || '1';
        
        const user: User = {
          id: userId,
          email: username,
          name: username,
          role: UserRole.ADMIN,
          permissions: Object.values(Permission),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error restoring auth state:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Session expired. Please log in again.'
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  };

  const login = async (usernameParam: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Use POST method for login as it's the standard for credential submission
      // The 405 error indicates that GET is not allowed for this endpoint
      const response = await api.post<{ token: string; user_id: number; username: string }>('/api/accounts/login/', {
        username: usernameParam,
        password
      });

      console.log('Login response:', response.data); // Log the response data

      // Extract token and user from response based on the actual response format
      const token = response.data.token;
      const userId = response.data.user_id;
      const receivedUsername = response.data.username;

      // Create a user object with the information we have
      const user: User = {
        id: userId.toString(),
        email: receivedUsername, // Use username as email 
        name: receivedUsername,  // Use username as name
        role: UserRole.ADMIN,    // Default to admin role
        permissions: Object.values(Permission), // Default to all permissions
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Extracted token:', token);

      // Store authentication data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', receivedUsername);
      localStorage.setItem('userId', userId.toString());

      // Set the token in the authorization header for future requests
      // Using Token format which is common in Django REST Framework
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      // Return the token for direct access in the LoginPage
      return { token, user };
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
