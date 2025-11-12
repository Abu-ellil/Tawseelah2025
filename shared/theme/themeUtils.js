import { I18nManager } from 'react-native';

// دالة للحصول على الاتجاه المناسب (RTL/LTR)
export const getDirection = () => {
  return I18nManager.isRTL ? 'rtl' : 'ltr';
};

// دالة للحصول على الاتجاه المعاكس
export const getOppositeDirection = () => {
  return I18nManager.isRTL ? 'ltr' : 'rtl';
};

// دالة للتحقق مما إذا كان الاتجاه الحالي هو RTL
export const isRTL = () => {
  return I18nManager.isRTL;
};

// دالة للتحقق مما إذا كان الاتجاه الحالي هو LTR
export const isLTR = () => {
  return !I18nManager.isRTL;
};

// دالة للحصول على خاصية الاتجاه المناسبة للنظام
export const getLayoutDirection = () => {
  return I18nManager.isRTL ? 'right' : 'left';
};

// دالة للحصول على خاصية الاتجاه المعاكسة
export const getOppositeLayoutDirection = () => {
  return I18nManager.isRTL ? 'left' : 'right';
};

// دالة لتحويل خصائص التنسيق لدعم RTL
export const convertToRTL = (styleObject) => {
  if (!I18nManager.isRTL) return styleObject;

  const convertedStyle = { ...styleObject };
  
  // تحويل خصائص الحافة
  if (convertedStyle.marginLeft !== undefined) {
    convertedStyle.marginRight = convertedStyle.marginLeft;
    delete convertedStyle.marginLeft;
  }
  
  if (convertedStyle.marginRight !== undefined) {
    convertedStyle.marginLeft = convertedStyle.marginRight;
    delete convertedStyle.marginRight;
  }
  
  if (convertedStyle.paddingLeft !== undefined) {
    convertedStyle.paddingRight = convertedStyle.paddingLeft;
    delete convertedStyle.paddingLeft;
  }
  
  if (convertedStyle.paddingRight !== undefined) {
    convertedStyle.paddingLeft = convertedStyle.paddingRight;
    delete convertedStyle.paddingRight;
  }
  
  // تحويل خصائص المحاذاة
  if (convertedStyle.alignItems === 'flex-start') {
    convertedStyle.alignItems = 'flex-end';
  } else if (convertedStyle.alignItems === 'flex-end') {
    convertedStyle.alignItems = 'flex-start';
  }
  
  if (convertedStyle.justifyContent === 'flex-start') {
    convertedStyle.justifyContent = 'flex-end';
  } else if (convertedStyle.justifyContent === 'flex-end') {
    convertedStyle.justifyContent = 'flex-start';
  }
  
  return convertedStyle;
};

// دالة لتطبيق التنسيق بشكل مناسب بناءً على الاتجاه
export const applyDirectionalStyle = (baseStyle, rtlStyle, ltrStyle) => {
  if (I18nManager.isRTL && rtlStyle) {
    return { ...baseStyle, ...rtlStyle };
  } else if (!I18nManager.isRTL && ltrStyle) {
    return { ...baseStyle, ...ltrStyle };
  }
  return baseStyle;
};

// دالة لتحديد خاصية الاتجاه
export const directionalProperty = (property, rtlValue, ltrValue) => {
  return I18nManager.isRTL ? rtlValue : ltrValue;
};

// دالة لتحديد خاصية المحاذاة
export const alignmentProperty = (startValue, centerValue, endValue) => {
  return I18nManager.isRTL ? endValue : startValue;
};