import express from "express"
import isAuth from "../middleware/isAuth.js";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import { upload } from "../middleware/multer.js";
const messageRouter=express.Router();

messageRouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage);
messageRouter.get("/get/:receiver",isAuth,getMessage)





export default messageRouter;
