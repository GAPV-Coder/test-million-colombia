import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '@/types/auth.types';
import { storage, STORAGE_KEYS } from '@/utils/localStorage';

interface UserState {
    user: UserDto | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: UserDto; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            if (typeof window !== 'undefined') {
                localStorage.setItem('authToken', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            }
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken')
                localStorage.removeItem('user')
            }
        },
        updateUserProfile: (state, action: PayloadAction<Partial<UserDto>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };

                if (typeof window !== 'undefined') {
                    storage.set(STORAGE_KEYS.USER, state.user);
                }
            }
        },
        restoreSession: (state, action: PayloadAction<{ user: UserDto; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
});

export const { setUser, clearUser, updateUserProfile, restoreSession } = userSlice.actions;

export default userSlice.reducer;