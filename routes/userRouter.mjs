import express from 'express';
const userRouter = express.Router(); // creating a router object
import db from '../public/scripts/db.mjs';
import userController from "../controllers/userController.mjs";
const userControl = new userController(db)

userRouter.use(express.json())

userRouter.post("/login", userControl.apiLogin.bind(userControl));  // (10)

userRouter.post("/logout",userControl.apiLogout.bind(userControl));
                                                                 
userRouter.get("/loginSes",userControl.apiGetSession.bind(userControl));



export default userRouter;