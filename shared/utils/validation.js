/**
 * وظائف التحقق من صحة البيانات
 */

// التحقق من البريد الإلكتروني
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// التحقق من رقم الهاتف السعودي
export const isValidSaudiPhone = (phone) => {
  const phoneRegex = /^(\+966|00966|966)?(5|05)[0-9]{8}$/;
  return phoneRegex.test(phone);
};

// التحقق من كلمة المرور
export const isValidPassword = (password) => {
  // يجب أن تكون 6 أحرف على الأقل
  return password && password.length >= 6;
};

// التحقق من اسم المستخدم
export const isValidName = (name) => {
  // يجب أن يحتوي على حرف واحد على الأقل
  return name && name.trim().length >= 1;
};

// التحقق من رقم الحساب البنكي السعودي (IBAN)
export const isValidSaudiIBAN = (iban) => {
  const ibanRegex = /^SA\d{2}[0-9A-Z]{4}[0-9]{16}$/;
  return ibanRegex.test(iban.toUpperCase());
};

// التحقق من رقم الهوية السعودية
export const isValidSaudiID = (id) => {
  const idRegex = /^(1|2|3)\d{9}$/;
  return idRegex.test(id);
};

// التحقق من رقم الرخصة التجارية
export const isValidCommercialRegistration = (crNumber) => {
  const crRegex = /^\d{10}$/;
  return crRegex.test(crNumber);
};

// التحقق من رقم الحساب البنكي
export const isValidBankAccount = (accountNumber) => {
  const accountRegex = /^\d{4,20}$/;
  return accountRegex.test(accountNumber);
};

// التحقق من مكونات العنوان
export const validateAddress = (address) => {
  const errors = {};
  
  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'الرجاء إدخال اسم المدينة بشكل صحيح';
  }
  
  if (!address.district || address.district.trim().length < 2) {
    errors.district = 'الرجاء إدخال اسم الحي بشكل صحيح';
  }
  
  if (!address.street || address.street.trim().length < 2) {
    errors.street = 'الرجاء إدخال اسم الشارع بشكل صحيح';
  }
  
  if (!address.building || address.building.trim().length < 1) {
    errors.building = 'الرجاء إدخال رقم المبنى';
  }
  
  if (!address.postalCode || address.postalCode.length !== 5 || !/^\d+$/.test(address.postalCode)) {
    errors.postalCode = 'الرمز البريدي يجب أن يكون 5 أرقام';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// التحقق من معلومات المتجر
export const validateStoreInfo = (storeData) => {
  const errors = {};
  
  if (!storeData.name || storeData.name.trim().length < 3) {
    errors.name = 'اسم المتجر يجب أن يكون 3 أحرف على الأقل';
  }
  
  if (!storeData.description || storeData.description.trim().length < 10) {
    errors.description = 'الوصف يجب أن يحتوي على 10 أحرف على الأقل';
  }
  
  if (!storeData.category) {
    errors.category = 'الرجاء اختيار فئة المتجر';
  }
  
  if (!storeData.phone || !isValidSaudiPhone(storeData.phone)) {
    errors.phone = 'الرجاء إدخال رقم هاتف صحيح';
  }
  
  if (!storeData.email || !isValidEmail(storeData.email)) {
    errors.email = 'الرجاء إدخال بريد إلكتروني صحيح';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// التحقق من معلومات السائق
export const validateDriverInfo = (driverData) => {
  const errors = {};
  
  if (!driverData.licenseNumber || driverData.licenseNumber.trim().length < 8) {
    errors.licenseNumber = 'رقم الرخصة يجب أن يكون 8 أحرف على الأقل';
  }
  
  if (!driverData.carModel || driverData.carModel.trim().length < 2) {
    errors.carModel = 'الرجاء إدخال نوع السيارة';
  }
  
  if (!driverData.carPlate || driverData.carPlate.trim().length < 3) {
    errors.carPlate = 'رقم لوحة السيارة يجب أن يكون 3 أحرف على الأقل';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};