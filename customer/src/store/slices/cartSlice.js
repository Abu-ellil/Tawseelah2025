import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // إضافة منتج إلى السلة
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.product._id === action.payload.product._id);
      
      if (itemIndex >= 0) {
        // إذا كان المنتج موجودًا بالفعل، قم بتحديث الكمية
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        // إذا لم يكن موجودًا، أضفه إلى السلة
        state.items.push(action.payload);
      }
      
      // إعادة حساب الإجمالي
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    },
    
    // تحديث كمية المنتج
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.product._id === productId);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // إذا كانت الكمية 0 أو أقل، قم بإزالة العنصر
          state.items.splice(itemIndex, 1);
        } else {
          // تحديث الكمية
          state.items[itemIndex].quantity = quantity;
        }
      }
      
      // إعادة حساب الإجمالي
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    },
    
    // إزالة منتج من السلة
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.product._id === action.payload);
      
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
      
      // إعادة حساب الإجمالي
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    },
    
    // مسح السلة بالكامل
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    
    // تعيين السلة
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.total = action.payload.total || 0;
    }
  },
});

export const { addItem, updateQuantity, removeItem, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;