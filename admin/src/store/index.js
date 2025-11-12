import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import driverSlice from './slices/driverSlice';
import orderSlice from './slices/orderSlice';
import storeSlice from './slices/storeSlice';
import userSlice from './slices/userSlice';
import reportSlice from './slices/reportSlice';
import notificationSlice from './slices/notificationSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    drivers: driverSlice,
    orders: orderSlice,
    stores: storeSlice,
    users: userSlice,
    reports: reportSlice,
    notifications: notificationSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});