import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000/api';

// Tipo para las respuestas estandarizadas del backend
interface ApiResponse<T = any> {
  error: boolean;
  message: string;
  data?: T;
}

class ApiClient {
  private client: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Si la respuesta tiene el formato estandarizado, verificar errores
        if (response.data && typeof response.data === 'object' && 'error' in response.data) {
          const apiResponse = response.data as ApiResponse;
          
          // Si el backend indica error, convertirlo en excepción
          if (apiResponse.error) {
            const error = new Error(apiResponse.message) as any;
            error.response = {
              data: apiResponse,
              status: response.status,
              statusText: response.statusText,
            };
            throw error;
          }
          
          // Devolver solo los datos si no hay error
          return { ...response, data: apiResponse.data };
        }
        
        return response;
      },
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as any;

        // Si el token expiró y no estamos ya refrescando
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Si el refresh falla, cerrar sesión
            this.handleLogout();
            return Promise.reject(refreshError);
          }
        }

        // Extraer mensaje de error de la respuesta estandarizada
        if (error.response?.data?.message) {
          error.message = error.response.data.message;
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<string> {
    // Evitar múltiples refreshes simultáneos
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const refreshToken = sessionStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);

        return data.access_token;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private handleLogout() {
    sessionStorage.clear();
    window.location.href = '/login';
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const { data } = await this.client.post('/auth/signin', { email, password });
    
    // Validar que el usuario sea ADMIN o STAFF
    if (data.user.role !== 'ADMIN' && data.user.role !== 'STAFF') {
      throw new Error('Acceso denegado. Solo administradores y staff pueden acceder al dashboard.');
    }

    sessionStorage.setItem('access_token', data.access_token);
    sessionStorage.setItem('refresh_token', data.refresh_token);
    sessionStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async logout(allDevices = false) {
    try {
      await this.client.post('/auth/signout', { allDevices });
    } finally {
      this.handleLogout();
    }
  }

  async getMe() {
    const { data } = await this.client.get('/auth/me');
    return data;
  }

  // Products endpoints
  async getProducts(params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const { data } = await this.client.get('/products', { params });
    return data;
  }

  async getProduct(id: string) {
    const { data } = await this.client.get(`/products/${id}`);
    return data;
  }

  async createProduct(product: any) {
    const { data } = await this.client.post('/products', product);
    return data;
  }

  async updateProduct(id: string, product: any) {
    const { data } = await this.client.patch(`/products/${id}`, product);
    return data;
  }

  async deleteProduct(id: string) {
    const { data } = await this.client.delete(`/products/${id}`);
    return data;
  }

  // Categories endpoints
  async getCategories() {
    const { data } = await this.client.get('/categories');
    return data;
  }

  // Upload endpoints
  async uploadImage(file: File): Promise<{ url: string } | string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const { data } = await this.client.post<{ url: string }>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // El interceptor ya extrajo el data, pero verificamos por si acaso
    return data?.url || data;
  }

  async uploadImages(files: File[]): Promise<({ url: string } | string)[]> {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  // Users/Customers endpoints
  async getUsers(params?: { role?: string; limit?: number; offset?: number }) {
    const { data } = await this.client.get('/users', { params });
    return data;
  }

  // Sessions endpoints
  async getSessions() {
    const { data } = await this.client.get('/auth/sessions');
    return data;
  }

  async revokeSession(sessionId: string) {
    const { data } = await this.client.delete(`/auth/sessions/${sessionId}`);
    return data;
  }
}

export const apiClient = new ApiClient();
