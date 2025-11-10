export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
} as const;