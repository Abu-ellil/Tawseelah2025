import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // بدء تحميل المنتجات
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // نجاح تحميل المنتجات
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload; // تعيين النتائج كFiltered أيضًا
    },
    
    // فشل تحميل المنتجات
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // تصفية المنتجات حسب الفئة
    filterProductsByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      
      if (!category || category === 'all') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }
    },
    
    // بحث عن المنتجات
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      
      if (!searchTerm) {
        // إذا لم يكن هناك مصطلح بحث، عرض كل المنتجات أو حسب الفئة المحددة
        if (!state.selectedCategory || state.selectedCategory === 'all') {
          state.filteredProducts = state.products;
        } else {
          state.filteredProducts = state.products.filter(
            product => product.category.toLowerCase() === state.selectedCategory.toLowerCase()
          );
        }
      } else {
        // تصفية المنتجات حسب مصطلح البحث
        state.filteredProducts = state.products.filter(
          product => 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)) ||
            (product.category && product.category.toLowerCase().includes(searchTerm))
        );
      }
    },
    
    // تحديث تقييم المنتج
    updateProductRating: (state, action) => {
      const { productId, newRating } = action.payload;
      const productIndex = state.products.findIndex(product => product._id === productId);
      
      if (productIndex !== -1) {
        state.products[productIndex].rating = newRating;
        
        // تحديث في filteredProducts أيضًا
        const filteredProductIndex = state.filteredProducts.findIndex(product => product._id === productId);
        if (filteredProductIndex !== -1) {
          state.filteredProducts[filteredProductIndex].rating = newRating;
        }
      }
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
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  filterProductsByCategory,
  searchProducts,
  updateProductRating,
  setError,
  clearError
} = productSlice.actions;

export default productSlice.reducer;