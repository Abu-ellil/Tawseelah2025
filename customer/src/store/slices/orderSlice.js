import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // بدء تحميل الطلبات
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل الطلبات
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    
    // فشل تحميل الطلبات
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // بدء إنشاء طلب
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح إنشاء طلب
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.unshift(action.payload); // إضافة الطلب الجديد إلى بداية القائمة
      state.currentOrder = action.payload; // تعيين كطلب حالي
    },
    
    // فشل إنشاء طلب
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث حالة الطلب
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order._id === orderId);
      
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        
        // إذا كان هذا هو الطلب الحالي، قم بتحديثه أيضًا
        if (state.currentOrder && state.currentOrder._id === orderId) {
          state.currentOrder.status = status;
        }
      }
    },
    
    // تعيين الطلب الحالي
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    
    // مسح الطلب الحالي
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
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
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatus,
  setCurrentOrder,
  clearCurrentOrder,
  setError,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;