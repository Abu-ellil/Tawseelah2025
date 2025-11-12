import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
 language: 'ar', // اللغة الافتراضية هي العربية
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // تبديل الوضع الليلي/النهاري
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    
    // تعيين الوضع الليلي/النهاري
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    
    // تعيين اللغة
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    
    // تبديل اللغة
    toggleLanguage: (state) => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
    }
  },
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  setLanguage, 
  toggleLanguage 
} = themeSlice.actions;

export default themeSlice.reducer;