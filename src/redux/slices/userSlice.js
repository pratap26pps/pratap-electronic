
import { createSlice } from '@reduxjs/toolkit'

const initialState={
    signupdata:null,
    userdetail:null,
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
        setToken(state,action){
            state.token = action.payload;
        },
        setreceivedOtp(state,action){
            state.receivedOtp = action.payload;
        },

    },
});


export const {setSignupdata,setUserdetail, setToken,setreceivedOtp} = authSlice.actions;
export const authReducer = authSlice.reducer;

