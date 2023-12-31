import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_API_URL;
const LOGIN_URL = `${backendURL}/login`;
const SIGNUP_URL = `${backendURL}/register`;

const localData = JSON.parse(localStorage.getItem('ebikeData'));

const initialState = {
  user: localData ? localData.user : {},
  isLoading: true,
  token: localData ? localData.token : '',
  message: '',
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
      return thunkAPI.rejectWithValue('Login failed');
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
      return thunkAPI.rejectWithValue(`Failed: ${err.response.data.error}`);
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
    resetMessage: (state) => ({ ...state, message: '' }),
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
          message: 'Successfully Logined',
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
          message: 'Successfully Sign up & Login',
        });
      })
      .addCase(fetchSignup.rejected, (state, { payload }) => ({
        ...state,
        isLoading: true,
        message: payload,
      }));
  },
});

export const { logout, resetMessage } = authSlice.actions;

export default authSlice.reducer;
