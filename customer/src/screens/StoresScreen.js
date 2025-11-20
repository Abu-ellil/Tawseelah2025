import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStoresStart,
  fetchStoresSuccess,
  setSelectedStore,
} from "../store/slices/storeSlice";
import { useTheme } from "../theme/ThemeContext";
import { useAuthCheck } from "../utils/authUtils";

// Mock data
import { mockStores } from "../utils/mockData";

const StoresScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { stores, loading } = useSelector((state) => state.stores);
  const { isAuthenticated, checkAuth } = useAuthCheck();
  const [favoriteStores, setFavoriteStores] = useState([]);

  // تحميل المتاجر والمفضلة عند تحميل الشاشة
  useEffect(() => {
    // تحميل المتاجر
    dispatch(fetchStoresSuccess(mockStores));
    
    // تحميل المتاجر المفضلة
    loadFavoriteStores();
  }, [dispatch]);

  // تحميل قائمة المتاجر المفضلة
  const loadFavoriteStores = async () => {
    if (!isAuthenticated) {
      setFavoriteStores([]);
      return;
    }

    try {
      const token = useSelector(state => state.auth.token);
      const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/favorite-stores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        const favoriteIds = data.data.favoriteStores.map(store => store._id);
        setFavoriteStores(favoriteIds);
      }
    } catch (error) {
      console.error('Error loading favorite stores:', error);
    }
  };

  // متابعة/إلغاء متابعة المتجر
  const toggleFavoriteStore = async (storeId) => {
    checkAuth('متابعة المتاجر المفضلة', async () => {
      try {
        const token = useSelector(state => state.auth.token);
        const response = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/customers/favorite-stores/${storeId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          // تحديث القائمة المحلية
          setFavoriteStores(prev => {
            if (data.data.isFavorite) {
              return [...prev, storeId];
            } else {
              return prev.filter(id => id !== storeId);
            }
          });

          Alert.alert(
            data.data.isFavorite ? 'تم المتابعة' : 'تم الإلغاء',
            data.message,
            [{ text: 'موافق' }]
          );
        }
      } catch (error) {
        console.error('Error toggling favorite store:', error);
        Alert.alert('خطأ', 'حدث خطأ أثناء تحديث المتاجر المفضلة');
      }
    });
  };

  const renderStore = ({ item }) => {
    const isFavorite = favoriteStores.includes(item._id);
    
    return (
      <View className="flex-row p-4 mb-3 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
        <TouchableOpacity
          className="flex-1 flex-row"
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
        
        {/* زر المتابعة */}
        {isAuthenticated && (
          <TouchableOpacity
            className="ml-2 p-2"
            onPress={() => toggleFavoriteStore(item._id)}
          >
            <Text className="text-xl">
              {isFavorite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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
