import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/theme/ThemeContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Import screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import EditProductScreen from './src/screens/EditProductScreen';
import StoreSettingsScreen from './src/screens/StoreSettingsScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen 
                  name="Splash" 
                  component={SplashScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Register" 
                  component={RegisterScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Main" 
                  component={MainTabNavigator} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="ProductDetails" 
                  component={ProductDetailsScreen} 
                  options={{ title: 'تفاصيل المنتج' }} 
                />
                <Stack.Screen 
                  name="OrderDetails" 
                  component={OrderDetailsScreen} 
                  options={{ title: 'تفاصيل الطلب' }} 
                />
                <Stack.Screen 
                  name="AddProduct" 
                  component={AddProductScreen} 
                  options={{ title: 'إضافة منتج' }} 
                />
                <Stack.Screen 
                  name="EditProduct" 
                  component={EditProductScreen} 
                  options={{ title: 'تعديل المنتج' }} 
                />
                <Stack.Screen 
                  name="StoreSettings" 
                  component={StoreSettingsScreen} 
                  options={{ title: 'إعدادات المتجر' }} 
                />
                <Stack.Screen 
                  name="Reports" 
                  component={ReportsScreen} 
                  options={{ title: 'التقارير' }} 
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}