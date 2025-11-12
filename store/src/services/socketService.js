import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // تهيئة الاتصال
  init(userId) {
    // في تطبيق حقيقي، استخدم عنوان الخادم الفعلي
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      query: {
        userId: userId
      }
    });

    // الانضمام إلى غرفة مالك المتجر
    this.joinUserRoom(userId);

    // معالجة أحداث الاتصال
    this.socket.on('connect', () => {
      console.log('تم الاتصال بخادم Socket.IO');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('تم قطع الاتصال من خادم Socket.IO');
      this.isConnected = false;
    });

    // معالجة أحداث الخطأ
    this.socket.on('connect_error', (error) => {
      console.error('خطأ في الاتصال:', error);
    });
  }

  // الانضمام إلى غرفة المستخدم
  joinUserRoom(userId) {
    if (this.socket) {
      this.socket.emit('join_user_room', userId);
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

 // الاستماع لأحداث التحديث في الطلب
  onOrderUpdate(callback) {
    if (this.socket) {
      this.socket.on('order_status_update', callback);
    }
  }

  // إلغاء الاستماع لأحداث التحديث في الطلب
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

  // إغلاق الاتصال
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  // التحقق مما إذا كان الاتصال نشطًا
  getIsConnected() {
    return this.isConnected;
  }
}

// إنشاء مثيل وحيد
const socketService = new SocketService();
export default socketService;