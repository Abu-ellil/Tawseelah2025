import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';

// تعريف الألوان للوضع النهاري
const lightColors = {
  primary: '#4F46E5',       // indigo-600
  secondary: '#7C3AED',     // violet-600
  success: '#10B981',       // emerald-500
  warning: '#F59E0B',       // amber-500
  error: '#EF4444',         // red-500
  background: '#F9FAFB',    // gray-50
  surface: '#FFFFFF',       // white
  text: '#1F2937',          // gray-800
  textSecondary: '#6B7280', // gray-500
  border: '#E5E7EB',        // gray-200
  card: '#FFFFFF',          // white
  placeholder: '#9CA3AF',   // gray-400
  disabled: '#D1D5DB',      // gray-300
  notification: '#EF4444',  // red-500
};

// تعريف الألوان للوضع الليلي
const darkColors = {
  primary: '#6366F1',        // indigo-500
  secondary: '#8B5CF6',      // violet-500
  success: '#34D399',        // emerald-400
  warning: '#FBBF24',        // amber-400
  error: '#F87171',          // red-400
  background: '#111827',     // gray-900
  surface: '#1F2937',        // gray-800
  text: '#F9FAFB',           // gray-50
  textSecondary: '#9CA3AF',  // gray-400
  border: '#374151',         // gray-700
  card: '#1F2937',           // gray-800
  placeholder: '#6B7280',    // gray-500
  disabled: '#374151',       // gray-700
  notification: '#EF4444',   // red-500
};

// إنشاء سياق السمة
const ThemeContext = createContext();

// مزود السمة
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isRTL, setIsRTL] = useState(true); // اللغة العربية هي الوضع الافتراضي

  // تحديد ما إذا كان الوضع الليلي مفعلاً
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // تبديل الاتجاه (RTL/LTR)
  const toggleRTL = () => {
    const newRTL = !isRTL;
    setIsRTL(newRTL);
    I18nManager.forceRTL(newRTL); // تطبيق الاتجاه على النظام
  };

  // تعيين الاتجاه عند تحميل التطبيق
  useEffect(() => {
    I18nManager.forceRTL(isRTL);
  }, [isRTL]);

  // اختيار الألوان بناءً على الوضع
  const colors = darkMode ? darkColors : lightColors;

  // كائن السمة
  const theme = {
    dark: darkMode,
    colors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    typography: {
      h1: { fontSize: 28, fontWeight: 'bold' },
      h2: { fontSize: 24, fontWeight: 'bold' },
      h3: { fontSize: 20, fontWeight: 'bold' },
      h4: { fontSize: 18, fontWeight: 'bold' },
      body: { fontSize: 16, fontWeight: 'normal' },
      caption: { fontSize: 14, fontWeight: 'normal' },
      small: { fontSize: 12, fontWeight: 'normal' },
    },
    isRTL,
    toggleDarkMode,
    toggleRTL,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// خطاف لاستخدام السمة
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};