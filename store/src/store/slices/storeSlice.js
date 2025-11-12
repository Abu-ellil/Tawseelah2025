import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
 workingHours: {
    opening: '08:00',
    closing: '2:00'
  },
  isActive: true,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    // بدء تحميل معلومات المتجر
    fetchStoreInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل معلومات المتجر
    fetchStoreInfoSuccess: (state, action) => {
      state.loading = false;
      state.info = action.payload;
      state.workingHours = action.payload.workingHours || { opening: '08:00', closing: '22:00' };
      state.isActive = action.payload.isActive !== undefined ? action.payload.isActive : true;
    },
    
    // فشل تحميل معلومات المتجر
    fetchStoreInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث معلومات المتجر
    updateStoreInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    
    // تحديث ساعات العمل
    updateWorkingHours: (state, action) => {
      state.workingHours = { ...state.workingHours, ...action.payload };
    },
    
    // تعيين حالة النشاط
    setStoreActive: (state, action) => {
      state.isActive = action.payload;
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
  fetchStoreInfoStart, 
  fetchStoreInfoSuccess, 
  fetchStoreInfoFailure,
  updateStoreInfo,
  updateWorkingHours,
  setStoreActive,
  setError,
  clearError
} = storeSlice.actions;

export default storeSlice.reducer;