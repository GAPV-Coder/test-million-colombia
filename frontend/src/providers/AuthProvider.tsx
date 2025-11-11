'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { restoreSession } from '@/store/slices/userSlice';
import { storage, STORAGE_KEYS } from '@/utils/localStorage';
import { UserDto } from '@/types/auth.types';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Cargar el estado de autenticación desde localStorage al montar
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken')
            const userStr = localStorage.getItem('user')

            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr) as UserDto
                    dispatch(restoreSession({ user, token }))
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error)
                    localStorage.removeItem('authToken')
                    localStorage.removeItem('user')
                }
            }
        }
    }, [dispatch]);

    return <>{children}</>;
}