import React from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.png";
import { setSelectedUser } from '../redux/userSlice';


const MessageArea = () => {

   let navigate=useNavigate();
  let {selectedUser}=useSelector(state=>state.user)
  let dispatch=useDispatch();

  return (
    <div className={`lg:w-[70%] ${selectedUser? "flex":"hidden"} hidden lg:flex  w-full bg-slate-2 h-full border-l-2
     border-gray-300 `}>

     {selectedUser && 
       <div className='w-full h-[100px] bg-[#20c7ff] rounded-b-[30px]
                  shadow-gray-400 shadow-lg flex items-center px-[20px]'
                  onClick={()=>dispatch(setSelectedUser(null))}>
             
              <div className='cursor-pointer'>
                         <MdKeyboardBackspace className='w-[40px] h-[40px] text-white' 
                        />
                     </div>

                      <div className='w-[50px] h-[50px] rounded-full overflow-hidden
                                 flex justify-center bg-white  cursor-pointer items-center shadow-gray-500 shadow-lg'
                                >
                     
                                 
                            <img src={selectedUser?.image ||dp} alt="dp" className='h-[100%] '/>
                     
                            </div>
             <h1 className='text-white ml-[10px] font-semibold text-[20px]'>{selectedUser?.name ||"user"}</h1>
          
              </div>} 
              {!selectedUser && <div className='w-full h-full flex justify-center
              items-center flex-col'>
                <h1 className='text-gray-700 font-bold text-[50px]' > Welcome to Chattly</h1>
                <span className='text-gray-700 font-semibold text-[30px]'>chat with your friends</span>
                </div>}
      
      
    </div>
  )
}

export default MessageArea
