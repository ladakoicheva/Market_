import { generateToken } from "../../utils/authHelpers.js";
import { deleteToken, generateFileTokens } from "../../services/tokenService.js";
import { getErrorReq, getSuccessReq } from "../../utils/responseHelpers.js";
import { roles } from "../../../sheme/sheme.js";
import { getUserDB } from "../../dbSQL/models/users.js";
import { createUserDB } from "../../dbSQL/models/users.js";



export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = generateToken();


    const [tokens, user] = await Promise.all([
      generateFileTokens(token, email),
      createUserDB({ email, password, role: roles.CLIENT })
    ]);

    if (!tokens.ok || !user?.data) {
      return res.status(500).json(getErrorReq('Registration failed'));
    }

    return res.status(201).json(getSuccessReq({
      user: user.data,
      token
    }));
  } catch (error) {

    return res.status(500).json(getErrorReq('Internal server error'));
  }
};


export const loginUser = async (req, res) => {

  const { email } = req.body;
  const user = req.data;
  const token = generateToken();

  const refreshRes = await generateFileTokens(token, email);
  if (!refreshRes.ok) {
    return res.status(500).json(getErrorReq('failed to create token'));
  }



  const responseData = { ...user, token: refreshRes.data };
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
  const user = await getUserDB(email);
  if (!user.ok) return res.status(401).json(getErrorReq(user.e));
  const data = { ...user.data };

  delete data.password;



  return res.status(200).json(getSuccessReq(data));
}


