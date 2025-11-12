import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAvailable: true, // الحالة الافتراضية للسائق (متاح/مشغول)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // تعيين المستخدم بعد تسجيل الدخول
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    
    // بدء عملية تسجيل الدخول
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تسجيل الدخول
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    
    // فشل تسجيل الدخول
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تسجيل الخروج
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    
    // تحديث بيانات المستخدم
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    
    // تعيين خطأ
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // مسح الخطأ
    clearError: (state) => {
      state.error = null;
    },
    
    // تغيير حالة توفر السائق
    setAvailability: (state, action) => {
      state.isAvailable = action.payload;
    },
    
    // تبديل حالة توفر السائق
    toggleAvailability: (state) => {
      state.isAvailable = !state.isAvailable;
    }
  },
});

export const { 
  setUser, 
 loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
 updateUser,
  setError,
  clearError,
  setAvailability,
  toggleAvailability
} = authSlice.actions;

export default authSlice.reducer;