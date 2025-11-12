import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // بدء تحميل المنتجات
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل المنتجات
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    
    // فشل تحميل المنتجات
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // إضافة منتج
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    
    // تحديث منتج
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    
    // حذف منتج
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload);
    },
    
    // تعيين المنتج المحدد
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
    // مسح المنتج المحدد
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
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
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  addProduct,
 updateProduct,
  deleteProduct,
  setSelectedProduct,
  clearSelectedProduct,
  setError,
  clearError
} = productSlice.actions;

export default productSlice.reducer;