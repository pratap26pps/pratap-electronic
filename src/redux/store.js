// store.js
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './slices/productSlice' 
import { authReducer } from './slices/userSlice'
import { cartReducer } from './slices/cartSlice'
import { wishlistReducer } from './slices/wishlist'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})
