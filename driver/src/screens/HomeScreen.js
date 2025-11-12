import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAvailability } from '../store/slices/authSlice';
import { fetchEarningsSuccess } from '../store/slices/earningSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockDriverEarnings } from '../utils/mockData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user, isAvailable } = useSelector(state => state.auth);
  const { dailyEarnings, todayOrders } = useSelector(state => state.earnings);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل بيانات الأرباح من الخادم
    dispatch(fetchEarningsSuccess(mockDriverEarnings));
  }, [dispatch]);

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* مرحباً بالسائق */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <View className="flex-row items-center">
          <Image 
            source={{ uri: user?.photo || 'https://via.placeholder.com/80' }} 
            className="w-16 h-16 rounded-full border-2 border-white" 
          />
          <View className="mr-4 flex-1">
            <Text className="text-xl font-bold text-white">مرحباً، {user?.name || 'السائق'}</Text>
            <Text className="text-white opacity-80">جاهز للعمل؟</Text>
          </View>
          <TouchableOpacity 
            className={`px-4 py-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
            onPress={() => dispatch(toggleAvailability())}
          >
            <Text className="text-white font-bold">
              {isAvailable ? 'متاح' : 'مشغول'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ملخص الأرباح اليومية */}
      <View className="p-4 -mt-8 z-0">
        <View className="bg-white rounded-2xl p-5 shadow-sm" style={{ elevation: 3 }}>
          <Text className="text-center text-gray-500 mb-2">أرباح اليوم</Text>
          <Text className="text-3xl font-bold text-center" style={{ color: colors.primary }}>
            {dailyEarnings} ر.س
          </Text>
          <Text className="text-center text-gray-500 mt-1">{todayOrders} طلبات اليوم</Text>
        </View>
      </View>

      {/* الإجراءات السريعة */}
      <View className="p-4">
        <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>الإجراءات السريعة</Text>
        
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity 
            className="items-center justify-center w-24 h-24 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-2xl">📦</Text>
            <Text className="mt-2 text-center" style={{ color: colors.text }}>الطلبات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center justify-center w-24 h-24 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('Map')}
          >
            <Text className="text-2xl">🗺️</Text>
            <Text className="mt-2 text-center" style={{ color: colors.text }}>الخريطة</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center justify-center w-24 h-24 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('Earnings')}
          >
            <Text className="text-2xl">💰</Text>
            <Text className="mt-2 text-center" style={{ color: colors.text }}>الأرباح</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* الطلبات المعلقة */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>الطلبات المعلقة</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={{ color: colors.primary }}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        
        {/* في تطبيق حقيقي، سيتم عرض الطلبات المعلقة هنا */}
        <View className="bg-white rounded-xl p-4" style={{ elevation: 2 }}>
          <Text className="text-center" style={{ color: colors.text }}>
            {isAvailable 
              ? 'لا توجد طلبات معلقة حالياً' 
              : 'أنت غير متاح حالياً، قم بتفعيل توفرك لتلقي الطلبات'}
          </Text>
        </View>
      </View>

      {/* الإحصائيات */}
      <View className="p-4 mt-4">
        <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>إحصائيات الأسبوع</Text>
        
        <View className="flex-row justify-between">
          <View className="items-center justify-center w-20 h-20 rounded-xl" style={{ backgroundColor: colors.card }}>
            <Text className="text-lg font-bold" style={{ color: colors.primary }}>15</Text>
            <Text className="text-xs text-center" style={{ color: colors.text }}>إجمالي الطلبات</Text>
          </View>
          
          <View className="items-center justify-center w-20 h-20 rounded-xl" style={{ backgroundColor: colors.card }}>
            <Text className="text-lg font-bold" style={{ color: colors.primary }}>280</Text>
            <Text className="text-xs text-center" style={{ color: colors.text }}>أرباح الأسبوع</Text>
          </View>
          
          <View className="items-center justify-center w-20 h-20 rounded-xl" style={{ backgroundColor: colors.card }}>
            <Text className="text-lg font-bold" style={{ color: colors.primary }}>4.8</Text>
            <Text className="text-xs text-center" style={{ color: colors.text }}>متوسط التقييم</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;