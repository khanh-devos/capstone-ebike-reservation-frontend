import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN_URL = 'http://localhost:3100/api/login';
const SIGNUP_URL = 'http://localhost:3100/api/register';

const localData = JSON.parse(localStorage.getItem('ebikeData'));

const initialState = {
  user: localData ? localData.user : {},
  isLoading: true,
  token: localData ? localData.token : '',
  message: null,
  isLogined: !!localData,
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

export const fetchSignup = createAsyncThunk(
  'auth/fetchSignup',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(SIGNUP_URL, { user: data }, {
        headers: {
          'content-type': 'application/json',
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('sign up failed');
    }
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('ebikeData');

      return {
        ...state,
        user: {},
        isLogined: false,
        token: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        const data = {
          token: payload.token,
          user: payload.user,
        };

        localStorage.setItem('ebikeData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: payload.token,
          user: payload.user,
          isLogined: true,
        });
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => ({
        ...state,
        isLoading: true,
        message: payload,
      }))

      // Sign up
      .addCase(fetchSignup.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchSignup.fulfilled, (state, { payload }) => {
        const data = {
          token: payload.token,
          user: payload.user,
        };

        localStorage.setItem('ebikeData', JSON.stringify(data));
        return ({
          ...state,
          isLoading: false,
          token: payload.token,
          user: payload.user,
          isLogined: true,
        });
      })
      .addCase(fetchSignup.rejected, (state, { payload }) => ({
        ...state,
        isLoading: true,
        message: payload,
      }));
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
