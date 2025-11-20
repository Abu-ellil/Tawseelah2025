import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../theme/ThemeContext";
import {
  fetchProductsStart,
  fetchProductsSuccess,
} from "../store/slices/productSlice";
import { mockProducts } from "../utils/mockData";

const ProductListScreen = () => {
  const { colors } = useTheme();
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
    <TouchableOpacity
      className="flex-row p-4 mb-3 rounded-xl"
      style={{ backgroundColor: colors.card }}
    >
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/100" }}
        className="w-16 h-16 rounded-lg"
      />
      <View className="flex-1 mr-3">
        <Text className="text-base font-medium" style={{ color: colors.text }}>
          {item.name}
        </Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {item.category}
        </Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>
            {item.price} ر.س
          </Text>
          <Text className="text-xs" style={{ color: colors.placeholder }}>
            {item.rating} ⭐
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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

        <FlatList
          data={filteredByCategory}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default ProductListScreen;
