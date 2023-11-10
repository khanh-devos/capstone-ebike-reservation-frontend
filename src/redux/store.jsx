import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

import locationSlice from './location/locationSlice';
import reservationSlice from './reservation/reservationSlice';
import ebikeSliceadding from './ebike/addingNewbike';

const store = configureStore({
  reducer: {
    locationSlice,
    authSlice,
    ebikeSlice,
    reservationSlice,
    ebikeSliceadding,
  },
});

export default store;
