import { configureStore } from '@reduxjs/toolkit';
import representativeReducer from './slices/representativeSlice';

export const store = configureStore({
  reducer: {
    representatives: representativeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
