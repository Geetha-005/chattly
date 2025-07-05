import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.png";
const ReceiverMessages = ({image,message}) => {
    let scroll=useRef()
    useEffect(()=>{
       scroll.current.scrollIntoView({behavior:"smooth"})
      
    },[message,image])
        
  
  return (
    <div className='w-fit max-w-[500px] bg-[#20c7ff] text-white text-[19px]
       rounded-tr-none px-[20px] py-[10px]   rounded-tl-none rounded-2xl  relative left-0  
       shadow-lg shadow-gray-400 gap-[10px] flex flex-col 'ref={scroll} >
         
         {image &&
      <img src={image} alt=""  className='w-[100px] rounded-lg'/>
    
        }

        {message &&
          <span className='text-black'>{message}</span>
        }
         
       </div>
  )
}

export default ReceiverMessages
