import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsSuccess, setSelectedProduct } from '../store/slices/productSlice';
import { useTheme } from '../theme/ThemeContext';

// Mock data
import { mockProducts } from '../utils/mockData';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل المنتجات من الخادم
    dispatch(fetchProductsSuccess(mockProducts));
  }, [dispatch]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      className="flex-row p-4 mb-3 rounded-xl"
      style={{ backgroundColor: colors.card }}
      onPress={() => {
        dispatch(setSelectedProduct(item));
        navigation.navigate('ProductDetails', { product: item });
      }}
    >
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/80' }} 
        className="w-16 h-16 rounded-lg" 
      />
      <View className="flex-1 mr-3">
        <Text className="text-base font-bold" style={{ color: colors.text }}>{item.name}</Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>{item.category}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>{item.price} ر.س</Text>
          <View className="flex-row items-center">
            <Text className="text-sm" style={{ color: colors.text }}>الكمية: </Text>
            <Text className="text-sm font-bold" style={{ color: colors.primary }}>{item.stock}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* شريط البحث */}
      <View className="p-4">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <TextInput
            className="flex-1 text-base"
            placeholder="ابحث عن المنتجات..."
            placeholderTextColor={colors.placeholder}
          />
          <Text style={{ color: colors.placeholder }}>🔍</Text>
        </View>
      </View>

      {/* عنوان الشاشة و زر الإضافة */}
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-xl font-bold" style={{ color: colors.text }}>المنتجات</Text>
        <TouchableOpacity 
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Text className="text-white font-bold">إضافة منتج</Text>
        </TouchableOpacity>
      </View>

      {/* قائمة المنتجات */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        ListEmptyComponent={
          <View className="items-center justify-center flex-1 py-20">
            <Text style={{ color: colors.text }}>لا توجد منتجات</Text>
            <Text className="mt-2 text-center" style={{ color: colors.placeholder }}>
              قم بإضافة منتجات جديدة لعرضها هنا
            </Text>
            <TouchableOpacity 
              className="mt-4 px-4 py-2 rounded-lg"
              style={{ backgroundColor: colors.primary }}
              onPress={() => navigation.navigate('AddProduct')}
            >
              <Text className="text-white font-bold">إضافة منتج أول</Text>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={() => {
              // في تطبيق حقيقي، سيتم تحديث البيانات من الخادم
              dispatch(fetchProductsSuccess(mockProducts));
            }}
            tintColor={colors.primary}
          />
        }
      />

      {/* عدد المنتجات */}
      <View className="p-4 border-t" style={{ borderColor: colors.border, backgroundColor: colors.card }}>
        <Text style={{ color: colors.text }}>إجمالي المنتجات: {products.length}</Text>
      </View>
    </View>
  );
};

export default ProductsScreen;