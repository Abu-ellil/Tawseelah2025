import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  customers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // بدء تحميل المستخدمين
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل المستخدمين
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.all || [];
      state.customers = action.payload.customers || [];
    },
    
    // فشل تحميل المستخدمين
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // حذف مستخدم
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user._id !== userId);
      state.customers = state.customers.filter(user => user._id !== userId);
    },
    
    // حظر مستخدم
    blockUser: (state, action) => {
      const userId = action.payload;
      const user = state.users.find(u => u._id === userId);
      if (user) {
        user.isBlocked = true;
      }
    },
    
    // إلغاء حظر مستخدم
    unblockUser: (state, action) => {
      const userId = action.payload;
      const user = state.users.find(u => u._id === userId);
      if (user) {
        user.isBlocked = false;
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
  fetchUsersStart, 
  fetchUsersSuccess, 
  fetchUsersFailure,
  deleteUser,
  blockUser,
  unblockUser,
  setError,
  clearError
} = userSlice.actions;

export default userSlice.reducer;