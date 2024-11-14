import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:null,
    token:null,
    cars:[]
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
        },
        setLogout:(state)=>{
            state.user=null
            state.token=null
        },
        setCars:(state,action)=>{
            state.cars=action.payload.cars
        }
    }
})


export const {setLogin,setLogout,setCars} =userSlice.actions
export default userSlice.reducer