/**
 * @file authUtils.js - Authentication utilities for Tawseela Customer App
 * @description أدوات المصادقة وحماية العمليات الحساسة
 */

import { Alert } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

/**
 * فحص حالة تسجيل الدخول
 * @param {Object} authState - حالة المصادقة من Redux
 * @returns {boolean} - true إذا كان المستخدم مسجل دخول
 */
export const isUserAuthenticated = (authState) => {
  return authState?.isAuthenticated && authState?.user;
};

/**
 * التحقق من تسجيل الدخول مع عرض رسالة توضيحية
 * @param {Object} authState - حالة المصادقة من Redux
 * @param {Function} navigation - دالة التنقل
 * @param {Function} onSuccess - دالة للتنفيذ عند نجاح التحقق
 * @param {string} action - اسم العملية (لعرض الرسالة التوضيحية)
 */
export const checkAuthAndProceed = (authState, navigation, onSuccess, action = 'هذه العملية') => {
  if (isUserAuthenticated(authState)) {
    onSuccess();
  } else {
    Alert.alert(
      'تسجيل الدخول مطلوب',
      `${action} يتطلب تسجيل الدخول. هل تريد تسجيل الدخول الآن؟`,
      [
        {
          text: 'إلغاء',
          style: 'cancel'
        },
        {
          text: 'تسجيل الدخول',
          onPress: () => navigation.navigate('login')
        }
      ]
    );
  }
};

/**
 * مكون مصادقة مؤقت للتحقق من تسجيل الدخول
 * @param {Object} props - الخصائص
 * @param {React.ReactNode} props.children - المحتوى المحمي
 * @param {Function} props.onAuthRequired - دالة تستدعى عند عدم تسجيل الدخول
 * @param {string} props.fallbackMessage - رسالة التوضيح
 */
export const AuthGuard = ({ children, onAuthRequired, fallbackMessage = 'هذه العملية تتطلب تسجيل الدخول' }) => {
  const authState = useSelector(state => state.auth);
  
  if (!isUserAuthenticated(authState)) {
    return (
      <TouchableOpacity
        className="p-3 rounded-lg border border-gray-300 bg-gray-50"
        onPress={() => {
          if (onAuthRequired) {
            onAuthRequired();
          }
        }}
      >
        <Text className="text-center text-gray-600 text-sm">
          🔒 {fallbackMessage}
        </Text>
        <Text className="text-center text-blue-500 text-xs mt-1">
          انقر لتسجيل الدخول
        </Text>
      </TouchableOpacity>
    );
  }
  
  return children;
};

/**
 * Hook مخصص للتحقق من المصادقة
 * @returns {Object} - كائن يحتوي على حالة المصادقة والدوال المساعدة
 */
export const useAuthCheck = () => {
  const authState = useSelector(state => state.auth);
  const navigation = useNavigation();

  return {
    isAuthenticated: isUserAuthenticated(authState),
    user: authState?.user,
    checkAuth: (action, callback) => 
      checkAuthAndProceed(authState, navigation, callback, action),
    requireAuth: (action) => 
      checkAuthAndProceed(authState, navigation, () => {}, action)
  };
};