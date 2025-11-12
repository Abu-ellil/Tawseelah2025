// بيانات سائق وهمية
export const mockDriverUser = {
  _id: 'driver123',
  name: 'أحمد محمد',
  email: 'ahmed.driver@example.com',
  phone: '+966501234567',
  role: 'driver',
  location: {
    coordinates: [46.6753, 24.7136] // الرياض
  },
  wallet: 500.00,
  isVerified: true,
  driverDocuments: {
    nationalId: '1234567890',
    license: 'SA12345678',
    photo: 'https://via.placeholder.com/100',
    status: 'approved'
  },
  carModel: 'Toyota Camry',
  rating: 4.8,
  totalDeliveries: 120,
  acceptanceRate: 98
};

// بيانات أرباح السائق الوهمية
export const mockDriverEarnings = {
  dailyEarnings: 180.00,
  weeklyEarnings: 850.00,
  monthlyEarnings: 3200.00,
  totalEarnings: 12500.00,
  todayOrders: 5,
  weeklyOrders: 25,
  monthlyOrders: 95
};

// بيانات طلبات السائق الوهمية
export const mockDriverOrders = {
  orders: [
    {
      _id: 'order1',
      customer: {
        name: 'محمد علي',
        phone: '+966509876543'
      },
      store: {
        name: 'متجر الإلكترونيات',
        phone: '+966501111111'
      },
      items: [
        {
          product: {
            name: 'هاتف ذكي',
            image: 'https://via.placeholder.com/60'
          },
          quantity: 1,
          price: 1200
        }
      ],
      status: 'delivered',
      payment: {
        method: 'wallet',
        status: 'completed',
        amount: 1250
      },
      deliveryFee: 20,
      totalAmount: 1270,
      pickupLocation: {
        coordinates: [46.6753, 24.7136],
        address: 'متجر الإلكترونيات، شارع التخصصي، الرياض'
      },
      deliveryLocation: {
        coordinates: [46.7153, 24.6836],
        address: 'المنزل، حي السفارات، الرياض'
      },
      notes: 'يرجى الاتصال قبل التوصيل',
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000), // بعد 30 دقيقة
      actualDeliveryTime: new Date(Date.now() - 10 * 60000), // قبل 10 دقائق
      createdAt: new Date(Date.now() - 2 * 60 * 60000), // قبل ساعتين
      updatedAt: new Date(Date.now() - 10 * 60000)
    },
    {
      _id: 'order2',
      customer: {
        name: 'فاطمة عبدالله',
        phone: '+966551234567'
      },
      store: {
        name: 'مطعم الوجبات السريعة',
        phone: '+966502222222'
      },
      items: [
        {
          product: {
            name: 'فطيرة التفاح',
            image: 'https://via.placeholder.com/60'
          },
          quantity: 2,
          price: 25
        }
      ],
      status: 'delivered',
      payment: {
        method: 'cash',
        status: 'completed',
        amount: 75
      },
      deliveryFee: 15,
      totalAmount: 90,
      pickupLocation: {
        coordinates: [46.6853, 24.7236],
        address: 'مطعم الوجبات السريعة، شارع العليا، الرياض'
      },
      deliveryLocation: {
        coordinates: [46.6953, 24.7336],
        address: 'البيت، حي العليا، الرياض'
      },
      notes: '',
      estimatedDeliveryTime: new Date(Date.now() + 20 * 60000), // بعد 20 دقيقة
      actualDeliveryTime: new Date(Date.now() - 5 * 60000), // قبل 5 دقائق
      createdAt: new Date(Date.now() - 1 * 60 * 600), // قبل ساعة
      updatedAt: new Date(Date.now() - 5 * 600)
    }
  ],
  pendingOrders: [
    {
      _id: 'order3',
      customer: {
        name: 'سارة خالد',
        phone: '+966541234567'
      },
      store: {
        name: 'متجر الأزياء',
        phone: '+96650333333'
      },
      items: [
        {
          product: {
            name: 'فستان سهرة',
            image: 'https://via.placeholder.com/60'
          },
          quantity: 1,
          price: 250
        }
      ],
      status: 'pending',
      payment: {
        method: 'paymob',
        status: 'completed',
        amount: 275
      },
      deliveryFee: 25,
      totalAmount: 300,
      pickupLocation: {
        coordinates: [46.6953, 24.7336],
        address: 'متجر الأزياء، شارع التحلية، الرياض'
      },
      deliveryLocation: {
        coordinates: [46.7053, 24.7436],
        address: 'المنزل، حي لبن، الرياض'
      },
      notes: 'تغليف خاص للهدايا',
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000), // بعد 45 دقيقة
      createdAt: new Date(Date.now() - 15 * 60000), // قبل 15 دقيقة
      updatedAt: new Date(Date.now() - 10 * 60000) // قبل 10 دقائق
    }
  ]
};

// دالة محاكاة لتسجيل دخول السائق
export const mockDriverLogin = async (email, password) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // تحقق من صحة البيانات
  if (email === 'ahmed.driver@example.com' && password === '123456') {
    return {
      success: true,
      user: mockDriverUser,
      token: 'mock-driver-jwt-token-here'
    };
  } else {
    return {
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    };
  }
};

// دالة محاكاة لتسجيل السائق
export const mockDriverRegister = async (userData) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // محاكاة نجاح التسجيل
  return {
    success: true,
    user: {
      _id: `driver${Date.now()}`,
      ...userData,
      role: 'driver',
      wallet: 0,
      isVerified: false,
      driverDocuments: {
        nationalId: userData.nationalId || null,
        license: userData.licenseNumber || null,
        photo: null,
        status: 'pending'
      },
      carModel: userData.carModel,
      rating: 0,
      totalDeliveries: 0,
      acceptanceRate: 0
    },
    token: 'mock-driver-jwt-token-here'
  };
};

// دالة محاكاة لتسجيل دخول السائق
export const mockDriverCreateOrder = async (orderData) => {
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