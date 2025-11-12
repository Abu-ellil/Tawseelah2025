import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedStore } from '../store/slices/storeSlice';
import { addItem } from '../store/slices/cartSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockProducts } from '../utils/mockData';

const StoreDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { selectedStore } = useSelector(state => state.stores);
  
  const [store, setStore] = useState(route.params?.store || selectedStore);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // في تطبيق حقيقي، سيتم جلب بيانات المتجر من API
    // تحميل المنتجات من نفس المتجر
    const storeProducts = mockProducts.filter(product => product.store === store._id);
    setProducts(storeProducts);
    setLoading(false);
    
    // تعيين المتجر المحدد في الحالة
    dispatch(setSelectedStore(store));
  }, [store, dispatch]);

  // جلب المنتجات حسب الفئة
  const getProductsByCategory = (category) => {
    if (category === 'all') {
      return mockProducts.filter(product => product.store === store._id);
    }
    return mockProducts.filter(product => 
      product.store === store._id && 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  // التصنيفات الشائعة
  const categories = ['all', 'إلكترونيات', 'مأكولات', 'ملابس', 'أثاث'];

  const addToCart = (product) => {
    dispatch(addItem({ product, quantity: 1 }));
    // إظهار تنبيه بالنجاح
    // في تطبيق حقيقي، قد تستخدم مكتبة تنبيهات
  };

  const renderProduct = ({ item }) => (
    <View className="flex-row p-4 mb-3 rounded-xl" style={{ backgroundColor: colors.card }}>
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/80' }} 
        className="w-16 h-16 rounded-lg" 
      />
      <View className="flex-1 mr-3">
        <Text className="text-base font-bold" style={{ color: colors.text }} numberOfLines={1}>{item.name}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }} numberOfLines={1}>{item.description}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>{item.price} ر.س</Text>
          <TouchableOpacity 
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.primary }}
            onPress={() => addToCart(item)}
          >
            <Text className="text-white font-bold">إضافة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!store) {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>لم يتم العثور على المتجر</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* صورة الغلاف */}
      <Image 
        source={{ uri: store.coverImage || 'https://via.placeholder.com/300x150' }} 
        className="w-full h-40" 
      />
      
      {/* معلومات المتجر */}
      <View className="px-4 -mt-10 z-10">
        <View className="flex-row">
          <Image 
            source={{ uri: store.logo || 'https://via.placeholder.com/80' }} 
            className="w-20 h-20 rounded-xl border-4 border-white" 
          />
          <View className="flex-1 mr-3 justify-center">
            <Text className="text-xl font-bold" style={{ color: colors.text }}>{store.name}</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm" style={{ color: colors.text }}>⭐ {store.rating}</Text>
              <Text className="text-xs mx-2" style={{ color: colors.placeholder }}>({store.ratingCount} تقييم)</Text>
              <Text className="text-xs" style={{ color: colors.placeholder }}>{store.distance} كم</Text>
            </View>
          </View>
        </View>
      </View>

      {/* أزرار الإجراءات */}
      <View className="flex-row px-4 mt-2">
        <TouchableOpacity 
          className="flex-1 py-3 rounded-xl items-center mx-1"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('Chat', { storeId: store._id })}
        >
          <Text className="text-white font-bold">دردشة</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 py-3 rounded-xl items-center mx-1 border"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
          onPress={() => navigation.navigate('StoreLocation', { store })}
        >
          <Text className="text-primary font-bold">الموقع</Text>
        </TouchableOpacity>
      </View>

      {/* أقسام المنتجات */}
      <View className="mt-4">
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="px-4 py-2 mx-2 rounded-full"
              style={{ 
                backgroundColor: activeCategory === item ? colors.primary : colors.card,
              }}
              onPress={() => {
                setActiveCategory(item);
                setProducts(getProductsByCategory(item));
              }}
            >
              <Text style={{ 
                color: activeCategory === item ? 'white' : colors.text 
              }}>
                {item === 'all' ? 'الكل' : item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          className="px-4"
        />
      </View>

      {/* قائمة المنتجات */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4 mt-4 flex-1"
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text style={{ color: colors.text }}>لا توجد منتجات متاحة حالياً</Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={() => {
              // في تطبيق حقيقي، سيتم تحديث البيانات من الخادم
              const storeProducts = getProductsByCategory(activeCategory);
              setProducts(storeProducts);
            }}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default StoreDetailsScreen;