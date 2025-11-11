import { render, screen } from '@testing-library/react';
import { PropertyFilters } from '@/features/properties/PropertyFilters';
import { PropertyFilters as Filters } from '@/types/property.types';

type UseDebounceFn = <T>(value: T) => T;

interface UseDebounceModule {
    useDebounce: UseDebounceFn;
}

jest.mock('@/hooks/useDebounce', (): UseDebounceModule => ({
    useDebounce: <T,>(value: T): T => value
}));

const mockFilters: Filters = {
    page: 1,
    pageSize: 6
};
const mockOnFiltersChange = jest.fn();
const mockOnClearFilters = jest.fn();

describe('PropertyFilters', () => {
    it('renders search inputs correctly', () => {
        render(
            <PropertyFilters
                filters={mockFilters}
                onFiltersChange={mockOnFiltersChange}
                onClearFilters={mockOnClearFilters}
            />
        );
        expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument();
    });
});