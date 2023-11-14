import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const EBIKE_MODEL_URL = 'http://localhost:3100/api/v1/ebike_models';

const initialState = {
  ebikeModels: [],
  isLoading: true,
  message: null,
};

export const fetchEbikeModels = createAsyncThunk(
  'api/fetchEbikeModels',
  async (thunkAPI) => {
    try {
      const res = await axios.get(EBIKE_MODEL_URL, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ebike models fetching failed');
    }
  },
);

const ebikeModelSlice = createSlice({
  name: 'fetchEbikeModels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEbikeModels.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchEbikeModels.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        ebikeModels: payload,
      }))
      .addCase(fetchEbikeModels.rejected, (state) => ({
        ...state,
        isLoading: true,
      }));
  },
});

// export const { } = ebikeModelSlice.actions;

export default ebikeModelSlice.reducer;
