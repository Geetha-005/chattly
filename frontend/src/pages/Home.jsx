import React from 'react'
import SideBar from '../componenets/SideBar'
import MessageArea from '../componenets/MessageArea'
import { useSelector } from 'react-redux'
import getMessages from '../customHooks/getMessages'

const Home = () => {

   getMessages()
   
  let {selectedUser}=useSelector(state=>state.user)
 
  return (
    <div className='w-full h-[100vh] flex overflow-hidden '>
       <SideBar />
       <MessageArea />
      
    </div>
  )
}

export default Home
