import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// Initial state in the store
const initialState = {
    user: user ? user : null, // If there is no user in localStorage assign null to user state
    isErrorUser: false,
    isLoadingUser: false,
    isSuccessUser: false,
    messageUser: '',
}

// Register user async thunk function
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user async thunk function
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingUser = false
            state.isSuccessUser = false
            state.isErrorUser = false
            state.messageUser = ''
        },
    },
    extraReducers: (builder) => {
        builder // Register extra reducers
        .addCase(register.pending, (state) => {
            state.isLoadingUser = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoadingUser = false
            state.isSuccessUser = true
            state.user = action.payload 
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoadingUser = false
            state.isErrorUser = true
            state.messageUser = action.payload
            state.user = null // Error while registering no user is created
        }) // Login extra reducers
        .addCase(login.pending, (state) => {
            state.isLoadingUser = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoadingUser = false
            state.isSuccessUser = true
            state.user = action.payload 
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoadingUser = false
            state.isErrorUser = true
            state.messageUser = action.payload
            state.user = null // Error while registering no user is created
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })

    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer