import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // بدء تحميل الإشعارات
    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل الإشعارات
    fetchNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    },
    
    // فشل تحميل الإشعارات
    fetchNotificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // استلام إشعار جديد
    receiveNewNotification: (state, action) => {
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      };
      
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    
    // تعيين الإشعار كمقروء
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      
      if (notification) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    
    // تعيين جميع الإشعارات كمقروءة
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    // مسح الإشعارات
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    
    // حذف إشعار
    deleteNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
      
      // تحديث عدد الإشعارات غير المقروءة
      state.unreadCount = state.notifications.filter(n => !n.read).length;
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
  fetchNotificationsStart, 
  fetchNotificationsSuccess, 
  fetchNotificationsFailure,
 receiveNewNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  deleteNotification,
  setError,
  clearError
} = notificationSlice.actions;

export default notificationSlice.reducer;