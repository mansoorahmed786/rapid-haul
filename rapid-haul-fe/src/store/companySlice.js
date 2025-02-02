import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';
import { notification } from 'antd';

// Async thunk for updating driver profile
export const updateCompanyProfile = createAsyncThunk(
  'company/updateCompanyProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        '/api/companies/update-profile/',
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

export const getCompanyProfile = createAsyncThunk(
  'company/getCompanyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get('/api/companies/my-profile/');
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

// Async thunk for uploading Company image
export const uploadCompanyImage = createAsyncThunk(
  'company/uploadCompanyImage',
  async (imageData, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        '/api/companies/update-profile-picture/',
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

const companySlice = createSlice({
  name: 'company',
  initialState: {
    profile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update Company Profile
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to update company profile',
          description: action.payload,
        });
      })

      // Update company profile image
      .addCase(uploadCompanyImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCompanyImage.fulfilled, (state, action) => {
        state.profile.imageUrl = action.payload.imageUrl;
        state.loading = false;
      })
      .addCase(uploadCompanyImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to upload company image',
          description: action.payload,
        });
      })

      // Get company profile
      .addCase(getCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to get company profile',
          description: action.payload,
        });
      });
  },
});

export default companySlice.reducer;
