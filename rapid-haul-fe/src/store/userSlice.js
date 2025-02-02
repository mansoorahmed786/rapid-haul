import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';
import { notification } from 'antd';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get('/api/me/');
      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch user');
      }
      return response.data;
    } catch (error) {
      console.log('fetchUser error', error);
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to fetch user'
      );
    }
  }
);

export const updateUserType = createAsyncThunk(
  'user/updateUserType',
  async (newUserType, { rejectWithValue }) => {
    try {
      const response = await privateAxios.post('/api/update-role/', {
        role: newUserType,
      });
      if (response.status !== 200) {
        return rejectWithValue('Failed to update user type');
      }
      return response.data; // Assuming response contains the updated user info
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update user type'
      );
    }
  }
);

export const updateDriverPayment = createAsyncThunk(
  'user/updateDriverPayment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch('/api/drivers/update-payment/');
      if (response.status !== 200) {
        return rejectWithValue('Failed to update payment');
      }
      return response.data;
    } catch (error) {
      console.log('fetchUser error', error);
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update payment'
      );
    }
  }
);

export const updateCompanyPayment = createAsyncThunk(
  'user/updateCompanyPayment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        '/api/companies/update-payment/'
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to update payment');
      }
      return response.data;
    } catch (error) {
      console.log('fetchUser error', error);
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to update payment'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    userType: null,
    isPaymentEnabled: false,
    isPaid: false,
    isProfileComplete: false,

    loading: false,
    error: null,
  },
  reducers: {
    deleteUser(state) {
      state.name = null;
      state.email = null;
      state.userType = null;
      state.isPaymentEnabled = false;
      state.isPaid = false;
      state.isProfileComplete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch user action
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.userType = action.payload.user_type;
        state.isPaymentEnabled = action.payload.is_payment_enabled;
        state.isPaid = action.payload.is_paid;
        state.isProfileComplete = action.payload.is_profile_complete;

        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Handle update user type action
      .addCase(updateUserType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserType.fulfilled, (state, action) => {
        state.userType = action.payload.user_type;
        state.loading = false;
      })
      .addCase(updateUserType.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        notification.error({
          message: 'Update User Type Error',
          description: action.payload,
        });
      })
      // Handle update driver payment action
      .addCase(updateDriverPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverPayment.fulfilled, (state, _) => {
        state.isPaid = true;
        state.loading = false;
      })
      .addCase(updateDriverPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        notification.error({
          message: 'Update Driver Payment Error',
          description: action.payload,
        });
      })
      // Handle update company payment action
      .addCase(updateCompanyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyPayment.fulfilled, (state, _) => {
        state.isPaid = true;
        state.loading = false;
      })
      .addCase(updateCompanyPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        notification.error({
          message: 'Update Driver Payment Error',
          description: action.payload,
        });
      });
  },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
