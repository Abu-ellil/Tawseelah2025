import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailyEarnings: 0,
  weeklyEarnings: 0,
  monthlyEarnings: 0,
  totalEarnings: 0,
  todayOrders: 0,
  weeklyOrders: 0,
  monthlyOrders: 0,
  loading: false,
  error: null,
};

const earningSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    // بدء تحميل الأرباح
    fetchEarningsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل الأرباح
    fetchEarningsSuccess: (state, action) => {
      state.loading = false;
      const { 
        dailyEarnings, 
        weeklyEarnings, 
        monthlyEarnings, 
        totalEarnings,
        todayOrders,
        weeklyOrders,
        monthlyOrders
      } = action.payload;
      
      state.dailyEarnings = dailyEarnings || 0;
      state.weeklyEarnings = weeklyEarnings || 0;
      state.monthlyEarnings = monthlyEarnings || 0;
      state.totalEarnings = totalEarnings || 0;
      state.todayOrders = todayOrders || 0;
      state.weeklyOrders = weeklyOrders || 0;
      state.monthlyOrders = monthlyOrders || 0;
    },
    
    // فشل تحميل الأرباح
    fetchEarningsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث الأرباح بعد تسليم طلب
    updateEarnings: (state, action) => {
      const { amount, orderType } = action.payload; // orderType يمكن أن يكون 'daily', 'weekly', 'monthly', أو 'total'
      
      switch(orderType) {
        case 'daily':
          state.dailyEarnings += amount;
          state.todayOrders += 1;
          break;
        case 'weekly':
          state.weeklyEarnings += amount;
          state.weeklyOrders += 1;
          break;
        case 'monthly':
          state.monthlyEarnings += amount;
          state.monthlyOrders += 1;
          break;
        case 'total':
          state.totalEarnings += amount;
          break;
        default:
          state.dailyEarnings += amount;
          state.todayOrders += 1;
          state.totalEarnings += amount;
      }
    },
    
    // تعيين الأرباح
    setEarnings: (state, action) => {
      const { 
        dailyEarnings, 
        weeklyEarnings, 
        monthlyEarnings, 
        totalEarnings,
        todayOrders,
        weeklyOrders,
        monthlyOrders
      } = action.payload;
      
      state.dailyEarnings = dailyEarnings || 0;
      state.weeklyEarnings = weeklyEarnings || 0;
      state.monthlyEarnings = monthlyEarnings || 0;
      state.totalEarnings = totalEarnings || 0;
      state.todayOrders = todayOrders || 0;
      state.weeklyOrders = weeklyOrders || 0;
      state.monthlyOrders = monthlyOrders || 0;
    },
    
    // تعيين خطأ
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // مسح الخطأ
    clearError: (state) => {
      state.error = null;
    },
    
    // تصفير الأرباح اليومية (في بداية يوم جديد)
    resetDailyEarnings: (state) => {
      state.dailyEarnings = 0;
      state.todayOrders = 0;
    }
  },
});

export const { 
  fetchEarningsStart, 
  fetchEarningsSuccess, 
  fetchEarningsFailure,
  updateEarnings,
  setEarnings,
  setError,
  clearError,
 resetDailyEarnings
} = earningSlice.actions;

export default earningSlice.reducer;