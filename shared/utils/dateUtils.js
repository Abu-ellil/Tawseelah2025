/**
 * وظائف مساعدة للتعامل مع التواريخ
 */

// تحويل التاريخ إلى تنسيق عربي
export const formatDateToArabic = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// تحويل التاريخ إلى تنسيق مختصر
export const formatDateShort = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// حساب الفرق بين تاريخين
export const calculateTimeDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;
  
  const days = Math.floor(diffMs / (1000 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 24)) / (1000 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

// التحقق مما إذا كان التاريخ في المستقبل
export const isFutureDate = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

// التحقق مما إذا كان التاريخ في الماضي
export const isPastDate = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj < now;
};

// إضافة أيام إلى تاريخ
export const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// التحقق مما إذا كان التاريخ اليوم
export const isToday = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
};

// التحقق مما إذا كان التاريخ أمس
export const isYesterday = (date) => {
  const dateObj = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return dateObj.getDate() === yesterday.getDate() &&
         dateObj.getMonth() === yesterday.getMonth() &&
         dateObj.getFullYear() === yesterday.getFullYear();
};