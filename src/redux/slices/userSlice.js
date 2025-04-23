
import { createSlice } from '@reduxjs/toolkit'

const initialState={
    signupdata:null,
    userdetail:null,
    loading:false,
    token:  null,
    receivedOtp:[]
} ;

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupdata(state,action){
            state.signupdata = action.payload;
        },
        setUserdetail(state,action){
            state.userdetail = action.payload;
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
        setToken(state,action){
            state.token = action.payload;
        },
        setreceivedOtp(state,action){
            state.receivedOtp = action.payload;
        },

    },
});


export const {setLoading,setSignupdata,setUserdetail, setToken,setreceivedOtp} = authSlice.actions;
export const authReducer = authSlice.reducer;

