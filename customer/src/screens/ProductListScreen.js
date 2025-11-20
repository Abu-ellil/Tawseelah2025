import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeContext";
import {
  fetchProductsStart,
  fetchProductsSuccess,
} from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "../utils/mockData";

const ProductListScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "إلكترونيات",
    "ملابس",
    "مأكولات",
    "أثاث",
    "كتب",
    "ألعاب",
  ];

  useEffect(() => {
    // In a real app, this would fetch from the server
    dispatch(fetchProductsSuccess(mockProducts));
  }, [dispatch]);

  const filteredByCategory =
    selectedCategory === "all"
      ? filteredProducts
      : filteredProducts.filter(
          (product) => product.category === selectedCategory
        );

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
      showStore={true}
      style={{ width: '48%' }} // للشبكة الثنائية
    />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View className="p-4">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          المنتجات
        </Text>
      </View>

      {/* Categories */}
      <View className="px-4 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 mr-2 rounded-full ${
                  selectedCategory === category ? "bg-blue-500" : ""
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category
                      ? colors.primary
                      : colors.card,
                }}
                onPress={() => {
                  setSelectedCategory(category);
                  dispatch({
                    type: "products/filterProductsByCategory",
                    payload: category,
                  });
                }}
              >
                <Text
                  style={{
                    color: selectedCategory === category ? "#fff" : colors.text,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Products List */}
      <View className="px-4">
        <Text
          className="text-lg font-semibold mb-3"
          style={{ color: colors.text }}
        >
          {selectedCategory === "all" ? "جميع المنتجات" : selectedCategory}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {filteredByCategory.map((item) => (
            <View key={item._id} style={{ width: '48%', marginBottom: 10 }}>
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
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductListScreen;
