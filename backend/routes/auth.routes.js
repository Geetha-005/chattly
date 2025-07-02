import express from "express"
import { login, logOut, singUp } from "../controllers/auth.controllers.js";

const authRouter=express.Router();

authRouter.post("/signup",singUp);
authRouter.post("/login",login);
authRouter.get("/logout",logOut);



export default authRouter;
