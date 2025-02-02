// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import driverReducer from './driverSlice';
import driversReducer from './driversSlice';
import companyReducer from './companySlice';
import companiesReducer from './companiesSlice';
import notifications from './notificationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    driver: driverReducer,
    drivers: driversReducer,
    company: companyReducer,
    companies: companiesReducer,
    notifications: notifications,
  },
  devTools: true,
});

export default store;
