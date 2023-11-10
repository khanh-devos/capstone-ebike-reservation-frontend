import { configureStore } from '@reduxjs/toolkit';
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

import locationSlice from './location/locationSlice';
import reservationSlice from './reservation/reservationSlice';
import addingEbikeSlice from './ebike/addingNewbike';
import ebikeModelSlice from './ebike_models/ebikeModelSlice';

const store = configureStore({
  reducer: {
    locationSlice,
    authSlice,
    ebikeSlice,
    reservationSlice,
    addingEbikeSlice,
    ebikeModelSlice,
  },
});

export default store;
