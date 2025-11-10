import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '@/types/auth.types';

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
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<UserDto>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;