
import { createSlice } from '@reduxjs/toolkit'

const initialState={
    signupdata:null,
    loading:false,
    token:  null
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
        }
    },
});


export const {setLoading,setSignupdata, setToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
