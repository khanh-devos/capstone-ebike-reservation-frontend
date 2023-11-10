import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATION_URL = 'http://localhost:3100/api/v1/reservations';
const initialState = {
  reservations: [],
  reservationLoading: false,
  reservationError: false,
  reservationSuccess: false,
  reservationMessage: '',
  addingSuccess: false,
};

export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservation',
  async (thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('ebikeData'));
      const res = await axios.get(RESERVATION_URL, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('fetch reservation failed');
    }
  },
);

export const addReservation = createAsyncThunk(
  'addReservation',
  async (data, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('ebikeData'));
      const res = await axios.post(RESERVATION_URL, data, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed : the date might be not available');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservationSlice',
  initialState,
  reducers: {
    resetReservationMessage: (state) => ({ ...state, reservationMessage: '' }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        reservationLoading: true,
      }))
      .addCase(fetchReservations.fulfilled, (state, { payload }) => ({
        ...state,
        reservationLoading: false,
        reservations: payload,
        reservationSuccess: true,
      }))
      .addCase(fetchReservations.rejected, (state, { payload }) => ({
        ...state,
        reservationLoading: false,
        reservationError: true,
        reservationMessage: payload,
      }))
      .addCase(addReservation.pending, (state) => ({
        ...state,
        reservationLoading: true,
        reservationSuccess: false,
      }))
      .addCase(addReservation.fulfilled, (state) => ({
        ...state,
        reservationLoading: false,
        reservationSuccess: true,
        reservationMessage: 'Successfully created',
      }))
      .addCase(addReservation.rejected, (state, { payload }) => ({
        ...state,
        reservationLoading: false,
        reservationError: true,
        reservationSuccess: false,
        reservationMessage: payload,
      }));
  },
});

export const { resetReservationMessage } = reservationSlice.actions;

export default reservationSlice.reducer;
