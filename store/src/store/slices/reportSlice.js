import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 sales: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  },
  orders: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  },
  topProducts: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    // بدء تحميل التقارير
    fetchReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل التقارير
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      const { sales, orders, topProducts } = action.payload;
      state.sales = { ...state.sales, ...sales };
      state.orders = { ...state.orders, ...orders };
      state.topProducts = topProducts || [];
    },
    
    // فشل تحميل التقارير
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث تقرير المبيعات
    updateSalesReport: (state, action) => {
      state.sales = { ...state.sales, ...action.payload };
    },
    
    // تحديث تقرير الطلبات
    updateOrdersReport: (state, action) => {
      state.orders = { ...state.orders, ...action.payload };
    },
    
    // تعيين المنتجات الأعلى مبيعاً
    setTopProducts: (state, action) => {
      state.topProducts = action.payload;
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
  fetchReportsStart, 
  fetchReportsSuccess, 
  fetchReportsFailure,
 updateSalesReport,
  updateOrdersReport,
  setTopProducts,
  setError,
  clearError
} = reportSlice.actions;

export default reportSlice.reducer;