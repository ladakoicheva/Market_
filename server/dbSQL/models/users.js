import { getSuccessReq, getErrorReq } from "../../utils/responseHelpers.js"
import { DB } from "../index.js";




export const getUserDB = async (email) => {
  try {
    const [[user]] = await DB.execute(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    return getSuccessReq(user)

  } catch (error) {
    return getErrorReq(error);

  }
}





export const getAllUsersDB = async () => {

  const res = await DB.query(
    `SELECT * FROM users`
  )
  console.log(res)
}




export const createUserDB = async (user) => {
  // user = {
  //   email: 'use2r@gmail.com',
  //   password: 'weqqeqq',
  //   role: 'client'
  // }

  try {
    const [{ insertId }] = await DB.execute(
      `INSERT INTO users(email, password, role)
     VALUES (?, ?, ?)
    `,
      [user.email, user.password, user.role]
    );
    const newUser = {
      email: user.email,
      role: user.role,
      id: insertId
    }
    return getSuccessReq(newUser)

  } catch (error) {
    return getErrorReq(error);

  }

}

