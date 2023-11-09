import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

import locationSlice from './location/locationSlice';
import myReservationSlice from './reservation/myReservationSlice';

const store = configureStore({
  reducer: {
    locationSlice,
    authSlice,
    ebikeSlice,
    myReservationSlice,
  },
});

export default store;
