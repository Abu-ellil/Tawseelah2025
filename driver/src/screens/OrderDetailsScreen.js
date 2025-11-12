import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { startDelivery, completeDelivery, setActiveOrder } from '../store/slices/orderSlice';
import { updateEarnings } from '../store/slices/earningSlice';
import { useTheme } from '../theme/ThemeContext';

const OrderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { activeOrder } = useSelector(state => state.orders);

  const order = route.params?.order || activeOrder;

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>لا توجد معلومات للطلب</Text>
      </View>
    );
  }

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

  // دالة لبدء التوصيل
  const handleStartDelivery = () => {
    dispatch(startDelivery());
    // في تطبيق حقيقي، سيتم إرسال التحديث إلى الخادم
    Alert.alert('تم', 'بدأ التوصيل');
  };

 // دالة لإكمال التوصيل
  const handleCompleteDelivery = () => {
    // في تطبيق حقيقي، قد يتم طلب إثبات التسليم (صورة/توقيع)
    Alert.alert(
      'إثبات التسليم',
      'يرجى تحميل إثبات التسليم',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تم التسليم', 
          onPress: () => {
            dispatch(completeDelivery(order._id));
            dispatch(updateEarnings({ 
              amount: order.deliveryFee, 
              orderType: 'daily' 
            }));
            navigation.navigate('Home');
            Alert.alert('تم', 'تم تسليم الطلب بنجاح');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* رأس الطلب */}
      <View className="p-4" style={{ backgroundColor: colors.primary }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-white">طلب #{order._id.substring(0, 8)}</Text>
          <Text 
            className="text-lg font-medium px-3 py-1 rounded-full"
            style={{ 
              color: getStatusColor(order.status),
              borderColor: getStatusColor(order.status),
              borderWidth: 1
            }}
          >
            {getStatusText(order.status)}
          </Text>
        </View>
        <Text className="text-white mt-2">
          {new Date(order.createdAt).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>

      {/* تفاصيل العميل */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>تفاصيل العميل</Text>
        <View className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <Text style={{ color: colors.text }}>الاسم: {order.customer?.name || 'العميل'}</Text>
          <Text style={{ color: colors.text }}>الهاتف: {order.customer?.phone || 'غير متوفر'}</Text>
        </View>
      </View>

      {/* تفاصيل المتجر */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>تفاصيل المتجر</Text>
        <View className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <Text style={{ color: colors.text }}>المتجر: {order.store?.name || 'غير متوفر'}</Text>
          <Text style={{ color: colors.text }}>الهاتف: {order.store?.phone || 'غير متوفر'}</Text>
          <Text style={{ color: colors.text }}>العنوان: {order.pickupLocation.address}</Text>
        </View>
      </View>

      {/* تفاصيل التوصيل */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>تفاصيل التوصيل</Text>
        <View className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <Text style={{ color: colors.text }}>العنوان: {order.deliveryLocation.address}</Text>
          <Text style={{ color: colors.text }}>الملاحظات: {order.notes || 'لا توجد ملاحظات'}</Text>
        </View>
      </View>

      {/* تفاصيل العناصر */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>العناصر</Text>
        {order.items.map((item, index) => (
          <View key={index} className="flex-row p-3 mb-2 rounded-lg" style={{ backgroundColor: colors.card }}>
            <Image 
              source={{ uri: item.product?.image || 'https://via.placeholder.com/60' }} 
              className="w-12 h-12 rounded-lg" 
            />
            <View className="flex-1 mr-3">
              <Text style={{ color: colors.text }}>{item.product?.name}</Text>
              <Text style={{ color: colors.placeholder }}>الكمية: {item.quantity}</Text>
            </View>
            <Text style={{ color: colors.primary }}>{item.price * item.quantity} ر.س</Text>
          </View>
        ))}
      </View>

      {/* تفاصيل الدفع */}
      <View className="p-4 mt-2">
        <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>تفاصيل الدفع</Text>
        <View className="p-3 rounded-lg" style={{ backgroundColor: colors.card }}>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>إجمالي المنتجات:</Text>
            <Text style={{ color: colors.text }}>{order.totalAmount - order.deliveryFee} ر.س</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text style={{ color: colors.text }}>رسوم التوصيل:</Text>
            <Text style={{ color: colors.text }}>{order.deliveryFee} ر.س</Text>
          </View>
          <View className="flex-row justify-between border-t pt-2" style={{ borderColor: colors.border }}>
            <Text className="font-bold" style={{ color: colors.text }}>المجموع الكلي:</Text>
            <Text className="font-bold" style={{ color: colors.primary }}>{order.totalAmount} ر.س</Text>
          </View>
        </View>
      </View>

      {/* أزرار الإجراءات */}
      <View className="p-4 mt-4">
        {order.status === 'accepted' && (
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center mb-3"
            style={{ backgroundColor: colors.success }}
            onPress={handleStartDelivery}
          >
            <Text className="text-white font-bold">بدء التوصيل</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'on_way' && (
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center mb-3"
            style={{ backgroundColor: colors.success }}
            onPress={handleCompleteDelivery}
          >
            <Text className="text-white font-bold">إكمال التوصيل</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          className="w-full py-4 rounded-xl items-center border"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
          onPress={() => navigation.navigate('Map', { order })}
        >
          <Text className="text-primary font-bold">عرض الخريطة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;