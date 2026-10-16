import { getFileToken } from "../services/tokenService.js";
import { getErrorReq} from "../utils/responseHelpers.js";
import { setFileToken } from "../services/tokenService.js";
import {extendLiveToken} from "../utils/authHelpers.js";
import { deleteToken } from "../services/tokenService.js";


export const authorize = async (req, res, next) => {

  const token = req.headers.authorization;
  if (!token) return res.status(401).json(getErrorReq('unAuthorized'));

  const file = await getFileToken(token);


  if (!file.ok) return res.status(401).json(getErrorReq('token is not valid'));

  if (Date.now() > file.data?.date) {
    await deleteToken(token);
    return res.status(401).json(getErrorReq('token is not valid'));
  }

  file.data.date = extendLiveToken();
  
  await setFileToken(token,file.data);


  req.user = { email: file.data.email };

  next();


}
