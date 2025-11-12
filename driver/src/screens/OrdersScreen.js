import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersSuccess, acceptOrder, rejectOrder, setActiveOrder } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockDriverOrders } from '../utils/mockData';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { orders, pendingOrders, activeOrder, loading } = useSelector(state => state.orders);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل الطلبات من الخادم
    dispatch(fetchOrdersSuccess({
      orders: mockDriverOrders.orders,
      pendingOrders: mockDriverOrders.pendingOrders
    }));
  }, [dispatch]);

  // دالة لتحديد لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'accepted':
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
      case 'accepted':
        return 'مقبول';
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

  // عرض الطلب المعلق (الذي يمكن قبوله أو رفضه)
  const renderPendingOrder = ({ item }) => (
    <View className="p-4 mb-3 rounded-xl" style={{ backgroundColor: colors.card }}>
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
      
      <View className="mb-3">
        <Text style={{ color: colors.text }}>من: {item.pickupLocation.address}</Text>
        <Text style={{ color: colors.text }}>إلى: {item.deliveryLocation.address}</Text>
        <Text style={{ color: colors.text }}>الإجمالي: {item.totalAmount} ر.س</Text>
        <Text style={{ color: colors.text }}>العمولة: {item.deliveryFee} ر.س</Text>
      </View>
      
      <View className="flex-row justify-between">
        <TouchableOpacity 
          className="flex-1 py-2 rounded-lg items-center mr-2"
          style={{ backgroundColor: colors.success }}
          onPress={() => {
            dispatch(acceptOrder(item._id));
            dispatch(setActiveOrder(item));
            navigation.navigate('OrderDetails', { order: item });
          }}
        >
          <Text className="text-white font-bold">قبول</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 py-2 rounded-lg items-center ml-2"
          style={{ backgroundColor: colors.error }}
          onPress={() => dispatch(rejectOrder(item._id))}
        >
          <Text className="text-white font-bold">رفض</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // عرض الطلب النشط أو المكتمل
 const renderOrder = ({ item }) => (
    <TouchableOpacity 
      className="p-4 mb-3 rounded-xl"
      style={{ backgroundColor: colors.card }}
      onPress={() => {
        dispatch(setActiveOrder(item));
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
          {item.deliveryFee} ر.س
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
          {orders.length + (pendingOrders ? pendingOrders.length : 0)} طلب
        </Text>
      </View>

      {/* عرض الطلب النشط */}
      {activeOrder && (
        <View className="p-4">
          <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>الطلب الحالي</Text>
          <TouchableOpacity 
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.primary }}
            onPress={() => {
              navigation.navigate('OrderDetails', { order: activeOrder });
            }}
          >
            <Text className="text-white font-bold">طلب #{activeOrder._id.substring(0, 8)}</Text>
            <Text className="text-white">الحالة: {getStatusText(activeOrder.status)}</Text>
            <Text className="text-white">الإجمالي: {activeOrder.deliveryFee} ر.س</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* عرض الطلبات المعلقة */}
      {pendingOrders && pendingOrders.length > 0 && (
        <View className="p-4">
          <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>الطلبات المعلقة</Text>
          <FlatList
            data={pendingOrders}
            renderItem={renderPendingOrder}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="items-center justify-center py-10">
                <Text style={{ color: colors.text }}>لا توجد طلبات معلقة</Text>
              </View>
            }
          />
        </View>
      )}

      {/* عرض الطلبات السابقة */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-2" style={{ color: colors.text }}>الطلبات السابقة</Text>
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Text style={{ color: colors.text }}>لا توجد طلبات سابقة</Text>
            </View>
          }
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={() => {
                // في تطبيق حقيقي، سيتم تحديث البيانات من الخادم
                dispatch(fetchOrdersSuccess({
                  orders: mockDriverOrders.orders,
                  pendingOrders: mockDriverOrders.pendingOrders
                }));
              }}
              tintColor={colors.primary}
            />
          }
        />
      </View>
    </View>
  );
};

export default OrdersScreen;