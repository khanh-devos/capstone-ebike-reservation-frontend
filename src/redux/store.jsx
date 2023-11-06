import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './auth/loginSlice';
import ebikeSlice from './ebike/ebikeSlice';

const store = configureStore({
  reducer: {
    loginSlice,
    ebikeSlice,
  },
});

export default store;
