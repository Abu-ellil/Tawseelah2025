/**
 * @file ProductCard.js - Enhanced Product Card Component
 * @description مكون منتج محسن مع إضافة للسلة وقائمة الأمنيات
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import { useAuthCheck } from '../utils/authUtils';
import { useTheme } from '../theme/ThemeContext';

const ProductCard = ({ 
  product, 
  onPress, 
  showAddToCart = true, 
  showWishlist = true,
  showRating = true,
  showStore = false,
  style = {} 
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, checkAuth } = useAuthCheck();
  const { items: cartItems } = useSelector(state => state.cart);
  const authToken = useSelector(state => state.auth.token);
  const [addingToCart, setAddingToCart] = useState(false);

  // التحقق من وجود المنتج في السلة
  const isInCart = cartItems.some(item => item.product._id === product._id);

  // إضافة للسلة مع الحماية
  const handleAddToCart = async () => {
    checkAuth('إضافة المنتجات للسلة', async () => {
      setAddingToCart(true);
      
      try {
        // إضافة للسلة محلياً
        dispatch(addItem({
          product,
          quantity: 1
        }));

        // محاولة الحفظ على الخادم (إذا كان المستخدم مسجل دخول)
        if (isAuthenticated && authToken) {
          await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/cart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: 1
            })
          });
        }

        Alert.alert(
          'تم الإضافة',
          'تم إضافة المنتج إلى سلة التسوق بنجاح',
          [{ text: 'موافق' }]
        );
      } catch (error) {
        console.error('Error adding to cart:', error);
        Alert.alert(
          'خطأ',
          'حدث خطأ أثناء إضافة المنتج للسلة',
          [{ text: 'موافق' }]
        );
      } finally {
        setAddingToCart(false);
      }
    });
  };

  // إضافة/إزالة من قائمة الأمنيات
  const handleWishlistToggle = async () => {
    checkAuth('حفظ المنتجات في قائمة الأمنيات', async () => {
      try {
        const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/wishlist/${product._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          Alert.alert(
            data.message.includes('إضافة') ? 'تم الحفظ' : 'تم الإزالة',
            data.message,
            [{ text: 'موافق' }]
          );
        }
      } catch (error) {
        console.error('Error toggling wishlist:', error);
        Alert.alert('خطأ', 'حدث خطأ أثناء تحديث قائمة الأمنيات');
      }
    });
  };

  return (
    <TouchableOpacity
      className="w-32 h-40 mx-2 rounded-lg overflow-hidden shadow-md"
      style={{ 
        backgroundColor: colors.card,
        ...style
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* صورة المنتج */}
      <Image
        source={{ uri: product.image || "https://via.placeholder.com/100" }}
        className="w-full h-20 object-cover"
      />
      
      {/* محتوى البطاقة */}
      <View className="p-2 flex-1">
        <Text
          className="text-sm font-medium"
          style={{ color: colors.text }}
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <Text
          className="text-xs"
          style={{ color: colors.placeholder }}
          numberOfLines={1}
        >
          {product.category}
        </Text>
        
        {/* السعر والتقييم */}
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm font-bold" style={{ color: colors.primary }}>
            {product.price} ر.س
          </Text>
          {showRating && (
            <Text className="text-xs" style={{ color: colors.placeholder }}>
              {product.rating} ⭐
            </Text>
          )}
        </View>
        
        {/* أزرار الإجراءات */}
        <View className="flex-row justify-between items-center mt-2">
          {showAddToCart && (
            <TouchableOpacity
              className={`px-2 py-1 rounded-md ${
                isInCart ? 'bg-green-500' : 'bg-blue-500'
              }`}
              onPress={handleAddToCart}
              disabled={addingToCart}
            >
              <Text className="text-white text-xs font-bold">
                {addingToCart ? '...' : isInCart ? '✓' : '+'}
              </Text>
            </TouchableOpacity>
          )}
          
          {showWishlist && (
            <TouchableOpacity
              className="p-1"
              onPress={handleWishlistToggle}
            >
              <Text className="text-lg">❤️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;