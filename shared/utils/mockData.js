/**
 * بيانات وهمية لجميع التطبيقات
 */

// بيانات المستخدم الافتراضية
export const mockUserData = {
  _id: 'user123',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+966501234567',
  role: 'customer',
  location: {
    coordinates: [46.6753, 24.7136], // الرياض
    address: 'الرياض، المملكة العربية السعودية'
  },
  wallet: 250.00,
  isVerified: true,
  profileImage: 'https://via.placeholder.com/100',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// بيانات المتجر الافتراضية
export const mockStoreData = {
  _id: 'store123',
  name: 'متجر الإلكترونيات',
  owner: 'owner123',
  description: 'أفضل الإلكترونيات بأسعار منافسة',
  phone: '+966501234567',
  email: 'electronics@store.com',
  location: {
    coordinates: [46.6753, 24.7136],
    address: 'الرياض، المملكة العربية السعودية'
  },
  workingHours: {
    opening: '08:00',
    closing: '22:00'
  },
  zone: 'الرياض',
  logo: 'https://via.placeholder.com/100',
  coverImage: 'https://via.placeholder.com/300x150',
  isActive: true,
  rating: 4.5,
  ratingCount: 120,
  category: 'إلكترونيات',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// بيانات المنتج الافتراضية
export const mockProductData = {
  _id: 'product123',
  name: 'هاتف ذكي',
  description: 'هاتف ذكي متطور بمواصفات عالية',
  price: 1200,
  category: 'إلكترونيات',
  stock: 50,
  image: 'https://via.placeholder.com/150',
  store: 'store123',
  isActive: true,
  rating: 4.5,
  discount: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// بيانات الطلب الافتراضية
export const mockOrderData = {
  _id: 'order123',
  customer: 'user123',
  store: 'store123',
  items: [
    {
      product: mockProductData,
      quantity: 1,
      price: 1200
    }
  ],
  status: 'pending',
  payment: {
    method: 'wallet',
    status: 'completed',
    amount: 1200
  },
  deliveryFee: 20,
  totalAmount: 1220,
  deliveryLocation: {
    coordinates: [46.6753, 24.7136],
    address: 'الرياض، المملكة العربية السعودية'
  },
  pickupLocation: {
    coordinates: [46.6753, 24.7136],
    address: 'متجر الإلكترونيات، الرياض'
  },
  notes: 'يرجى الاتصال قبل التوصيل',
  estimatedDeliveryTime: new Date(Date.now() + 30 * 60000), // بعد 30 دقيقة
  actualDeliveryTime: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// بيانات السائق الافتراضية
export const mockDriverData = {
  _id: 'driver123',
  name: 'محمد علي',
  email: 'mohamed.driver@example.com',
  phone: '+966509876543',
  role: 'driver',
  location: {
    coordinates: [46.6753, 24.7136],
    address: 'الرياض، المملكة العربية السعودية'
  },
  isVerified: true,
  rating: 4.8,
  totalDeliveries: 120,
  carModel: 'Toyota Camry',
  licenseNumber: 'ABC1234',
  isActive: true,
  isAvailable: true,
  wallet: 1500.00,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// بيانات الإشعارات الافتراضية
export const mockNotifications = [
  {
    _id: 'notif1',
    title: 'طلب جديد',
    message: 'لديك طلب جديد #ORD123',
    type: 'new_order',
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(), // قبل 10 دقائق
    data: {
      orderId: 'order123'
    }
  },
  {
    _id: 'notif2',
    title: 'تحديث في الطلب',
    message: 'تم تأكيد طلبك #ORD456',
    type: 'order_update',
    isRead: true,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // قبل 30 دقيقة
    data: {
      orderId: 'order456'
    }
  },
  {
    _id: 'notif3',
    title: 'عرض ترويجي',
    message: 'خصم 20% على جميع الطلبات اليوم',
    type: 'promotion',
    isRead: false,
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(), // قبل ساعة
    data: {}
  }
];

// بيانات الأرباح الافتراضية
export const mockEarningsData = {
  daily: {
    earnings: 250.00,
    orders: 5,
    date: new Date().toISOString()
  },
  weekly: {
    earnings: 1800.00,
    orders: 35,
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
    endDate: new Date().toISOString()
  },
  monthly: {
    earnings: 7200.00,
    orders: 140,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60000).toISOString(),
    endDate: new Date().toISOString()
  },
  total: {
    earnings: 25000.00,
    orders: 500
  }
};

// دالة محاكاة لجلب البيانات
export const mockApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
        message: 'تم بنجاح'
      });
    }, delay);
  });
};

// دالة محاكاة لتسجيل الدخول
export const mockLogin = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // تأخير 1.5 ثانية
  
  if (credentials.email && credentials.password) {
    return {
      success: true,
      user: mockUserData,
      token: 'mock-jwt-token-here',
      message: 'تم تسجيل الدخول بنجاح'
    };
  } else {
    return {
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    };
  }
};

// دالة محاكاة لتسجيل المستخدم
export const mockRegister = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // تأخير 1.5 ثانية
  
  return {
    success: true,
    user: {
      ...mockUserData,
      ...userData,
      _id: `user${Date.now()}`
    },
    token: 'mock-jwt-token-here',
    message: 'تم إنشاء الحساب بنجاح'
  };
};

// دالة محاكاة لجلب المتاجر
export const mockGetStores = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير 1 ثانية
  
  const stores = Array.from({ length: filters.limit || 10 }, (_, i) => ({
    ...mockStoreData,
    _id: `store${i + 1}`,
    name: `${mockStoreData.name} ${i + 1}`,
    rating: Math.random() * 1 + 4 // تقييم بين 4 و 5
  }));
  
  return {
    success: true,
    data: stores,
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      total: 100,
      pages: 10
    }
  };
};

// دالة محاكاة لجلب المنتجات
export const mockGetProducts = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير 1 ثانية
  
  const products = Array.from({ length: filters.limit || 10 }, (_, i) => ({
    ...mockProductData,
    _id: `product${i + 1}`,
    name: `${mockProductData.name} ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 50 // سعر بين 50 و 1050
  }));
  
  return {
    success: true,
    data: products,
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      total: 200,
      pages: 20
    }
  };
};

// دالة محاكاة لجلب الطلبات
export const mockGetOrders = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير 1 ثانية
  
  const orders = Array.from({ length: filters.limit || 5 }, (_, i) => ({
    ...mockOrderData,
    _id: `order${i + 1}`,
    status: ['pending', 'confirmed', 'preparing', 'on_way', 'delivered'][Math.floor(Math.random() * 5)],
    totalAmount: Math.floor(Math.random() * 500) + 50 // مبلغ بين 50 و 550
  }));
  
  return {
    success: true,
    data: orders,
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 5,
      total: 50,
      pages: 10
    }
  };
};

// دالة محاكاة لجلب السائقين
export const mockGetDrivers = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير 1 ثانية
  
  const drivers = Array.from({ length: filters.limit || 10 }, (_, i) => ({
    ...mockDriverData,
    _id: `driver${i + 1}`,
    name: `${mockDriverData.name} ${i + 1}`,
    rating: Math.random() * 0.5 + 4.5 // تقييم بين 4.5 و 5
  }));
  
  return {
    success: true,
    data: drivers,
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      total: 200,
      pages: 20
    }
  };
};

// دالة محاكاة لجلب الإشعارات
export const mockGetNotifications = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // تأخير 0.5 ثانية
  
  return {
    success: true,
    data: mockNotifications,
    unreadCount: mockNotifications.filter(n => !n.isRead).length
  };
};

// دالة محاكاة لجلب الأرباح
export const mockGetEarnings = async (period = 'daily') => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير 1 ثانية
  
  return {
    success: true,
    data: mockEarningsData[period] || mockEarningsData.daily
  };
};