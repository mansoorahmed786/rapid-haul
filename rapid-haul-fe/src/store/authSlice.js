// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicAxios, privateAxios } from '../utils/axios';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { notification } from 'antd';

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await publicAxios.post('/auth-token/', credentials);
      if (response.status !== 200) {
        return rejectWithValue('Login failed');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data.detail) || 'Login failed'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refresh = getCookie('refreshToken');
      const response = await privateAxios.post('/auth-token/refresh/', {
        refresh,
      });
      if (response.status !== 200) {
        return rejectWithValue('Token refresh failed');
      }
      setCookie('accessToken', response.data.access, { maxAge: 600 });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Token refresh failed'
      );
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicAxios.post('/signup/', userData);
      if (response.status !== 201) {
        return rejectWithValue('Signup failed');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Signup failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,

    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;

      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        setCookie('accessToken', action.payload.access);
        setCookie('refreshToken', action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        notification.error({
          message: 'Login Error',
          description: action.payload,
        });
      })

      // Refresh
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.access;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        notification.error({
          message: 'Token Refresh Error',
          description: action.payload,
        });
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, _) => {
        state.status = 'succeeded';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        notification.error({
          message: 'Signup Error',
          description: action.payload,
        });
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
