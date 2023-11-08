import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';
import reservationSlice from './reservation/reservationSlice';


const store = configureStore({
  reducer: {
    authSlice,
    ebikeSlice,
    reservationSlice,
  },
});

export default store;
