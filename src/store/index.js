import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
export const store = configureStore({
  reducer: {
    authReducer,
  }
});


export const RootState = store.getState();

export const AppDispatch = store.dispatch;