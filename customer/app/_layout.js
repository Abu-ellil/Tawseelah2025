import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { ThemeProvider } from "../src/theme/ThemeContext";
import "../global.css";
import "nativewind";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="stores" options={{ title: "المتاجر" }} />
            <Stack.Screen
              name="store-details"
              options={{ title: "تفاصيل المتجر" }}
            />
            <Stack.Screen name="search" options={{ title: "البحث" }} />
            <Stack.Screen name="cart" options={{ title: "السلة" }} />
            <Stack.Screen name="orders" options={{ title: "الطلبات" }} />
            <Stack.Screen
              name="order-details"
              options={{ title: "تفاصيل الطلب" }}
            />
            <Stack.Screen name="profile" options={{ title: "الملف الشخصي" }} />
            <Stack.Screen name="products" options={{ title: "المنتجات" }} />
          </Stack>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
