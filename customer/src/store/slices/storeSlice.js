import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    // بدء تحميل المتاجر
    fetchStoresStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل المتاجر
    fetchStoresSuccess: (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    },
    
    // فشل تحميل المتاجر
    fetchStoresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تعيين المتجر المحدد
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    
    // مسح المتجر المحدد
    clearSelectedStore: (state) => {
      state.selectedStore = null;
    },
    
    // تحديث تقييم المتجر
    updateStoreRating: (state, action) => {
      const { storeId, newRating } = action.payload;
      const storeIndex = state.stores.findIndex(store => store._id === storeId);
      
      if (storeIndex !== -1) {
        state.stores[storeIndex].rating = newRating;
      }
    },
    
    // تعيين خطأ
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // مسح الخطأ
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  fetchStoresStart, 
  fetchStoresSuccess, 
  fetchStoresFailure,
  setSelectedStore,
  clearSelectedStore,
  updateStoreRating,
  setError,
  clearError
} = storeSlice.actions;

export default storeSlice.reducer;