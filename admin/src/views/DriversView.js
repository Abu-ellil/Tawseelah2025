
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDriversSuccess, approveDriver, rejectDriver, deleteDriver, updateDriverStatus } from '../store/slices/driverSlice';
import { useTheme } from '../theme/ThemeContext';
import { 
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Mock data
import { mockAdminDriversData } from '../utils/mockData';

const DriversView = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { drivers, pendingDrivers, activeDrivers } = useSelector(state => state.drivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'active', 'inactive'

  useEffect(() => {
    // في تطبيق حقيقي، سيتم تحميل البيانات من الخادم
    dispatch(fetchDriversSuccess(mockAdminDriversData));
  }, [dispatch]);

  // تصفية السائقين بناءً على مصطلح البحث وعلامة التبويب النشطة
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    
    if (activeTab === 'pending') {
      return matchesSearch && driver.status === 'pending';
    } else if (activeTab === 'active') {
      return matchesSearch && driver.status === 'active';
    } else if (activeTab === 'inactive') {
      return matchesSearch && driver.status === 'inactive';
    } else {
      return matchesSearch;
    }
  });

  // دالة لعرض زر الإجراء المناسب بناءً على حالة السائق
  const renderActionButtons = (driver) => {
    if (driver.status === 'pending') {
      return (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 rounded-md text-sm font-medium flex items-center"
            style={{ 
              backgroundColor: colors.success + '20', 
              color: colors.success,
            }}
            onClick={() => dispatch(approveDriver(driver._id))}
          >
            <CheckCircleIcon className="h-4 w-4 ml-1" />
            قبول
          </button>
          <button
            className="px-3 py-1 rounded-md text-sm font-medium flex items-center"
            style={{ 
              backgroundColor: colors.error + '20', 
              color: colors.error,
            }}
            onClick={() => dispatch(rejectDriver(driver._id))}
          >
            <XCircleIcon className="h-4 w-4 ml-1" />
            رفض
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 rounded-md text-sm font-medium flex items-center"
            style={{ 
              backgroundColor: driver.status === 'active' ? colors.error + '20' : colors.success + '20', 
              color: driver.status === 'active' ? colors.error : colors.success,
            }}
            onClick={() => {
              const newStatus = driver.status === 'active' ? 'inactive' : 'active';
              dispatch(updateDriverStatus({ driverId: driver._id, status: newStatus }));
            }}
          >
            <PencilIcon className="h-4 w-4 ml-1" />
            {driver.status === 'active' ? 'تعطيل' : 'تنشيط'}
          </button>
          <button
            className="px-3 py-1 rounded-md text-sm font-medium flex items-center"
            style={{ 
              backgroundColor: colors.error + '20', 
              color: colors.error,
            }}
            onClick={() => dispatch(deleteDriver(driver._id))}
          >
            <TrashIcon className="h-4 w-4 ml-1" />
            حذف
          </button>
        </div>
      );
    }
  };

  // دالة لعرض حالة السائق
  const renderStatusBadge = (status) => {
    let bgColor, textColor, text;
    
    switch (status) {
      case 'pending':
        bgColor = colors.warning + '20';
        textColor = colors.warning;
        text = 'معلق';
        break;
      case 'active':
        bgColor = colors.success + '20';
        textColor = colors.success;
        text = 'نشط';
        break;
      case 'inactive':
        bgColor = colors.error + '20';
        textColor = colors.error;
        text = 'غير نشط';
        break;
      case 'rejected':
        bgColor = colors.error + '20';
        textColor = colors.error;
        text = 'مرفوض';
        break;
      default:
        bgColor = colors.placeholder + '20';
        textColor = colors.placeholder;
        text = status;
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
    <div>
      {/* عنوان الصفحة */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>إدارة السائقين</h1>
        <p className="mt-1" style={{ color: colors.placeholder }}>
          إدارة حسابات السائقين والطلبات الجديدة
        </p>
      </div>

      {/* شريط البحث والأدوات */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
            placeholder="البحث عن سائق..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
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
              activeTab === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''
            }`}
            style={{ 
              backgroundColor: activeTab === 'pending' ? colors.warning + '20' : colors.card,
              color: activeTab === 'pending' ? colors.warning : colors.text,
              borderColor: colors.border
            }}
            onClick={() => setActiveTab('pending')}
          >
            معلق
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'active' ? 'bg-green-100 text-green-800' : ''
            }`}
            style={{ 
              backgroundColor: activeTab === 'active' ? colors.success + '20' : colors.card,
              color: activeTab === 'active' ? colors.success : colors.text,
              borderColor: colors.border
            }}
            onClick={() => setActiveTab('active')}
          >
            نشط
          </button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className="bg-white shadow rounded-lg p-4"
          style={{ backgroundColor: colors.card }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-md" style={{ backgroundColor: colors.primary + '20' }}>
              <UserCircleIcon className="h-6 w-6" style={{ color: colors.primary }} />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                إجمالي السائقين
              </p>
              <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                {drivers.length}
              </p>
            </div>
          </div>
        
        <div
          className="bg-white shadow rounded-lg p-4"
          style={{ backgroundColor: colors.card }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-md" style={{ backgroundColor: colors.success + '20' }}>
              <CheckCircleIcon className="h-6 w-6" style={{ color: colors.success }} />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                السائقين النشطين
              </p>
              <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                {activeDrivers.length}
              </p>
            </div>
          </div>
        </div>
        
        <div
          className="bg-white shadow rounded-lg p-4"
          style={{ backgroundColor: colors.card }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-md" style={{ backgroundColor: colors.warning + '20' }}>
              <XCircleIcon className="h-6 w-6" style={{ color: colors.warning }} />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium" style={{ color: colors.placeholder }}>
                الطلبات المعلقة
              </p>
              <p className="text-2xl font-semibold" style={{ color: colors.text }}>
                {pendingDrivers.length}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* جدول السائقين */}
      <div
        className="bg-white shadow overflow-hidden rounded-lg"
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
                الاسم
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.text, backgroundColor: colors.background }}
              >
                البريد الإلكتروني
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.text, backgroundColor: colors.background }}
              >
                الهاتف
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.text, backgroundColor: colors.background }}
              >
                الحالة
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.text, backgroundColor: colors.background }}
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: colors.border }}>
            {filteredDrivers.map((driver, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap" style={{ color: colors.text }}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span style={{ color: colors.text }}>
                        {driver.name?.charAt(0) || 'س'}
                      </span>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium">{driver.name}</div>
                      <div className="text-sm" style={{ color: colors.placeholder }}>
                        {driver.carModel || 'نوع السيارة'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                  {driver.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                  {driver.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {renderStatusBadge(driver.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {renderActionButtons(driver)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredDrivers.length === 0 && (
          <div className="text-center py-8" style={{ color: colors.text }}>
            <p>لا توجد سائقين مطابقين لبحثك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversView;