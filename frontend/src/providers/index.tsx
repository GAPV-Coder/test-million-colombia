'use client';

import { ReactNode } from 'react';
import { ReactQueryProvider } from './ReactQueryProvider';
import { ReduxProvider } from './ReduxProvider';
import { AuthProvider } from './AuthProvider';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ReduxProvider>
            <ReactQueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ReactQueryProvider>
        </ReduxProvider>
    );
}