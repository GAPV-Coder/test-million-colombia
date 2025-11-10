import {
    useMutation,
    UseMutationResult,
} from '@tanstack/react-query';
import { authApi } from '@/services/auth.api';
import {
    RegisterUserDto,
    LoginDto,
    AuthResponseDto,
} from '@/types/auth.types';
import { useAppDispatch } from '../store/hooks';
import { setUser, clearUser } from '../store/slices/userSlice';

export const useRegister = () => {
    const dispatch = useAppDispatch();

    return useMutation<AuthResponseDto, Error, RegisterUserDto>({
        mutationFn: (data) => authApi.register(data),
        onSuccess: (response) => {
            dispatch(setUser({
                user: response.user,
                token: response.token,
            }));
        },
    });
};

export const useLogin = () => {
    const dispatch = useAppDispatch();

    return useMutation<AuthResponseDto, Error, LoginDto>({
        mutationFn: (data) => authApi.login(data),
        onSuccess: (response) => {
            dispatch(setUser({
                user: response.user,
                token: response.token,
            }));
        },
    });
};

export const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        authApi.logout();
        dispatch(clearUser());
    };
};