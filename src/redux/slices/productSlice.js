import {createSlice} from "@reduxjs/toolkit"

const initialState={
    step:1,
    Product:[],
    editProduct:false,
    paymentLoading:false,
    selectedCategoryId:null,
    
} ;

const productSlice=createSlice({
    name:"Product",
    initialState,
    reducers:{
        setStep(state,action){
            state.step = action.payload;
        },
        setProduct(state,action){
            state.Product = action.payload;
        },
        setEditProduct(state,action){
            state.editProduct = action.payload;
        },
        setselectedCategoryId(state,action){
            state.selectedCategoryId = action.payload;
        },
        setPaymentLoading(state,action){
            state.paymentLoading = action.payload;
        },
        resetProductState(state,action){
             state.step = 1,
             state.Product = null,
             state.editProduct= null
        },
    },
});

 export const {setStep, setProduct,setselectedCategoryId, setEditProduct, setPaymentLoading,resetProductState} =
  productSlice.actions;
export const productReducer = productSlice.reducer;

