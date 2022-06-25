import { configureStore } from '@reduxjs/toolkit';
import tmdbReducer from '../features/tmdb/tmdbSlice'
import authReducer from '../features/auth/authSlice'
import mediaReducer from '../features/media/mediaSlice'

export const store = configureStore({
  reducer: {
    tmdb: tmdbReducer,
    auth: authReducer,
    media: mediaReducer,
  },
});
