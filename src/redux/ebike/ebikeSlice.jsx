import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const EBIKE_URL = 'http://localhost:3100/ebikes';

const initialState = {
  ebikes: [],
  isLoading: true,
  message: null,
};

export const fetchEbike = createAsyncThunk(
  'api/fetchEbike',
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(EBIKE_URL, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('login failed');
    }
  },
);

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
        ebikes: payload.data,
      }))
      .addCase(fetchEbike.rejected, (state) => ({
        ...state,
        isLoading: true,
      }));
  },
});

export const { } = ebikeSlice.actions;

export default ebikeSlice.reducer;
