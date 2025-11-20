import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  searchProducts,
  fetchProductsSuccess,
} from "../store/slices/productSlice";
import { useTheme } from "../theme/ThemeContext";

// Mock data
import { mockProducts, mockStores } from "../utils/mockData";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'stores'

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل جميع المنتجات من الخادم
    dispatch(fetchProductsSuccess(mockProducts));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      if (activeTab === "products") {
        const results = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      } else {
        const results = mockStores.filter(
          (store) =>
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            store.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      }
    }
  }, [searchQuery, activeTab]);

  const renderResult = ({ item }) => {
    if (activeTab === "products") {
      return (
        <TouchableOpacity
          className="flex-row p-3 mb-2 rounded-xl"
          style={{ backgroundColor: colors.card }}
          onPress={() => {
            // في تطبيق حقيقي، سيتم الانتقال إلى تفاصيل المنتج
            navigation.navigate("store-details", {
              storeId: item.store,
              scrollToProduct: item._id,
            });
            navigation.goBack();
          }}
        >
          <Image
            source={{ uri: item.image || "https://via.placeholder.com/60" }}
            className="w-14 h-14 rounded-lg"
          />
          <View className="flex-1 mr-3">
            <Text
              className="font-medium"
              style={{ color: colors.text }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              className="text-sm"
              style={{ color: colors.placeholder }}
              numberOfLines={1}
            >
              {item.category}
            </Text>
            <Text
              className="text-base font-bold mt-1"
              style={{ color: colors.primary }}
            >
              {item.price} ر.س
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          className="flex-row p-3 mb-2 rounded-xl"
          style={{ backgroundColor: colors.card }}
          onPress={() => {
            // الانتقال إلى تفاصيل المتجر
            const store = mockStores.find((s) => s._id === item._id);
            navigation.navigate("store-details", { store });
            navigation.goBack();
          }}
        >
          <Image
            source={{ uri: item.logo || "https://via.placeholder.com/60" }}
            className="w-14 h-14 rounded-lg"
          />
          <View className="flex-1 mr-3">
            <Text
              className="font-medium"
              style={{ color: colors.text }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              className="text-sm"
              style={{ color: colors.placeholder }}
              numberOfLines={1}
            >
              {item.category || "متجر عام"}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm" style={{ color: colors.text }}>
                ⭐ {item.rating}
              </Text>
              <Text
                className="text-xs mx-2"
                style={{ color: colors.placeholder }}
              >
                ({item.ratingCount || 0} تقييم)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {/* شريط البحث */}
      <View className="p-4">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-xl">◀</Text>
          </TouchableOpacity>
          <TextInput
            className="flex-1 mx-3 text-base"
            placeholder="ابحث عن منتجات أو متاجر..."
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text className="text-xl">✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* تبويبات المنتجات والمتاجر */}
      <View className="flex-row justify-around p-2">
        <TouchableOpacity
          className={`flex-1 items-center py-3 ${
            activeTab === "products" ? "border-b-2" : ""
          }`}
          style={{
            borderColor:
              activeTab === "products" ? colors.primary : "transparent",
          }}
          onPress={() => setActiveTab("products")}
        >
          <Text
            style={{
              color:
                activeTab === "products" ? colors.primary : colors.placeholder,
              fontWeight: activeTab === "products" ? "bold" : "normal",
            }}
          >
            منتجات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center py-3 ${
            activeTab === "stores" ? "border-b-2" : ""
          }`}
          style={{
            borderColor:
              activeTab === "stores" ? colors.primary : "transparent",
          }}
          onPress={() => setActiveTab("stores")}
        >
          <Text
            style={{
              color:
                activeTab === "stores" ? colors.primary : colors.placeholder,
              fontWeight: activeTab === "stores" ? "bold" : "normal",
            }}
          >
            متاجر
          </Text>
        </TouchableOpacity>
      </View>

      {/* نتائج البحث */}
      <FlatList
        data={searchResults}
        renderItem={renderResult}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1"
        ListEmptyComponent={
          searchQuery ? (
            <View className="items-center justify-center py-20">
              <Text style={{ color: colors.text }}>
                لا توجد نتائج لـ "{searchQuery}"
              </Text>
            </View>
          ) : (
            <View className="items-center justify-center py-20">
              <Text style={{ color: colors.text }}>ابدأ بالبحث</Text>
            </View>
          )
        }
      />

      {/* عرض آخر عمليات البحث أو اقتراحات */}
      {searchQuery === "" && (
        <View className="px-4 mt-4">
          <Text className="font-bold mb-3" style={{ color: colors.text }}>
            البحث الشائع
          </Text>
          <View className="flex-row flex-wrap">
            {["هاتف", "مطعم", "فستان", "حاسوب", "حلويات"].map(
              (suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  className="px-3 py-2 m-1 rounded-full"
                  style={{ backgroundColor: colors.card }}
                  onPress={() => setSearchQuery(suggestion)}
                >
                  <Text style={{ color: colors.text }}>{suggestion}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
