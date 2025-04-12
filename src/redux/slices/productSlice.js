import {createSlice} from "@reduxjs/toolkit"

const initialState={
    Productdetails:[],
    paymentLoading:false,
    selectedCategoryId:null,
    SubCategoryId:null,
} ;

const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        
       
        setselectedCategoryId(state,action){
            state.selectedCategoryId = action.payload;
        },
        setSubCategoryId(state,action){
            state.SubCategoryId = action.payload;
        },
        setProductdetails(state,action){
            state.Productdetails = action.payload;
        },
        setPaymentLoading(state,action){
            state.paymentLoading = action.payload;
        },
        
    },
});

 export const { setselectedCategoryId,setProductdetails,setSubCategoryId, setPaymentLoading } =
  productSlice.actions;
export const productReducer = productSlice.reducer;

