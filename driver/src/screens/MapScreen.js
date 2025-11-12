import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentLocation, setDestination, setRoute } from '../store/slices/locationSlice';
import { useTheme } from '../theme/ThemeContext';

const MapScreen = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { currentLocation, destination, route: routeCoordinates } = useSelector(state => state.location);
  
  const order = route.params?.order;
  
  // الإحداثيات الافتراضية (الرياض)
  const [region, setRegion] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تتبع الموقع الفعلي للسائق
    // وتحديث الإحداثيات بناءً على الطلب
    
    if (order) {
      // تعيين وجهة إلى عنوان العميل
      const dest = {
        latitude: order.deliveryLocation.coordinates[1],
        longitude: order.deliveryLocation.coordinates[0],
        address: order.deliveryLocation.address
      };
      dispatch(setDestination(dest));
      
      // تعيين منشأ إلى عنوان المتجر
      const pickup = {
        latitude: order.pickupLocation.coordinates[1],
        longitude: order.pickupLocation.coordinates[0],
        address: order.pickupLocation.address
      };
      
      // تحديث المنطقة لتشمل كلا المكانين
      setRegion({
        latitude: (dest.latitude + pickup.latitude) / 2,
        longitude: (dest.longitude + pickup.longitude) / 2,
        latitudeDelta: Math.abs(dest.latitude - pickup.latitude) * 2,
        longitudeDelta: Math.abs(dest.longitude - pickup.longitude) * 2,
      });
    }
 }, [order, dispatch]);

  // دالة لتحديد الاتجاهات (وهمية في هذا الإصدار)
  const getDirections = async () => {
    // في تطبيق حقيقي، سيتم استخدام خدمة تحديد الاتجاهات
    // مثل Google Directions API
    
    // إنشاء مسار وهمي بين نقطتين
    const mockRoute = [
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: 24.72, longitude: 46.68 },
      { latitude: 24.73, longitude: 46.69 },
      { latitude: order.deliveryLocation.coordinates[1], longitude: order.deliveryLocation.coordinates[0] }
    ];
    
    dispatch(setRoute(mockRoute));
  };

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        region={region}
        onRegionChange={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
      >
        {/* علامة السائق الحالية */}
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
          title="موقعي"
          description="أنت هنا"
          pinColor="blue"
        />
        
        {/* إذا كان هناك طلب، عرض علامات المتجر والعميل */}
        {order && (
          <>
            {/* علامة المتجر (مصدر الطلب) */}
            <Marker
              coordinate={{
                latitude: order.pickupLocation.coordinates[1],
                longitude: order.pickupLocation.coordinates[0]
              }}
              title="المتجر"
              description={order.pickupLocation.address}
              pinColor="green"
            />
            
            {/* علامة العميل (وجهة التوصيل) */}
            <Marker
              coordinate={{
                latitude: order.deliveryLocation.coordinates[1],
                longitude: order.deliveryLocation.coordinates[0]
              }}
              title="وجهة التوصيل"
              description={order.deliveryLocation.address}
              pinColor="red"
            />
            
            {/* رسم المسار إذا كان متاحًا */}
            {routeCoordinates && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor={colors.primary}
                strokeWidth={4}
              />
            )}
          </>
        )}
      </MapView>
      
      {/* لوحة التحكم بالخريطة */}
      <View className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-bold" style={{ color: colors.text }}>
              {order ? `طلب #${order._id.substring(0, 8)}` : 'تتبع الموقع'}
            </Text>
            <Text className="text-sm" style={{ color: colors.placeholder }}>
              {destination ? destination.address : 'جاري تحديد الموقع...'}
            </Text>
          </View>
          
          <TouchableOpacity 
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.primary }}
            onPress={getDirections}
          >
            <Text className="text-white font-bold">الاتجاهات</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* زر الاتصال بالعميل */}
      {order && (
        <TouchableOpacity 
          className="absolute top-20 right-4 px-4 py-3 rounded-full"
          style={{ backgroundColor: colors.primary }}
          onPress={() => Alert.alert('الاتصال', `الاتصال بالعميل: ${order.customer?.phone || 'غير متوفر'}`)}
        >
          <Text className="text-white font-bold">اتصال</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MapScreen;