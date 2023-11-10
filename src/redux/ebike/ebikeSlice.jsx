import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const EBIKE_URL = 'http://localhost:3100/api/v1/ebikes';

const initialState = {
  ebikes: [],
  ebike: {},
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

export const deleteEbike = createAsyncThunk(
  'api/deleteEbike',
  async (id, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('ebikeData'));
      const res = await axios.delete(`${EBIKE_URL}/${id}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('ebike delete failed');
    }
  },
);

const ebikeSlice = createSlice({
  name: 'fetchEbikes',
  initialState,
  reducers: {
    setEbike: (state, { payload }) => {
      console.log('payload', payload);
      return { ...state, ebike: payload };
    },
    resetMessage: (state) => ({ ...state, message: null }),
  },
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
      }))
      .addCase(deleteEbike.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteEbike.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        ebike: payload,
        ebikes: state.ebikes.filter((ebike) => ebike.id !== payload.id),
        message: 'ebike deleted successfully',
      }))
      .addCase(deleteEbike.rejected, (state) => ({
        ...state,
        isLoading: false,
        message: 'ebike delete failed',
      }));
  },
});

export const { setEbike, resetMessage } = ebikeSlice.actions;

export default ebikeSlice.reducer;
