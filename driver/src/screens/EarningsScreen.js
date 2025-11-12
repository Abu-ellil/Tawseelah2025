import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';

const EarningsScreen = () => {
  const { colors } = useTheme();
  const { dailyEarnings, weeklyEarnings, monthlyEarnings, totalEarnings, todayOrders, weeklyOrders, monthlyOrders } = useSelector(state => state.earnings);

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* رأس الشاشة */}
      <View className="p-4 pt-8" style={{ backgroundColor: colors.primary }}>
        <Text className="text-2xl font-bold text-white">أرباحي</Text>
        <Text className="text-white">نظرة عامة على أرباحك</Text>
      </View>

      {/* ملخص الأرباح */}
      <View className="p-4 -mt-6 z-0">
        <View className="bg-white rounded-2xl p-5 shadow-sm" style={{ elevation: 3 }}>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{dailyEarnings} ر.س</Text>
              <Text className="text-sm text-gray-500">اليوم</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{weeklyEarnings} ر.س</Text>
              <Text className="text-sm text-gray-500">هذا الأسبوع</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{monthlyEarnings} ر.س</Text>
              <Text className="text-sm text-gray-500">هذا الشهر</Text>
            </View>
          </View>
        </View>
      </View>

      {/* تفاصيل الأرباح */}
      <View className="p-4">
        <View className="bg-white rounded-xl p-4 mb-4" style={{ elevation: 2 }}>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold" style={{ color: colors.text }}>إجمالي الأرباح</Text>
            <Text className="text-xl font-bold" style={{ color: colors.primary }}>{totalEarnings} ر.س</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>عدد الطلبات اليوم</Text>
            <Text style={{ color: colors.text }}>{todayOrders}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>عدد الطلبات هذا الأسبوع</Text>
            <Text style={{ color: colors.text }}>{weeklyOrders}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.text }}>عدد الطلبات هذا الشهر</Text>
            <Text style={{ color: colors.text }}>{monthlyOrders}</Text>
          </View>
        </View>

        {/* متوسط الأرباح */}
        <View className="bg-white rounded-xl p-4 mb-4" style={{ elevation: 2 }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>متوسط الأرباح</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>لكل طلب</Text>
            <Text style={{ color: colors.text }}>
              {todayOrders > 0 ? (dailyEarnings / todayOrders).toFixed(2) : 0} ر.س
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>لكل ساعة (تقريبي)</Text>
            <Text style={{ color: colors.text }}>35.50 ر.س</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.text }}>أفضل يوم</Text>
            <Text style={{ color: colors.text }}>120.00 ر.س</Text>
          </View>
        </View>

        {/* مقارنة الأداء */}
        <View className="bg-white rounded-xl p-4" style={{ elevation: 2 }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>مقارنة الأداء</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>هذا الأسبوع مقابل الأسبوع الماضي</Text>
            <Text style={{ color: colors.success }}>+12%</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>هذا الشهر مقابل الشهر الماضي</Text>
            <Text style={{ color: colors.success }}>+8%</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.text }}>هذا العام مقابل نفس الفترة من العام الماضي</Text>
            <Text style={{ color: colors.success }}>+15%</Text>
          </View>
        </View>
      </View>

      {/* خيارات الدفع */}
      <View className="p-4 mt-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>الدفع</Text>
        
        <TouchableOpacity 
          className="w-full py-4 rounded-xl items-center mb-3"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold">طلب السحب</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-full py-4 rounded-xl items-center border"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
        >
          <Text className="text-primary font-bold">سجل المدفوعات</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EarningsScreen;