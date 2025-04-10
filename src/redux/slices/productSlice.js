import {createSlice} from "@reduxjs/toolkit"

const initialState={
    
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
        setPaymentLoading(state,action){
            state.paymentLoading = action.payload;
        },
        
    },
});

 export const { setselectedCategoryId,setSubCategoryId, setPaymentLoading } =
  productSlice.actions;
export const productReducer = productSlice.reducer;

