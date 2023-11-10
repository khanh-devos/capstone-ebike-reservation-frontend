import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const EBIKE_URL = 'http://localhost:3100/api/v1/ebikes';

const initialState = {
  ebikes: [],
  isLoading: true,
  message: null,
};

export const fetchEbike = createAsyncThunk(
  'api/fetchEbike',
  async (thunkAPI) => {
    try {
      const res = await axios.get(EBIKE_URL, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('ebikes fetching failed');
    }
  },
);

// export const postEbike = createAsyncThunk(
//   'reservation/AddReebikes',
//   async (ebikeData, thunkAPI) => {
//     try {
//       const { token } = JSON.parse(localStorage.getItem('ebikeData'));
//       const res = await axios.post(EBIKE_URL, ebikeData, {
//         headers: {
//           'content-type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue('fetch reservation failed');
//     }
//   },
// );

// const addingEbikeSlice = createSlice({
//   name: 'addingEbikeSlice',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(postEbike.pending, (state) => ({
//         ...state,
//         reservationLoading: true,
//       }))
//       .addCase(postEbike.fulfilled, (state, { payload }) => ({
//         ...state,
//         reservationLoading: false,
//         reservations: payload,
//         reservationSuccess: true,
//       }))
//       .addCase(postEbike.rejected, (state, { payload }) => ({
//         ...state,
//         reservationLoading: false,
//         reservationError: true,
//         reservationMessage: payload,
//       }));
//   },
// });

const ebikeSlice = createSlice({
  name: 'fetchEbikes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEbike.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchEbike.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        ebikes: payload,
      }))
      .addCase(fetchEbike.rejected, (state) => ({
        ...state,
        isLoading: true,
      }));
  },
});
// export const { } = ebikeSlice.actions;

export default ebikeSlice.reducer;
// export const { reducer: reservationReducer } = addingEbikeSlice;
