import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.png";
import { IoSearch } from "react-icons/io5";

import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios"
import { serverUrl } from '../main';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

    let [search,setSearch]=useState(false);
    let{userData,otherUsers,selectedUser}=useSelector(state=>state.user);
    let dispatch=useDispatch();
    let navigate=useNavigate();

    const handleLogout=async()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
           dispatch(setUserData(null))
           dispatch(setOtherUsers(null));
           navigate("/login");
        }
        catch(error){
            console.log(error)

        }
    }


  return (
    <div className={`lg:w-[30%] w-full h-full lg:block bg-slate-200 
    ${!selectedUser? "block":"hidden"}`}>

         <div className='w-[60px] h-[60px] rounded-full overflow-hidden
            flex justify-center items-center bg-[#20c7ff] mt-[10px]  shadow-gray-500 shadow-lg
            cursor-pointer fixed bottom-[20px] left-[10px] text-gray-700'
            onClick={handleLogout} >

            <BiLogOutCircle  className='w-[25%] h-[25%]  cursor-pointer'/>
     
       </div>

         <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%]
            shadow-gray-400 shadow-lg flex  flex-col 
            items-center justify-center px-[20px]'>
        
        
            <h1 className='text-white font-semibold text-[25px] '>Chattly</h1>

           <div className='w-full flex justify-between items-center'>
            <h1 className='text-gray-800 font-bold text-[25px] '>Hi, {userData.name|| "user"}</h1>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden
            flex justify-center bg-white  cursor-pointer items-center shadow-gray-500 shadow-lg'
            onClick={()=>navigate("/profile")}>

            
       <img src={userData.image ||dp} alt="dp" className='h-[100%] '/>

       </div>
           </div>
           <div className='w-full flex items-center gap-[20px] '>
           {!search &&
           
           <div className='w-[60px] h-[60px] rounded-full overflow-hidden
            flex justify-center items-center bg-white mt-[10px]  shadow-gray-500 shadow-lg
            ' onClick={()=>setSearch(true)}>

            <IoSearch  className='w-[25%] h-[25%]  cursor-pointer'/>
     
       </div>}

       {search && 
       <form className='h-[60px] w-full  bg-white  shadow-gray-500 shadow-lg
         flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden
         px-[20px] '>
           <IoSearch  className='w-[25px] h-[25px]'/>
           <input type="text"  placeholder='search users'
           className='w-full h-full text-[17px] p-[10px] outline-0 border-0'/>
               
               <RxCross2  className='w-[25px] h-[25px] cursor-pointer '
               onClick={()=>setSearch(false)}/>
       </form>
       }

        {!search && otherUsers?.map((user)=>(
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden
            flex justify-center items-center mt-[10px]  shadow-gray-500 shadow-lg'>

            
       <img src={user.image ||dp} alt="dp" className='h-[100%] '/>

       </div>

           ))}
          

         

           </div>


        </div>

        <div className='w-full h-[60vh] overflow-auto flex 
        flex-col gap-[20px] items-center mt-[20px]'>

          {otherUsers?.map((user)=>(
            <div className='w-[95%] h-[70px] flex justify-start
            items-center gap-[20px] bg-white shadow-gray-500
            shadow-lg rounded-full hover:bg-[#b2ccdf] cursor-pointer'
            onClick={()=>dispatch(setSelectedUser(user))}>

            
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden
            flex justify-center items-center   shadow-gray-500 shadow-lg'>

            
       <img src={user.image ||dp} alt="dp" className='h-[100%] '/>

       </div>
       <h1 className='text-gray-800 font-bold text-[20px] '>{user.name||user.userName}</h1>
       </div>

           ))}



        </div>

            
      
    </div>
  )
}

export default SideBar
