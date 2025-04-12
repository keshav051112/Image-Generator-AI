import express from 'express'
import { userRegister,userLogin, userCredits } from "../controllers/user.controller.js";
import userAuth from '../middleware/auth.js';


const userRouter = express.Router();

userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/credits',userAuth,userCredits)

export default userRouter;