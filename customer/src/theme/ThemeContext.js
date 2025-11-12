import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../store/slices/themeSlice';

// تعريف الألوان للوضع النهاري والليلي
const lightColors = {
 primary: '#4F46E5',
  secondary: '#7C3AED',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  border: '#E5E7EB',
  notification: '#EF444',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  placeholder: '#9CA3AF',
  disabled: '#D1D5DB',
};

const darkColors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  border: '#374151',
  notification: '#EF4444',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  placeholder: '#6B7280',
  disabled: '#374151',
};

// إنشاء سياق السمة
const ThemeContext = createContext();

// مزود السمة
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // 'light' أو 'dark' من النظام
  const { darkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  // تحديد ما إذا كان الوضع الليلي مفعلاً
  const isDark = darkMode || (colorScheme === 'dark' && !darkMode);

  // تعيين الوضع عند تحميل التطبيق
  useEffect(() => {
    dispatch(setDarkMode(colorScheme === 'dark'));
  }, [colorScheme, dispatch]);

  // تحديد الألوان بناءً على الوضع
  const colors = isDark ? darkColors : lightColors;

 // كائن السمة
  const theme = {
    dark: isDark,
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