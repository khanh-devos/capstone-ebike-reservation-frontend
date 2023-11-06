import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN_URL = 'http://localhost:3100/api/login';

const initialState = {
  user: {},
  isLoading: true,
  token: '',
  message: null,
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(LOGIN_URL, loginData, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('login failed');
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, { payload }) => ({
      ...state,
      status: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchLogin.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
      }))
      .addCase(fetchLogin.rejected, (state, { payload }) => ({
        ...state,
        isLoading: true,
        message: payload,
      }));
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
