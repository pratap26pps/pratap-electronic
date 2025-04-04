// store.js
import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './slices/productSlice' 
import { authReducer } from './slices/userSlice'
import { cartReducer } from './slices/cartSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer,
    cart: cartReducer,
  },
})
