
import { createSlice } from '@reduxjs/toolkit'

const initialState={
    signupdata:null,
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


export const {setLoading,setSignupdata, setToken,setreceivedOtp} = authSlice.actions;
export const authReducer = authSlice.reducer;

