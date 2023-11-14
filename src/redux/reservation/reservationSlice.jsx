import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const RESERVATION_URL = 'http://localhost:3100/api/v1/reservations';
const initialState = {
  reservations: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
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
      return thunkAPI.rejectWithValue('Failed : the date might not be booked already by others');
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservationSlice',
  initialState,
  reducers: {
    resetReservationMessage: (state) => ({ ...state, message: '' }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchReservations.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        reservations: payload,
        isSuccess: true,
      }))
      .addCase(fetchReservations.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: payload,
      }))

      // Adding a new reservation
      .addCase(addReservation.pending, (state) => ({
        ...state,
        isLoading: true,
        isSuccess: false,
      }))
      .addCase(addReservation.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        message: 'Successfully created',
      }))
      .addCase(addReservation.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: payload,
      }));
  },
});

export const { resetReservationMessage } = reservationSlice.actions;

export default reservationSlice.reducer;
