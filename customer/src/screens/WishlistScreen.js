/**
 * @file WishlistScreen.js - Wishlist Screen for Tawseela Customer App
 * @description شاشة قائمة الأمنيات مع إدارة المنتجات المحفوظة
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { useAuthCheck } from '../utils/authUtils';
import { addItem } from '../store/slices/cartSlice';
import ProductCard from '../components/ProductCard';

const WishlistScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, checkAuth } = useAuthCheck();
  
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // تحميل قائمة الأمنيات
  const loadWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const token = useSelector(state => state.auth.token);
      const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/wishlist`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setWishlist(data.data.wishlist || []);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء تحميل قائمة الأمنيات');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [isAuthenticated]);

  // تحديث قائمة الأمنيات
  const onRefresh = () => {
    setRefreshing(true);
    loadWishlist();
  };

  // إضافة للسلة من قائمة الأمنيات
  const handleAddToCart = async (product) => {
    checkAuth('إضافة المنتجات للسلة', () => {
      // إضافة للسلة محلياً
      dispatch(addItem({
        product,
        quantity: 1
      }));

      // محاولة الحفظ على الخادم
      if (isAuthenticated) {
        const token = useSelector(state => state.auth.token);
        fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1
          })
        }).catch(console.error);
      }

      Alert.alert(
        'تم الإضافة',
        'تم إضافة المنتج إلى سلة التسوق بنجاح',
        [{ text: 'موافق' }]
      );
    });
  };

  // إزالة من قائمة الأمنيات
  const handleRemoveFromWishlist = async (productId, productName) => {
    checkAuth('إزالة المنتجات من قائمة الأمنيات', async () => {
      try {
        const token = useSelector(state => state.auth.token);
        const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/wishlist/${productId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          // إزالة المنتج من القائمة المحلية
          setWishlist(prev => prev.filter(item => item.product._id !== productId));
          
          Alert.alert(
            'تم الإزالة',
            `تم إزالة ${productName} من قائمة الأمنيات`,
            [{ text: 'موافق' }]
          );
        }
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        Alert.alert('خطأ', 'حدث خطأ أثناء إزالة المنتج');
      }
    });
  };

  // عرض عنصر قائمة الأمنيات
  const renderWishlistItem = ({ item }) => (
    <View className="mb-4">
      <ProductCard
        product={item.product}
        onPress={() => {
          // يمكن إضافة التنقل لصفحة تفاصيل المنتج هنا
          Alert.alert('تفاصيل المنتج', `عرض تفاصيل ${item.product.name}`);
        }}
        showAddToCart={true}
        showWishlist={true}
        showRating={true}
        showStore={true}
      />
      
      {/* تاريخ الإضافة */}
      <Text className="text-xs mt-1 px-2" style={{ color: colors.placeholder }}>
        أضيف في: {new Date(item.addedAt).toLocaleDateString('ar-SA')}
      </Text>
    </View>
  );

  // عرض المحتوى عند عدم تسجيل الدخول
  const renderNotAuthenticated = () => (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-6xl mb-4">💔</Text>
      <Text className="text-xl font-bold text-center mb-2" style={{ color: colors.text }}>
        قائمة الأمنيات فارغة
      </Text>
      <Text className="text-center mb-6" style={{ color: colors.placeholder }}>
        قم بتسجيل الدخول لحفظ منتجاتك المفضلة
      </Text>
      
      <TouchableOpacity
        className="px-8 py-3 rounded-xl"
        style={{ backgroundColor: colors.primary }}
        onPress={() => {
          Alert.alert(
            'تسجيل الدخول مطلوب',
            'قم بتسجيل الدخول لحفظ المنتجات في قائمة الأمنيات',
            [
              { text: 'إلغاء', style: 'cancel' },
              { 
                text: 'تسجيل الدخول',
                onPress: () => {
                  // التنقل لصفحة تسجيل الدخول
                  // navigation.navigate('login');
                }
              }
            ]
          );
        }}
      >
        <Text className="text-white font-bold">تسجيل الدخول</Text>
      </TouchableOpacity>
    </View>
  );

  // عرض المحتوى عندما لا توجد منتجات
  const renderEmptyWishlist = () => (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-6xl mb-4">❤️</Text>
      <Text className="text-xl font-bold text-center mb-2" style={{ color: colors.text }}>
        قائمة الأمنيات فارغة
      </Text>
      <Text className="text-center mb-6" style={{ color: colors.placeholder }}>
        ابدأ بحفظ منتجاتك المفضلة لإيجادها بسهولة
      </Text>
      
      <TouchableOpacity
        className="px-8 py-3 rounded-xl"
        style={{ backgroundColor: colors.primary }}
        onPress={() => {
          // التنقل لصفحة المنتجات
          // navigation.navigate('products');
        }}
      >
        <Text className="text-white font-bold">تصفح المنتجات</Text>
      </TouchableOpacity>
    </View>
  );

  // عرض قائمة الأمنيات
  const renderWishlist = () => (
    <FlatList
      data={wishlist}
      renderItem={renderWishlistItem}
      keyExtractor={(item) => item.product._id}
      showsVerticalScrollIndicator={false}
      className="flex-1 px-4 py-4"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
      ListEmptyComponent={renderEmptyWishlist}
    />
  );

  // المحتوى الرئيسي
  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.placeholder }}>جاري التحميل...</Text>
        </View>
      );
    }

    if (!isAuthenticated) {
      return renderNotAuthenticated();
    }

    return renderWishlist();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* رأس الشاشة */}
      <View className="p-4 pt-8 border-b" style={{ borderColor: colors.border }}>
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          قائمة الأمنيات
        </Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {isAuthenticated ? 
            `${wishlist.length} منتج محفوظ` : 
            'قم بتسجيل الدخول لحفظ منتجاتك المفضلة'
          }
        </Text>
      </View>

      {/* المحتوى */}
      {renderContent()}
    </View>
  );
};

export default WishlistScreen;