import { generateToken } from "../../utils/authHelpers.js";
import { deleteToken, generateFileTokens } from "../../services/tokenService.js";
import { getSuccessReq } from "../../utils/responseHelpers.js";
import { roles } from "../../../sheme/sheme.js";
import { getUserDB } from "../../dbSQL/models/users.js";
import { createUserDB } from "../../dbSQL/models/users.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createError } from "../../utils/createError.js";



export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const token = generateToken();


    const [createdToken, user] = await Promise.all([
      generateFileTokens(token, email),
      createUserDB({ email, password, role: roles.CLIENT })
    ]);

    return res.status(201).json(getSuccessReq({
      user,
      token: createdToken
    }));
});


export const loginUser = asyncHandler(async (req, res) => {

  const { email } = req.body;
  const user = req.data;
  const token = generateToken();

  const createdToken = await generateFileTokens(token, email);

  const responseData = { user, token: createdToken };
  delete responseData.user.password;

  return res.status(200).json(getSuccessReq(responseData));
});





export const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  await deleteToken(token);
  return res.status(200).json(getSuccessReq(null));

});


export const getUser = asyncHandler(async (req, res) => {
  const { email ,token} = req.user;
  const user = await getUserDB(email);
  if (!user) throw createError(404, 'User not found');
  const data = { user,token };

  
  delete data.user.PASSWORD;



  return res.status(200).json(getSuccessReq(data));
});
