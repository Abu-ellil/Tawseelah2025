/**
 * خدمة API المشتركة لجميع التطبيقات
 */

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:5000/api'; // يجب تغييره إلى عنوان الخادم الفعلي
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.token = null;
  }

  // تعيين رمز الوصول
  setToken(token) {
    this.token = token;
  }

  // إزالة رمز الوصول
  removeToken() {
    this.token = null;
  }

  // إنشاء رؤوس الطلب
  getHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // دالة إنشاء طلب
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.headers || {}),
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
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // إدارة المتاجر
  async getStores(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/stores?${queryString}` : '/stores';
    return this.request(endpoint);
  }

  async getStoreById(storeId) {
    return this.request(`/stores/${storeId}`);
  }

  // إدارة المنتجات
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    return this.request(endpoint);
  }

  async getProductById(productId) {
    return this.request(`/products/${productId}`);
  }

  // إدارة الطلبات
  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/orders?${queryString}` : '/orders';
    return this.request(endpoint);
  }

  async getOrderById(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(orderId, updateData) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // دفع
  async processPayment(paymentData) {
    return this.request('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // محفظة
  async getWalletBalance() {
    return this.request('/wallet/balance');
  }

  async addFundsToWallet(amount) {
    return this.request('/wallet/add-funds', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  // إشعارات
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  // إعدادات
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settingsData) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  }
}

// إنشاء مثيل وحيد من خدمة API
const apiService = new ApiService();
export default apiService;