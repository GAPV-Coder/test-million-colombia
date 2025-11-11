import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyDto } from '@/types/property.types';

interface PropertiesState {
    selectedProperty: PropertyDto | null;
    favoriteIds: string[];
    viewMode: 'grid' | 'list';
}

// Cargar favoritos desde localStorage
const loadFavoritesFromStorage = (): string[] => {
    if (typeof window === 'undefined') return []
    try {
        const stored = localStorage.getItem('favorites')
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

// Guardar favoritos en localStorage
const saveFavoritesToStorage = (favoriteIds: string[]) => {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem('favorites', JSON.stringify(favoriteIds))
    } catch (error) {
        console.error('Error saving favorites:', error)
    }
}

const initialState: PropertiesState = {
    selectedProperty: null,
    favoriteIds: loadFavoritesFromStorage(),
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

            saveFavoritesToStorage(state.favoriteIds);
        },
        setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewMode = action.payload;
        },
        clearFavorites: (state) => {
            state.favoriteIds = [];
            saveFavoritesToStorage([]);
        },
    },
});

export const {
    setSelectedProperty,
    toggleFavorite,
    setViewMode,
    clearFavorites,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;