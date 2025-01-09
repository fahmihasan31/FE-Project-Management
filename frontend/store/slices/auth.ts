import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '@/services/auth';

interface AuthState {
    user: any[] | null;
    loading: boolean;
    error: string | null;
}

const InitialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Thunk untuk login
export const login = createAsyncThunk('auth/login', async (payload: any, { rejectWithValue }) => {
    try {
        const response = await Services.login(payload);

        console.log('API Response:', response);

        if (response.data && response.data.data && response.data.data.token) {
            const { token } = response.data.data;
            console.log('Token:', token);
            localStorage.setItem('token', token);
        } else {
            console.error('Token is missing in the response data');
        }

        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed, invalid email or password');
    }
});

const AuthSlices = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = AuthSlices.actions;
export default AuthSlices.reducer;
