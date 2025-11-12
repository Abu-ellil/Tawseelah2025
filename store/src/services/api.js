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

  // مصادقة مالك المتجر
  async storeOwnerLogin(credentials) {
    return this.request('/auth/store-owner/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async storeOwnerRegister(userData) {
    return this.request('/auth/store-owner/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // إدارة مالك المتجر
  async getStoreOwnerProfile(token) {
    this.setAuthHeader(token);
    return this.request('/store-owners/profile');
  }

  async updateStoreOwnerProfile(token, userData) {
    this.setAuthHeader(token);
    return this.request('/store-owners/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // إدارة المتجر
  async getStoreInfo(token) {
    this.setAuthHeader(token);
    return this.request('/stores/my-store');
  }

  async updateStoreInfo(token, storeData) {
    this.setAuthHeader(token);
    return this.request('/stores/my-store', {
      method: 'PUT',
      body: JSON.stringify(storeData),
    });
  }

 async updateStoreHours(token, hoursData) {
    this.setAuthHeader(token);
    return this.request('/stores/my-store/hours', {
      method: 'PUT',
      body: JSON.stringify(hoursData),
    });
 }

  // إدارة المنتجات
  async getProducts(token) {
    this.setAuthHeader(token);
    return this.request('/products/my-store');
  }

 async addProduct(token, productData) {
    this.setAuthHeader(token);
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(token, productId, productData) {
    this.setAuthHeader(token);
    return this.request(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(token, productId) {
    this.setAuthHeader(token);
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // إدارة الطلبات
  async getOrders(token, status = null) {
    this.setAuthHeader(token);
    const endpoint = status ? `/orders/my-store?status=${status}` : '/orders/my-store';
    return this.request(endpoint);
  }

 async getOrderById(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/orders/my-store/${orderId}`);
  }

  async updateOrderStatus(token, orderId, status) {
    this.setAuthHeader(token);
    return this.request(`/orders/my-store/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
 }

  // إدارة المخزون
  async updateStock(token, productId, quantity) {
    this.setAuthHeader(token);
    return this.request(`/inventory/${productId}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async getInventory(token) {
    this.setAuthHeader(token);
    return this.request('/inventory/my-store');
  }

 // إدارة التقارير
  async getSalesReports(token, period = 'daily') {
    this.setAuthHeader(token);
    return this.request(`/reports/sales?period=${period}`);
  }

  async getOrdersReports(token, period = 'daily') {
    this.setAuthHeader(token);
    return this.request(`/reports/orders?period=${period}`);
  }

  async getTopProducts(token, period = 'monthly') {
    this.setAuthHeader(token);
    return this.request(`/reports/top-products?period=${period}`);
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