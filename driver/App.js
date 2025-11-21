import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./src/theme/ThemeContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import "./global.css"
// Import screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import SplashScreen from "./src/screens/SplashScreen";
import OrderDetailsScreen from "./src/screens/OrderDetailsScreen";
import EarningsScreen from "./src/screens/EarningsScreen";
import MapScreen from "./src/screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
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
                  name="OrderDetails"
                  component={OrderDetailsScreen}
                  options={{ title: "تفاصيل الطلب" }}
                />
                <Stack.Screen
                  name="Earnings"
                  component={EarningsScreen}
                  options={{ title: "الأرباح" }}
                />
                <Stack.Screen
                  name="Map"
                  component={MapScreen}
                  options={{ title: "الخريطة" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
