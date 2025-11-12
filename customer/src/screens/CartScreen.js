import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem, clearCart } from '../store/slices/cartSlice';
import { useTheme } from '../theme/ThemeContext';

const CartScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      Alert.alert(
        'تأكيد',
        'هل أنت متأكد من رغبتك في إزالة هذا العنصر؟',
        [
          { text: 'إلغاء', style: 'cancel' },
          { 
            text: 'حذف', 
            style: 'destructive',
            onPress: () => dispatch(removeItem(productId))
          }
        ]
      );
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

 const checkout = () => {
    if (items.length === 0) {
      Alert.alert('السلة فارغة', 'الرجاء إضافة منتجات إلى سلة التسوق');
      return;
    }
    
    // في تطبيق حقيقي، سيتم توجيه المستخدم إلى صفحة الدفع
    Alert.alert('الدفع', 'سيتم توجيهك إلى صفحة الدفع');
  };

  const renderCartItem = ({ item }) => (
    <View className="flex-row p-4 mb-3 rounded-xl" style={{ backgroundColor: colors.card }}>
      <Image 
        source={{ uri: item.product.image || 'https://via.placeholder.com/80' }} 
        className="w-16 h-16 rounded-lg" 
      />
      <View className="flex-1 mr-3">
        <Text className="text-base font-bold" style={{ color: colors.text }}>{item.product.name}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>{item.product.category}</Text>
        <Text className="text-lg font-bold mt-1" style={{ color: colors.primary }}>
          {item.product.price * item.quantity} ر.س
        </Text>
        <Text className="text-xs" style={{ color: colors.placeholder }}>
          {item.product.price} ر.س × {item.quantity}
        </Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity 
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary }}
          onPress={() => updateItemQuantity(item.product._id, item.quantity + 1)}
        >
          <Text className="text-white font-bold">+</Text>
        </TouchableOpacity>
        <Text className="mx-2 text-base" style={{ color: colors.text }}>{item.quantity}</Text>
        <TouchableOpacity 
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.error }}
          onPress={() => updateItemQuantity(item.product._id, item.quantity - 1)}
        >
          <Text className="text-white font-bold">-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* رأس الشاشة */}
      <View className="p-4 pt-8">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>سلة التسوق</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {items.length} منتج في السلة
        </Text>
      </View>

      {/* قائمة العناصر في السلة */}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={item => item.product._id}
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 py-20">
            <Text style={{ color: colors.text }}>سلة التسوق فارغة</Text>
            <Text className="mt-2 text-center" style={{ color: colors.placeholder }}>
              قم بإضافة بعض المنتجات من المتاجر لترى هنا
            </Text>
          </View>
        }
      />

      {/* ملخص الطلب */}
      {items.length > 0 && (
        <View className="p-4 border-t" style={{ borderColor: colors.border, backgroundColor: colors.card }}>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold" style={{ color: colors.text }}>المجموع</Text>
            <Text className="text-xl font-bold" style={{ color: colors.primary }}>{total} ر.س</Text>
          </View>
          
          <TouchableOpacity 
            className="w-full py-4 rounded-xl items-center"
            style={{ backgroundColor: colors.primary }}
            onPress={checkout}
          >
            <Text className="text-white font-bold text-lg">الدفع الآن</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-full py-3 rounded-xl items-center mt-2"
            style={{ borderColor: colors.primary, borderWidth: 1 }}
            onPress={() => dispatch(clearCart())}
          >
            <Text className="text-primary font-bold">مسح السلة</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;