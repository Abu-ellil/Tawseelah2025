import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersSuccess, updateOrderStatus } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockOrders } from '../utils/mockData';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { pendingOrders, confirmedOrders, preparingOrders, completedOrders, loading } = useSelector(state => state.orders);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل الطلبات من الخادم
    dispatch(fetchOrdersSuccess({
      all: [...pendingOrders, ...confirmedOrders, ...preparingOrders, ...completedOrders],
      pending: pendingOrders,
      confirmed: confirmedOrders,
      preparing: preparingOrders,
      completed: completedOrders
    }));
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

  // دالة لعرض إجراءات الحالة
  const renderStatusActions = (order) => {
    if (order.status === 'pending') {
      return (
        <View className="flex-row mt-2">
          <TouchableOpacity 
            className="flex-1 py-2 rounded-lg items-center mr-1"
            style={{ backgroundColor: colors.success }}
            onPress={() => {
              // تأكيد الطلب
              dispatch(updateOrderStatus({ orderId: order._id, status: 'confirmed' }));
            }}
          >
            <Text className="text-white font-bold">تأكيد</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 py-2 rounded-lg items-center ml-1"
            style={{ backgroundColor: colors.error }}
            onPress={() => {
              // رفض الطلب
              dispatch(updateOrderStatus({ orderId: order._id, status: 'cancelled' }));
            }}
          >
            <Text className="text-white font-bold">رفض</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (order.status === 'confirmed') {
      return (
        <TouchableOpacity 
          className="py-2 rounded-lg items-center mt-2"
          style={{ backgroundColor: colors.primary }}
          onPress={() => {
            // بدء التحضير
            dispatch(updateOrderStatus({ orderId: order._id, status: 'preparing' }));
          }}
        >
          <Text className="text-white font-bold">بدء التحضير</Text>
        </TouchableOpacity>
      );
    } else if (order.status === 'preparing') {
      return (
        <TouchableOpacity 
          className="py-2 rounded-lg items-center mt-2"
          style={{ backgroundColor: colors.success }}
          onPress={() => {
            // جاهز للتوصيل
            dispatch(updateOrderStatus({ orderId: order._id, status: 'on_way' }));
          }}
        >
          <Text className="text-white font-bold">جاهز للتوصيل</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      className="p-4 mb-3 rounded-xl"
      style={{ backgroundColor: colors.card }}
      onPress={() => {
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
          <Text className="text-sm" style={{ color: colors.text }}>العميل: {item.customer.name}</Text>
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
      
      {renderStatusActions(item)}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* علامات التبويب */}
      <View className="flex-row p-2 bg-white">
        <TouchableOpacity className="flex-1 items-center py-2">
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>الكل</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-2">
          <Text style={{ color: colors.text }}>معلق</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-2">
          <Text style={{ color: colors.text }}>مؤكد</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-2">
          <Text style={{ color: colors.text }}>جاري التحضير</Text>
        </TouchableOpacity>
      </View>

      {/* قائمة الطلبات */}
      <FlatList
        data={[...pendingOrders, ...confirmedOrders, ...preparingOrders, ...completedOrders]}
        renderItem={renderOrder}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 py-20">
            <Text style={{ color: colors.text }}>لا توجد طلبات</Text>
            <Text className="mt-2 text-center" style={{ color: colors.placeholder }}>
              الطلبات الجديدة ستظهر هنا
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={() => {
              // في تطبيق حقيقي، سيتم تحديث البيانات من الخادم
              dispatch(fetchOrdersSuccess({
                all: [...pendingOrders, ...confirmedOrders, ...preparingOrders, ...completedOrders],
                pending: pendingOrders,
                confirmed: confirmedOrders,
                preparing: preparingOrders,
                completed: completedOrders
              }));
            }}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default OrdersScreen;