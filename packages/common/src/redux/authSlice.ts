import { createSlice } from "@reduxjs/toolkit"

interface AuthError{
    field: string;
    message: string;
}

interface AuthState {
    currentUser: any,
    error: AuthError | null,
    loading: boolean
}

const initialState:AuthState = {
    currentUser: null,
    error: null,
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        }, 
        signinSuccess: (state, action) => {
            state.currentUser = action.payload.token,
            state.loading = false;
            state.error = null;
        },
        signinFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.loading = false;
            state.error = null;
        }
    }
});

export const {
    signinStart,
    signinSuccess, 
    signinFailure, 
    signoutSuccess,
    clearError
} = authSlice.actions

export default authSlice.reducer