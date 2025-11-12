import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  // تهيئة الاتصال
  init(serverUrl, userId) {
    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'], // تحديد أنواع النقل
      query: {
        userId: userId // إرسال معرف المستخدم مع الاتصال
      },
      timeout: 20000, // مهلة الاتصال 20 ثانية
      autoConnect: true
    });

    // معالجة أحداث الاتصال
    this.socket.on('connect', () => {
      console.log('تم الاتصال بخادم Socket.IO');
      this.isConnected = true;
      this.reconnectAttempts = 0; // إعادة تعيين محاولات الاتصال عند الاتصال الناجح
      
      // الانضمام إلى غرفة المستخدم
      if (userId) {
        this.joinUserRoom(userId);
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('تم قطع الاتصال من خادم Socket.IO:', reason);
      this.isConnected = false;
      
      // محاولة إعادة الاتصال تلقائيًا
      if (reason !== 'io client disconnect') {
        this.attemptReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('خطأ في الاتصال بخادم Socket.IO:', error);
      this.isConnected = false;
    });

    this.socket.on('connect_timeout', () => {
      console.log('انتهت مهلة الاتصال بخادم Socket.IO');
      this.isConnected = false;
    });
  }

  // محاولة إعادة الاتصال
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`محاولة إعادة الاتصال ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
      
      setTimeout(() => {
        this.socket.connect();
      }, 2000 * this.reconnectAttempts); // زيادة المهلة مع كل محاولة
    } else {
      console.log('تم الوصول إلى الحد الأقصى لمحاولات إعادة الاتصال');
    }
  }

  // الانضمام إلى غرفة المستخدم
  joinUserRoom(userId) {
    if (this.socket) {
      this.socket.emit('join_user_room', userId);
    }
  }

  // مغادرة غرفة المستخدم
  leaveUserRoom(userId) {
    if (this.socket) {
      this.socket.emit('leave_user_room', userId);
    }
  }

  // الانضمام إلى غرفة الطلب
  joinOrderRoom(orderId) {
    if (this.socket) {
      this.socket.emit('join_order_room', orderId);
    }
  }

  // مغادرة غرفة الطلب
  leaveOrderRoom(orderId) {
    if (this.socket) {
      this.socket.emit('leave_order_room', orderId);
    }
  }

  // الاستماع لأحداث تحديث الطلب
  onOrderUpdate(callback) {
    if (this.socket) {
      this.socket.on('order_status_update', callback);
    }
  }

  // إلغاء الاستماع لأحداث تحديث الطلب
  offOrderUpdate(callback) {
    if (this.socket) {
      this.socket.off('order_status_update', callback);
    }
  }

  // الاستماع لأحداث موقع السائق
  onDriverLocationUpdate(callback) {
    if (this.socket) {
      this.socket.on('driver_location_update', callback);
    }
  }

  // إلغاء الاستماع لأحداث موقع السائق
  offDriverLocationUpdate(callback) {
    if (this.socket) {
      this.socket.off('driver_location_update', callback);
    }
  }

  // الاستماع للإشعارات
  onNotification(callback) {
    if (this.socket) {
      this.socket.on('new_notification', callback);
    }
  }

  // إلغاء الاستماع للإشعارات
  offNotification(callback) {
    if (this.socket) {
      this.socket.off('new_notification', callback);
    }
  }

  // إرسال رسالة إلى الخادم
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('لا يمكن إرسال الرسالة، ليس هناك اتصال نشط');
    }
  }

  // إرسال تحديث الموقع
  emitLocationUpdate(locationData) {
    this.emit('driver_location_update', locationData);
  }

  // إرسال تحديث حالة الطلب
  emitOrderStatusUpdate(orderData) {
    this.emit('order_status_update', orderData);
  }

  // إغلاق الاتصال
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  // معرفة إذا كان الاتصال نشطًا
  getIsConnected() {
    return this.isConnected;
  }

  // معرفة إذا كان هناك مثيل للاتصال
  getSocket() {
    return this.socket;
  }
}

// إنشاء مثيل وحيد
const socketService = new SocketService();
export default socketService;