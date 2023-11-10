// ebikeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const EBIKE_URL = 'http://localhost:3100/api/v1/ebikes';

const initialState = {
  ebikes: {},
  ebikeLoading: false,
  ebikeError: false,
  ebikeSuccess: false,
  ebikeMessage: '',
};

export const postEbike = createAsyncThunk(
  'ebike/postEbike',
  async (ebikeData, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('ebikeData'));
      const res = await axios.post(EBIKE_URL, ebikeData, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('add new ebike failed');
    }
  },
);

const ebikeSliceadding = createSlice({
  name: 'ebikeSliceadding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postEbike.pending, (state) => ({
        ...state,
        ebikeLoading: true,
      }))
      .addCase(postEbike.fulfilled, (state, { payload }) => ({
        ...state,
        ebikeLoading: false,
        ebikes: payload,
        ebikeSuccess: true,
      }))
      .addCase(postEbike.rejected, (state, { payload }) => ({
        ...state,
        ebikeLoading: false,
        ebikeError: true,
        ebikeMessage: payload,
      }));
  },
});

export default ebikeSliceadding.reducer;
