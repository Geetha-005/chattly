import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUser from './customHooks/getOtherUsers'
import {io} from "socket.io-client";
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'



const App = () => {

  
  getCurrentUser();
  getOtherUser();
  let {userData,socket, onlineUsers}=useSelector(state=>state.user);
  
  let dispatch=useDispatch();

  
//   useEffect(()=>{

//     if(userData){
//     const socketio=io(`${serverUrl}`,{
//       query:{
//         userId:userData?._id
//       }
       
//     })
//     dispatch(setSocket(socketio))
//     socketio.on("getOnlineUsers",(users)=>{
//       dispatch(setOnlineUsers(users))

//     })
//     return ()=>socketio.close();
    
      
//     // socket.on("hello",(mess)=>{
//     //   console.log(mess);

//     // })
// }
// else{
//   if(socket){
//     socket.close()
//     dispatch(setSocket(null))
//   }

// }

//   },[userData])

useEffect(() => {
  if (!userData) {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
    return;
  }

  const socketio = io(`${serverUrl}`, {
    query: {
      userId: userData._id
    }
  });

  dispatch(setSocket(socketio));

  socketio.on("getOnlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });

  return () => {
    socketio.close();
  };
}, [userData?._id]);  // Only run when userData._id changes


  return (

    <Routes>
      <Route path='/login' element={!userData? <Login /> :<Navigate to="/" />} />
      <Route path='/signup' element={userData? <SignUp /> :<Navigate to="/profile" />} />
      <Route path='/' element={userData? <Home /> :<Navigate to="/login" />} />
      <Route path='/profile' element={userData? <Profile /> :<Navigate to="/signup" />} />
   

    </Routes>
  )
}

export default App
