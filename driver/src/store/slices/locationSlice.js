import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLocation: {
    latitude: 24.7136, // الرياض
    longitude: 46.6753,
    timestamp: null,
  },
  destination: null,
  route: null,
  isTracking: false,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // بدء تتبع الموقع
    startLocationTracking: (state) => {
      state.isTracking = true;
      state.loading = false;
      state.error = null;
    },
    
    // إيقاف تتبع الموقع
    stopLocationTracking: (state) => {
      state.isTracking = false;
    },
    
    // تحديث الموقع الحالي
    updateCurrentLocation: (state, action) => {
      state.currentLocation = {
        ...action.payload,
        timestamp: new Date().toISOString()
      };
      state.loading = false;
    },
    
    // بدء التحديث
    updateLocationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // فشل التحديث
    updateLocationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تعيين الوجهة
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    
    // تعيين المسار
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    
    // مسح الوجهة
    clearDestination: (state) => {
      state.destination = null;
      state.route = null;
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
  startLocationTracking,
  stopLocationTracking,
 updateCurrentLocation,
  updateLocationStart,
  updateLocationFailure,
  setDestination,
  setRoute,
  clearDestination,
  setError,
  clearError
} = locationSlice.actions;

export default locationSlice.reducer;