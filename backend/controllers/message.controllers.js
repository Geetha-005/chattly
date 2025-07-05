import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const sendMessage = async (req, res) => {
    try {
        const sender = req.userId
        const { receiver } = req.params
        const { message } = req.body
        const io = req.app.get('io')

        let imageUrl
        if (req.file) {
            // Construct absolute path to the uploaded file
            const absolutePath = path.join(__dirname, '..', 'public', req.file.originalname)
            
            // Verify file exists
            if (!fs.existsSync(absolutePath)) {
                return res.status(400).json({ message: "Uploaded file not found on server" })
            }

            // Upload to Cloudinary
            const uploadResult = await uploadOnCloudinary(absolutePath)
            if (!uploadResult || !uploadResult.url) {
                return res.status(400).json({ message: "Cloudinary upload failed" })
            }
            imageUrl = uploadResult.url

            // Optionally delete the local file after upload if needed
            // fs.unlinkSync(absolutePath)
        }

        // Rest of your message handling logic
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        })

        const newMessage = await Message.create({
            sender,
            receiver,
            message,
            image: imageUrl || null
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            })
        } else {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        // Socket.io emission
        if (io) {
            const receiverSocketId = getReceiverSocketId(receiver)
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", {
                    _id: newMessage._id,
                    sender: newMessage.sender,
                    receiver: newMessage.receiver,
                    message: newMessage.message,
                    image: newMessage.image,
                    createdAt: newMessage.createdAt
                })
            }
        }

        return res.status(201).json(newMessage)

    } catch (error) {
        console.error("Message send error:", error)
        return res.status(500).json({ 
            message: "Failed to send message",
            error: error.message 
        })
    }
}
// export const sendMessage=async(req,res)=>{

//     try{
//         let sender=req.userId;
//         let {receiver}=req.params
//         let{message}=req.body

//         let image;
 
//         if(req.file){
//             image=await uploadOnCloudinary(req.file.path)
//         }

//         let conversation=await Conversation.findOne({
//             participants:{$all:[sender,receiver]}
//         })

//         let newMessage=await Message.create({
//             sender,receiver,message,image
//         })

//         if(!conversation){
//             conversation=await Conversation.create({
//                 participants:[sender,receiver],
//                 message:[newMessage._id]
//             })
//         }
//         else{
//             conversation.messages.push(newMessage._id);
//             await conversation.save();
//         }

//         return res.status(201).json({newMessage});
// //         return res.status(201).json({
// //              _id: newMessage._id,
// //   sender: newMessage.sender,
// //   receiver: newMessage.receiver,
// //   message: newMessage.message,
// //   image: newMessage.image,
// //   createdAt: newMessage.createdAt,
// //         })

//     }
//     catch(error){
//         return res.status(500).json({message:`send message error ${error}`})



//     }
// }


// export const sendMessage = async (req, res) => {
//   try {
//     const sender = req.userId;
//     const { receiver } = req.params;
//     const { message } = req.body;

//     let image;
//     if (req.file) {
//       image = await uploadOnCloudinary(req.file.path);
//       if (!image) {
//         return res.status(400).json({ message: "Failed to upload image" });
//       }
//     }

//     // Find or create conversation
//     let conversation = await Conversation.findOne({
//       participants: { $all: [sender, receiver] },
//     });

//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       message,
//       image: image?.url || null,
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [sender, receiver],
//         messages: [newMessage._id], // Fixed: Changed `message` to `messages`
//       });
//     } else {
//       conversation.messages.push(newMessage._id);
//       await conversation.save();
//     }

//     // Emit socket event to the receiver
//     const receiverSocketId = getReceiverSocketId(receiver);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     return res.status(201).json(newMessage);

//   } catch (error) {
//     console.error("Send message error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


// export const getMessage=async(req,res)=>{

//     try{
//         let sender=req.userId
//         let {receiver}=req.params
//          let conversation=await Conversation.findOne({
//             participants:{$all:[sender,receiver]}
//         }).populate("messages")

//         if(!conversation){
//              return res.status(400).json({message:`conversation is not found`})

//         }

//        const  receiverSocketId=getReceiverSocketId(receiver)
//         if(receiverSocketId){
//             io.to(receiverSocketId).emit("newMessage",newMessage)
//         }
//         // console.log(conversation?.messages)
//         return res.status(200).json(conversation?.messages)


//     }
//     catch(error){
//          return res.status(500).json({message:`getting  message error ${error}`})




//     }
// }







// export const sendMessage = async (req, res) => {
//   try {
//     const sender = req.userId;
//     const { receiver } = req.params;
//     const { message } = req.body;
//     const io = req.app.get('io');

//     let imageUrl;
//     if (req.file) {
//       try {
//         // Ensure the file exists before processing
//         if (!fs.existsSync(req.file.path)) {
//           console.warn(`File not found: ${req.file.path}`);
//           throw new Error('Uploaded file not found');
//         }

//         const uploadResult = await uploadOnCloudinary(req.file.path);
//         if (!uploadResult) {
//           throw new Error('Cloudinary upload failed');
//         }
//         imageUrl = uploadResult.url;

//         // Safely delete the temporary file
//         try {
//           fs.unlinkSync(req.file.path);
//         } catch (unlinkError) {
//           console.warn(`Failed to delete temp file: ${unlinkError.message}`);
//           // Continue even if deletion fails
//         }
//       } catch (uploadError) {
//         console.error('Image processing error:', uploadError);
//         return res.status(400).json({ 
//           message: 'Failed to process image',
//           error: uploadError.message 
//         });
//       }
//     }

//     // Rest of your message handling logic
//     let conversation = await Conversation.findOne({
//       participants: { $all: [sender, receiver] }
//     });

//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       message,
//       image: imageUrl || null
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [sender, receiver],
//         messages: [newMessage._id]
//       });
//     } else {
//       conversation.messages.push(newMessage._id);
//       await conversation.save();
//     }

//     // Socket.io emission
//     if (io) {
//       const receiverSocketId = getReceiverSocketId(receiver);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessage", {
//           _id: newMessage._id,
//           sender: newMessage.sender,
//           receiver: newMessage.receiver,
//           message: newMessage.message,
//           image: newMessage.image,
//           createdAt: newMessage.createdAt
//         });
//       }
//     }

//     return res.status(201).json(newMessage);

//   } catch (error) {
//     console.error("Message send error:", error);
//     return res.status(500).json({ 
//       message: "Failed to send message",
//       error: error.message 
//     });
//   }
// };


export const getMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // Return empty array if no conversation exists
    }

    return res.status(200).json(conversation.messages);

  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




// export const sendMessage = async (req, res) => {
//   try {
//     const sender = req.userId;
//     const { receiver } = req.params;
//     const { message } = req.body;
//     const io = req.app.get('io');

//     let imageUrl;
//     if (req.file) {
//       try {
//         // Since your Multer saves to ./public, the path is correct
//         const filePath = `./public/${req.file.filename}`;
        
//         // Verify file exists (optional but recommended)
//         if (!fs.existsSync(filePath)) {
//           console.warn(`File not found: ${filePath}`);
//           throw new Error('Uploaded file not found');
//         }

//         // Upload to Cloudinary
//         const uploadResult = await uploadOnCloudinary(filePath);
//         if (!uploadResult) {
//           throw new Error('Cloudinary upload failed');
//         }
//         imageUrl = uploadResult.url;

//         // Skip file deletion (since it's in public folder)
//         // Files in ./public should be permanent or cleaned separately
//       } catch (uploadError) {
//         console.error('Image processing error:', uploadError);
//         return res.status(400).json({ 
//           message: 'Failed to process image',
//           error: uploadError.message 
//         });
//       }
//     }

//     // Message handling logic remains the same
//     let conversation = await Conversation.findOne({
//       participants: { $all: [sender, receiver] }
//     });

//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       message,
//       image: imageUrl || null
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [sender, receiver],
//         messages: [newMessage._id]
//       });
//     } else {
//       conversation.messages.push(newMessage._id);
//       await conversation.save();
//     }

//     // Socket.io emission
//     if (io) {
//       const receiverSocketId = getReceiverSocketId(receiver);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessage", {
//           _id: newMessage._id,
//           sender: newMessage.sender,
//           receiver: newMessage.receiver,
//           message: newMessage.message,
//           image: newMessage.image,
//           createdAt: newMessage.createdAt
//         });
//       }
//     }

//     return res.status(201).json(newMessage);

//   } catch (error) {
//     console.error("Message send error:", error);
//     return res.status(500).json({ 
//       message: "Failed to send message",
//       error: error.message 
//     });
//   }
// };