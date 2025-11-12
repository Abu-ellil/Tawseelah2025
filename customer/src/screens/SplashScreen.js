import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';

const SplashScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      console.log('SplashScreen: isAuthenticated:', isAuthenticated, 'user:', user); // Debug log
      // تحقق إذا كان المستخدم مسجلاً دخوله
      if (isAuthenticated && user) {
        // إذا كان مسجلاً دخوله، انتقل إلى الشاشة الرئيسية
        console.log('Navigating to home');
        router.replace('/home');
      } else {
        // إذا لم يكن مسجلاً دخوله، انتقل إلى شاشة تسجيل الدخول
        console.log('Navigating to login');
        router.replace('/login');
      }
    }, 200); // الانتظار 2 ثواني قبل التوجيه

    // مسح المؤقت عند إلغاء تحميل المكون
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
      {/* شعار التطبيق */}
      <Image
        source={require('../../assets/logo.png')}
        className="w-24 h-24 rounded-full mb-6"
        resizeMode="contain"
      />
      
      {/* عنوان التطبيق */}
      <Text className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>توصيلة</Text>
      <Text style={{ color: colors.placeholder }}>خدمة توصيل موثوقة</Text>
      
      {/* مؤشر التحميل */}
      <View className="mt-8">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-4" style={{ color: colors.placeholder }}>جاري التحميل...</Text>
      </View>
    </View>
  );
};

export default SplashScreen;