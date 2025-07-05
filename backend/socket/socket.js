// import http from "http"
// import express from "express";
// import {Server} from "socket.io"


// let app=express();


// const server=http.createServer(app)
// const io=new Server(server,{
//     cors:{
//         origin:"https://chattly-eav1.onrender.com"
//     }
// })

//  const userSocketMap={}
//  export const getReceiverSocketId=(receiver)=>{
//     return userSocketMap[receiver]

//  }


// io.on("connection",(socket)=>{

//     // console.log(socket.id)

//     // io.emit("hello","hello krishna")
//     const userId=socket.handshake.query.userId
//     if(userId!=undefined){
//         console.log(userId,socket.id);
//         userSocketMap[userId]=socket.id

//     }
//     io.emit("getOnlineUsers",Object.keys(userSocketMap))
//     socket.on("disconnect",()=>{
//        delete userSocketMap[userId]
//         io.emit("getOnlineUsers",Object.keys(userSocketMap))
   

//     })
// })


// export {app,server,io}


import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store the io instance in app locals
app.set('io', io);

const userSocketMap = {};

export const getReceiverSocketId = (receiver) => {
  return userSocketMap[receiver];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId} (${socket.id})`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log(`User disconnected: ${userId}`);
    }
  });
});

export { app, server, io };
