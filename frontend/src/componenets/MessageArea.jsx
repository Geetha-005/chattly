import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.png";
import { setSelectedUser } from '../redux/userSlice';
import { GrEmoji } from "react-icons/gr";
import { LuSendHorizontal } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import SenderMessages from './SenderMessages';
import ReceiverMessages from './ReceiverMessages';
import { serverUrl } from '../main';
import axios from "axios";
import { setMessages } from '../redux/messageSlice';


const MessageArea = () => {

   let navigate=useNavigate();
  let {selectedUser,userData,socket}=useSelector(state=>state.user)
  let {messages}=useSelector(state=>state.message)
  let dispatch=useDispatch();

  let [showPicker,setShowPicker]=useState(false)
  let [input,setInput]=useState('')

  let[frontendImage,setFrontendImage]=useState(null);
      let[backendImage,setBackendImage]=useState(null)
      let image=useRef();

      const handleSendmessage=async(e)=>{
        e.preventDefault();
        if(input.length==0 && backendImage==null){
          return 
        }

        try{
          let formData=new FormData()
          formData.append("message",input)
          if(backendImage){
            formData.append("image",backendImage)

          }

          let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,
            {withCredentials:true}
          )
          console.log(result.data);
          dispatch(setMessages([...messages,result.data]))
          setInput("");
          setBackendImage(null);
          setFrontendImage(null);


        }
        catch(error){
          console.log(error);


        }


      }
      const handleImage=(e)=>{
        let file=e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file))


      }
  const onEmojiClick=(EmojiData)=>{

    setInput(prevInput=>prevInput+EmojiData.emoji)
    setShowPicker(false);

  }

  useEffect(()=>{
    socket.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=>socket.off("newMessages");

  },[messages,setMessages])

  return (
    <div className={`lg:w-[70%] relative ${selectedUser? "flex":"hidden"} hidden lg:flex  w-full bg-slate-2 h-full border-l-2
     border-gray-300  `}>
      
    

     {selectedUser && 
     <div className='w-full h-[100vh] flex flex-col'>
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
          
              </div>

              <div className='w-full h-[550px] flex flex-col pt-[30px]
              px-[20px] overflow-auto py-[30px]'>

               {showPicker &&  <div className='absolute bottom-[150px] left-[20px] 

               '><EmojiPicker  onEmojiClick={onEmojiClick}
               width={250} height={350} className='shadow-lg '/> </div>  }

            {messages && messages.map((mess)=>(
              mess.sender==userData._id ? <SenderMessages  image={mess.image}
              message={mess.message} />: <ReceiverMessages image={mess.image}
              message={mess.message}/>

            ))}
{/*               
              <SenderMessages />
              <ReceiverMessages /> */}
              </div>
              </div>
                } 
              {!selectedUser && <div className='w-full h-full flex justify-center
              items-center flex-col'>
                <h1 className='text-gray-700 font-bold text-[50px]' > Welcome to Chattly</h1>
                <span className='text-gray-700 font-semibold text-[30px]'>chat with your friends</span>
                </div>}

   {selectedUser &&  <div className='lg:w-[70%] w-full h-[100px] fixed bottom-[20px] flex items-center 
      justify-center  '>
         <img src={frontendImage} alt=""  className='w-[80px]
        absolute bottom-[100px] right-[20%] rounded-lg  shadow-gray-400 shadow-lg '/>

      <form className='w-[95%] lg:w-[70%] h-[60px]  bg-[#1797c2] 
      shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px]
      px-[20px] relative ' onSubmit={handleSendmessage}>

       

        <div onClick={()=>setShowPicker(prev=>!prev)}>
          <GrEmoji className='z-[100px] cursor-pointer w-[25px] h-[25px] text-white' />
        </div>
        <input type="file" accept='image/*' hidden ref={image} 
        onChange={handleImage}/>

        <input type="text" className='w-full h-full px-[10px] outline-none
        border-0 text-[19px] text-white bg-transparent  placeholder-white '
        placeholder='send messages'  value={input}
        onChange={(e)=>setInput(e.target.value)}/>
       
      
      <div onClick={()=>image.current.click()}>
        <CiImageOn className='cursor-pointer w-[25px] h-[25px] text-white' />


        </div>  
        {input.length>0 && backendImage!=null &&( 
         <button>
            <LuSendHorizontal  className='cursor-pointer w-[25px] h-[25px] text-white'/>
        </button>)
}

      </form>
      </div>
      }
     
      
    </div>
  )
}

export default MessageArea
