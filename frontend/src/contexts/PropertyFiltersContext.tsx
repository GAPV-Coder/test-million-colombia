'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { PropertyFilters } from '@/types/property.types';

interface PropertyFiltersContextValue {
    filters: PropertyFilters;
    setFilters: (filters: PropertyFilters) => void;
    resetFilters: () => void;
    updateFilter: (key: keyof PropertyFilters, value: PropertyFilters[keyof PropertyFilters]) => void;
}

const PropertyFiltersContext = createContext<PropertyFiltersContextValue | undefined>(undefined);

interface PropertyFiltersProviderProps {
    children: ReactNode;
    initialFilters?: PropertyFilters;
}

export function PropertyFiltersProvider({
    children,
    initialFilters = { page: 1, pageSize: 6 }
}: PropertyFiltersProviderProps) {
    const [filters, setFiltersState] = useState<PropertyFilters>(initialFilters);

    const setFilters = useCallback((newFilters: PropertyFilters) => {
        setFiltersState(newFilters);
    }, []);

    const resetFilters = useCallback(() => {
        setFiltersState(initialFilters);
    }, [initialFilters]);

    const updateFilter = useCallback((
        key: keyof PropertyFilters,
        value: PropertyFilters[keyof PropertyFilters]
    ) => {
        setFiltersState((prev) => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : prev.page, // Volver a la primera página cuando cambien otros filtros
        }));
    }, []);

    return (
        <PropertyFiltersContext.Provider value={{ filters, setFilters, resetFilters, updateFilter }}>
            {children}
        </PropertyFiltersContext.Provider>
    );
}

export function usePropertyFilters() {
    const context = useContext(PropertyFiltersContext);
    if (context === undefined) {
        throw new Error('usePropertyFilters must be used within a PropertyFiltersProvider');
    }
    return context;
}