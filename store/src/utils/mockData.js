// بيانات مالك المتجر الوهمية
export const mockStoreOwnerUser = {
  _id: 'storeowner123',
  name: 'أحمد محمد',
  email: 'ahmed.store@example.com',
  phone: '+966501234567',
  role: 'store_owner',
  location: {
    coordinates: [46.6753, 24.7136] // الرياض
  },
  wallet: 5000.00,
  isVerified: true,
  storeId: 'store123'
};

// معلومات المتجر الوهمية
export const mockStoreInfo = {
  _id: 'store123',
  name: 'متجر الإلكترونيات',
  owner: 'storeowner123',
  ownerName: 'أحمد محمد',
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
  products: ['product1', 'product2', 'product3']
};

// بيانات المنتجات الوهمية
export const mockProducts = [
  {
    _id: 'product1',
    name: 'هاتف ذكي',
    description: 'هاتف ذكي متطور بمواصفات عالية',
    price: 1200,
    category: 'إلكترونيات',
    stock: 50,
    image: 'https://via.placeholder.com/150',
    store: 'store123',
    isActive: true,
    rating: 4.5,
    discount: 10
  },
  {
    _id: 'product2',
    name: 'حاسوب لوحي',
    description: 'حاسوب لوحي خفيف الوزن',
    price: 800,
    category: 'إلكترونيات',
    stock: 30,
    image: 'https://via.placeholder.com/150',
    store: 'store123',
    isActive: true,
    rating: 4.3,
    discount: 5
  },
  {
    _id: 'product3',
    name: 'سماعات لاسلكية',
    description: 'سماعات لاسلكية عالية الجودة',
    price: 300,
    category: 'إلكترونيات',
    stock: 25,
    image: 'https://via.placeholder.com/150',
    store: 'store123',
    isActive: true,
    rating: 4.7,
    discount: 0
  },
  {
    _id: 'product4',
    name: 'ساعة ذكية',
    description: 'ساعة ذكية بخصائص متقدمة',
    price: 450,
    category: 'إلكترونيات',
    stock: 15,
    image: 'https://via.placeholder.com/150',
    store: 'store123',
    isActive: true,
    rating: 4.2,
    discount: 15
  }
];

// بيانات الطلبات الوهمية
export const mockOrders = [
  {
    _id: 'order1',
    customer: {
      name: 'محمد علي',
      phone: '+966509876543'
    },
    store: 'store123',
    items: [
      {
        product: mockProducts[0], // هاتف ذكي
        quantity: 1,
        price: 1200
      },
      {
        product: mockProducts[3], // ساعة ذكية
        quantity: 1,
        price: 450
      }
    ],
    status: 'pending',
    payment: {
      method: 'wallet',
      status: 'completed',
      amount: 1650
    },
    deliveryFee: 20,
    totalAmount: 1670,
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
    createdAt: new Date(Date.now() - 2 * 60 * 60000), // قبل ساعتين
    updatedAt: new Date(Date.now() - 10 * 60000)
  },
  {
    _id: 'order2',
    customer: {
      name: 'فاطمة عبدالله',
      phone: '+966551234567'
    },
    store: 'store123',
    items: [
      {
        product: mockProducts[1], // حاسوب لوحي
        quantity: 1,
        price: 800
      }
    ],
    status: 'confirmed',
    payment: {
      method: 'cash',
      status: 'completed',
      amount: 800
    },
    deliveryFee: 15,
    totalAmount: 815,
    deliveryLocation: {
      coordinates: [46.6853, 24.7236],
      address: 'الرياض، المملكة العربية السعودية'
    },
    pickupLocation: {
      coordinates: [46.6753, 24.7136],
      address: 'متجر الإلكترونيات، الرياض'
    },
    notes: '',
    estimatedDeliveryTime: new Date(Date.now() + 20 * 60000), // بعد 20 دقيقة
    createdAt: new Date(Date.now() - 30 * 60000), // قبل 30 دقيقة
    updatedAt: new Date(Date.now() - 5 * 60000) // قبل 5 دقائق
  },
  {
    _id: 'order3',
    customer: {
      name: 'سارة خالد',
      phone: '+966541234567'
    },
    store: 'store123',
    items: [
      {
        product: mockProducts[2], // سماعات لاسلكية
        quantity: 2,
        price: 300
      }
    ],
    status: 'preparing',
    payment: {
      method: 'paymob',
      status: 'completed',
      amount: 600
    },
    deliveryFee: 25,
    totalAmount: 625,
    deliveryLocation: {
      coordinates: [46.6953, 24.7336],
      address: 'الرياض، المملكة العربية السعودية'
    },
    pickupLocation: {
      coordinates: [46.6753, 24.7136],
      address: 'متجر الإلكترونيات، الرياض'
    },
    notes: 'تغليف خاص للهدايا',
    estimatedDeliveryTime: new Date(Date.now() + 45 * 60000), // بعد 45 دقيقة
    createdAt: new Date(Date.now() - 15 * 60000), // قبل 15 دقيقة
    updatedAt: new Date(Date.now() - 10 * 60000) // قبل 10 دقائق
  }
];

// بيانات التقارير الوهمية
export const mockReports = {
  sales: {
    daily: 2850.00,
    weekly: 15600.00,
    monthly: 62400.00,
    yearly: 748800.00
  },
  orders: {
    daily: 8,
    weekly: 42,
    monthly: 168,
    yearly: 2016
  },
  topProducts: [
    {
      name: 'هاتف ذكي',
      salesCount: 45,
      revenue: 54000.00
    },
    {
      name: 'حاسوب لوحي',
      salesCount: 32,
      revenue: 25600.00
    },
    {
      name: 'ساعة ذكية',
      salesCount: 28,
      revenue: 12600.00
    },
    {
      name: 'سماعات لاسلكية',
      salesCount: 22,
      revenue: 6600.00
    }
  ]
};

// دالة محاكاة لتسجيل دخول مالك المتجر
export const mockStoreOwnerLogin = async (email, password) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
 // تحقق من صحة البيانات
  if (email === 'ahmed.store@example.com' && password === '123456') {
    return {
      success: true,
      user: mockStoreOwnerUser,
      token: 'mock-storeowner-jwt-token-here'
    };
  } else {
    return {
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    };
  }
};

// دالة محاكاة لتسجيل مالك المتجر
export const mockStoreOwnerRegister = async (userData) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // محاكاة نجاح التسجيل
  return {
    success: true,
    user: {
      _id: `storeowner${Date.now()}`,
      ...userData,
      role: 'store_owner',
      wallet: 0,
      isVerified: false,
      storeId: `store${Date.now()}`
    },
    token: 'mock-storeowner-jwt-token-here'
  };
};

// دالة محاكاة لإنشاء طلب
export const mockStoreOwnerCreateOrder = async (orderData) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // محاكاة إنشاء الطلب
  const newOrder = {
    _id: `order${Date.now()}`,
    ...orderData,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return {
    success: true,
    order: newOrder
  };
};