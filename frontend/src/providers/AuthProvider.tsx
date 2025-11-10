'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/slices/userSlice';
import { storage, STORAGE_KEYS } from '@/utils/localStorage';
import { UserDto } from '@/types/auth.types';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Cargar el estado de autenticación desde localStorage al montar
        const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
        const user = storage.get<UserDto | null>(STORAGE_KEYS.USER, null);

        if (token && user) {
            dispatch(setUser({ user, token }));
        } else {
            dispatch(clearUser());
        }
    }, [dispatch]);

    return <>{children}</>;
}