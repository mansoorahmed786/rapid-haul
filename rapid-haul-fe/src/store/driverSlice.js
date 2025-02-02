import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';
import { notification } from 'antd';

// Async thunk for updating driver profile
export const updateDriverProfile = createAsyncThunk(
  'driver/updateDriverProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        '/api/drivers/update-profile/',
        profileData
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to update profile');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update profile'
      );
    }
  }
);

export const getDriverProfile = createAsyncThunk(
  'driver/getDriverProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get('/api/drivers/my-profile/');
      if (response.status !== 200) {
        return rejectWithValue('Failed to update profile');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update profile'
      );
    }
  }
);

// Async thunk for uploading driver image
export const uploadDriverImage = createAsyncThunk(
  'driver/uploadDriverImage',
  async (imageData, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        '/api/drivers/update-profile-picture/',
        imageData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to upload image');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to upload image'
      );
    }
  }
);

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    profile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update Driver Profile
      .addCase(updateDriverProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateDriverProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Update Driver Profile',
          description: action.payload,
        });
      })

      // Update driver profile image
      .addCase(uploadDriverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDriverImage.fulfilled, (state, action) => {
        state.profile.imageUrl = action.payload.imageUrl;
        state.loading = false;
      })
      .addCase(uploadDriverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Upload Driver Image',
          description: action.payload,
        });
      })

      // Get driver profile
      .addCase(getDriverProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getDriverProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Get Driver Profile',
          description: action.payload,
        });
      });
  },
});

export default driverSlice.reducer;
