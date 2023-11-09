import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATION_URL = 'http://localhost:3100/api/v1/reservations';
const initialState = {
  reservations: {},
  reservationLoading: false,
  reservationError: false,
  reservationSuccess: false,
  reservationMessage: '',
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

const reservationSlice = createSlice({
  name: 'reservationSlice',
  initialState,
  reducers: {
    add: async (state, { payload }) => {
      try {
        const { token } = JSON.parse(localStorage.getItem('ebikeData'));

        const res = await axios.post(RESERVATION_URL, payload, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res);
      } catch (err) {
        return { ...state, message: err };
      }

      return state;
    },
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
      }));
  },
});

export const { add } = reservationSlice.actions;

export default reservationSlice.reducer;
