import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './theme/ThemeContext';
import DashboardLayout from './components/DashboardLayout';
import HomeView from './views/HomeView';
import DriversView from './views/DriversView';
import OrdersView from './views/OrdersView';
import StoresView from './views/StoresView';
import UsersView from './views/UsersView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/" element={
                <DashboardLayout>
                  <HomeView />
                </DashboardLayout>
              } />
              <Route path="/drivers" element={
                <DashboardLayout>
                  <DriversView />
                </DashboardLayout>
              } />
              <Route path="/orders" element={
                <DashboardLayout>
                  <OrdersView />
                </DashboardLayout>
              } />
              <Route path="/stores" element={
                <DashboardLayout>
                  <StoresView />
                </DashboardLayout>
              } />
              <Route path="/users" element={
                <DashboardLayout>
                  <UsersView />
                </DashboardLayout>
              } />
              <Route path="/reports" element={
                <DashboardLayout>
                  <ReportsView />
                </DashboardLayout>
              } />
              <Route path="/settings" element={
                <DashboardLayout>
                  <SettingsView />
                </DashboardLayout>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;