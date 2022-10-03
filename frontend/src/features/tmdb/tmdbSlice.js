import util from '../../util/util'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import tmdbservice from './tmdbService'

// Initialize the states
const initialState = {
    trendingMovies: [],
    trendingTvs: [],
    searchedMedia: [],
    currentChecking: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get trending movies
export const getTrendingMovies = createAsyncThunk('tmdb/trendingmovies', async (_, thunkAPI) => {
    try {
        return await tmdbservice.getTrendingMovie()
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get trending Tv shows
export const getTrendingTvs = createAsyncThunk('tmdb/trendingtvs', async (_, thunkAPI) => {
    try {
        return await tmdbservice.getTrendingTv()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get searched media
export const getSearchedMedia = createAsyncThunk('tmdb/searchedmedia', async (searchString, thunkAPI) => {
    try {
        return await tmdbservice.getSearchedMedia(searchString)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//setCurrentChecking
export const setCurrentChecking = createAsyncThunk('tmdb/setCurrentChecking', async (media, thunkAPI) =>{
    try {
        const creditData = await tmdbservice.getCreditInfo(media)

        const genres = util.getGenre(media, media.genre_ids)
        const data =  {...media, creditData, genres}
        
        return data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Creating the TMDB Slice
export const tmdbSlice = createSlice({
    name: 'tmdb',
    initialState,
    reducers: {
        reset: (state) => initialState.currentChecking,
        setCheckingMedia: (state, action) => {

            state.currentChecking = action.payload 
        },
    },
    extraReducers: (builder) => {
        builder // getTrendingMovies thunk reducers
        .addCase(getTrendingMovies.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTrendingMovies.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSucess = true
            state.trendingMovies = action.payload
        })
        .addCase(getTrendingMovies.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) // getTrendingTvs thunk reducers
        .addCase(getTrendingTvs.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTrendingTvs.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.trendingTvs = action.payload
        })
        .addCase(getTrendingTvs.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) // getSearchedMedia
        .addCase(getSearchedMedia.pending, (state) => {
            state.isloading = true
        })
        .addCase(getSearchedMedia.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.searchedMedia = action.payload
        })
        .addCase(getSearchedMedia.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }) // setCurrentChecking
        .addCase(setCurrentChecking.pending, (state) => {
            state.isLoading = true
        })
        .addCase(setCurrentChecking.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.currentChecking = action.payload
        })
        .addCase(setCurrentChecking.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const {reset, setCheckingMedia} = tmdbSlice.actions
export default tmdbSlice.reducer