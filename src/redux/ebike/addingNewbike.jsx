// ebikeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const EBIKE_URL = `${backendURL}/ebikes`;

const initialState = {
  addEbikeLoading: false,
  addEbikeSuccess: false,
  addEbikeMessage: '',
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
      return thunkAPI.rejectWithValue('Failed to create an ebike');
    }
  },
);

const addingEbikeSlice = createSlice({
  name: 'ebikeSliceadding',
  initialState,
  reducers: {
    resetAddEbikeMessage: (state) => ({ ...state, addEbikeMessage: '' }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEbike.pending, (state) => ({
        ...state,
        addEbikeLoading: true,
      }))
      .addCase(postEbike.fulfilled, (state) => ({
        ...state,
        addEbikeLoading: false,
        addEbikeMessage: 'Successfully Created',
        addEbikeSuccess: true,
      }))
      .addCase(postEbike.rejected, (state, { payload }) => ({
        ...state,
        addEbikeLoading: false,
        addEbikeMessage: payload,
      }));
  },
});

export const { resetAddEbikeMessage } = addingEbikeSlice.actions;

export default addingEbikeSlice.reducer;
