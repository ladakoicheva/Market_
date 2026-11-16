import { getUserDB } from "../dbSQL/models/users.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createError } from "../utils/createError.js";


export const checkCredentials = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await getUserDB(email);
  if (!user) throw createError(400, 'email does not exist');

  if (user.PASSWORD !== password) {
    throw createError(400, 'wrong password');
  }

  delete user.PASSWORD;
  req.data = user

  next()

});