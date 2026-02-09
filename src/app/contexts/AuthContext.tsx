import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../../lib/api';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: (allDevices?: boolean) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay sesión activa
    const initAuth = async () => {
      const token = sessionStorage.getItem('access_token');
      const savedUser = sessionStorage.getItem('user');

      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          // Validar que sea ADMIN o STAFF
          if (parsedUser.role === 'ADMIN' || parsedUser.role === 'STAFF') {
            // Verificar token con el servidor
            const userData = await apiClient.getMe();
            setUser(userData);
          } else {
            // Si no es ADMIN ni STAFF, limpiar sesión
            sessionStorage.clear();
          }
        } catch (error) {
          console.error('Error al verificar sesión:', error);
          sessionStorage.clear();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const data = await apiClient.login(email, password);
      setUser(data.user);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (allDevices = false) => {
    try {
      await apiClient.logout(allDevices);
    } finally {
      setUser(null);
      sessionStorage.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
