import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersSuccess } from '../store/slices/orderSlice';
import { useTheme } from '../theme/ThemeContext';
import { 
  ShoppingBagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Mock data
import { mockAdminOrdersData } from '../utils/mockData';

const OrdersView = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { orders = [] } = useSelector(state => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    dispatch(fetchOrdersSuccess(mockAdminOrdersData));
  }, [dispatch]);

  // تصفية الطلبات
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.store?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'live') {
      return matchesSearch && ['pending', 'confirmed', 'preparing', 'on_way'].includes(order.status);
    } else if (activeTab === 'completed') {
      return matchesSearch && order.status === 'delivered';
    } else if (activeTab === 'cancelled') {
      return matchesSearch && order.status === 'cancelled';
    } else {
      return matchesSearch;
    }
  });

  // دالة لعرض حالة الطلب
  const renderStatusBadge = (status) => {
    let bgColor, textColor, text;
    
    switch (status) {
      case 'pending':
        bgColor = colors.warning + '20';
        textColor = colors.warning;
        text = 'معلق';
        break;
      case 'confirmed':
        bgColor = colors.primary + '20';
        textColor = colors.primary;
        text = 'تم التأكيد';
        break;
      case 'preparing':
        bgColor = colors.primary + '20';
        textColor = colors.primary;
        text = 'قيد التحضير';
        break;
      case 'on_way':
        bgColor = colors.success + '20';
        textColor = colors.success;
        text = 'في الطريق';
        break;
      case 'delivered':
        bgColor = colors.success + '20';
        textColor = colors.success;
        text = 'تم التوصيل';
        break;
      case 'cancelled':
        bgColor = colors.error + '20';
        textColor = colors.error;
        text = 'ملغي';
        break;
      default:
        bgColor = colors.placeholder + '20';
        textColor = colors.placeholder;
        text = status || 'غير معروف';
    }
    
    return (
      <span
        className="px-2 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {text}
      </span>
    );
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* عنوان الصفحة */}
      <div className="p-4" style={{ backgroundColor: colors.primary }}>
        <h1 className="text-2xl font-bold text-white">إدارة الطلبات</h1>
        <p className="text-white opacity-80">متابعة وتحديث حالة الطلبات</p>
      </div>

      {/* شريط البحث والأدوات */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5" style={{ color: colors.placeholder }} aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pr-10 py-2 pl-10 rounded-md border"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text
              }}
              placeholder="البحث عن طلب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'all' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === 'all' ? colors.primary + '20' : colors.card,
                color: activeTab === 'all' ? colors.primary : colors.text,
                borderColor: colors.border
              }}
              onClick={() => setActiveTab('all')}
            >
              الكل
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'live' ? 'bg-yellow-100 text-yellow-800' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === 'live' ? colors.warning + '20' : colors.card,
                color: activeTab === 'live' ? colors.warning : colors.text,
                borderColor: colors.border
              }}
              onClick={() => setActiveTab('live')}
            >
              نشطة
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'completed' ? 'bg-green-100 text-green-800' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === 'completed' ? colors.success + '20' : colors.card,
                color: activeTab === 'completed' ? colors.success : colors.text,
                borderColor: colors.border
              }}
              onClick={() => setActiveTab('completed')}
            >
              مكتملة
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'cancelled' ? 'bg-red-100 text-red-800' : ''
              }`}
              style={{ 
                backgroundColor: activeTab === 'cancelled' ? colors.error + '20' : colors.card,
                color: activeTab === 'cancelled' ? colors.error : colors.text,
                borderColor: colors.border
              }}
              onClick={() => setActiveTab('cancelled')}
            >
              ملغية
            </button>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            className="shadow rounded-lg p-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
                <ShoppingBagIcon className="h-6 w-6" style={{ color: colors.primary }} />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                  إجمالي الطلبات
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
          
          <div
            className="shadow rounded-lg p-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-md" style={{ backgroundColor: colors.warning + '20' }}>
                <ClockIcon className="h-6 w-6" style={{ color: colors.warning }} />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                  الطلبات المعلقة
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div
            className="shadow rounded-lg p-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-md" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircleIcon className="h-6 w-6" style={{ color: colors.success }} />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                  الطلبات المكتملة
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
          
          <div
            className="shadow rounded-lg p-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-md" style={{ backgroundColor: colors.error + '20' }}>
                <XCircleIcon className="h-6 w-6" style={{ color: colors.error }} />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                  الطلبات الملغية
                </p>
                <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                  {orders.filter(o => o.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* جدول الطلبات */}
        <div
          className="shadow overflow-hidden rounded-lg"
          style={{ backgroundColor: colors.card }}
        >
          <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.text, backgroundColor: colors.background }}
                >
                  معرف الطلب
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.text, backgroundColor: colors.background }}
                >
                  العميل
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.text, backgroundColor: colors.background }}
                >
                  المتجر
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.text, backgroundColor: colors.background }}
                >
                  المبلغ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.text, backgroundColor: colors.background }}
                >
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: colors.border }}>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                    #{order._id?.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                    {order.customer?.name || 'غير معروف'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                    {order.store?.name || 'غير معروف'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                    {order.totalAmount} ر.س
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {renderStatusBadge(order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8" style={{ color: colors.text }}>
              <p>لا توجد طلبات مطابقة لبحثك</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersView;