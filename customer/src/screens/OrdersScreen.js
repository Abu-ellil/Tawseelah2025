import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersStart, fetchOrdersSuccess, setCurrentOrder } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockOrders } from '../utils/mockData';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orders);

  // تحميل الطلبات عند تحميل الشاشة
  useEffect(() => {
    // في تطبيق حقيقي، سيتم استدعاء API
    dispatch(fetchOrdersSuccess(mockOrders));
  }, [dispatch]);

  // دالة لتحديد لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'confirmed':
        return colors.primary;
      case 'preparing':
        return colors.primary;
      case 'on_way':
        return colors.success;
      case 'delivered':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.placeholder;
    }
  };

  // دالة لعرض نص الحالة باللغة العربية
 const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'معلق';
      case 'confirmed':
        return 'تم التأكيد';
      case 'preparing':
        return 'قيد التحضير';
      case 'on_way':
        return 'في الطريق';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      className="p-4 mb-3 rounded-xl"
      style={{ backgroundColor: colors.card }}
      onPress={() => {
        dispatch(setCurrentOrder(item));
        navigation.navigate('OrderDetails', { order: item });
      }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-bold" style={{ color: colors.text }}>طلب #{item._id.substring(0, 8)}</Text>
        <Text 
          className="text-sm font-medium px-2 py-1 rounded-full"
          style={{ 
            color: getStatusColor(item.status),
            borderColor: getStatusColor(item.status),
            borderWidth: 1
          }}
        >
          {getStatusText(item.status)}
        </Text>
      </View>
      
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm" style={{ color: colors.placeholder }}>
            {new Date(item.createdAt).toLocaleDateString('ar-EG')}
          </Text>
          <Text className="text-sm font-medium" style={{ color: colors.text }}>
            {item.items.length} منتجات
          </Text>
        </View>
        <Text className="text-lg font-bold" style={{ color: colors.primary }}>
          {item.totalAmount} ر.س
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* رأس الشاشة */}
      <View className="p-4 pt-8">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>طلباتي</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {orders.length} طلب تم إنشاؤه
        </Text>
      </View>

      {/* قائمة الطلبات */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 py-20">
            <Text style={{ color: colors.text }}>لا توجد طلبات</Text>
            <Text className="mt-2 text-center" style={{ color: colors.placeholder }}>
              قم بعمل طلب من أحد المتاجر لترى تفاصيله هنا
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={() => {
              // في تطبيق حقيقي، سيتم تحديث البيانات من الخادم
              dispatch(fetchOrdersSuccess(mockOrders));
            }}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default OrdersScreen;