import { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    statusCode?: number;
    details?: Record<string, unknown>;
}

export const handleApiError = (error: unknown): ApiError => {
    if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const message = error.response?.data?.message || error.message;
        const details = error.response?.data;

        return {
            message,
            statusCode,
            details,
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    return {
        message: 'Ocurrió un error desconocido',
    };
};

export const getErrorMessage = (error: unknown): string => {
    const apiError = handleApiError(error);
    return apiError.message;
};