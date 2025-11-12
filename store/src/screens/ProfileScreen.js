import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { toggleDarkMode, toggleLanguage } from '../store/slices/themeSlice';
import { useTheme } from '../theme/ThemeContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { darkMode, language } = useSelector(state => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
 };

  const settings = [
    { id: 1, title: 'معلومات الحساب', icon: '👤', action: () => navigation.navigate('AccountInfo') },
    { id: 2, title: 'إعدادات المتجر', icon: '🏪', action: () => navigation.navigate('StoreSettings') },
    { id: 3, title: 'إدارة المخزون', icon: '📦', action: () => navigation.navigate('Inventory') },
    { id: 4, title: 'الإشعارات', icon: '🔔', action: () => navigation.navigate('Notifications') },
    { id: 5, title: 'الخصوصية', icon: '🔒', action: () => navigation.navigate('Privacy') },
    { id: 6, title: 'المساعدة', icon: '❓', action: () => navigation.navigate('Help') },
    { id: 7, title: 'من نحن', icon: 'ℹ️', action: () => navigation.navigate('About') },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* معلومات مالك المتجر */}
      <View className="p-6" style={{ backgroundColor: colors.primary }}>
        <View className="flex-row items-center">
          <Image 
            source={{ uri: user?.photo || 'https://via.placeholder.com/80' }} 
            className="w-20 h-20 rounded-full border-2 border-white" 
          />
          <View className="mr-4 flex-1">
            <Text className="text-xl font-bold text-white">{user?.name || 'مالك المتجر'}</Text>
            <Text className="text-white opacity-80">{user?.email || 'البريد الإلكتروني'}</Text>
            <Text className="text-white opacity-80 mt-1">{user?.phone || 'رقم الهاتف'}</Text>
          </View>
        </View>
        
        <View className="mt-4 flex-row justify-between">
          <View className="items-center">
            <Text className="text-white font-bold text-lg">4.8</Text>
            <Text className="text-white text-xs">معدل التقييم</Text>
          </View>
          <View className="items-center">
            <Text className="text-white font-bold text-lg">120</Text>
            <Text className="text-white text-xs">الطلبات</Text>
          </View>
          <View className="items-center">
            <Text className="text-white font-bold text-lg">98%</Text>
            <Text className="text-white text-xs">معدل القبول</Text>
          </View>
        </View>
      </View>

      {/* إعدادات الحساب */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إعدادات الحساب</Text>
        
        {settings.map((setting) => (
          <TouchableOpacity 
            key={setting.id}
            className="flex-row items-center p-4 mb-2 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={setting.action}
          >
            <Text className="text-xl ml-3">{setting.icon}</Text>
            <Text className="text-base flex-1" style={{ color: colors.text }}>{setting.title}</Text>
            <Text style={{ color: colors.placeholder }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* إعدادات التطبيق */}
      <View className="p-4 mt-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إعدادات التطبيق</Text>
        
        <TouchableOpacity 
          className="flex-row items-center p-4 mb-2 rounded-xl"
          style={{ backgroundColor: colors.card }}
          onPress={() => dispatch(toggleDarkMode())}
        >
          <Text className="text-xl ml-3">🌙</Text>
          <Text className="text-base flex-1" style={{ color: colors.text }}>
            {darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          </Text>
          <View className={`w-12 h-6 rounded-full ${darkMode ? 'bg-primary' : 'bg-gray-300'} p-1`}>
            <View className={`bg-white w-4 h-4 rounded-full transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center p-4 mb-2 rounded-xl mt-2"
          style={{ backgroundColor: colors.card }}
          onPress={() => dispatch(toggleLanguage())}
        >
          <Text className="text-xl ml-3">🌐</Text>
          <Text className="text-base flex-1" style={{ color: colors.text }}>
            {language === 'ar' ? 'اللغة الإنجليزية' : 'اللغة العربية'}
          </Text>
          <Text style={{ color: colors.placeholder }}>EN/AR</Text>
        </TouchableOpacity>
      </View>

      {/* زر تسجيل الخروج */}
      <View className="p-4 mt-4">
        <TouchableOpacity 
          className="w-full py-4 rounded-xl items-center"
          style={{ backgroundColor: colors.error }}
          onPress={handleLogout}
        >
          <Text className="text-white font-bold text-lg">تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;