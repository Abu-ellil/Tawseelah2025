import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';
import earningSlice from './slices/earningSlice';
import locationSlice from './slices/locationSlice';
import notificationSlice from './slices/notificationSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: orderSlice,
    earnings: earningSlice,
    location: locationSlice,
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