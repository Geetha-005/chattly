import express from "express"
import { getCurrentUser } from "../controllers/user.controllers";
import isAuth from "../middleware/isAuth";
const userRouter=express.Router();

userRouter.get("/current",isAuth,getCurrentUser);



export default userRouter;
