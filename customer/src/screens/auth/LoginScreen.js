import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { useTheme } from '../../theme/ThemeContext';

// Mock data
import { mockLogin } from '../../utils/mockData';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول');
      return;
    }

    // بدء عملية تسجيل الدخول
    dispatch(loginStart());

    try {
      // في تطبيق حقيقي، سيتم استدعاء API لتسجيل الدخول
      const response = await mockLogin(email, password);
      
      if (response.success) {
        // نجاح تسجيل الدخول
        dispatch(loginSuccess({
          user: response.user,
          token: response.token
        }));
        
        // الانتقال إلى الشاشة الرئيسية
        navigation.replace('Main');
      } else {
        // فشل تسجيل الدخول
        dispatch(loginFailure(response.message));
        Alert.alert('خطأ', response.message);
      }
    } catch (err) {
      // خطأ في العملية
      dispatch(loginFailure(err.message));
      Alert.alert('خطأ', 'حدث خطأ أثناء محاولة تسجيل الدخول');
    }
  };

  return (
    <View className="flex-1 justify-center px-6" style={{ backgroundColor: colors.background }}>
      {/* شعار التطبيق */}
      <View className="items-center mb-10">
        <Image 
          source={require('../../../assets/logo.png')} 
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-3xl font-bold" style={{ color: colors.primary }}>توصيلة</Text>
        <Text style={{ color: colors.placeholder }}>مرحباً بك مرة أخرى!</Text>
      </View>

      {/* نموذج تسجيل الدخول */}
      <View>
        <Text className="text-lg font-medium mb-2" style={{ color: colors.text }}>البريد الإلكتروني</Text>
        <TextInput
          className="p-4 rounded-xl mb-4 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }}
          placeholder="أدخل بريدك الإلكتروني"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-lg font-medium mb-2" style={{ color: colors.text }}>كلمة المرور</Text>
        <TextInput
          className="p-4 rounded-xl mb-6 border"
          style={{ 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }}
          placeholder="أدخل كلمة المرور"
          placeholderTextColor={colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}

        <TouchableOpacity 
          className="w-full py-4 rounded-xl items-center mb-4"
          style={{ backgroundColor: colors.primary }}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <Text className="text-white font-bold">جاري التحميل...</Text>
          ) : (
            <Text className="text-white font-bold text-lg">تسجيل الدخول</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="w-full py-3 rounded-xl items-center mb-4 border"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-primary font-bold">إنشاء حساب جديد</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-primary" onPress={() => Alert.alert('استعادة كلمة المرور', 'سيتم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني')}>
            نسيت كلمة المرور؟
          </Text>
        </TouchableOpacity>
      </View>

      {/* رابط إنشاء حساب */}
      <View className="mt-10 items-center">
        <Text style={{ color: colors.placeholder }}>لا تمتلك حساب؟</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-primary font-bold">إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;