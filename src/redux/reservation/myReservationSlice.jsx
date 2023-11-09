import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATION_URL = 'http://localhost:3100/api/v1/reservations';

const initialState = {
  reservations: [],
  isLoading: true,
  message: null,
};

export const fetchReservation = createAsyncThunk(
  'api/fetchReservation',
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
      return thunkAPI.rejectWithValue('Reservations fetching failed');
    }
  },
);

const reservationSlice = createSlice({
  name: 'fetchReservations',
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
      .addCase(fetchReservation.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchReservation.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        reservations: payload,
      }))
      .addCase(fetchReservation.rejected, (state) => ({
        ...state,
        isLoading: true,
      }));
  },
});

export const { add } = reservationSlice.actions;

export default reservationSlice.reducer;
