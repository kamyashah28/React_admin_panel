import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import estimationSliceReducer from './estimationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    estimations: estimationSliceReducer,
    projects: projectReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
