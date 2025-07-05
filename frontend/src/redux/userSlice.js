import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUsers:[],

    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload


        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload


        },
         setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload


        },
         setSocket:(state,action)=>{
            state.socket=action.payload


        },
         setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload


        },

    }

})


export const {setUserData,setSocket,setOnlineUsers,setOtherUsers,setSelectedUser}=userSlice.actions;
export default userSlice.reducer;