// import express from 'express'
// import dotenv from 'dotenv'
// import cookieParser from "cookie-parser" 
// import connectDB from './config/db.js'
// import authRouter from './routes/auth.routes.js'
// import cors from 'cors'
// import userRouter from './routes/user.routes.js'
// import messageRouter from './routes/message.routes.js'
// import { app, server } from './socket/socket.js'
// dotenv.config()


// const port=process.env.PORT||5000



// app.use(cors({
//     origin:"https://chattly-eav1.onrender.com",
//     credentials:true
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use(express.static("public"));
// app.use("/api/auth",authRouter)

// app.use("/api/user",userRouter)
// app.use("/api/message",messageRouter)

// server.listen(port,()=>{
//      connectDB();
//     console.log(`sererv started ${port}`)
   
// })


import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://chattly-eav1.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Start server
server.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
});
