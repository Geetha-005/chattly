import React from 'react'
import dp from "../assets/dp.png"
const SenderMessages = (image,message) => {
  return (
    <div className='w-fit max-w-[500px] bg-[rgb(23,151,194)] text-white text-[19px]
    rounded-tr-none px-[20px] py-[10px]   rounded-2xl relative right-0 ml-auto 
    shadow-lg shadow-gray-400 gap-[10px] flex flex-col ' >
      
      {image &&
      <img src={image} alt=""  className='w-[100px] rounded-lg'/>
    
        }

        {message &&
          <span className='text-black'>{message}</span>
        }
    </div>
  )
}
    
export default SenderMessages
