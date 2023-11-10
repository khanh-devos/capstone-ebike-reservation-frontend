import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

import locationSlice from './location/locationSlice';
import reservationSlice from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    locationSlice,
    authSlice,
    ebikeSlice,
    reservationSlice,
  },
});

export default store;
