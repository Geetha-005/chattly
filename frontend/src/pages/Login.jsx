import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice';


const Login = () => {
    let navigate=useNavigate();
    let [show,setShow]=useState(false);

     let[password,setPassword]=useState("");
    let [email,setEmail]=useState("");
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState("")
    let dispatch=useDispatch();
    // let {userData}=useSelector(state=>state.user)
    // console.log(userData);
    const handleLogin=async(e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            let result=await axios.post(`${serverUrl}/api/auth/login`,{
             email,password
            },{withCredentials:true}
        )
        // console.log(result);
        dispatch(setUserData(result.data));
        dispatch(setSelectedUser(null));
        navigate("/")
        setEmail("");
        setPassword("");
        setLoading(false)
        setError("")


        }
        catch(error){
            console.log(error)
            setLoading(false)
            setError(error.response.data.message);
        }
    }






  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
        shadow-gray-400 shadow-lg flex-col gap-[30px]'>

            <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]
            shadow-gray-400 shadow-lg flex items-center justify-center '>
                <h1 className='text-gray-600 font-bold text-[30px] '>Login to
                    <span className='text-white'>Chattly</span>
                </h1>
            </div>
             <form className='mt-[30px] w-full flex flex-col gap-[20px] items-center'
             onSubmit={handleLogin}>
{/*            
            <input type="text" placeholder='enter user' className='w-[90%] h-[50px] outline-none 
            border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]  rounded-lg
            shadow-gray-400 shadow-lg text-gray-700 text-[19px]' /> */}
            
            
            <input type="email" placeholder='enter email' className='w-[90%] h-[50px] outline-none 
            border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]  rounded-lg
            shadow-gray-400 shadow-lg text-gray-700 text-[19px]' 
            onChange={(e)=>setEmail(e.target.value)}/>
           
           <div className='w-[90%] h-[50px]  border-2 border-[#20c7ff]
           overflow-hidden rounded-lg shadow-gray-400 shadow-lg relative'>
            <input type={`${show ? "text":"password"}`} placeholder='enter password' className='w-full h-full outline-none 
            px-[20px] py-[10px] bg-[white]   text-gray-700 text-[19px]' 
            onChange={(e)=>setPassword(e.target.value)}/>
            <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff]
            font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{`${show ? "hidden":"show"}`}</span>
            </div>

{error && <p className='text-red-400  '>{error} </p>}
            <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
            shadow-gray-400 shadow-lg  text-20px] w-[200px] mt-[20px] font-semibold
            hover:shadow-inner' disabled={loading}>{`${loading ?"loading ...":"Login"}`}</button>
            <p className='cursor-pointer' onClick={()=>navigate("/signup")}>Don't Have An account?
                <span className='text-[#20c7ff] text-[bold]'>Signup</span>
            </p>

        </form>
 

        </div>
       
     
    </div>
  )
 
}

export default Login
