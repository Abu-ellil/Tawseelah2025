import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStoreInfoSuccess } from '../store/slices/storeSlice';
import { fetchReportsSuccess } from '../store/slices/reportSlice';
import { fetchOrdersSuccess } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockStoreInfo, mockReports, mockOrders } from '../utils/mockData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { info: storeInfo } = useSelector(state => state.store);
  const { sales, orders: orderStats } = useSelector(state => state.reports);
  const { pendingOrders } = useSelector(state => state.orders);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل البيانات من الخادم
    dispatch(fetchStoreInfoSuccess(mockStoreInfo));
    dispatch(fetchReportsSuccess(mockReports));
    dispatch(fetchOrdersSuccess(mockOrders));
  }, [dispatch]);

  // عرض إجماليات سريعة
  const quickStats = [
    { title: 'المبيعات اليوم', value: `${sales.daily} ر.س`, icon: '💰' },
    { title: 'الطلبات الجديدة', value: orderStats.daily, icon: '📦' },
    { title: 'أعلى منتج', value: 'هاتف ذكي', icon: '🔝' },
    { title: 'معدل التقييم', value: '4.8 ⭐', icon: '⭐' },
  ];

  const renderQuickStat = ({ item }) => (
    <TouchableOpacity 
      className="flex-1 p-4 rounded-xl items-center"
      style={{ backgroundColor: colors.card, marginHorizontal: 4 }}
      onPress={() => {
        if (item.title === 'الطلبات الجديدة') {
          navigation.navigate('Orders');
        } else if (item.title === 'أعلى منتج') {
          navigation.navigate('Products');
        }
      }}
    >
      <Text className="text-2xl mb-2">{item.icon}</Text>
      <Text className="text-center font-bold" style={{ color: colors.text }}>{item.value}</Text>
      <Text className="text-center text-sm" style={{ color: colors.placeholder }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* مرحباً بمالك المتجر */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <Text className="text-xl font-bold text-white">مرحباً، {storeInfo?.ownerName || 'مالك المتجر'}</Text>
        <Text className="text-white opacity-80">إدارة متجرك {storeInfo?.name || 'متجر توصيلة'}</Text>
      </View>

      {/* إجماليات سريعة */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إجماليات سريعة</Text>
        <FlatList
          data={quickStats}
          renderItem={renderQuickStat}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        />
      </View>

      {/* الطلبات المعلقة */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>الطلبات المعلقة</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={{ color: colors.primary }}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        
        {pendingOrders && pendingOrders.length > 0 ? (
          pendingOrders.slice(0, 3).map((order, index) => (
            <TouchableOpacity 
              key={index}
              className="p-3 mb-2 rounded-xl"
              style={{ backgroundColor: colors.card }}
              onPress={() => {
                navigation.navigate('OrderDetails', { order });
              }}
            >
              <View className="flex-row justify-between">
                <Text className="font-medium" style={{ color: colors.text }}>
                  طلب #{order._id.substring(0, 8)}
                </Text>
                <Text style={{ color: colors.primary }}>
                  {order.totalAmount} ر.س
                </Text>
              </View>
              <Text className="text-sm" style={{ color: colors.placeholder }}>
                {order.items.length} منتجات • {new Date(order.createdAt).toLocaleTimeString('ar-EG')}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="p-4 rounded-xl items-center" style={{ backgroundColor: colors.card }}>
            <Text style={{ color: colors.text }}>لا توجد طلبات معلقة</Text>
          </View>
        )}
      </View>

      {/* أداء المتجر */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>أداء المتجر</Text>
        
        <View className="flex-row justify-between mb-4">
          <View className="items-center flex-1 p-3 rounded-xl" style={{ backgroundColor: colors.card, marginHorizontal: 2 }}>
            <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{sales.weekly} ر.س</Text>
            <Text className="text-sm" style={{ color: colors.placeholder }}>هذا الأسبوع</Text>
          </View>
          <View className="items-center flex-1 p-3 rounded-xl" style={{ backgroundColor: colors.card, marginHorizontal: 2 }}>
            <Text className="text-2xl font-bold" style={{ color: colors.primary }}>{orderStats.weekly}</Text>
            <Text className="text-sm" style={{ color: colors.placeholder }}>طلبات هذا الأسبوع</Text>
          </View>
        </View>
        
        <TouchableOpacity
          className="w-full py-3 rounded-xl items-center"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('Reports')}
        >
          <Text className="text-white font-bold">عرض التقارير التفصيلية</Text>
        </TouchableOpacity>
      </View>

      {/* إجراءات سريعة */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>إجراءات سريعة</Text>
        
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="items-center justify-center w-20 h-20 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Text className="text-2xl">➕</Text>
            <Text className="mt-1 text-xs text-center" style={{ color: colors.text }}>إضافة منتج</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center justify-center w-20 h-20 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('StoreSettings')}
          >
            <Text className="text-2xl">⚙️</Text>
            <Text className="mt-1 text-xs text-center" style={{ color: colors.text }}>إعدادات المتجر</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center justify-center w-20 h-20 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('Products')}
          >
            <Text className="text-2xl">📋</Text>
            <Text className="mt-1 text-xs text-center" style={{ color: colors.text }}>إدارة المنتجات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center justify-center w-20 h-20 rounded-xl"
            style={{ backgroundColor: colors.card }}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-2xl">🛒</Text>
            <Text className="mt-1 text-xs text-center" style={{ color: colors.text }}>الطلبات</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;