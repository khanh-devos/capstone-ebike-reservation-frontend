import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

const store = configureStore({
  reducer: {
    authSlice,
    ebikeSlice,
  },
});

export default store;
