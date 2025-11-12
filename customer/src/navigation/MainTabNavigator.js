import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import StoresScreen from '../screens/StoresScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StoreDetailsScreen from '../screens/StoreDetailsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Stores') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
      <Tab.Screen name="Stores" component={StoresScreen} options={{ title: 'المتاجر' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'السلة' }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ title: 'الطلبات' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;