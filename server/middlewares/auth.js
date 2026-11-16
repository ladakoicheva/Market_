import { getFileToken } from "../services/tokenService.js";
import { setFileToken } from "../services/tokenService.js";
import {extendLiveToken} from "../utils/authHelpers.js";
import { deleteToken } from "../services/tokenService.js";
import { createError } from "../utils/createError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const authorize = asyncHandler(async (req, res, next) => {

  const token = req.headers.authorization;
  
  if (!token) throw createError(401, 'unAuthorized');
  const file = await getFileToken(token);
 

  if (Date.now() > file.date) {
    await deleteToken(token);
    throw createError(401, 'token is not valid');
  }

  file.date = extendLiveToken();
  
  await setFileToken(token,file);


  req.user = { email: file.email,token };

  next();


});
