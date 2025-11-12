import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ShoppingBagIcon, 
 TruckIcon, 
 ChartBarIcon, 
  CogIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const { colors } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: HomeIcon },
    { name: 'السائقين', href: '/drivers', icon: TruckIcon },
    { name: 'الطلبات', href: '/orders', icon: ShoppingBagIcon },
    { name: 'المتاجر', href: '/stores', icon: ShoppingBagIcon },
    { name: 'المستخدمين', href: '/users', icon: UserGroupIcon },
    { name: 'التقارير', href: '/reports', icon: ChartBarIcon },
    { name: 'الإعدادات', href: '/settings', icon: CogIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div 
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold" style={{ color: colors.primary }}>توصيلة - لوحة التحكم</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                      isActive(item.href) 
                        ? 'bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ 
                      color: isActive(item.href) ? colors.primary : colors.text,
                      backgroundColor: isActive(item.href) ? colors.background : 'transparent'
                    }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive(item.href) ? 'text-gray-900' : 'text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div 
          className="flex-1 flex flex-col min-h-0 border-r"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold" style={{ color: colors.primary }}>توصيلة - لوحة التحكم</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                    isActive(item.href) 
                      ? 'bg-gray-100' 
                      : 'hover:bg-gray-50'
                  }`}
                  style={{ 
                    color: isActive(item.href) ? colors.primary : colors.text,
                    backgroundColor: isActive(item.href) ? colors.background : 'transparent'
                  }}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 ${
                      isActive(item.href) ? 'text-gray-900' : 'text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <header 
          className="bg-white shadow-sm z-10"
          style={{ backgroundColor: colors.card, borderBottomColor: colors.border, borderBottomWidth: 1 }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden mr-4 text-gray-500"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <h1 
                className="text-lg font-semibold text-gray-900 lg:hidden"
                style={{ color: colors.text }}
              >
                {navigation.find(item => location.pathname === item.href)?.name || 'الرئيسية'}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <button
                  type="button"
                  className="bg-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-sm" style={{ color: colors.text }}>
                  مسؤول النظام
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span style={{ color: colors.text }}>أ.م</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;