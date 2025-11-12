import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  liveOrders: [],
  completedOrders: [],
  cancelledOrders: [],
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
      state.liveOrders = action.payload.live || [];
      state.completedOrders = action.payload.completed || [];
      state.cancelledOrders = action.payload.cancelled || [];
    },
    
    // فشل تحميل الطلبات
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث حالة الطلب
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const allLists = [
        'orders', 'liveOrders', 'completedOrders', 'cancelledOrders'
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
            case 'confirmed':
            case 'preparing':
            case 'on_way':
              state.liveOrders.push(order);
              break;
            case 'delivered':
              state.completedOrders.push(order);
              break;
            case 'cancelled':
              state.cancelledOrders.push(order);
              break;
          }
        }
      });
    },
    
    // استقبال طلب جديد (live)
    receiveNewOrder: (state, action) => {
      state.liveOrders.unshift(action.payload);
      state.orders.unshift(action.payload);
    },
    
    // إزالة طلب من الطلبات الحية (عند اكتماله أو إلغائه)
    removeLiveOrder: (state, action) => {
      const orderId = action.payload;
      state.liveOrders = state.liveOrders.filter(order => order._id !== orderId);
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
  receiveNewOrder,
  removeLiveOrder,
  setError,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;