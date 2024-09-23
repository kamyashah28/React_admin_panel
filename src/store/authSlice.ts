import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

interface User {
    id: number;
    email: string;
    password: string;
    username: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
    forgotPasswordSuccess: boolean;
    resetPasswordSuccess: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
};

export const loginUser = createAsyncThunk<User, { email: string; password: string }, { state: RootState }>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/users', {
                params: {
                    email: credentials.email,
                    password: credentials.password,
                },
            });

            const user = response.data.find(
                (user) => user.email === credentials.email && user.password === credentials.password
            );

            if (user) {
                return user;
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue('Error logging in');
        }
    }
);

export const registerUser = createAsyncThunk<User, { email: string; password: string; username: string }, { state: RootState }>(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/users', {
                params: {
                    email: credentials.email,
                },
            });

            if (response.data.length > 0) {
                return rejectWithValue('Email already exists');
            }

            const newUser = {
                email: credentials.email,
                password: credentials.password,
                username: credentials.username,
            };

            const createResponse = await axios.post('http://localhost:3000/users', newUser);
            return createResponse.data;
        } catch (error) {
            return rejectWithValue('Error registering user');
        }
    }
);

export const forgotPassword = createAsyncThunk<void, { email: string }, { state: RootState }>(
    'auth/forgotPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/users', {
                params: { email: data.email },
            });

            const user = response.data.find((user) => user.email === data.email);

            if (user) {
                return;
            } else {
                return rejectWithValue('Email not found');
            }
        } catch (error) {
            return rejectWithValue('Error sending reset link');
        }
    }
);

export const resetPassword = createAsyncThunk<void, { email: string; newPassword: string }, { state: RootState }>(
    'auth/resetPassword',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/users', {
                params: { email: data.email },
            });

            const user = response.data.find((user) => user.email === data.email);

            if (user) {
                await axios.patch(`http://localhost:3000/users/${user.id}`, { password: data.newPassword });
                return;
            } else {
                return rejectWithValue('User not found');
            }
        } catch (error) {
            return rejectWithValue('Error resetting password');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.forgotPasswordSuccess = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.forgotPasswordSuccess = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.resetPasswordSuccess = false;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.resetPasswordSuccess = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
