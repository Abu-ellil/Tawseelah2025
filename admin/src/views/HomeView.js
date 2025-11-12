import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReportsSuccess } from '../store/slices/reportSlice';
import { fetchOrdersSuccess } from '../store/slices/orderSlice';
import { fetchDriversSuccess } from '../store/slices/driverSlice';
import { fetchStoresSuccess } from '../store/slices/storeSlice';
import { useTheme } from '../theme/ThemeContext';
import { 
 ShoppingBagIcon, 
  UserGroupIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
import { mockAdminDashboardData } from '../utils/mockData';

const HomeView = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { overallStats, dailyStats, chartsData } = useSelector(state => state.reports);
  const { liveOrders } = useSelector(state => state.orders);
  const { activeDrivers } = useSelector(state => state.drivers);
  const { activeStores } = useSelector(state => state.stores);

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل البيانات من الخادم
    dispatch(fetchReportsSuccess(mockAdminDashboardData.reports));
    dispatch(fetchOrdersSuccess(mockAdminDashboardData.orders));
    dispatch(fetchDriversSuccess(mockAdminDashboardData.drivers));
    dispatch(fetchStoresSuccess(mockAdminDashboardData.stores));
  }, [dispatch]);

  // عرض الإحصائيات السريعة
  const quickStats = [
    {
      name: 'إجمالي الطلبات',
      value: overallStats.totalOrders,
      change: '+12%',
      icon: ShoppingBagIcon,
      iconColor: 'bg-blue-100',
      iconBg: colors.primary,
    },
    {
      name: 'إجمالي الأرباح',
      value: `${overallStats.totalRevenue} ر.س`,
      change: '+8.2%',
      icon: CurrencyDollarIcon,
      iconColor: 'bg-green-100',
      iconBg: colors.success,
    },
    {
      name: 'السائقين النشطين',
      value: overallStats.totalDrivers,
      change: '+4.3%',
      icon: TruckIcon,
      iconColor: 'bg-purple-100',
      iconBg: colors.secondary,
    },
    {
      name: 'المتاجر النشطة',
      value: overallStats.totalStores,
      change: '+2.1%',
      icon: ShoppingBagIcon,
      iconColor: 'bg-yellow-100',
      iconBg: colors.warning,
    },
  ];

  return (
    <div>
      {/* عنوان الصفحة */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>لوحة التحكم</h1>
        <p className="mt-1" style={{ color: colors.placeholder }}>
          مرحبًا، مسؤول النظام. هذه نظرة عامة على النظام.
        </p>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg"
            style={{ backgroundColor: colors.card }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.iconColor}`}>
                  <stat.icon
                    className="h-6 w-6"
                    style={{ color: stat.iconBg }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mr-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium" style={{ color: colors.placeholder }}>
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold" style={{ color: colors.text }}>
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div
              className="bg-gray-50 px-5 py-3"
              style={{ backgroundColor: colors.background }}
            >
              <div className="text-sm">
                <span className="font-medium" style={{ color: colors.success }}>
                  {stat.change}
                </span>{' '}
                من الأسبوع الماضي
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* رسم بياني للأرباح */}
        <div
          className="bg-white shadow rounded-lg p-6"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
            أداء الأرباح
          </h2>
          <ResponsiveContainer width="10%" height={300}>
            <LineChart
              data={chartsData.revenueChart || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" stroke={colors.text} />
              <YAxis stroke={colors.text} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.card, 
                  borderColor: colors.border,
                  color: colors.text
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={colors.primary} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* رسم بياني للطلبات */}
        <div
          className="bg-white shadow rounded-lg p-6"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
            عدد الطلبات
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartsData.ordersChart || []}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="name" stroke={colors.text} />
              <YAxis stroke={colors.text} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.card, 
                  borderColor: colors.border,
                  color: colors.text
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke={colors.success} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* الطلبات والسائقين الجدد */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الطلبات الحالية */}
        <div
          className="bg-white shadow rounded-lg p-6"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
            الطلبات الحالية
          </h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {liveOrders.slice(0, 5).map((order, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className="h-8 w-8 rounded-full flex items-center justify-center ring-8"
                          style={{ 
                            backgroundColor: order.status === 'delivered' ? colors.success : 
                                           order.status === 'cancelled' ? colors.error : colors.warning,
                            color: 'white',
                            ringColor: colors.background
                          }}
                        >
                          {order.status === 'delivered' ? (
                            <span>✓</span>
                          ) : order.status === 'cancelled' ? (
                            <span>✕</span>
                          ) : (
                            <span>•</span>
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm" style={{ color: colors.text }}>
                            طلب #{order._id.substring(0, 8)}
                          </p>
                          <p className="text-sm" style={{ color: colors.placeholder }}>
                            {order.customer?.name || 'عميل'} • {order.totalAmount} ر.س
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap">
                          <time style={{ color: colors.placeholder }}>
                            {new Date(order.createdAt).toLocaleTimeString('ar-EG')}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* السائقين النشطين */}
        <div
          className="bg-white shadow rounded-lg p-6"
          style={{ backgroundColor: colors.card }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
            السائقين النشطين
          </h2>
          <ul className="divide-y" style={{ borderColor: colors.border }}>
            {activeDrivers.slice(0, 5).map((driver, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span style={{ color: colors.text }}>
                      {driver.name?.charAt(0) || 'د'}
                    </span>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      {driver.name || 'سائق'}
                    </p>
                    <p className="text-sm" style={{ color: colors.placeholder }}>
                      {driver.phone || 'رقم الهاتف'}
                    </p>
                  </div>
                  <div className="mr-auto">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: driver.status === 'available' ? colors.success + '20' : colors.warning + '20',
                        color: driver.status === 'available' ? colors.success : colors.warning
                      }}
                    >
                      {driver.status === 'available' ? 'متاح' : 'مشغول'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeView;