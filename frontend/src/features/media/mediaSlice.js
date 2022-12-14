import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import mediaService from './mediaService'


const initialState = {
    medias: [],
    isErrorMedia: false,
    isSuccessMedia: false,
    isLoadingMedia: false,
    messageMedia: '',
}

// Add new media thunk function
export const addMedia = createAsyncThunk('media/add', async (mediaData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await mediaService.addMedia(mediaData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)  
    }
})

// Delete media
export const deleteMedia = createAsyncThunk('media/delete', async (mediaId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await mediaService.deleteMedia(mediaId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message) 
    }
})

export const editMedia = createAsyncThunk('media/edit', async (mediaData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await mediaService.editMedia(mediaData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message) 
    }
})

// Get all media thunk function
export const getAllMedia = createAsyncThunk('media/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await mediaService.getAllMedia(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message) 
    }
})


// Create new slice
export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        resetErrorMedia: (state) => {
            state.isErrorMedia = false
            state.messageMedia = ''
            state.isLoadingMedia = false
            state.isSuccessMedia = false
        },
        resetMedia: (state) => initialState

    },
    extraReducers: (builder) => {
        builder // addMedia 
        .addCase(addMedia.pending, (state) => {
            state.isLoadingMedia = true
        })
        .addCase(addMedia.fulfilled, (state, action) => {
            state.isLoadingMedia = false
            state.isSuccessMedia = true
            state.isErrorMedia = false
            state.medias.push(action.payload)
            state.messageMedia = ''
        })
        .addCase(addMedia.rejected, (state, action) => {
            state.isLoadingMedia = false
            state.isErrorMedia = true
            state.messageMedia = action.payload
        }) // getAllMedia
        .addCase(getAllMedia.pending, (state) => {
            state.isLoadingMedia = true
        })
        .addCase(getAllMedia.fulfilled, (state, action) => {
            state.isLoadingMedia = false
            state.isSuccessMedia = true
            state.medias = action.payload
        })
        .addCase(getAllMedia.rejected, (state, action) => {
            state.isLoadingMedia = false
            state.isErrorMedia = true
            state.messageMedia = action.payload
        })
        .addCase(deleteMedia.pending, (state) => {
            state.isLoadingMedia = true
        })
        .addCase(deleteMedia.fulfilled, (state, action) => {
            state.isLoadingMedia = false
            state.isSuccessMedia = true
            state.medias = state.medias.filter((media) => media._id !== action.payload.id)
        })
        .addCase(deleteMedia.rejected, (state, action) => {
            state.isLoadingMedia = false
            state.isErrorMedia = true
            state.messageMedia = action.payload
        })
        .addCase(editMedia.pending, (state) => {
            state.isLoadingMedia = true
        })
        .addCase(editMedia.fulfilled, (state, action) => {
            state.isLoadingMedia = false
            state.isSuccessMedia = true
            state.medias = state.medias.map((media) => {
                return (media._id === action.payload._id) ?
                        (media = action.payload) : (media)

            })
        })
        .addCase(editMedia.rejected, (state, action) => {
            state.isLoadingMedia = false
            state.isErrorMedia = true
            state.messageMedia = action.payload
        })
    }
})

export const {resetErrorMedia, resetMedia} = mediaSlice.actions
export default mediaSlice.reducer