import { api, apiService } from './api';
import { API_ENDPOINTS } from '@/config/constants';
import {
    RegisterUserDto,
    LoginDto,
    AuthResponseDto,
} from '@/types/auth.types';

export class AuthApiService {
    async register(data: RegisterUserDto): Promise<AuthResponseDto> {
        const response = await api.post<AuthResponseDto>(
            API_ENDPOINTS.AUTH_REGISTER,
            data
        );

        if (response.data.token) {
            apiService.setToken(response.data.token);
        }

        return response.data;
    }

    async login(data: LoginDto): Promise<AuthResponseDto> {
        const response = await api.post<AuthResponseDto>(
            API_ENDPOINTS.AUTH_LOGIN,
            data
        );

        if (response.data.token) {
            apiService.setToken(response.data.token);
        }

        return response.data;
    }

    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
        }
    }

    getStoredToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('authToken');
    }
}

export const authApi = new AuthApiService();