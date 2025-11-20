import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStoresStart,
  fetchStoresSuccess,
} from "../store/slices/storeSlice";
import {
  fetchProductsStart,
  fetchProductsSuccess,
} from "../store/slices/productSlice";
import { useTheme } from "../theme/ThemeContext";
import ProductCard from "../components/ProductCard";

// Mock data
import { mockStores, mockProducts } from "../utils/mockData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.stores);
  const { filteredProducts } = useSelector((state) => state.products);

  // تحميل البيانات عند تحميل الشاشة
  useEffect(() => {
    // في تطبيق حقيقي، سيتم استدعاء API
    dispatch(fetchStoresSuccess(mockStores));
    dispatch(fetchProductsSuccess(mockProducts));
  }, [dispatch]);

  // عرض المتاجر المميزة
  const renderStore = ({ item }) => (
    <TouchableOpacity
      className="w-40 h-48 mx-2 rounded-xl overflow-hidden shadow-md"
      style={{ backgroundColor: colors.card }}
      onPress={() => navigation.navigate("store-details", { store: item })}
    >
      <Image
        source={{ uri: item.logo || "https://via.placeholder.com/150" }}
        className="w-full h-24 object-cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          {item.name}
        </Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {item.rating} ⭐ ({item.ratingCount || 0})
        </Text>
        <Text className="text-xs" style={{ color: colors.placeholder }}>
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // عرض المنتجات المميزة باستخدام ProductCard الجديد
  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => {
        // عند النقر على المنتج، الانتقال لصفحة المتجر
        navigation.navigate("store-details", {
          storeId: item.store,
          scrollToProduct: item._id,
        });
      }}
      showAddToCart={true}
      showWishlist={true}
      showRating={true}
      showStore={false}
    />
  );

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {/* مرحباً بالمستخدم */}
      <View className="p-4">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          مرحباً بك في توصيلة
        </Text>
        <Text style={{ color: colors.placeholder }}>
          ما الذي تبحث عنه اليوم؟
        </Text>
      </View>

      {/* بحث سريع */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          className="flex-row items-center p-3 rounded-full border"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
          onPress={() => navigation.navigate("search")}
        >
          <Text className="mr-3" style={{ color: colors.placeholder }}>
            ابحث عن منتجات أو متاجر...
          </Text>
          <Text style={{ color: colors.placeholder }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* المتاجر المميزة */}
      <View className="mb-6">
        <View className="px-4 py-2 flex-row justify-between items-center">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            المتاجر القريبة
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("stores")}>
            <Text style={{ color: colors.primary }}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={stores.slice(0, 5)} // عرض أول 5 متاجر فقط
          renderItem={renderStore}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          className="mt-2"
        />
      </View>

      {/* المنتجات المميزة */}
      <View className="mb-6">
        <View className="px-4 py-2 flex-row justify-between items-center">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            المنتجات المميزة
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("products")}>
            <Text style={{ color: colors.primary }}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={filteredProducts.slice(0, 5)} // عرض أول 5 منتجات فقط
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          className="mt-2"
        />
      </View>

      {/* أقسام المنتجات */}
      <View className="px-4 py-6">
        <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
          التصنيفات
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {["إلكترونيات", "ملابس", "مأكولات", "أثاث", "كتب", "ألعاب"].map(
            (category, index) => (
              <TouchableOpacity
                key={index}
                className="w-[30%] h-24 mb-4 rounded-lg items-center justify-center"
                style={{ backgroundColor: colors.card }}
                onPress={() => {
                  // تصفية المنتجات حسب الفئة
                  dispatch({
                    type: "products/filterProductsByCategory",
                    payload: category,
                  });
                  navigation.navigate("products");
                }}
              >
                <Text className="font-medium" style={{ color: colors.text }}>
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
