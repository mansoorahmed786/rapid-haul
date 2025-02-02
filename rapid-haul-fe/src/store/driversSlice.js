import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';
import { notification } from 'antd';

// Async thunk for fetching drivers list
export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get('/api/admin-users/list_drivers');
      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch drivers');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to fetch drivers'
      );
    }
  }
);

// Async thunk for updating driver
export const updateDriver = createAsyncThunk(
  'drivers/updateDriver',
  async ({ id, is_payment_enabled, expiry_time }, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        `/api/admin-users/${id}/update-driver/`,
        {
          is_payment_enabled,
          expiry_time,
        }
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to update driver');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update driver'
      );
    }
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    driversList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDrivers: (state) => {
      state.driversList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.driversList = action.payload;
        state.loading = false;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to fetch drivers',
          description: action.payload,
        });
      })
      .addCase(updateDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        const index = state.driversList.findIndex(
          (driver) => driver.id === action.payload.id
        );
        if (index !== -1) {
          state.driversList[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to update driver',
          description: action.payload,
        });
      });
  },
});

export const { clearDrivers } = driversSlice.actions;
export default driversSlice.reducer;
