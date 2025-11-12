import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import inventorySlice from './slices/inventorySlice';
import storeSlice from './slices/storeSlice';
import reportSlice from './slices/reportSlice';
import notificationSlice from './slices/notificationSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    orders: orderSlice,
    inventory: inventorySlice,
    store: storeSlice,
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