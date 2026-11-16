import { Router } from "express";
import { authorize } from "../../middlewares/auth.js";
import { authValidate } from "../../middlewares/userDataValidation.js";
import { checkCredentials } from "../../middlewares/checkUserDb.js";
import { registerUser, loginUser, logout, getUser } from '../users/controller.js';
import { getUserProducts } from "../products/controller.js";

const userRouter = Router();


userRouter.post('/register',authValidate, registerUser)
userRouter.post('/login',authValidate,checkCredentials, loginUser)
userRouter.get('/me', authorize, getUser)
userRouter.get('/me/products', authorize, getUserProducts)
userRouter.get('/logout', logout)



export default userRouter