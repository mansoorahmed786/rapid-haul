import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';

// Async thunk for fetching notifications list
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get(
        '/api/admin-users/list-notifications'
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch notifications');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch notifications'
      );
    }
  }
);

// Async thunk for updating notification is_read status
export const updateNotificationStatus = createAsyncThunk(
  'notifications/updateNotificationStatus',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await privateAxios.patch(
        `/api/admin-users/${id}/mark-read/`
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to update notification status');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to update notification status'
      );
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notificationsList: [], // Ensure initial state is an array
    loading: false,
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.notificationsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsList = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNotificationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        const index = state.notificationsList.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notificationsList[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
