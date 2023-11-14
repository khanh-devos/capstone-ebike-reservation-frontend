import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const EBIKE_MODEL_URL = `${backendURL}/ebike_models`;


const initialState = {
  locations: [],
  isLoading: true,
  message: null,
};

export const fetchLocations = createAsyncThunk(
  'api/fetchLocations',
  async (thunkAPI) => {
    try {
      const res = await axios.get(LOCATION_URL, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Locations fetching failed');
    }
  },
);

const locationSlice = createSlice({
  name: 'fetchLocationss',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchLocations.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        locations: payload,
      }))
      .addCase(fetchLocations.rejected, (state) => ({
        ...state,
        isLoading: true,
      }));
  },
});

// export const { } = locationSlice.actions;

export default locationSlice.reducer;
