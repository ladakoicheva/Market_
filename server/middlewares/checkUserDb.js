import { getErrorReq } from "../utils/responseHelpers.js";
import { getUserDB } from "../dbSQL/models/users.js";


export const checkCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body)

  const userRes = await getUserDB(email);

  if (!userRes.ok) {
    return res.status(400).json(getErrorReq('email does not exist'));
  }

  const user = userRes.data;



  if (user.PASSWORD !== password) {
    return res.status(400).json(getErrorReq('wrong password'));
  }

  delete user.PASSWORD;
  req.data = user

  next()

}