import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 stores: [],
  pendingStores: [],
  activeStores: [],
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
      state.stores = action.payload.all || [];
      state.pendingStores = action.payload.pending || [];
      state.activeStores = action.payload.active || [];
    },
    
    // فشل تحميل المتاجر
    fetchStoresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث حالة المتجر
    updateStoreStatus: (state, action) => {
      const { storeId, status } = action.payload;
      const storeIndex = state.stores.findIndex(store => store._id === storeId);
      
      if (storeIndex !== -1) {
        state.stores[storeIndex].status = status;
        
        // نقل المتجر إلى القائمة المناسبة
        const store = state.stores[storeIndex];
        if (status === 'pending') {
          state.pendingStores.push(store);
          state.stores.splice(storeIndex, 1);
        } else if (status === 'active' || status === 'approved') {
          state.activeStores.push(store);
          state.stores.splice(storeIndex, 1);
        }
      }
    },
    
    // قبول طلب تسجيل متجر
    approveStore: (state, action) => {
      const storeId = action.payload;
      const storeIndex = state.pendingStores.findIndex(store => store._id === storeId);
      
      if (storeIndex !== -1) {
        const store = state.pendingStores[storeIndex];
        store.status = 'active';
        state.activeStores.push(store);
        state.pendingStores.splice(storeIndex, 1);
        
        // إضافة إلى قائمة جميع المتاجر إذا لم يكن موجودًا
        if (!state.stores.some(s => s._id === storeId)) {
          state.stores.push(store);
        }
      }
    },
    
    // رفض طلب تسجيل متجر
    rejectStore: (state, action) => {
      const storeId = action.payload;
      const storeIndex = state.pendingStores.findIndex(store => store._id === storeId);
      
      if (storeIndex !== -1) {
        state.pendingStores.splice(storeIndex, 1);
      }
    },
    
    // حذف متجر
    deleteStore: (state, action) => {
      const storeId = action.payload;
      state.stores = state.stores.filter(store => store._id !== storeId);
      state.activeStores = state.activeStores.filter(store => store._id !== storeId);
      state.pendingStores = state.pendingStores.filter(store => store._id !== storeId);
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
  updateStoreStatus,
 approveStore,
  rejectStore,
  deleteStore,
  setError,
  clearError
} = storeSlice.actions;

export default storeSlice.reducer;