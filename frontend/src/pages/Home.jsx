import React from 'react'
import SideBar from '../componenets/SideBar'
import MessageArea from '../componenets/MessageArea'

const Home = () => {
  return (
    <div className='w-full h-[100vh] flex '>
       <SideBar />
       <MessageArea />
      
    </div>
  )
}

export default Home
