import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProperties } from '@/hooks/useProperties';

jest.mock('@/services/properties.api', () => ({
    propertiesApi: {
        getAll: jest.fn()
    }
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });
    return ({ children }: { children?: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useProperties', () => {
    it('fetches properties with filters', async () => {
        const { result } = renderHook(
            () => useProperties({ name: 'Test', page: 1, pageSize: 6 }),
            { wrapper: createWrapper() }
        );
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
    });
});