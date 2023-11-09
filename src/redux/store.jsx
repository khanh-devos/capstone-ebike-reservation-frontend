import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';
import myReservationSlice from './reservation/myReservationSlice';

const store = configureStore({
  reducer: {
    authSlice,
    ebikeSlice,
    myReservationSlice,
  },
});

export default store;
