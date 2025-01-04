import express from "express";

import {adminLogin, regiesterUser, loginUser} from '../controllers/userController.js'
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router()

userRouter.post('/register', regiesterUser)
userRouter.post('/login', loginUser)
userRouter.post('/adminlogin', adminLogin)

export default userRouter