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

 // مصادقة المستخدم
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // إدارة المستخدم
  async getUserProfile(token) {
    this.setAuthHeader(token);
    return this.request('/users/profile');
  }

  async updateUserProfile(token, userData) {
    this.setAuthHeader(token);
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // إدارة المتاجر
  async getStores(location = null) {
    let endpoint = '/stores';
    if (location) {
      endpoint += `?lat=${location.lat}&lng=${location.lng}`;
    }
    return this.request(endpoint);
  }

 async getStoreById(storeId) {
    return this.request(`/stores/${storeId}`);
  }

  // إدارة المنتجات
  async getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/products?${params}`);
  }

  async getProductById(productId) {
    return this.request(`/products/${productId}`);
  }

  // إدارة الطلبات
  async getOrders(token) {
    this.setAuthHeader(token);
    return this.request('/orders');
  }

  async getOrderById(token, orderId) {
    this.setAuthHeader(token);
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(token, orderData) {
    this.setAuthHeader(token);
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(token, orderId, updateData) {
    this.setAuthHeader(token);
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

 // دفع
  async processPayment(token, paymentData) {
    this.setAuthHeader(token);
    return this.request('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
 }

  // محفظة
  async getWalletBalance(token) {
    this.setAuthHeader(token);
    return this.request('/wallet/balance');
  }

 async addFundsToWallet(token, amount) {
    this.setAuthHeader(token);
    return this.request('/wallet/add-funds', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
 }
}

// إنشاء مثيل وحيد من خدمة API
const apiService = new ApiService();
export default apiService;