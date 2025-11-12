import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  activeOrder: null, // الطلب الحالي الذي يعمل عليه السائق
  pendingOrders: [], // الطلبات المعلقة التي يمكن قبولها
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
      state.orders = action.payload.orders || [];
      state.pendingOrders = action.payload.pendingOrders || [];
    },
    
    // فشل تحميل الطلبات
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // استقبال طلب جديد
    receiveNewOrder: (state, action) => {
      // إضافة الطلب إلى قائمة الطلبات المعلقة
      state.pendingOrders.push(action.payload);
    },
    
    // قبول طلب
    acceptOrder: (state, action) => {
      const orderId = action.payload;
      // نقل الطلب من الطلبات المعلقة إلى الطلب النشط
      const orderIndex = state.pendingOrders.findIndex(order => order._id === orderId);
      if (orderIndex !== -1) {
        const acceptedOrder = state.pendingOrders[orderIndex];
        state.activeOrder = acceptedOrder;
        state.pendingOrders.splice(orderIndex, 1);
        
        // تحديث حالة الطلب
        acceptedOrder.status = 'accepted';
      }
    },
    
    // رفض طلب
    rejectOrder: (state, action) => {
      const orderId = action.payload;
      // إزالة الطلب من الطلبات المعلقة
      state.pendingOrders = state.pendingOrders.filter(order => order._id !== orderId);
    },
    
    // بدء تسليم الطلب
    startDelivery: (state) => {
      if (state.activeOrder) {
        state.activeOrder.status = 'on_way';
      }
    },
    
    // إكمال تسليم الطلب
    completeDelivery: (state, action) => {
      if (state.activeOrder) {
        state.activeOrder.status = 'delivered';
        state.activeOrder.actualDeliveryTime = new Date();
        
        // إزالة الطلب النشط
        const completedOrder = state.activeOrder;
        state.orders.unshift(completedOrder); // إضافة إلى بداية القائمة
        state.activeOrder = null;
      }
    },
    
    // تعيين الطلب النشط
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    
    // مسح الطلب النشط
    clearActiveOrder: (state) => {
      state.activeOrder = null;
    },
    
    // تحديث حالة الطلب
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      
      // تحديث الحالة في الطلب النشط إذا كان هو الطلب المعني
      if (state.activeOrder && state.activeOrder._id === orderId) {
        state.activeOrder.status = status;
      }
      
      // تحديث الحالة في قائمة الطلبات
      const orderIndex = state.orders.findIndex(order => order._id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
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
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure,
  receiveNewOrder,
  acceptOrder,
  rejectOrder,
  startDelivery,
  completeDelivery,
  setActiveOrder,
  clearActiveOrder,
  updateOrderStatus,
  setError,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;