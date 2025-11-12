import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReportsSuccess } from '../store/slices/reportSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockReports } from '../utils/mockData';

const ReportsScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { sales, orders, topProducts } = useSelector(state => state.reports);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل التقارير من الخادم
    dispatch(fetchReportsSuccess(mockReports));
  }, [dispatch]);

 // عرض الرسم البياني البسيط
  const renderChart = () => (
    <View className="p-4 mb-4 rounded-xl" style={{ backgroundColor: colors.card }}>
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>أداء المبيعات (هذا الشهر)</Text>
      <View className="flex-row items-end justify-between h-40">
        {[70, 50, 90, 60, 80, 40, 10].map((value, index) => (
          <View key={index} className="items-center flex-1">
            <View 
              className="w-6 rounded-t"
              style={{ 
                height: `${value}%`, 
                backgroundColor: colors.primary,
                marginBottom: 5
              }}
            />
            <Text className="text-xs" style={{ color: colors.text }}>{['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'][index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // عرض المنتجات الأعلى مبيعاً
  const renderTopProduct = ({ item, index }) => (
    <View className="flex-row items-center p-3 mb-2 rounded-lg" style={{ backgroundColor: colors.card }}>
      <Text className="text-lg font-bold w-8" style={{ color: colors.primary }}>{index + 1}.</Text>
      <View className="flex-1">
        <Text style={{ color: colors.text }}>{item.name}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>المبيعات: {item.salesCount} وحدة</Text>
      </View>
      <Text className="font-bold" style={{ color: colors.primary }}>{item.revenue} ر.س</Text>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* رأس الشاشة */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <Text className="text-2xl font-bold text-white">التقارير</Text>
        <Text className="text-white">تحليل أداء المتجر</Text>
      </View>

      {/* ملخص المبيعات */}
      <View className="p-4 -mt-6 z-0">
        <View className="bg-white rounded-2xl p-5 shadow-sm" style={{ elevation: 3 }}>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{sales.daily} ر.س</Text>
              <Text className="text-sm text-gray-500">اليوم</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{sales.weekly} ر.س</Text>
              <Text className="text-sm text-gray-500">هذا الأسبوع</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{sales.monthly} ر.س</Text>
              <Text className="text-sm text-gray-500">هذا الشهر</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ملخص الطلبات */}
      <View className="p-4 mt-2">
        <View className="bg-white rounded-2xl p-5 shadow-sm" style={{ elevation: 3 }}>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{orders.daily}</Text>
              <Text className="text-sm text-gray-500">اليوم</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{orders.weekly}</Text>
              <Text className="text-sm text-gray-500">هذا الأسبوع</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{orders.monthly}</Text>
              <Text className="text-sm text-gray-500">هذا الشهر</Text>
            </View>
          </View>
        </View>
      </View>

      {/* رسم بياني للمبيعات */}
      {renderChart()}

      {/* المنتجات الأعلى مبيعاً */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>أعلى المنتجات مبيعاً</Text>
          <TouchableOpacity>
            <Text style={{ color: colors.primary }}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={topProducts.slice(0, 5)}
          renderItem={renderTopProduct}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Text style={{ color: colors.text }}>لا توجد بيانات</Text>
            </View>
          }
        />
      </View>

      {/* مقارنة الأداء */}
      <View className="p-4 mb-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>مقارنة الأداء</Text>
        
        <View className="bg-white rounded-xl p-4" style={{ elevation: 2 }}>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>هذا الشهر مقابل الشهر الماضي</Text>
            <Text style={{ color: colors.success }}>+15%</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>هذا العام مقابل نفس الفترة من العام الماضي</Text>
            <Text style={{ color: colors.success }}>+22%</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.text }}>معدل التقييم</Text>
            <Text style={{ color: colors.text }}>4.8 ⭐</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportsScreen;