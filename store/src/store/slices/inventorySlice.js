import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  lowStockItems: [],
  outOfStockItems: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // بدء تحميل المخزون
    fetchInventoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل المخزون
    fetchInventorySuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      
      // فرز العناصر حسب الحالة
      state.lowStockItems = action.payload.filter(item => item.stock > 0 && item.stock <= 5);
      state.outOfStockItems = action.payload.filter(item => item.stock === 0);
    },
    
    // فشل تحميل المخزون
    fetchInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث كمية المنتج
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(item => item._id === productId);
      
      if (index !== -1) {
        state.items[index].stock = quantity;
        
        // إعادة فرز العناصر
        state.lowStockItems = state.items.filter(item => item.stock > 0 && item.stock <= 5);
        state.outOfStockItems = state.items.filter(item => item.stock === 0);
      }
    },
    
    // تقليل كمية المنتج (عند بيع منتج)
    reduceStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(item => item._id === productId);
      
      if (index !== -1 && state.items[index].stock >= quantity) {
        state.items[index].stock -= quantity;
        
        // إعادة فرز العناصر
        state.lowStockItems = state.items.filter(item => item.stock > 0 && item.stock <= 5);
        state.outOfStockItems = state.items.filter(item => item.stock === 0);
      }
    },
    
    // زيادة كمية المنتج
    increaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(item => item._id === productId);
      
      if (index !== -1) {
        state.items[index].stock += quantity;
        
        // إعادة فرز العناصر
        state.lowStockItems = state.items.filter(item => item.stock > 0 && item.stock <= 5);
        state.outOfStockItems = state.items.filter(item => item.stock === 0);
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
  fetchInventoryStart, 
  fetchInventorySuccess, 
  fetchInventoryFailure,
  updateStock,
  reduceStock,
  increaseStock,
  setError,
  clearError
} = inventorySlice.actions;

export default inventorySlice.reducer;