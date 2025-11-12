import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, toggleLanguage } from '../store/slices/themeSlice';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../theme/ThemeContext';
import { 
  SunIcon, 
  MoonIcon, 
  LanguageIcon, 
  UserIcon, 
  ShieldCheckIcon,
  CreditCardIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const SettingsView = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { darkMode, language } = useSelector(state => state.theme);

  const settings = [
    { 
      id: 1, 
      title: 'الملف الشخصي', 
      icon: UserIcon, 
      color: colors.primary,
      action: () => navigation.navigate('Profile') 
    },
    { 
      id: 2, 
      title: 'الأمان', 
      icon: ShieldCheckIcon, 
      color: colors.warning,
      action: () => navigation.navigate('Security') 
    },
    { 
      id: 3, 
      title: 'الدفع', 
      icon: CreditCardIcon, 
      color: colors.success,
      action: () => navigation.navigate('Payment') 
    },
    { 
      id: 4, 
      title: 'الإشعارات', 
      icon: BellIcon, 
      color: colors.notification,
      action: () => navigation.navigate('Notifications') 
    },
    { 
      id: 5, 
      title: 'المساعدة', 
      icon: QuestionMarkCircleIcon, 
      color: colors.info,
      action: () => navigation.navigate('Help') 
    },
    { 
      id: 6, 
      title: 'حول التطبيق', 
      icon: ExclamationTriangleIcon, 
      color: colors.placeholder,
      action: () => navigation.navigate('About') 
    },
  ];

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* رأس الصفحة */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <Text className="text-2xl font-bold text-white">الإعدادات</Text>
        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>إدارة إعدادات حسابك</Text>
      </View>

      {/* معلومات المستخدم */}
      <View className="p-4">
        <View className="flex-row items-center p-4 rounded-xl" style={{ backgroundColor: colors.card }}>
          <View className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              {user?.name?.charAt(0) || 'م'}
            </Text>
          </View>
          <View className="mr-4 flex-1">
            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              {user?.name || 'مدير النظام'}
            </Text>
            <Text style={{ color: colors.placeholder }}>
              {user?.email || 'admin@tawseela.com'}
            </Text>
          </View>
        </View>
      </View>

      {/* إعدادات الحساب */}
      <View className="p-4 mt-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إعدادات الحساب</Text>
        
        {settings.map((setting) => (
          <TouchableOpacity
            key={setting.id}
            className="flex-row items-center p-4 mb-2 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={setting.action}
          >
            <setting.icon className="h-6 w-6 ml-3" style={{ color: setting.color }} />
            <Text className="text-base flex-1" style={{ color: colors.text }}>
              {setting.title}
            </Text>
            <Text style={{ color: colors.placeholder }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* إعدادات التطبيق */}
      <View className="p-4 mt-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إعدادات التطبيق</Text>
        
        <View className="mb-2">
          <View className="flex-row items-center justify-between p-4 rounded-xl" style={{ backgroundColor: colors.card }}>
            <View className="flex-row items-center">
              {darkMode ? (
                <MoonIcon className="h-6 w-6 ml-3" style={{ color: colors.warning }} />
              ) : (
                <SunIcon className="h-6 w-6 ml-3" style={{ color: colors.warning }} />
              )}
              <Text style={{ color: colors.text }}>الوضع الليلي</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={() => dispatch(toggleDarkMode())}
              trackColor={{ false: colors.placeholder, true: colors.primary }}
              thumbColor={darkMode ? colors.background : colors.card}
            />
          </View>
        </View>
        
        <View className="mt-2">
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => dispatch(toggleLanguage())}
          >
            <LanguageIcon className="h-6 w-6 ml-3" style={{ color: colors.success }} />
            <Text className="text-base flex-1" style={{ color: colors.text }}>
              {language === 'ar' ? 'اللغة الإنجليزية' : 'اللغة العربية'}
            </Text>
            <Text style={{ color: colors.placeholder }}>
              {language === 'ar' ? 'EN' : 'AR'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* زر تسجيل الخروج */}
      <View className="p-4 mt-auto">
        <TouchableOpacity
          className="w-full py-4 rounded-xl items-center"
          style={{ backgroundColor: colors.error }}
          onPress={() => dispatch(logout())}
        >
          <Text className="text-white font-bold text-lg">تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsView;