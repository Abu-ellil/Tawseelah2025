import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      // تحقق إذا كان المستخدم مسجلاً دخوله
      if (isAuthenticated && user) {
        // إذا كان مسجلاً دخوله، انتقل إلى الشاشة الرئيسية
        navigation.replace('Main');
      } else {
        // إذا لم يكن مسجلاً دخوله، انتقل إلى شاشة تسجيل الدخول
        navigation.replace('Login');
      }
    }, 3000); // الانتظار 3 ثواني قبل التوجيه

    // مسح المؤقت عند إلغاء تحميل المكون
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, navigation]);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
      {/* شعار التطبيق */}
      <Image 
        source={require('../../assets/logo.png')} 
        className="w-32 h-32 rounded-full mb-6"
      />
      
      {/* عنوان التطبيق */}
      <Text className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>توصيلة - السائق</Text>
      <Text style={{ color: colors.placeholder }}>خدمة توصيل موثوقة</Text>
      
      {/* مؤشر التحميل */}
      <View className="mt-10">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-4" style={{ color: colors.placeholder }}>جاري التحميل...</Text>
      </View>
    </View>
  );
};

export default SplashScreen;