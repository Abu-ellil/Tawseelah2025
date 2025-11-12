import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drivers: [],
  pendingDrivers: [],
  activeDrivers: [],
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    // بدء تحميل السائقين
    fetchDriversStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل السائقين
    fetchDriversSuccess: (state, action) => {
      state.loading = false;
      state.drivers = action.payload.all || [];
      state.pendingDrivers = action.payload.pending || [];
      state.activeDrivers = action.payload.active || [];
    },
    
    // فشل تحميل السائقين
    fetchDriversFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تحديث حالة السائق
    updateDriverStatus: (state, action) => {
      const { driverId, status } = action.payload;
      const driverIndex = state.drivers.findIndex(driver => driver._id === driverId);
      
      if (driverIndex !== -1) {
        state.drivers[driverIndex].status = status;
        
        // نقل السائق إلى القائمة المناسبة
        const driver = state.drivers[driverIndex];
        if (status === 'pending') {
          state.pendingDrivers.push(driver);
          state.drivers.splice(driverIndex, 1);
        } else if (status === 'active' || status === 'available') {
          state.activeDrivers.push(driver);
          state.drivers.splice(driverIndex, 1);
        }
      }
    },
    
    // قبول طلب تسجيل سائق
    approveDriver: (state, action) => {
      const driverId = action.payload;
      const driverIndex = state.pendingDrivers.findIndex(driver => driver._id === driverId);
      
      if (driverIndex !== -1) {
        const driver = state.pendingDrivers[driverIndex];
        driver.status = 'active';
        state.activeDrivers.push(driver);
        state.pendingDrivers.splice(driverIndex, 1);
        
        // إضافة إلى قائمة جميع السائقين إذا لم يكن موجودًا
        if (!state.drivers.some(d => d._id === driverId)) {
          state.drivers.push(driver);
        }
      }
    },
    
    // رفض طلب تسجيل سائق
    rejectDriver: (state, action) => {
      const driverId = action.payload;
      const driverIndex = state.pendingDrivers.findIndex(driver => driver._id === driverId);
      
      if (driverIndex !== -1) {
        state.pendingDrivers.splice(driverIndex, 1);
      }
    },
    
    // حذف سائق
    deleteDriver: (state, action) => {
      const driverId = action.payload;
      state.drivers = state.drivers.filter(driver => driver._id !== driverId);
      state.activeDrivers = state.activeDrivers.filter(driver => driver._id !== driverId);
      state.pendingDrivers = state.pendingDrivers.filter(driver => driver._id !== driverId);
    },
    
    // تعيين خطأ
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // مسح الخطأ
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  fetchDriversStart, 
 fetchDriversSuccess, 
  fetchDriversFailure,
  updateDriverStatus,
  approveDriver,
  rejectDriver,
  deleteDriver,
  setError,
  clearError
} = driverSlice.actions;

export default driverSlice.reducer;