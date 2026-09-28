import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
});

export const { login, logout, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;