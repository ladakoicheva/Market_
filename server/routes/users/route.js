import { Router } from "express";
import { registerUser, loginUser, logout } from "../users/controllers/authController.js";
import { getUser } from "../users/controllers/authController.js";
import { authorize } from "../../middlewares/auth.js";
import { authValidate } from "../../middlewares/userDataValidation.js";
import { checkCredentials } from "../../middlewares/checkUserDb.js";

const userRouter = Router();


userRouter.post('/register',authValidate, registerUser)
userRouter.post('/login',authValidate,checkCredentials, loginUser)
userRouter.get('/authorization', authorize, getUser)
userRouter.get('/logout', logout)



export default userRouter