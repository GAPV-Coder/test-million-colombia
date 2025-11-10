import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyDto } from '@/types/property.types';

interface PropertiesState {
    selectedProperty: PropertyDto | null;
    favoriteIds: string[];
    viewMode: 'grid' | 'list';
}

const initialState: PropertiesState = {
    selectedProperty: null,
    favoriteIds: [],
    viewMode: 'grid',
};

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setSelectedProperty: (state, action: PayloadAction<PropertyDto | null>) => {
            state.selectedProperty = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const index = state.favoriteIds.indexOf(id);

            if (index > -1) {
                state.favoriteIds.splice(index, 1);
            } else {
                state.favoriteIds.push(id);
            }
        },
        setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewMode = action.payload;
        },
        clearFavorites: (state) => {
            state.favoriteIds = [];
        },
        loadFavoritesFromStorage: (state, action: PayloadAction<string[]>) => {
            state.favoriteIds = action.payload;
        },
    },
});

export const {
    setSelectedProperty,
    toggleFavorite,
    setViewMode,
    clearFavorites,
    loadFavoritesFromStorage,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;