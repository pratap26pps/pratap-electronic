import { createSlice } from '@reduxjs/toolkit';

const initialState  = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
        const newItems = Array.isArray(action.payload) ? action.payload : [action.payload];
      
        newItems.forEach((item) => {
          const exists = state.items.some((i) => i.productId._id === item.productId._id);
          if (!exists) {
            state.items.push(item);
          }
        });
      },
  },
});

export const { addToWishlist } = wishlistSlice.actions;
 
export const wishlistReducer = wishlistSlice.reducer;
