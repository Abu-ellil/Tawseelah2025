import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStoresStart,
  fetchStoresSuccess,
  setSelectedStore,
} from "../store/slices/storeSlice";
import { useTheme } from "../theme/ThemeContext";

// Mock data
import { mockStores } from "../utils/mockData";

const StoresScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { stores, loading } = useSelector((state) => state.stores);

  // تحميل المتاجر عند تحميل الشاشة
  useEffect(() => {
    // في تطبيق حقيقي، سيتم استدعاء API
    dispatch(fetchStoresSuccess(mockStores));
  }, [dispatch]);

  const renderStore = ({ item }) => (
    <TouchableOpacity
      className="flex-row p-4 mb-3 rounded-xl shadow-sm"
      style={{ backgroundColor: colors.card }}
      onPress={() => {
        dispatch(setSelectedStore(item));
        navigation.navigate("store-details", { store: item });
      }}
    >
      <Image
        source={{ uri: item.logo || "https://via.placeholder.com/80" }}
        className="w-16 h-16 rounded-lg"
      />
      <View className="flex-1 mr-3">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          {item.name}
        </Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {item.category || "متجر عام"}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm" style={{ color: colors.text }}>
            ⭐ {item.rating}{" "}
          </Text>
          <Text className="text-xs mx-2" style={{ color: colors.placeholder }}>
            ({item.ratingCount || 0} تقييم)
          </Text>
          <Text className="text-xs" style={{ color: colors.placeholder }}>
            {item.distance} كم
          </Text>
        </View>
        <Text className="text-xs mt-1" style={{ color: colors.placeholder }}>
          {item.address}
        </Text>
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
            placeholder="ابحث عن المتاجر..."
            placeholderTextColor={colors.placeholder}
          />
          <Text style={{ color: colors.placeholder }}>🔍</Text>
        </View>
      </View>

      {/* عنوان الشاشة */}
      <View className="px-4 py-2">
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          جميع المتاجر
        </Text>
        <Text className="text-sm" style={{ color: colors.placeholder }}>
          {stores.length} متجر متاح
        </Text>
      </View>

      {/* قائمة المتاجر */}
      <FlatList
        data={stores}
        renderItem={renderStore}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        className="px-4"
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text style={{ color: colors.text }}>
              لا توجد متاجر متاحة حالياً
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default StoresScreen;
