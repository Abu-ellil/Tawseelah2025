// بيانات مستخدم وهمية
export const mockUser = {
  _id: 'user123',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+966501234567',
  role: 'customer',
  location: {
    coordinates: [46.6753, 24.7136] // الرياض
  },
  wallet: 250.00,
  isVerified: true,
};

// بيانات متاجر وهمية
export const mockStores = [
  {
    _id: 'store1',
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
    distance: 0.5,
    category: 'إلكترونيات'
  },
  {
    _id: 'store2',
    name: 'مطعم الوجبات السريعة',
    owner: 'owner124',
    description: 'أفضل الوجبات السريعة والحلويات',
    phone: '+966501234568',
    email: 'fastfood@store.com',
    location: {
      coordinates: [46.6853, 24.7236],
      address: 'الرياض، المملكة العربية السعودية'
    },
    workingHours: {
      opening: '07:00',
      closing: '23:00'
    },
    zone: 'الرياض',
    logo: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/300x150',
    isActive: true,
    rating: 4.2,
    ratingCount: 85,
    distance: 1.2,
    category: 'مطاعم'
  },
  {
    _id: 'store3',
    name: 'متجر الأزياء',
    owner: 'owner125',
    description: 'أحدث صيحات الموضة',
    phone: '+966501234569',
    email: 'fashion@store.com',
    location: {
      coordinates: [46.6953, 24.7336],
      address: 'الرياض، المملكة العربية السعودية'
    },
    workingHours: {
      opening: '10:00',
      closing: '21:00'
    },
    zone: 'الرياض',
    logo: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/300x150',
    isActive: true,
    rating: 4.7,
    ratingCount: 210,
    distance: 2.1,
    category: 'ملابس'
  }
];

// بيانات منتجات وهمية
export const mockProducts = [
  {
    _id: 'product1',
    name: 'هاتف ذكي',
    description: 'هاتف ذكي متطور بمواصفات عالية',
    price: 1200,
    category: 'إلكترونيات',
    stock: 50,
    image: 'https://via.placeholder.com/150',
    store: 'store1',
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
    store: 'store1',
    isActive: true,
    rating: 4.3,
    discount: 5
  },
  {
    _id: 'product3',
    name: 'فستان سهرة',
    description: 'فستان سهرة أنيق',
    price: 250,
    category: 'ملابس',
    stock: 15,
    image: 'https://via.placeholder.com/150',
    store: 'store3',
    isActive: true,
    rating: 4.8,
    discount: 15
  },
  {
    _id: 'product4',
    name: 'ساعة ذكية',
    description: 'ساعة ذكية بخصائص متقدمة',
    price: 450,
    category: 'إلكترونيات',
    stock: 25,
    image: 'https://via.placeholder.com/150',
    store: 'store1',
    isActive: true,
    rating: 4.2,
    discount: 0
  },
  {
    _id: 'product5',
    name: 'فطيرة التفاح',
    description: 'فطيرة التفاح الطازجة',
    price: 25,
    category: 'مأكولات',
    stock: 40,
    image: 'https://via.placeholder.com/150',
    store: 'store2',
    isActive: true,
    rating: 4.6,
    discount: 0
  }
];

// بيانات طلبات وهمية
export const mockOrders = [
  {
    _id: 'order1',
    customer: 'user123',
    store: 'store1',
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
    status: 'delivered',
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
    actualDeliveryTime: new Date(Date.now() - 10 * 600), // قبل 10 دقائق
    createdAt: new Date(Date.now() - 2 * 60 * 600), // قبل ساعتين
    updatedAt: new Date(Date.now() - 10 * 60000)
  },
  {
    _id: 'order2',
    customer: 'user123',
    store: 'store2',
    items: [
      {
        product: mockProducts[4], // فطيرة التفاح
        quantity: 2,
        price: 25
      }
    ],
    status: 'on_way',
    payment: {
      method: 'cash',
      status: 'completed',
      amount: 50
    },
    deliveryFee: 15,
    totalAmount: 65,
    deliveryLocation: {
      coordinates: [46.6753, 24.7136],
      address: 'الرياض، المملكة العربية السعودية'
    },
    pickupLocation: {
      coordinates: [46.6853, 24.7236],
      address: 'مطعم الوجبات السريعة، الرياض'
    },
    notes: '',
    estimatedDeliveryTime: new Date(Date.now() + 20 * 60000), // بعد 20 دقيقة
    createdAt: new Date(Date.now() - 30 * 60000), // قبل 30 دقيقة
    updatedAt: new Date(Date.now() - 5 * 60000), // قبل 5 دقائق
 },
  {
    _id: 'order3',
    customer: 'user123',
    store: 'store3',
    items: [
      {
        product: mockProducts[2], // فستان سهرة
        quantity: 1,
        price: 250
      }
    ],
    status: 'confirmed',
    payment: {
      method: 'paymob',
      status: 'completed',
      amount: 250
    },
    deliveryFee: 25,
    totalAmount: 275,
    deliveryLocation: {
      coordinates: [46.6753, 24.7136],
      address: 'الرياض، المملكة العربية السعودية'
    },
    pickupLocation: {
      coordinates: [46.6953, 24.7336],
      address: 'متجر الأزياء، الرياض'
    },
    notes: 'تغليف خاص للهدايا',
    estimatedDeliveryTime: new Date(Date.now() + 45 * 600), // بعد 45 دقيقة
    createdAt: new Date(Date.now() - 15 * 60000), // قبل 15 دقيقة
    updatedAt: new Date(Date.now() - 10 * 60000), // قبل 10 دقائق
  }
];

// دالة محاكاة لتسجيل الدخول
export const mockLogin = async (email, password) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // تحقق من صحة البيانات
  if (email === 'ahmed@example.com' && password === '123456') {
    return {
      success: true,
      user: mockUser,
      token: 'mock-jwt-token-here'
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
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // محاكاة نجاح التسجيل
  return {
    success: true,
    user: {
      _id: `user${Date.now()}`,
      ...userData,
      role: 'customer',
      wallet: 0,
      isVerified: false
    },
    token: 'mock-jwt-token-here'
  };
};

// دالة محاكاة لإنشاء طلب
export const mockCreateOrder = async (orderData) => {
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