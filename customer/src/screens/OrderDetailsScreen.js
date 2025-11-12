import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentOrder, updateOrderStatus } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockOrders } from '../utils/mockData';

const OrderDetailsScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { currentOrder } = useSelector(state => state.orders);

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

  // مكون لعرض حالة الطلب
  const renderOrderStatus = (status, label, isActive) => (
    <View className="flex-row items-center mb-4">
      <View className={`w-10 h-10 rounded-full items-center justify-center ${isActive ? 'bg-primary' : 'bg-gray-200'}`}>
        <Text className={`font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
          {status === 'pending' ? '1' : 
           status === 'confirmed' ? '2' : 
           status === 'preparing' ? '3' : 
           status === 'on_way' ? '4' : '5'}
        </Text>
      </View>
      <View className="mr-3 flex-1">
        <Text className="font-bold" style={{ color: colors.text }}>{label}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {status === 'pending' ? 'تم إنشاء الطلب' : 
           status === 'confirmed' ? 'تم تأكيد الطلب' : 
           status === 'preparing' ? 'جارٍ تحضير الطلب' : 
           status === 'on_way' ? 'في طريقه إليك' : 'تم التسليم'}
        </Text>
      </View>
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View className="flex-row p-3 mb-2 rounded-lg" style={{ backgroundColor: colors.card }}>
      <Image 
        source={{ uri: item.product.image || 'https://via.placeholder.com/60' }} 
        className="w-12 h-12 rounded-lg" 
      />
      <View className="flex-1 mr-3">
        <Text className="font-medium" style={{ color: colors.text }}>{item.product.name}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>الكمية: {item.quantity}</Text>
      </View>
      <Text className="font-bold" style={{ color: colors.primary }}>{item.price * item.quantity} ر.س</Text>
    </View>
  );

  if (!currentOrder) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>لا توجد معلومات للطلب</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* رأس الطلب */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-white">طلب #{currentOrder._id.substring(0, 8)}</Text>
          <Text 
            className="text-lg font-medium px-3 py-1 rounded-full"
            style={{ 
              color: getStatusColor(currentOrder.status),
              borderColor: getStatusColor(currentOrder.status),
              borderWidth: 1
            }}
          >
            {getStatusText(currentOrder.status)}
          </Text>
        </View>
        <Text className="text-white mt-2">
          {new Date(currentOrder.createdAt).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>

      {/* تفاصيل الحالة */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>تتبع الطلب</Text>
        
        {renderOrderStatus('pending', 'تم الإنشاء', ['pending', 'confirmed', 'preparing', 'on_way', 'delivered'].includes(currentOrder.status))}
        {renderOrderStatus('confirmed', 'تم التأكيد', ['confirmed', 'preparing', 'on_way', 'delivered'].includes(currentOrder.status))}
        {renderOrderStatus('preparing', 'قيد التحضير', ['preparing', 'on_way', 'delivered'].includes(currentOrder.status))}
        {renderOrderStatus('on_way', 'في الطريق', ['on_way', 'delivered'].includes(currentOrder.status))}
        {renderOrderStatus('delivered', 'تم التوصيل', ['delivered'].includes(currentOrder.status))}
      </View>

      {/* تفاصيل العناصر */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>العناصر</Text>
        <FlatList
          data={currentOrder.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => `${item.product._id}-${index}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ color: colors.text, textAlign: 'center', padding: 20 }}>
              لا توجد عناصر في هذا الطلب
            </Text>
          }
        />
      </View>

      {/* تفاصيل الدفع والتوصيل */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>تفاصيل الطلب</Text>
        
        <View className="mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>إجمالي المنتجات:</Text>
            <Text style={{ color: colors.text }}>{currentOrder.totalAmount - currentOrder.deliveryFee} ر.س</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>رسوم التوصيل:</Text>
            <Text style={{ color: colors.text }}>{currentOrder.deliveryFee} ر.س</Text>
          </View>
          <View className="flex-row justify-between border-t pt-2" style={{ borderColor: colors.border }}>
            <Text className="font-bold" style={{ color: colors.text }}>المجموع الكلي:</Text>
            <Text className="font-bold" style={{ color: colors.primary }}>{currentOrder.totalAmount} ر.س</Text>
          </View>
        </View>

        <View className="mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <Text className="font-bold mb-2" style={{ color: colors.text }}>طريقة الدفع</Text>
          <Text style={{ color: colors.text }}>
            {currentOrder.payment.method === 'cash' ? 'الدفع عند الاستلام' : 
             currentOrder.payment.method === 'wallet' ? 'المحفظة الإلكترونية' : 
             currentOrder.payment.method === 'paymob' ? 'Paymob' : 'فوري'}
          </Text>
        </View>

        <View className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <Text className="font-bold mb-2" style={{ color: colors.text }}>ملاحظات</Text>
          <Text style={{ color: colors.text }}>
            {currentOrder.notes || 'لا توجد ملاحظات'}
          </Text>
        </View>
      </View>

      {/* أزرار الإجراءات */}
      <View className="p-4">
        {currentOrder.status !== 'delivered' && currentOrder.status !== 'cancelled' && (
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center mb-3"
            style={{ backgroundColor: colors.error }}
            onPress={() => {
              // في تطبيق حقيقي، سيتم إلغاء الطلب
              console.log('إلغاء الطلب');
            }}
          >
            <Text className="text-white font-bold">إلغاء الطلب</Text>
          </TouchableOpacity>
        )}
        
        {currentOrder.status === 'delivered' && (
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center mb-3"
            style={{ backgroundColor: colors.primary }}
            onPress={() => {
              // في تطبيق حقيقي، سيتم تقييم الخدمة
              console.log('تقييم الطلب');
            }}
          >
            <Text className="text-white font-bold">تقييم الخدمة</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;