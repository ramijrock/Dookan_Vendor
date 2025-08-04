import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;