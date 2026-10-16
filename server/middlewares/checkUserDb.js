import { getUserFile } from "../services/userService.js";
import { getErrorReq } from "../utils/responseHelpers.js";


export const checkCredentials = async (req,res,next) => {
    const { email, password } = req.body;
   
    console.log(req.body)
  
    const userRes = await getUserFile(email);
  
    if (!userRes.ok) {
      return res.status(400).json(getErrorReq('email does not exist'));
    }
  
  const user = userRes.data;
  
  
    if (user.password !== password) {
      return res.status(400).json(getErrorReq('wrong password'));
    }
  
  req.data = user
  
  next()
  
}