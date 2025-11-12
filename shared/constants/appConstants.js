/**
 * ثوابت التطبيق المشتركة
 */

// أنواع المستخدمين
export const USER_ROLES = {
  CUSTOMER: 'customer',
  DRIVER: 'driver',
  STORE_OWNER: 'store_owner',
  ADMIN: 'admin'
};

// حالات الطلب
export const ORDER_STATUS = {
  PENDING: 'pending',        // معلق
  CONFIRMED: 'confirmed',    // تم التأكيد
  PREPARING: 'preparing',    // قيد التحضير
  ON_WAY: 'on_way',          // في الطريق
  DELIVERED: 'delivered',    // تم التوصيل
  CANCELLED: 'cancelled'     // ملغى
};

// أنواع الدفع
export const PAYMENT_METHODS = {
  CASH: 'cash',              // نقداً
  WALLET: 'wallet',          // المحفظة الإلكترونية
  CREDIT_CARD: 'credit_card', // بطاقة ائتمانية
  FAWRY: 'fawry',            // فوري
  PAYMOB: 'paymob'           // بايموب
};

// حالات الدفع
export const PAYMENT_STATUS = {
  PENDING: 'pending',        // معلق
  COMPLETED: 'completed',    // مكتمل
  FAILED: 'failed',          // فشل
  REFUNDED: 'refunded'       // مسترجع
};

// أنواع الإشعارات
export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'order_update',      // تحديث الطلب
  NEW_ORDER: 'new_order',            // طلب جديد
  PAYMENT_UPDATE: 'payment_update',  // تحديث الدفع
  SYSTEM: 'system',                  // إشعار نظام
  PROMOTION: 'promotion'             // عرض ترويجي
};

// وحدات الوقت
export const TIME_UNITS = {
  MINUTES: 'minutes',
  HOURS: 'hours',
  DAYS: 'days',
  WEEKS: 'weeks',
  MONTHS: 'months'
};

// أنواع العملات
export const CURRENCY_TYPES = {
  SAR: 'SAR',  // ريال سعودي
  USD: 'USD',  // دولار أمريكي
  AED: 'AED',  // درهم إماراتي
  EGP: 'EGP'   // جنيه مصري
};

// إعدادات التطبيق الافتراضية
export const DEFAULT_SETTINGS = {
  LANGUAGE: 'ar',           // اللغة الافتراضية
  DARK_MODE: false,         // الوضع النهاري/الليلي
  NOTIFICATIONS_ENABLED: true, // تمكين الإشعارات
  LOCATION_SERVICES: true,  // خدمات الموقع
  PUSH_NOTIFICATIONS: true  // إشعارات الدفع
};

// ألوان السمات
export const THEME_COLORS = {
  PRIMARY: '#4F46E5',       // أزرق داكن (Indigo)
  SECONDARY: '#7C3AED',     // بنفسجي (Violet)
  SUCCESS: '#10B981',       // أخضر (Emerald)
  WARNING: '#F59E0B',       // برتقالي (Amber)
  ERROR: '#EF4444',         // أحمر (Red)
  BACKGROUND: '#F9FAFB',    // خلفية (Gray-50)
  CARD: '#FFFFFF',          // بطاقة (White)
  TEXT: '#1F2937',          // نص (Gray-800)
  BORDER: '#E5E7EB',        // حد (Gray-200)
  PLACEHOLDER: '#9CA3AF'    // عنصر نائب (Gray-400)
};

// إعدادات الخريطة
export const MAP_SETTINGS = {
  ZOOM_LEVEL: 15,
  DEFAULT_CENTER: {
    latitude: 24.7136,
    longitude: 46.6753
  },
  DEFAULT_REGION: {
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
};

// إعدادات التتبع
export const TRACKING_INTERVAL = {
  ACTIVE_DELIVERY: 10000,     // 10 ثواني أثناء التوصيل
  IDLE: 30000,               // 30 ثانية في حالة الخمول
  BACKGROUND: 60000          // 60 ثانية في الخلفية
};