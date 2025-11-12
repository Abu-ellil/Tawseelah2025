import { Alert } from 'react-native';

// عنوان الخادم الأساسي
const BASE_URL = 'http://localhost:5000/api'; // يجب تغييره إلى عنوان الخادم الفعلي

// إنشاء عميل API
class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // إضافة رمز المصادقة إلى الرؤوس
  setAuthHeader(token) {
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.headers['Authorization'];
    }
  }

  // دالة إنشاء طلب
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.headers, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // مصادقة السائق
  async driverLogin(credentials) {
    return this.request('/auth/driver/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async driverRegister(userData) {
    return this.request('/auth/driver/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // إدارة السائق
  async getDriverProfile(token) {
    this.setAuthHeader(token);
    return this.request('/drivers/profile');
  }

  async updateDriverProfile(token, userData) {
    this.setAuthHeader(token);
    return this.request('/drivers/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // إدارة المستندات
 async uploadDriverDocuments(token, documentsData) {
    this.setAuthHeader(token);
    return this.request('/drivers/documents', {
      method: 'POST',
      body: JSON.stringify(documentsData),
    });
  }

  // إدارة الطلبات
 async getDriverOrders(token, status = null) {
    this.setAuthHeader(token);
    const endpoint = status ? `/drivers/orders?status=${status}` : '/drivers/orders';
    return this.request(endpoint);
  }

  async getDriverOrderById(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/drivers/orders/${orderId}`);
  }

  async acceptOrder(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/drivers/orders/${orderId}/accept`, {
      method: 'POST',
    });
  }

  async rejectOrder(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/drivers/orders/${orderId}/reject`, {
      method: 'POST',
    });
  }

  async startDelivery(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/drivers/orders/${orderId}/start-delivery`, {
      method: 'POST',
    });
  }

  async completeDelivery(token, orderId, deliveryProof) {
    this.setAuthHeader(token);
    return this.request(`/drivers/orders/${orderId}/complete`, {
      method: 'POST',
      body: JSON.stringify(deliveryProof),
    });
  }

  // إدارة الأرباح
  async getEarnings(token, period = 'daily') {
    this.setAuthHeader(token);
    return this.request(`/drivers/earnings?period=${period}`);
  }

  // إدارة الموقع
  async updateLocation(token, locationData) {
    this.setAuthHeader(token);
    return this.request('/drivers/location', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
 }

  // إدارة الإشعارات
 async getNotifications(token) {
    this.setAuthHeader(token);
    return this.request('/notifications');
  }

  async markNotificationAsRead(token, notificationId) {
    this.setAuthHeader(token);
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }
}

// إنشاء مثيل وحيد من خدمة API
const apiService = new ApiService();
export default apiService;