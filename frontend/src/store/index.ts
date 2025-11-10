import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import userReducer from './slices/userSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
    reducer: {
        properties: propertiesReducer,
        user: userReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/setUser'],
                ignoredPaths: ['user.expiresAt'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;