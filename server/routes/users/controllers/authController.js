import { generateToken } from "../../../utils/authHelpers.js";
import { deleteToken,generateFileTokens } from "../../../services/tokenService.js";
import { setUsersFileDir } from "../../../services/userService.js";
import { getErrorReq,getSuccessReq } from "../../../utils/responseHelpers.js";
import { v4 as uuidv4 } from 'uuid';
import { roles } from "../../../../sheme/sheme.js";
import { getUserFile } from "../../../services/userService.js";

export const registerUser = async (req, res) => {
  // req.headers.authorization 

  const email = req.body.email;
  const password = req.body.password;
  const token = generateToken();
  const data = { email, password, id: uuidv4() ,role:roles.CLIENT}

  const [tokens, userData] = await Promise.all([generateFileTokens(token, email), setUsersFileDir(data, email)])
  if (!tokens.ok || !userData.ok) return res.status(500).json(getErrorReq('registratiom failed'))


  delete data.password
  return res.status(201).json(getSuccessReq({ ...data, token }))

}


export const loginUser = async (req, res) => {

  const { email} = req.body;
  const user = req.data;
  const token = generateToken();

  const refreshRes = await generateFileTokens(token,email);
  if (!refreshRes.ok) {
    return res.status(500).json(getErrorReq('failed to create token'));
  }


  const responseData = { ...user,token:refreshRes.data};
  delete responseData.password;

  return res.status(200).json(getSuccessReq(responseData));
};





export const logout = async (req, res) => {
  const token = req.headers.authorization;
  const result = await deleteToken(token);

  if (!result.ok) res.status(500).json(getErrorReq(result.e));

  return res.status(200).json(getSuccessReq(result.data));

}


export const getUser = async (req, res) => {
  const { email } = req.user;
  const user = await getUserFile(email);
  if (!user.ok) return res.status(401).json(getErrorReq(user.e));
  const data = { ...user.data };

  delete data.password;



  return res.status(200).json(getSuccessReq(data));
}


