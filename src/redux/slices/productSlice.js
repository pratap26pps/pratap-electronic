import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Productdetails: [],
  FeatureProductdetails: [],
  NewProductdetails: [],
  PopularProductdetails: [],
  Categorydetails: [],
  newsdata: [],
  paymentLoading: false,
  selectedCategoryId: null,
  SubCategoryId: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setselectedCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
    },
    setSubCategoryId(state, action) {
      state.SubCategoryId = action.payload;
    },
    setProductdetails(state, action) {
      state.Productdetails = action.payload;
    },
    setFeatureProductdetails(state, action) {
      state.FeatureProductdetails = action.payload;
    },
    setNewProductdetails(state, action) {
        state.NewProductdetails = action.payload;
      },
      setPopularProductdetails(state, action) {
        state.PopularProductdetails = action.payload;
      },
    setCategoryDetails(state, action) {
      state.Categorydetails = action.payload;
    },
    setNewsDetails(state, action) {
      state.newsdata = action.payload;
    },
 
  },
});

export const {
  setCategoryDetails,
  setNewProductdetails,
  setFeatureProductdetails,
  setPopularProductdetails,
  setNewsDetails,
  setselectedCategoryId,
  setProductdetails,
  setSubCategoryId,
  setPaymentLoading,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
