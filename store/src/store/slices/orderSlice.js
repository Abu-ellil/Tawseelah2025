import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  pendingOrders: [],
  confirmedOrders: [],
  preparingOrders: [],
  completedOrders: [],
  selectedOrder: null,
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
      state.orders = action.payload.all || [];
      state.pendingOrders = action.payload.pending || [];
      state.confirmedOrders = action.payload.confirmed || [];
      state.preparingOrders = action.payload.preparing || [];
      state.completedOrders = action.payload.completed || [];
    },
    
    // فشل تحميل الطلبات
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث حالة الطلب
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      
      // تحديث الحالة في جميع القوائم
      const allLists = [
        'orders', 'pendingOrders', 'confirmedOrders', 'preparingOrders', 'completedOrders'
      ];
      
      allLists.forEach(listName => {
        const index = state[listName].findIndex(order => order._id === orderId);
        if (index !== -1) {
          state[listName][index].status = status;
          
          // نقل الطلب إلى القائمة المناسبة بناءً على الحالة الجديدة
          const order = state[listName][index];
          state[listName].splice(index, 1);
          
          // إضافة إلى القائمة الصحيحة
          switch(status) {
            case 'pending':
              state.pendingOrders.push(order);
              break;
            case 'confirmed':
              state.confirmedOrders.push(order);
              break;
            case 'preparing':
              state.preparingOrders.push(order);
              break;
            case 'on_way':
            case 'delivered':
              state.completedOrders.push(order);
              break;
          }
        }
      });
    },
    
    // تعيين الطلب المحدد
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    
    // مسح الطلب المحدد
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
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
  updateOrderStatus,
  setSelectedOrder,
  clearSelectedOrder,
  setError,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;