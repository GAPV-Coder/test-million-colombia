import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyFilters } from '@/types/property.types';

interface FiltersState {
    activeFilters: PropertyFilters;
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'year';
}

const initialState: FiltersState = {
    activeFilters: {
        page: 1,
        pageSize: 6,
    },
    sortBy: 'name',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<PropertyFilters>) => {
            state.activeFilters = {
                ...state.activeFilters,
                ...action.payload,
                page: 1, // Volver a la primera página cuando cambien los filtros
            };
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.activeFilters.page = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.activeFilters.pageSize = action.payload;
            state.activeFilters.page = 1;
        },
        setSortBy: (state, action: PayloadAction<'name' | 'price-asc' | 'price-desc' | 'year'>) => {
            state.sortBy = action.payload;
        },
        clearFilters: (state) => {
            state.activeFilters = {
                page: 1,
                pageSize: 6,
            };
        },
        resetFilters: () => initialState,
    },
});

export const {
    setFilters,
    setPage,
    setPageSize,
    setSortBy,
    clearFilters,
    resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;