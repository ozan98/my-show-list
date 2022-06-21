import { configureStore } from '@reduxjs/toolkit';
import tmdbReducer from '../features/tmdb/tmdbSlice'

export const store = configureStore({
  reducer: {
    tmdb: tmdbReducer,
  },
});
