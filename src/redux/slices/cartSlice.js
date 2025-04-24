import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  cart: [],
  total: 0,
  totalItem: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItem(state, action) {
      state.totalItem = action.payload;
    },
    // add to cart ka function
    setAddCart(state, action) {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("product already in cart");
        return;
      }
      state.cart.push({ ...course, quantity: 1 });
      state.totalItem++;
      state.total += course.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
      toast.success("course added to the cart");
    },
    // remove to cart
    setRemoveCart(state, action) {
      const courseid = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseid);
      if (index >= 0) {
        state.totalItem--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
      }
      toast.success("course removed from cart");
    },
    // reset cart
    setResetCart(state) {
      state.cart = [];
      state.total = 0;
      state.totalItem = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItem");
      toast.success("Cart reset successfully");
    },
    setCartFromLocalStorage(state) {
      state.cart = JSON.parse(localStorage.getItem("cart")) || [];
      state.total = JSON.parse(localStorage.getItem("total")) || 0;
      state.totalItem = JSON.parse(localStorage.getItem("totalItem")) || 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload || [];
      state.totalItem = action.payload?.length || 0;
      state.total = (action.payload || []).reduce((sum, item) => sum + item.price, 0);
    });
  },
});

// Async thunk to fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch("/api/cart");
  const data = await res.json();
  return data.items;
});

// Async thunk to sync cart to backend
export const syncCart = createAsyncThunk("cart/syncCart", async (cart) => {
  const res = await fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart }),
  });
  const data = await res.json();
  return data.items;
});

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    console.log("productid in cart slice",productId)
    const res = await fetch(`/api/cart/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    
    return data;
  }
);

export const {
  setTotalItem,
  setAddCart,
  setRemoveCart,
  setResetCart,
  setCartFromLocalStorage,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
