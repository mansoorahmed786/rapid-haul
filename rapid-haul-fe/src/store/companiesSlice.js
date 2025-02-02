import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '@/utils/axios';
import { notification } from 'antd';

// Async thunk for fetching companies list
export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await privateAxios.get(
        '/api/admin-users/list_companies'
      );
      if (response.status !== 200) {
        return rejectWithValue('Failed to fetch companies');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        JSON.stringify(error.response?.data) || 'Failed to fetch companies'
      );
    }
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    companiesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCompanies: (state) => {
      state.companiesList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companiesList = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification.error({
          message: 'Failed to fetch companies',
          description: action.payload,
        });
      });
  },
});

export const { clearCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
