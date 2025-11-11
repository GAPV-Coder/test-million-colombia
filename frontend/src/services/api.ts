import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/config/constants';
import https from 'node:https';

class ApiService {
    private instance: AxiosInstance;

    constructor() {
        // Configurar agente HTTPS que ignore certificados solo en desarrollo
        const httpsAgent =
            process.env.NODE_ENV === 'development'
                ? new https.Agent({ rejectUnauthorized: false })
                : undefined

        this.instance = axios.create({
            baseURL: API_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent,
            withCredentials: false,
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
                console.log('🔑 Token en localStorage:', token ? 'EXISTE' : 'NO EXISTE');
                if (token) {
                    console.log('🔑 Primeros 20 caracteres del token:', token.substring(0, 20));
                }
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('authToken');
    }

    private clearToken(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('authToken');
    }

    public setToken(token: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('authToken', token);
    }

    public getAxiosInstance(): AxiosInstance {
        return this.instance;
    }
}

export const apiService = new ApiService();
export const api = apiService.getAxiosInstance();