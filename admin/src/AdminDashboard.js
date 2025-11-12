import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './theme/ThemeContext';

// Import views
import HomeView from './views/HomeView';
import OrdersView from './views/OrdersView';
import DriversView from './views/DriversView';
import StoresView from './views/StoresView';
import UsersView from './views/UsersView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';

const Stack = createStackNavigator();

const AdminDashboard = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Home" 
              component={HomeView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Orders" 
              component={OrdersView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Drivers" 
              component={DriversView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Stores" 
              component={StoresView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Users" 
              component={UsersView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Reports" 
              component={ReportsView} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsView} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default AdminDashboard;