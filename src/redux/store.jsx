// store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // For handling async actions
import ebikeSlice from './ebike/ebikeSlice';
import authSlice from './auth/authSlice';

import locationSlice from './location/locationSlice';
import myReservationSlice from './reservation/myReservationSlice';

const store = configureStore({
  reducer: {
    locationSlice,
    authSlice,
    myReservationSlice,
    ebikeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
