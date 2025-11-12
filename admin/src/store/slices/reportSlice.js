import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 overallStats: {
    totalOrders: 0,
    totalRevenue: 0,
    totalDrivers: 0,
    totalStores: 0,
    totalCustomers: 0,
  },
  dailyStats: {
    orders: 0,
    revenue: 0,
  },
  weeklyStats: {
    orders: 0,
    revenue: 0,
  },
  monthlyStats: {
    orders: 0,
    revenue: 0,
  },
  chartsData: {
    revenueChart: [],
    ordersChart: [],
    driversChart: [],
    storesChart: [],
  },
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
      const { overallStats, dailyStats, weeklyStats, monthlyStats, chartsData } = action.payload;
      state.overallStats = { ...state.overallStats, ...overallStats };
      state.dailyStats = { ...state.dailyStats, ...dailyStats };
      state.weeklyStats = { ...state.weeklyStats, ...weeklyStats };
      state.monthlyStats = { ...state.monthlyStats, ...monthlyStats };
      state.chartsData = { ...state.chartsData, ...chartsData };
    },
    
    // فشل تحميل التقارير
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث تقرير المبيعات
    updateSalesReport: (state, action) => {
      state.overallStats.totalRevenue = action.payload.totalRevenue;
      state.dailyStats.revenue = action.payload.dailyRevenue;
      state.weeklyStats.revenue = action.payload.weeklyRevenue;
      state.monthlyStats.revenue = action.payload.monthlyRevenue;
    },
    
    // تحديث تقرير الطلبات
    updateOrdersReport: (state, action) => {
      state.overallStats.totalOrders = action.payload.totalOrders;
      state.dailyStats.orders = action.payload.dailyOrders;
      state.weeklyStats.orders = action.payload.weeklyOrders;
      state.monthlyStats.orders = action.payload.monthlyOrders;
    },
    
    // تعيين بيانات الرسوم البيانية
    setChartsData: (state, action) => {
      state.chartsData = { ...state.chartsData, ...action.payload };
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
  setChartsData,
  setError,
  clearError
} = reportSlice.actions;

export default reportSlice.reducer;