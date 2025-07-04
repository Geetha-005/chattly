import React from 'react'
import profilepic from "../assets/profilepic.jpeg";
import dp from "../assets/dp.png";
import { FaCamera } from "react-icons/fa";
import { useSelector } from 'react-redux';

import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    let {userData}=useSelector(state=>state.user);
    let navigate=useNavigate();

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center
    items-center gap-[20px]'>
        
        <div className='fixed top-[20px]  left-[20px] '>
            <MdKeyboardBackspace className='w-[50px] h-[50px] text-gray-600'
            onClick={()=>navigate("/")}/>
        </div>


        <div className=' bg-white rounded-full  border-4 border-[#20c7ff]
        shadow-gray-400 shadow-lg  relative'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>

            
       <img src={dp} alt="dp" className='h-[100%] '/>

       </div>
       <FaCamera className='text-gray-700  absolute bottom-8 right-5 w-[25px] h-[25px] '/>
        </div>
        <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px]
        items-center justify-center'>
            <input type="text" placeholder='enter your name' className='w-[90%] h-[50px] outline-none 
            border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]  rounded-lg
            shadow-gray-400 shadow-lg text-gray-700 text-[19px]' />
            <input type="text" readOnly  className='w-[90%] h-[50px] outline-none 
            border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]  rounded-lg
            shadow-gray-400 shadow-lg text-gray-400 text-[19px]'
            value={userData?.userName}/>
            <input type='email' readOnly className='w-[90%] h-[50px] outline-none 
            border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]  rounded-lg
            shadow-gray-400 shadow-lg text-gray-400 text-[19px]' 
            value={userData?.email}/>
           
           <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
            shadow-gray-400 shadow-lg  text-20px] w-[200px] mt-[20px] font-semibold
            hover:shadow-inner'>
            save profile
           </button>
        </form>
    </div>
  )
}

export default Profile
